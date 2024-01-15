import { parseJSON } from "@/application/helpers/utils/parseJSON";
import { makeCompleteOwnerFactory, makeLoadUserFactory } from "@/slices/user/useCases";
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
    const loadUser = makeLoadUserFactory();
    const user = await loadUser({
      fields: { email: userCreated?.email },
      options: { projection: { password: 1 } },
    });
    const result = await completeOwnerFunction({
      ...userCreated,
      password: user?.password,
    });
    console.log("processou usuario");
  },
};
