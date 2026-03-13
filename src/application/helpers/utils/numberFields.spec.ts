import {
  numberFields,
  numberFieldsWithOperatorsGt,
  numberFieldsWithOperatorsGte,
  numberFieldsWithOperatorsLt,
  numberFieldsWithOperatorsLte,
  numberFieldsWithOperatorsne,
  numberFieldsWithOperations,
  numberFieldsWithOperationsSet,
  booleanFields,
} from "./numberFields";

describe("numberFields", () => {
  test("should export numberFields as an array of expected field names", () => {
    expect(Array.isArray(numberFields)).toBe(true);
    expect(numberFields).toContain("price");
    expect(numberFields).toContain("finalPrice");
    expect(numberFields).toContain("comission");
    expect(numberFields).toContain("duration");
    expect(numberFields).toContain("promotionalPrice");
    expect(numberFields).toContain("productsQuantityNeeded");
    expect(numberFields).toContain("appointmentsTotal");
    expect(numberFields).toContain("status");
    expect(numberFields).toContain("minimumTimeForReSchedule");
    expect(numberFields).toHaveLength(9);
  });

  test("should generate operator arrays with correct suffixes", () => {
    for (const field of numberFields) {
      expect(numberFieldsWithOperatorsGt).toContain(field + "operatorgt");
      expect(numberFieldsWithOperatorsGte).toContain(field + "operatorgte");
      expect(numberFieldsWithOperatorsLt).toContain(field + "operatorlt");
      expect(numberFieldsWithOperatorsLte).toContain(field + "operatorlte");
      expect(numberFieldsWithOperatorsne).toContain(field + "operatorne");
    }
  });

  test("each operator array should have the same length as numberFields", () => {
    expect(numberFieldsWithOperatorsGt).toHaveLength(numberFields.length);
    expect(numberFieldsWithOperatorsGte).toHaveLength(numberFields.length);
    expect(numberFieldsWithOperatorsLt).toHaveLength(numberFields.length);
    expect(numberFieldsWithOperatorsLte).toHaveLength(numberFields.length);
    expect(numberFieldsWithOperatorsne).toHaveLength(numberFields.length);
  });

  test("numberFieldsWithOperations should contain all operator variations", () => {
    expect(numberFieldsWithOperations).toHaveLength(numberFields.length * 5);
    expect(numberFieldsWithOperations).toEqual(
      expect.arrayContaining([
        ...numberFieldsWithOperatorsGt,
        ...numberFieldsWithOperatorsGte,
        ...numberFieldsWithOperatorsLt,
        ...numberFieldsWithOperatorsLte,
        ...numberFieldsWithOperatorsne,
      ])
    );
  });

  test("numberFieldsWithOperationsSet should be a Set with all operations", () => {
    expect(numberFieldsWithOperationsSet).toBeInstanceOf(Set);
    expect(numberFieldsWithOperationsSet.size).toBe(numberFieldsWithOperations.length);
    for (const op of numberFieldsWithOperations) {
      expect(numberFieldsWithOperationsSet.has(op)).toBe(true);
    }
  });

  test("should export booleanFields with expected field names", () => {
    expect(Array.isArray(booleanFields)).toBe(true);
    expect(booleanFields).toContain("active");
    expect(booleanFields).toContain("read");
    expect(booleanFields).toContain("push");
    expect(booleanFields).toContain("cash");
    expect(booleanFields).toContain("cancelled");
    expect(booleanFields).toContain("canPayWithFidelityPoints");
    expect(booleanFields).toContain("hasFidelityGenerator");
    expect(booleanFields).toContain("havePromotionalPrice");
    expect(booleanFields).toContain("haveDelivery");
    expect(booleanFields).toContain("haveRecurrence");
    expect(booleanFields).toContain("haveFidelity");
    expect(booleanFields).toContain("haveRide");
    expect(booleanFields).toContain("creditcard");
    expect(booleanFields).toContain("debitcard");
    expect(booleanFields).toContain("transferbank");
    expect(booleanFields).toContain("cheque");
    expect(booleanFields).toContain("pix");
    expect(booleanFields).toContain("face");
    expect(booleanFields).toHaveLength(18);
  });
});
