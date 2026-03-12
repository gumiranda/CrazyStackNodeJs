import { loadUserDetailed } from "./LoadUserDetailed";

describe("loadUserDetailed", () => {
  let loadUserRepository: any;
  let loadPhoto: jest.Mock;

  const fakeUser = {
    _id: "user_id",
    name: "Test User",
    email: "test@mail.com",
    createdById: "creator_id",
  };
  const fakeQuery = { fields: { _id: "user_id" }, options: {} };

  beforeEach(() => {
    loadUserRepository = {
      loadUser: jest.fn().mockResolvedValue(fakeUser),
    };
    loadPhoto = jest.fn().mockResolvedValue({
      _id: "photo_id",
      url: "http://photo.com/1.jpg",
      name: "photo.jpg",
      type: "image/jpeg",
      size: 1024,
    });
  });

  it("should return user data on success", async () => {
    const sut = loadUserDetailed(loadUserRepository, loadPhoto);
    const result = await sut(fakeQuery);
    expect(result).toEqual(expect.objectContaining(fakeUser));
  });

  it("should return null if user is not found", async () => {
    loadUserRepository.loadUser.mockResolvedValueOnce(null);
    const sut = loadUserDetailed(loadUserRepository, loadPhoto);
    const result = await sut(fakeQuery);
    expect(result).toBeNull();
  });

  it("should load photo when user has photoId", async () => {
    loadUserRepository.loadUser.mockResolvedValueOnce({
      ...fakeUser,
      photoId: "photo_id",
    });
    const sut = loadUserDetailed(loadUserRepository, loadPhoto);
    const result = await sut(fakeQuery);
    expect(loadPhoto).toHaveBeenCalledWith({ fields: { _id: "photo_id" } });
    expect(result).toHaveProperty("photo");
    expect(result?.photo?.url).toBe("http://photo.com/1.jpg");
  });

  it("should not load photo when user has no photoId", async () => {
    const sut = loadUserDetailed(loadUserRepository, loadPhoto);
    await sut(fakeQuery);
    expect(loadPhoto).not.toHaveBeenCalled();
  });

  it("should call loadUserRepository with correct query", async () => {
    const sut = loadUserDetailed(loadUserRepository, loadPhoto);
    await sut(fakeQuery);
    expect(loadUserRepository.loadUser).toHaveBeenCalledWith(fakeQuery);
  });
});
