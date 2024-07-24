import { AddUserRepository, UpdateUserRepository } from "@/slices/user/repositories";
import { AddOwner } from "@/slices/owner/useCases";
import { AddService } from "@/slices/service/useCases";
import { AddCategory } from "@/slices/category/useCases";
import { AddClient } from "@/slices/client/useCases";
import { UserEntity } from "@/slices/user/entities";
export type UserInput = {
  _id: string;
  password: string;
  email: string;
  name: string;
};
export type CompleteOwner = (userCreated: UserInput) => Promise<any | null>;

export type CompleteOwnerSignature = (
  userRepository: AddUserRepository & UpdateUserRepository,
  addCategory: AddCategory,
  addService: AddService,
  addOwner: AddOwner,
  addClient: AddClient
) => CompleteOwner;

export const completeOwner: CompleteOwnerSignature =
  (
    userRepository: AddUserRepository & UpdateUserRepository,
    addCategory: AddCategory,
    addService: AddService,
    addOwner: AddOwner,
    addClient: AddClient
  ) =>
  async (userCreated: UserInput) => {
    const { _id, name, password, email } = userCreated;
    const categoryData = await addCategory({
      name: "Beleza e Estética",
      description: "Corte de cabelo, manicure, pedicure, depilação, etc.",
      active: true,
      createdById: _id,
    });
    const serviceName = "Corte de cabelo";
    const [serviceData, ownerData] = await Promise.all([
      addService({
        name: serviceName,
        description: "Corte de cabelo",
        active: true,
        categoryId: categoryData?._id ?? "",
        createdById: _id,
        price: 50,
        comission: 50,
        duration: 30,
      }),
      addOwner({
        name,
        createdById: _id,
        minimumTimeForReSchedule: 30,
        hourStart1: "9:00",
        hourEnd1: "18:00",
        hourStart2: "8:00",
        hourEnd2: "18:00",
        hourStart3: "8:00",
        hourEnd3: "18:00",
        hourLunchStart1: "12:00",
        hourLunchEnd1: "13:00",
        days1: {
          monday1: true,
          tuesday1: true,
          wednesday1: true,
          thursday1: true,
          friday1: true,
          saturday1: false,
          sunday1: false,
        },
        days2: {
          monday2: false,
          tuesday2: false,
          wednesday2: false,
          thursday2: false,
          friday2: false,
          saturday2: false,
          sunday2: false,
        },
        days3: {
          monday3: false,
          tuesday3: false,
          wednesday3: false,
          thursday3: false,
          friday3: false,
          saturday3: false,
          sunday3: false,
        },
        haveDelivery: false,
        appointmentsTotal: 0,
        ratingsTotal: 0,
        typeTax: "fixed",
        active: true,
      }),
    ]);
    const [professionalData, clientUserData, updateUser] = await Promise.all([
      userRepository.addUser(
        new UserEntity({
          name: userCreated?.name as string,
          createdById: userCreated?._id as string,
          serviceIds: [serviceData?._id?.toString?.() ?? ""],
          serviceOptions: [{ label: serviceName, value: serviceData?._id?.toString?.() }],
          email: ("profissional" + email) as string,
          role: "professional",
          password: password ?? "",
          myOwnerId: _id as string,
          ownerId: ownerData?._id as string,
          active: true,
        })
      ),
      userRepository.addUser(
        new UserEntity({
          name: name as string,
          createdById: _id as string,
          email: ("cliente" + email) as string,
          role: "client",
          password: password ?? "",
          active: true,
          myOwnerId: _id as string,
          ownerId: ownerData?._id as string,
        })
      ),
      userRepository.updateUser(
        { fields: { _id } },
        {
          myOwnerId: _id,
          ownerId: ownerData?._id as string,
          createdById: _id,
        }
      ),
    ]);
    const clientData = await addClient({
      name,
      createdById: _id,
      ownerId: ownerData?._id as string,
      myOwnerId: _id,
      userId: clientUserData?._id as string,
      active: true,
    });
    return {
      ownerData,
      professionalData,
      clientData,
      categoryData,
      serviceData,
      updateUser,
    };
  };
