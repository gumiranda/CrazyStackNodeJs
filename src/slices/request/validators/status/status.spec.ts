import MockDate from "mockdate";
import { statusIsValid } from "./status";
import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";
import { addMinutes, subMinutes } from "@/application/helpers/dateFns";

describe("Testing status validators", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should return false if i pass null as parameter", () => {
    expect(statusIsValid(null as any)).toBe(false);
  });
  it(
    "should return true when status === 0" +
      "and newStatus === 4, initDate > new Date() (appointment wasn`t happened)",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: new Date(2099, 10, 10, 10).toISOString(),
            status: 0,
          },
          newStatus: 4,
        })
      ).toBe(true);
    }
  );
  it(
    "should return false when status !== 0" +
      "and newStatus === 4, initDate > new Date() (appointment wasn`t happened)",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: new Date(2099, 10, 10, 10).toISOString(),
            status: 3,
          },
          newStatus: 4,
        })
      ).toBe(false);
    }
  );
  it(
    "should return false when status === 0" +
      "and newStatus === 1, initDate < new Date() (appointment was happened)",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: new Date(1999, 10, 10, 10).toISOString(),
            status: 0,
          },
          newStatus: 1,
        })
      ).toBe(false);
    }
  );
  it(
    "should return false when status === 1" +
      "and newStatus === 9, initDate > new Date() (appointment wasn`t happened)",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: new Date(2099, 10, 10, 10).toISOString(),
            status: 1,
          },
          newStatus: 9,
        })
      ).toBe(false);
    }
  );
  it(
    "should return true when status === 0" +
      "and newStatus === 1, initDate > new Date() (appointment wasn`t happened)",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: new Date(2099, 10, 10, 10).toISOString(),
            status: 0,
          },
          newStatus: 1,
        })
      ).toBe(true);
    }
  );
  it(
    "should return true when status === 0" +
      "and newStatus === 2||===3, initDate > new Date() (appointment wasn`t happened) in valid period",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: new Date(2099, 10, 10, 10).toISOString(),
            status: 0,
          },
          newStatus: 2,
        })
      ).toBe(true);
    }
  );
  it(
    "should return false when status === 0" +
      "and newStatus === 2||===3, initDate > new Date() (appointment wasn`t happened) because the period was expired",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: addMinutes(new Date(), 10),
            status: 0,
          },
          newStatus: 2,
        })
      ).toBe(false);
    }
  );
  it(
    "should return true when (status === 0||1,2,3,4,7)" +
      "and newStatus === 5, initDate > new Date() (appointment wasn`t happened) in valid period",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: new Date(2099, 10, 10, 10).toISOString(),
            status: 0,
          },
          newStatus: 5,
        })
      ).toBe(true);
    }
  );
  it(
    "should return false when (status === 0||1,2,3,4,7)" +
      "and newStatus === 5, initDate > new Date() (appointment wasn`t happened) because the period was expired",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: addMinutes(new Date(), 10),
            status: 0,
          },
          newStatus: 5,
        })
      ).toBe(false);
    }
  );
  it(
    "should return true when (status === 5||6)" +
      "and newStatus === 7||8, initDate > new Date() (appointment wasn`t happened)",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: new Date(2099, 10, 10, 10).toISOString(),
            status: 5,
          },
          newStatus: 7,
        })
      ).toBe(true);
    }
  );
  it(
    "should return true when (status === 1||7)" +
      "and newStatus === 9, initDate > new Date() (appointment wasn`t happened) in valid period",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: subMinutes(new Date(), 4000).toISOString(),
            status: 1,
          },
          newStatus: 9,
        })
      ).toBe(true);
    }
  );
  it(
    "should return false when (status === 1||7" +
      "and newStatus === 9, initDate > new Date() (appointment wasn`t happened) because the period was expired",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: subMinutes(new Date(), 7000).toISOString(),
            status: 7,
          },
          newStatus: 9,
        })
      ).toBe(false);
    }
  );
  it(
    "should return true when (status === 1||7||9)" +
      "and newStatus === 10, initDate > new Date() (appointment wasn`t happened)",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: subMinutes(new Date(), 4000).toISOString(),
            status: 1,
          },
          newStatus: 10,
        })
      ).toBe(true);
    }
  );
  it(
    "should return true when (status === 10)" +
      "and newStatus === 11, initDate > new Date() (appointment wasn`t happened) in valid period",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: subMinutes(new Date(), 4000).toISOString(),
            status: 10,
          },
          newStatus: 11,
        })
      ).toBe(true);
    }
  );
  it(
    "should return false when (status === 10" +
      "and newStatus === 11, initDate > new Date() (appointment wasn`t happened) because the period was expired",
    () => {
      expect(
        statusIsValid({
          currentRequest: {
            ...fakeRequestEntity,
            initDate: subMinutes(new Date(), 7000).toISOString(),
            status: 10,
          },
          newStatus: 11,
        })
      ).toBe(false);
    }
  );
});
const statusTypes = [
  "status 0 é solicitado",
  "status 1 é confirmado",
  "status 2 é cancelado pelo owner",
  "status 3 é cancelado pelo client",
  "status 4 é reagendamento pendente devido a conflito de agenda",
  "status 5 é reagendamento solicitado pelo owner",
  "status 6 é reagendamento solicitado pelo client",
  "status 7 é reagendamento confirmado ou pelo owner ou pelo client",
  "status 8 é reagendamento negado ou pelo owner ou pelo client",
  "status 9 é quando o cliente avalia",
  "status 10 é quando o owner efetiva o pedido, nesse momento é criado um registro em order",
  "status 11 é quando o cliente avalia pedido já efetivado",
];
const rules = [
  "status só pode ser 0 se for passado no addRequest, no update não pode",
  //  "status só pode ser 1 se status anterior for 0 e se o agendamento tiver data de início no futuro",
  "status só pode ser 2 se status anterior for 0 e se o agendamento tiver data de início no futuro e esse futuro for maior que 50 min",
  "status só pode ser 3 se status anterior for 0 e se o agendamento tiver data de início no futuro e esse futuro for maior minimumTimeForReSchedule do owner",
  // "status só pode ser 4 se status anterior for 0",
  "status só pode ser 5 se status anterior for 0,4,3",
  "status só pode ser 5 se status anterior for 1,7,2 e a data de inicio for maior que ao menos 50min da data presente",
  "status só pode ser 6 se status anterior for 0, 4, ou 2",
  "status só pode ser 6 se status anterior for 1,7,3 e a data de inicio for maior que ao menos minimumTimeForReSchedule do owner contando a data presente",
  "status só pode ser 7 se status anterior for 5 ou 6 e se o agendamento tiver data de início no futuro e esse futuro for maior que 50 min",
  "status só pode ser 8 se status anterior for 5 ou 6 e se o agendamento tiver data de início no futuro e esse futuro for maior que 50 min",
  "status só pode ser 9 se status anterior for 1, 7 e se o agendamento tiver data de início no passado e esse passado tiver distancia minima de 3 dias",
  "status só pode ser 10 se status anterior for 1, 7 ou 9 e se o agendamento tiver data de início no passado",
  "status só pode ser 11 se status anterior for 10 e se o agendamento tiver data de início no passado e esse passado tiver distancia minima de 3 dias",
];
