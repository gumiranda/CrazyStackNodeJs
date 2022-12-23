export const numberFields = [
  "price",
  "finalPrice",
  "comission",
  "duration",
  "promotionalPrice",
  "productsQuantityNeeded",
  "appointmentsTotal",
  "status",
  "minimumTimeForReSchedule",
];

export const numberFieldsWithOperatorsGt = numberFields.map(
  (field) => field + "operatorgt"
);
export const numberFieldsWithOperatorsGte = numberFields.map(
  (field) => field + "operatorgte"
);
export const numberFieldsWithOperatorsLt = numberFields.map(
  (field) => field + "operatorlt"
);
export const numberFieldsWithOperatorsLte = numberFields.map(
  (field) => field + "operatorlte"
);
export const numberFieldsWithOperatorsne = numberFields.map(
  (field) => field + "operatorne"
);
export const numberFieldsWithOperations = [
  ...numberFieldsWithOperatorsGt,
  ...numberFieldsWithOperatorsGte,
  ...numberFieldsWithOperatorsLte,
  ...numberFieldsWithOperatorsLt,
  ...numberFieldsWithOperatorsne,
];
export const booleanFields = [
  "canPayWithFidelityPoints",
  "hasFidelityGenerator",
  "havePromotionalPrice",
  "haveDelivery",
  "haveRecurrence",
  "haveFidelity",
  "haveRide",
  "cash",
  "creditcard",
  "debitcard",
  "transferbank",
  "cheque",
  "pix",
  "face",
  "active",
  "read",
  "cancelled",
  "push",
];
