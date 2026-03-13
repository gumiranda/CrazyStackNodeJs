import { whiteLabel } from "./whiteLabel";

describe("whiteLabel config", () => {
  test("should export whiteLabel with database property", () => {
    expect(whiteLabel).toHaveProperty("database");
    expect(["mongodb", "postgres"]).toContain(whiteLabel.database);
  });

  test("should have systemName as Belezix", () => {
    expect(whiteLabel.systemName).toBe("Belezix");
  });

  test("should have categories array with at least one category", () => {
    expect(Array.isArray(whiteLabel.categories)).toBe(true);
    expect(whiteLabel.categories.length).toBeGreaterThanOrEqual(1);
  });

  test("first category should be Beleza e Estética with services", () => {
    const category = whiteLabel.categories[0];
    expect(category.name).toBe("Beleza e Estética");
    expect(Array.isArray(category.services)).toBe(true);
    expect(category.services.length).toBe(4);
  });

  test("each service should have name, description, price, comission, duration", () => {
    const services = whiteLabel.categories[0].services;
    for (const service of services) {
      expect(service).toHaveProperty("name");
      expect(service).toHaveProperty("description");
      expect(service).toHaveProperty("price");
      expect(service).toHaveProperty("comission");
      expect(service).toHaveProperty("duration");
      expect(typeof service.price).toBe("number");
      expect(typeof service.comission).toBe("number");
      expect(typeof service.duration).toBe("number");
    }
  });
});
