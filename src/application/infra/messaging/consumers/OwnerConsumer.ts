import { parseJSON } from "@/application/helpers";
import { makeCompleteOwnerFactory, makeLoadUserFactory } from "@/slices/user/useCases";

export const newOwnerConsumer = {
  topic: "newOwner",
  callback: async (message: string) => {
    const parsedMessage = parseJSON(message);
    if (!parsedMessage) {
      return;
    }
    const { userCreated } = parsedMessage || {};
    const { email } = userCreated || {};
    const loadUser = makeLoadUserFactory();
    const user = await loadUser({
      fields: { email },
      options: { projection: { password: 0 } },
    });
    if (!user) {
      return;
    }
    const completeOwner = makeCompleteOwnerFactory();
    const result = await completeOwner({
      email,
      password: user?.password,
      ...userCreated,
    });
    if (result) {
      console.log({ result });
      console.log("processou usuario");
    }
  },
};
