import { MissingParamError } from "@/application/errors";

export const daysValidator = ({ errors, body }: any) => {
  if (body?.days1 && body?.days2) {
    const { days1, days2 } = body;
    let days3 = {
      monday3: false,
      sunday3: false,
      thursday3: false,
      wednesday3: false,
      tuesday3: false,
      friday3: false,
      saturday3: false,
    };
    if (body?.days3) {
      days3 = body?.days3;
    }
    const arrDays1 = Object.values(days1);
    const arrDays2 = Object.values(days2);
    const arrDays3 = Object.values(days3);
    for (let i = 0; i < arrDays1.length; i++) {
      if (
        (arrDays1[i] === true && (arrDays2[i] === true || arrDays3[i] === true)) ||
        (arrDays2[i] === true && arrDays3[i] === true)
      ) {
        errors.push(new MissingParamError("days1"));
      }
    }
  }
};
