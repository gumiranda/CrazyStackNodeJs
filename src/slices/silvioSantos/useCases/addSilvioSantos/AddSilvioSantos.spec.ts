import { fakeSilvioSantosEntity } from "@/slices/silvioSantos/entities/SilvioSantosEntity.spec";
import { SilvioSantosEntity } from "@/slices/silvioSantos/entities";
import { AddSilvioSantosRepository } from "@/slices/silvioSantos/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addSilvioSantos } from "./AddSilvioSantos";

describe("addSilvioSantos", () => {
    let testInstance: any;
    let addSilvioSantosRepository: MockProxy<AddSilvioSantosRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addSilvioSantosRepository = mock();
        addSilvioSantosRepository.addSilvioSantos.mockResolvedValue(
            fakeSilvioSantosEntity
        );
    });
    beforeEach(() => {
        testInstance = addSilvioSantos(addSilvioSantosRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addSilvioSantos of AddSilvioSantosRepository with correct values", async () => {
        await testInstance(fakeSilvioSantosEntity);
        expect(addSilvioSantosRepository.addSilvioSantos).toHaveBeenCalledWith(
            new SilvioSantosEntity(fakeSilvioSantosEntity)
        );
        expect(addSilvioSantosRepository.addSilvioSantos).toHaveBeenCalledTimes(1);
    });
    it("should return a new silvioSantos created when addSilvioSantosRepository insert it", async () => {
        const silvioSantos = await testInstance(fakeSilvioSantosEntity);
        expect(silvioSantos).toEqual(fakeSilvioSantosEntity);
    });
    it("should return null a new silvioSantos created when addSilvioSantosRepository insert it", async () => {
        addSilvioSantosRepository.addSilvioSantos.mockResolvedValue(null);
        const silvioSantos = await testInstance(fakeSilvioSantosEntity);
        expect(silvioSantos).toBeNull();
    });
    it("should rethrow if addSilvioSantos of AddSilvioSantosRepository throws", async () => {
        addSilvioSantosRepository.addSilvioSantos.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeSilvioSantosEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
