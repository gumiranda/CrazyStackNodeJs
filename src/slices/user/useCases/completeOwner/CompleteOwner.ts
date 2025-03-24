import { AddUserRepository, UpdateUserRepository } from "@/slices/user/repositories";
import { AddOwner } from "@/slices/owner/useCases";
import { AddService } from "@/slices/service/useCases";
import { AddCategory } from "@/slices/category/useCases";
import { AddClient } from "@/slices/client/useCases";
import { UserEntity } from "@/slices/user/entities";
import { AddCustomer } from "@/slices/payment/customer/useCases";
import { AddSubscription } from "@/slices/payment/subscription/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { v4 as uuidv4 } from "uuid";
import type { LoadCategoryPlace } from "@/slices/categoryPlace/useCases";
import type { AddPlace } from "@/slices/place/useCases";

export type UserInput = {
  _id: string;
  password: string;
  email: string;
  name: string;
  phone: string;
  cpf: string;
  cnpj?: string;
};
export type CompleteOwner = (userCreated: UserInput) => Promise<any | null>;

export type CompleteOwnerSignature = (
  userRepository: AddUserRepository & UpdateUserRepository,
  addCategory: AddCategory,
  addService: AddService,
  addOwner: AddOwner,
  addClient: AddClient,
  addCustomer: AddCustomer,
  addSubscription: AddSubscription,
  loadCategoryPlace: LoadCategoryPlace,
  addPlace: AddPlace
) => CompleteOwner;

export const completeOwner: CompleteOwnerSignature =
  (
    userRepository: AddUserRepository & UpdateUserRepository,
    addCategory: AddCategory,
    addService: AddService,
    addOwner: AddOwner,
    addClient: AddClient,
    addCustomer: AddCustomer,
    addSubscription: AddSubscription,
    loadCategoryPlace: LoadCategoryPlace,
    addPlace: AddPlace
  ) =>
  async (userCreated: UserInput) => {
    const { _id, name, password, email, phone, cpf, cnpj } = userCreated;
    const categoriesToAdd = whiteLabel.categories.map((item: any) => ({
      name: item.name,
      description: item.description,
      active: true,
      createdById: _id,
    }));
    const categoriesInserted = await Promise.all(
      categoriesToAdd.map((category: any) => addCategory(category))
    );
    const servicesInserted = await Promise.all(
      flattenArray(
        whiteLabel.categories.map((item: any, index: number) =>
          item.services.map((service: any) => ({
            ...service,
            categoryId: categoriesInserted[index]?._id ?? "",
            createdById: _id,
            active: true,
          }))
        )
      ).map((service: any) => addService(service))
    );
    const serviceIds =
      servicesInserted.map((service: any) => service?._id?.toString?.()) ?? [];
    const serviceOptions =
      servicesInserted.map((service: any) => ({
        value: service?._id?.toString?.(),
        label: service?.name,
      })) ?? [];
    const [ownerData, categoryPlace] = await Promise.all([
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
      loadCategoryPlace({
        fields: { name: `Parceiros ${whiteLabel.systemName}` },
        options: {},
      }),
    ]);
    const taxID = cpf?.length > 0 ? cpf : cnpj;
    const customer = {
      createdById: _id,
      name,
      email,
      phone,
      taxID,
      correlationID: uuidv4(),
    };
    const placeCreated: any = await addPlace({
      createdById: _id,
      ownerId: ownerData?._id ?? "",
      name: ownerData?.name ?? "",
      description: "",
      active: true,
      categoryPlaceId: categoryPlace?._id ?? "",
    });
    const customerCreated: any = await addCustomer(customer as any);
    if (customerCreated?.error === "Há outro cliente com esses dados") {
      return null;
    }
    const { gatewayDetails } = customerCreated;
    const subscription = await addSubscription({
      createdById: _id,
      name,
      customer: gatewayDetails ? { ...gatewayDetails, taxID: customer?.taxID } : null,
      value: whiteLabel.valueMonth,
      comment: "",
      additionalInfo: [],
      dayGenerateCharge: Number(new Date().getDate()),
      globalID: uuidv4(),
    });
    const professional = new UserEntity({
      name: userCreated?.name as string,
      createdById: userCreated?._id as string,
      serviceIds: serviceIds,
      serviceOptions: serviceOptions,
      email: ("profissional" + email) as string,
      role: "professional",
      password: password ?? "",
      myOwnerId: _id as string,
      ownerId: ownerData?._id as string,
      active: true,
    });
    const client = new UserEntity({
      name: name as string,
      createdById: _id as string,
      email: ("cliente" + email) as string,
      role: "client",
      password: password ?? "",
      active: true,
      myOwnerId: _id as string,
      ownerId: ownerData?._id as string,
    });
    const [professionalData, clientUserData, updateUser] = await Promise.all([
      userRepository.addUser(professional),
      userRepository.addUser(client),
      userRepository.updateUser(
        { fields: { _id } },
        {
          myOwnerId: _id,
          ownerId: ownerData?._id as string,
          createdById: _id,
          customerID: customer?.correlationID,
          globalID: subscription?.globalID,
        }
      ),
    ]);
    // const clientData = await addClient({
    //   name,
    //   createdById: _id,
    //   ownerId: ownerData?._id as string,
    //   myOwnerId: _id,
    //   userId: clientUserData?._id as string,
    //   active: true,
    // });
    return {
      clientUserData,
      servicesInserted,
      ownerData,
      professionalData,
      updateUser,
      customerCreated,
      subscription,
      placeCreated,
    };
  };
export const flattenArray = (arrays: any) =>
  arrays?.reduce?.((a: any, b: any) => a?.concat?.(b), []) ?? [];
