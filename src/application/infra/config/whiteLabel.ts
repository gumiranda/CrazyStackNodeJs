import { Database } from "../database";

export const whiteLabel = {
  database: (process.env.DATABASE ?? "mongodb") as Database,
  systemName: "Belezix",
  categories: [
    {
      name: "Beleza e Estética",
      description: "Corte de cabelo, manicure, pedicure, depilação, etc.",
      services: [
        {
          name: "Corte de cabelo",
          description: "Corte de cabelo",
          price: 50,
          comission: 50,
          duration: 30,
        },
        {
          name: "Manicure",
          description: "Manicure",
          price: 50,
          comission: 50,
          duration: 30,
        },
        {
          name: "Pedicure",
          description: "Pedicure",
          price: 50,
          comission: 50,
          duration: 30,
        },
        {
          name: "Depilação",
          description: "Depilação",
          price: 50,
          comission: 50,
          duration: 30,
        },
      ],
    },
  ],
} as const;
export type WhiteLabelProps = keyof typeof whiteLabel;
