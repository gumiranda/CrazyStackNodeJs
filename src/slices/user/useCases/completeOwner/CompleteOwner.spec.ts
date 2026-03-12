import { completeOwner, flattenArray } from "./CompleteOwner";

jest.mock("@/application/infra/config/whiteLabel", () => ({
  whiteLabel: {
    database: "mongodb",
    systemName: "Test",
    categories: [
      {
        name: "Category1",
        description: "Desc1",
        services: [
          { name: "Service1", description: "Desc1", price: 50, comission: 50, duration: 30 },
          { name: "Service2", description: "Desc2", price: 60, comission: 40, duration: 45 },
        ],
      },
    ],
  },
}));

describe("completeOwner", () => {
  let userRepository: any;
  let addCategory: jest.Mock;
  let addService: jest.Mock;
  let addOwner: jest.Mock;

  const fakeUserInput = {
    _id: "owner_id",
    name: "Owner Name",
    email: "owner@mail.com",
    password: "123456",
    phone: "11999999999",
    cpf: "12345678900",
  };

  beforeEach(() => {
    userRepository = {
      addUser: jest.fn().mockResolvedValue({ _id: "new_user_id", name: "User" }),
      updateUser: jest.fn().mockResolvedValue({ _id: "owner_id" }),
    };
    addCategory = jest.fn().mockResolvedValue({ _id: "category_id", name: "Category1" });
    addService = jest
      .fn()
      .mockResolvedValueOnce({ _id: "service_1_id", name: "Service1" })
      .mockResolvedValueOnce({ _id: "service_2_id", name: "Service2" });
    addOwner = jest.fn().mockResolvedValue({ _id: "owner_data_id" });
  });

  it("should create categories from whiteLabel config", async () => {
    const sut = completeOwner(userRepository, addCategory, addService, addOwner);
    await sut(fakeUserInput);
    expect(addCategory).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Category1",
        active: true,
        createdById: "owner_id",
      })
    );
  });

  it("should create services linked to categories", async () => {
    const sut = completeOwner(userRepository, addCategory, addService, addOwner);
    await sut(fakeUserInput);
    expect(addService).toHaveBeenCalledTimes(2);
    expect(addService).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Service1",
        categoryId: "category_id",
        createdById: "owner_id",
      })
    );
  });

  it("should create owner with default schedule", async () => {
    const sut = completeOwner(userRepository, addCategory, addService, addOwner);
    await sut(fakeUserInput);
    expect(addOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Owner Name",
        createdById: "owner_id",
        hourStart1: "9:00",
        hourEnd1: "18:00",
        active: true,
      })
    );
  });

  it("should create professional and client users", async () => {
    const sut = completeOwner(userRepository, addCategory, addService, addOwner);
    await sut(fakeUserInput);
    expect(userRepository.addUser).toHaveBeenCalledTimes(2);
    // Professional
    expect(userRepository.addUser).toHaveBeenCalledWith(
      expect.objectContaining({
        role: "professional",
        email: "profissionalowner@mail.com",
      })
    );
    // Client
    expect(userRepository.addUser).toHaveBeenCalledWith(
      expect.objectContaining({
        role: "client",
        email: "clienteowner@mail.com",
      })
    );
  });

  it("should update the original user with ownerId", async () => {
    const sut = completeOwner(userRepository, addCategory, addService, addOwner);
    await sut(fakeUserInput);
    expect(userRepository.updateUser).toHaveBeenCalledWith(
      { fields: { _id: "owner_id" } },
      expect.objectContaining({
        myOwnerId: "owner_id",
        ownerId: "owner_data_id",
        createdById: "owner_id",
      })
    );
  });

  it("should handle services with null _id", async () => {
    addService = jest
      .fn()
      .mockResolvedValueOnce({ _id: null, name: "Service1" })
      .mockResolvedValueOnce({ name: "Service2" });
    const sut = completeOwner(userRepository, addCategory, addService, addOwner);
    const result = await sut(fakeUserInput);
    expect(result).toBeDefined();
    expect(result.servicesInserted).toHaveLength(2);
  });

  it("should handle null category _id", async () => {
    addCategory = jest.fn().mockResolvedValue({ _id: null, name: "Category1" });
    addService = jest
      .fn()
      .mockResolvedValueOnce({ _id: "service_1_id", name: "Service1" })
      .mockResolvedValueOnce({ _id: "service_2_id", name: "Service2" });
    const sut = completeOwner(userRepository, addCategory, addService, addOwner);
    const result = await sut(fakeUserInput);
    expect(result).toBeDefined();
    expect(addService).toHaveBeenCalledWith(
      expect.objectContaining({ categoryId: "" })
    );
  });

  it("should handle services with no _id property (toString branch)", async () => {
    addService = jest
      .fn()
      .mockResolvedValueOnce({ name: "Service1" })
      .mockResolvedValueOnce({ _id: undefined, name: "Service2" });
    const sut = completeOwner(userRepository, addCategory, addService, addOwner);
    const result = await sut(fakeUserInput);
    expect(result).toBeDefined();
    expect(result.servicesInserted).toHaveLength(2);
  });

  it("should handle null password in userCreated", async () => {
    const sut = completeOwner(userRepository, addCategory, addService, addOwner);
    const result = await sut({ ...fakeUserInput, password: null as any });
    expect(result).toBeDefined();
    expect(userRepository.addUser).toHaveBeenCalledWith(
      expect.objectContaining({ password: "" })
    );
  });

  it("should handle null ownerData._id", async () => {
    addOwner.mockResolvedValueOnce({ _id: null });
    const sut = completeOwner(userRepository, addCategory, addService, addOwner);
    const result = await sut(fakeUserInput);
    expect(result).toBeDefined();
    expect(userRepository.updateUser).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({ ownerId: null })
    );
  });

  it("should return all created data", async () => {
    const sut = completeOwner(userRepository, addCategory, addService, addOwner);
    const result = await sut(fakeUserInput);
    expect(result).toHaveProperty("clientUserData");
    expect(result).toHaveProperty("servicesInserted");
    expect(result).toHaveProperty("ownerData");
    expect(result).toHaveProperty("professionalData");
    expect(result).toHaveProperty("updateUser");
  });
});

describe("flattenArray", () => {
  it("should flatten nested arrays", () => {
    expect(flattenArray([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
  });
  it("should return empty array for null", () => {
    expect(flattenArray(null)).toEqual([]);
  });
  it("should return empty array for undefined", () => {
    expect(flattenArray(undefined)).toEqual([]);
  });
  it("should handle single element arrays", () => {
    expect(flattenArray([[1]])).toEqual([1]);
  });
});
