jest.mock("@/application/decorators/logControllerFactory", () => ({
  makeLogController: jest.fn().mockImplementation((_domain, controller) => controller),
}));
jest.mock("@/application/infra", () => ({
  makeDatabaseInstance: jest.fn().mockReturnValue({
    add: jest.fn(),
    getOne: jest.fn(),
    update: jest.fn(),
    getPaginate: jest.fn(),
    getCount: jest.fn(),
    deleteOne: jest.fn(),
    aggregate: jest.fn(),
    increment: jest.fn(),
  }),
  env: {
    jwtSecret: "secret",
    jwtRefreshSecret: "secret",
    uploadProvider: "cloudflare_r2",
  },
  BcryptAdapter: jest
    .fn()
    .mockImplementation(() => ({ compare: jest.fn(), encrypt: jest.fn() })),
  JwtAdapter: jest
    .fn()
    .mockImplementation(() => ({ generate: jest.fn(), decrypt: jest.fn() })),
}));
jest.mock("@/application/infra/config/whiteLabel", () => ({
  whiteLabel: {
    database: "mongodb",
    systemName: "Test",
    categories: [
      {
        name: "Cat",
        description: "D",
        services: [
          {
            name: "S",
            description: "D",
            price: 50,
            comission: 50,
            duration: 30,
          },
        ],
      },
    ],
  },
}));

import { makeAddAppointmentController } from "./controllers/addAppointment/addAppointmentControllerFactory";
import { makeDeleteAppointmentController } from "./controllers/deleteAppointment/deleteAppointmentControllerFactory";
import { makeLoadAppointmentController } from "./controllers/loadAppointment/loadAppointmentControllerFactory";
import { makeLoadAppointmentByPageController } from "./controllers/loadAppointmentByPage/loadAppointmentByPageControllerFactory";
import { makeLoadAvailableTimesController } from "./controllers/loadAvailableTimes/loadAvailableTimesControllerFactory";
import { makeLoadInvoiceController } from "./controllers/loadInvoice/loadInvoiceControllerFactory";
import { makeUpdateAppointmentController } from "./controllers/updateAppointment/updateAppointmentControllerFactory";
import { makeAddAppointmentFactory } from "./useCases/addAppointment/AddAppointmentFactory";
import { makeDeleteAppointmentFactory } from "./useCases/deleteAppointment/DeleteAppointmentFactory";
import { makeLoadAppointmentFactory } from "./useCases/loadAppointment/LoadAppointmentFactory";
import { makeLoadAppointmentByPageFactory } from "./useCases/loadAppointmentByPage/LoadAppointmentByPageFactory";
import { makeLoadAvailableTimesFactory } from "./useCases/loadAvailableTimes/LoadAvailableTimesFactory";
import { makeLoadInvoiceFactory } from "./useCases/loadInvoice/LoadInvoiceFactory";
import { makeUpdateAppointmentFactory } from "./useCases/updateAppointment/UpdateAppointmentFactory";
import { makeValidateAvailableTimesFactory } from "./useCases/validateAvailableTimes/validateAvailableTimesFactory";

describe("makeAddAppointmentController", () => {
  it("should return a valid instance", () => {
    const result = makeAddAppointmentController();
    expect(result).toBeDefined();
  });
});
describe("makeDeleteAppointmentController", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteAppointmentController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadAppointmentController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadAppointmentController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadAppointmentByPageController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadAppointmentByPageController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadAvailableTimesController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadAvailableTimesController();
    expect(result).toBeDefined();
  });
});
describe("makeLoadInvoiceController", () => {
  it("should return a valid instance", () => {
    const result = makeLoadInvoiceController();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateAppointmentController", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateAppointmentController();
    expect(result).toBeDefined();
  });
});
describe("makeAddAppointmentFactory", () => {
  it("should return a valid instance", () => {
    const result = makeAddAppointmentFactory();
    expect(result).toBeDefined();
  });
});
describe("makeDeleteAppointmentFactory", () => {
  it("should return a valid instance", () => {
    const result = makeDeleteAppointmentFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadAppointmentFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadAppointmentFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadAppointmentByPageFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadAppointmentByPageFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadAvailableTimesFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadAvailableTimesFactory();
    expect(result).toBeDefined();
  });
});
describe("makeLoadInvoiceFactory", () => {
  it("should return a valid instance", () => {
    const result = makeLoadInvoiceFactory();
    expect(result).toBeDefined();
  });
});
describe("makeUpdateAppointmentFactory", () => {
  it("should return a valid instance", () => {
    const result = makeUpdateAppointmentFactory();
    expect(result).toBeDefined();
  });
});
describe("makeValidateAvailableTimesFactory", () => {
  it("should return a valid instance", () => {
    const result = makeValidateAvailableTimesFactory();
    expect(result).toBeDefined();
  });
});
