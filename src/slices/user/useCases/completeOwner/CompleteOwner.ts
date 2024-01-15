import { AddUser } from "@/slices/user/useCases";
import { AddCategory } from "@/slices/category/useCases";
import { AddService } from "@/slices/service/useCases";
import { AddOwner } from "@/slices/owner/useCases";
export type CompleteOwner = (userCreated: any) => Promise<any | null>;

export type CompleteOwnerSignature = (
  addUser: AddUser,
  addCategory: AddCategory,
  addService: AddService,
  addOwner: AddOwner
) => CompleteOwner;
export const completeOwner: CompleteOwnerSignature =
  (
    addUser: AddUser,
    addCategory: AddCategory,
    addService: AddService,
    addOwner: AddOwner
  ) =>
  async (userCreated: any) => {
    const categoryData: any = await addCategory({
      name: "Beleza e Estética",
      createdById: userCreated?._id as string,
      active: true,
    });
    const serviceData: any = await addService({
      name: "Corte de Cabelo",
      categoryId: categoryData?._id,
      duration: 30,
      createdById: userCreated?._id as string,
      active: true,
      comission: 100,
      price: 50,
    });
    const ownerData: any = await addOwner({
      createdById: userCreated?._id as string,
      minimumTimeForReSchedule: 30,
      name: userCreated?.name as string,
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
    });
    const professionalData: any = await addUser({
      name: userCreated?.name as string,
      createdById: userCreated?._id as string,
      serviceIds: [serviceData?._id?.toString?.()],
      email: ("profissional" + userCreated?.email) as string,
      role: "professional",
      password: "",
      ownerId: userCreated?._id as string,
      myOwnerId: ownerData?._id as string,
      active: true,
    });
    const clientData: any = await addUser({
      name: userCreated?.name as string,
      createdById: userCreated?._id as string,
      email: ("cliente" + userCreated?.email) as string,
      role: "client",
      password: "",
      active: true,
    });
    console.log({ professionalData, clientData, categoryData, serviceData, ownerData });

    return {
      ownerData,
      professionalData,
      clientData,
      categoryData,
      serviceData,
    };
  };
