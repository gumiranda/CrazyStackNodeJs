import { parseJSON } from "@/application/helpers/utils/parseJSON";
import { makeCompleteOwnerFactory } from "@/slices/user/useCases";
export const newOwnerConsumer = {
  topic: "newOwner",
  callback: async (message: string) => {
    console.log("newOwnerConsumer");
    const parsedMessage = parseJSON(message);
    if (!parsedMessage) {
      return;
    }
    const { userCreated } = parsedMessage || {};
    const completeOwnerFunction = makeCompleteOwnerFactory();
    const result = await completeOwnerFunction(userCreated);
    console.log({ userCreated, result });
  },
};
