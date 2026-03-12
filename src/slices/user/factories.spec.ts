jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));
jest.mock("@/application/infra", () => {
  const mockRepo = {
    add: jest.fn(), getOne: jest.fn(), update: jest.fn(),
    getPaginate: jest.fn(), getCount: jest.fn(), deleteOne: jest.fn(),
    aggregate: jest.fn(), increment: jest.fn(),
  };
  return {
    makeDatabaseInstance: jest.fn().mockReturnValue(mockRepo),
    env: { jwtSecret: "secret", jwtRefreshSecret: "secret", uploadProvider: "cloudflare_r2" },
    BcryptAdapter: jest.fn().mockImplementation(() => ({ compare: jest.fn(), encrypt: jest.fn() })),
    JwtAdapter: jest.fn().mockImplementation(() => ({ generate: jest.fn(), decrypt: jest.fn() })),
    MongoRepository: jest.fn().mockImplementation(() => mockRepo),
    PostgresRepository: jest.fn().mockImplementation(() => mockRepo),
  };
});
jest.mock("@/application/infra/config/whiteLabel", () => ({
  whiteLabel: { database: "mongodb", systemName: "Test", categories: [{ name: "Cat", description: "D", services: [{ name: "S", description: "D", price: 50, comission: 50, duration: 30 }] }] },
}));

import { makeAddUserController } from "./controllers/addUser/addUserControllerFactory";
import { makeDeleteUserController } from "./controllers/deleteUser/deleteUserControllerFactory";
import { makeLoadUserController } from "./controllers/loadUser/loadUserControllerFactory";
import { makeLoadUserByPageController } from "./controllers/loadUserByPage/loadUserByPageControllerFactory";
import { makeLoadUserByPageGeoNearController } from "./controllers/loadUserByPageGeoNear/loadUserByPageGeoNearControllerFactory";
import { makeLoginController } from "./controllers/login/loginControllerFactory";
import { makeResendVerificationEmailController } from "./controllers/resendVerificationEmail/resendVerificationEmailControllerFactory";
import { makeSignupController } from "./controllers/signup/signupControllerFactory";
import { makeUpdateUserController } from "./controllers/updateUser/updateUserControllerFactory";
import { makeVerifyEmailController } from "./controllers/verifyEmail/verifyEmailControllerFactory";
import { makeAddUserFactory } from "./useCases/addUser/AddUserFactory";
import { makeCompleteOwnerFactory } from "./useCases/completeOwner/CompleteOwnerFactory";
import { makeDeleteUserFactory } from "./useCases/deleteUser/DeleteUserFactory";
import { makeLoadUserFactory } from "./useCases/loadUser/loadUserFactory";
import { makeLoadUserByPageFactory } from "./useCases/loadUserByPage/LoadUserByPageFactory";
import { makeLoadUserByPageGeoNearFactory } from "./useCases/loadUserByPageGeoNear/LoadUserByPageGeoNearFactory";
import { makeLoadUserDetailedFactory } from "./useCases/loadUserDetailed/loadUserDetailedFactory";
import { makeUpdateUserFactory } from "./useCases/updateUser/UpdateUserFactory";

describe("makeAddUserController", () => {
  it("should return a valid instance", () => {
    const result = makeAddUserController();
    expect(result).toBeDefined();
  });
});
describe("makeDeleteUserController", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteUserController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadUserController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadUserController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadUserByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadUserByPageController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadUserByPageGeoNearController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadUserByPageGeoNearController();
    expect(result).toBeDefined();
  });
});
describe("makeLoginController", () => {
  it("should return a valid instance", () => {
    const result = makeLoginController();
    expect(result).toBeDefined();
  });
});
describe("makeResendVerificationEmailController", () => {
  it("should return a valid instance", () => {
    const result = makeResendVerificationEmailController();
    expect(result).toBeDefined();
  });
});
describe("makeSignupController", () => {
  it("should return a valid instance", () => {
    const result = makeSignupController();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateUserController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateUserController();
    expect(result).toBeDefined();
  });
});
describe("makeVerifyEmailController", () => {
  it("should return a valid instance", () => {
    const result = makeVerifyEmailController();
    expect(result).toBeDefined();
  });
});
describe("makeAddUserFactory", () => {
  it("should return a valid instance", () => {
    const result = makeAddUserFactory();
    expect(result).toBeDefined();
  });
});
describe("makeCompleteOwnerFactory", () => {
  it("should return a valid instance", () => {
    const result = makeCompleteOwnerFactory();
    expect(result).toBeDefined();
  });
});
describe("makeDeleteUserFactory", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteUserFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadUserFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadUserFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadUserByPageFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadUserByPageFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadUserByPageGeoNearFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadUserByPageGeoNearFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadUserDetailedFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadUserDetailedFactory();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateUserFactory", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateUserFactory();
    expect(result).toBeDefined();
  });
});
