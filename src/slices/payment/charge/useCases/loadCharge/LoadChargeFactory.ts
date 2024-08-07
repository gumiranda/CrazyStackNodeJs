import { MongoRepository } from "@/application/infra";
import { makeWooviAdapter } from "@/application/infra/payment/WooviAdapter";
import { ChargeRepository } from "@/slices/payment/charge/repositories";
import {
  loadCharge,
  LoadCharge,
  makeUpdateChargeFactory,
} from "@/slices/payment/charge/useCases";

export const makeLoadChargeFactory = (): LoadCharge => {
  const repository = new ChargeRepository(new MongoRepository("charge"));
  return loadCharge(repository, makeWooviAdapter(), makeUpdateChargeFactory());
};
