export const webHookBody = {
  type: "object",
  properties: {
    _id: { type: "string", nullable: true },
    name: { type: "string", nullable: true },
    active: { type: "boolean", nullable: true },
    createdById: { type: "string", nullable: true },
    createdAt: { type: "string", nullable: true },
    event: { type: "string" },
    charge: {
      type: "object",
      properties: {
        customer: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            correlationID: { type: "string" },
            taxID: {
              type: "object",
              properties: {
                taxID: { type: "string" },
                type: { type: "string" },
              },
              required: ["taxID", "type"],
            },
          },
          required: ["name", "email", "phone", "correlationID", "taxID"],
        },
        value: { type: "number" },
        comment: { type: "string" },
        identifier: { type: "string" },
        correlationID: { type: "string" },
        paymentLinkID: { type: "string" },
        transactionID: { type: "string" },
        status: { type: "string" },
        additionalInfo: {},
        discount: { type: "number" },
        valueWithDiscount: { type: "number" },
        expiresDate: { type: "string", format: "date-time" },
        type: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        paidAt: { type: "string", format: "date-time" },
        payer: {
          type: "object",
          properties: {},
          required: [],
        },
        brCode: { type: "string" },
        expiresIn: { type: "number" },
        pixKey: { type: "string" },
        paymentLinkUrl: { type: "string" },
        qrCodeImage: { type: "string" },
        globalID: { type: "string" },
      },
      required: ["customer"],
    },
    pix: {
      type: "object",
      properties: {},
      required: [],
    },
    company: {
      type: "object",
      properties: {},
      required: [],
    },
    account: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  required: [],
};
const headersJsonSchema = {
  type: "object",
  properties: {
    "x-openpix-authorization": { type: "string" },
    "x-openpix-signature": { type: "string" },
    "x-webhook-signature": { type: "string" },
  },
  required: ["x-openpix-authorization", "x-openpix-signature", "x-webhook-signature"],
};
export const wooviWebhook = {
  body: webHookBody,
  headers: headersJsonSchema,
};
