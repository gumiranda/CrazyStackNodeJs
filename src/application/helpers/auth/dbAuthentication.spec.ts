import { DbAuthentication } from "./dbAuthentication";

describe("DbAuthentication", () => {
  let sut: DbAuthentication;
  let loadUserRepository: any;
  let hashComparer: any;
  let tokenGenerator: any;
  let refreshTokenGenerator: any;

  const fakeUser = {
    _id: "any_id",
    email: "any@mail.com",
    password: "hashed_password",
  };

  beforeEach(() => {
    loadUserRepository = {
      loadUser: jest.fn().mockResolvedValue(fakeUser),
    };
    hashComparer = {
      compare: jest.fn().mockResolvedValue(true),
    };
    tokenGenerator = {
      generate: jest.fn().mockResolvedValue("any_access_token"),
    };
    refreshTokenGenerator = {
      generate: jest.fn().mockResolvedValue("any_refresh_token"),
    };
    sut = new DbAuthentication(
      loadUserRepository,
      hashComparer,
      tokenGenerator,
      refreshTokenGenerator
    );
  });

  describe("auth", () => {
    it("should call loadUserRepository with correct email", async () => {
      await sut.auth("any@mail.com", "any_password");
      expect(loadUserRepository.loadUser).toHaveBeenCalledWith({
        fields: { email: "any@mail.com" },
        options: { projection: {} },
      });
    });
    it("should return null if user is not found", async () => {
      loadUserRepository.loadUser.mockResolvedValueOnce(null);
      const result = await sut.auth("any@mail.com", "any_password");
      expect(result).toBeNull();
    });
    it("should return null if user has no _id", async () => {
      loadUserRepository.loadUser.mockResolvedValueOnce({ password: "hash" });
      const result = await sut.auth("any@mail.com", "any_password");
      expect(result).toBeNull();
    });
    it("should return null if user has no password", async () => {
      loadUserRepository.loadUser.mockResolvedValueOnce({ _id: "id" });
      const result = await sut.auth("any@mail.com", "any_password");
      expect(result).toBeNull();
    });
    it("should call hashComparer with correct values", async () => {
      await sut.auth("any@mail.com", "any_password");
      expect(hashComparer.compare).toHaveBeenCalledWith("any_password", "hashed_password");
    });
    it("should return null if password is invalid", async () => {
      hashComparer.compare.mockResolvedValueOnce(false);
      const result = await sut.auth("any@mail.com", "wrong_password");
      expect(result).toBeNull();
    });
    it("should return accessToken and refreshToken on success", async () => {
      const result = await sut.auth("any@mail.com", "any_password");
      expect(result).toEqual({
        accessToken: "any_access_token",
        refreshToken: "any_refresh_token",
      });
    });
    it("should call tokenGenerator with user id", async () => {
      await sut.auth("any@mail.com", "any_password");
      expect(tokenGenerator.generate).toHaveBeenCalledWith("any_id");
    });
    it("should call refreshTokenGenerator with user id", async () => {
      await sut.auth("any@mail.com", "any_password");
      expect(refreshTokenGenerator.generate).toHaveBeenCalledWith("any_id");
    });
    it("should handle null from authRefreshToken gracefully", async () => {
      tokenGenerator.generate.mockResolvedValueOnce(null);
      refreshTokenGenerator.generate.mockResolvedValueOnce(null);
      const result = await sut.auth("any@mail.com", "any_password");
      expect(result).toEqual({ accessToken: null, refreshToken: null });
    });
  });

  describe("authRefreshToken", () => {
    it("should return accessToken and refreshToken", async () => {
      const result = await sut.authRefreshToken("any_id");
      expect(result).toEqual({
        accessToken: "any_access_token",
        refreshToken: "any_refresh_token",
      });
    });
    it("should call tokenGenerator with userId", async () => {
      await sut.authRefreshToken("user_id");
      expect(tokenGenerator.generate).toHaveBeenCalledWith("user_id");
    });
    it("should call refreshTokenGenerator with userId", async () => {
      await sut.authRefreshToken("user_id");
      expect(refreshTokenGenerator.generate).toHaveBeenCalledWith("user_id");
    });
  });
});
