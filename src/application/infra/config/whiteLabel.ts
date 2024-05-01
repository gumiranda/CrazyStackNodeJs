export const whiteLabel = {
  valueMonth: "2990",
  paymentDaysDue: 30,
  gatewayPix: "woovi",
  gatewayCreditCard: "pagarme",
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
    // {
    //   name: "Saúde",
    //   description: "Clínicas, consultórios, hospitais, etc.",
    //   services: [
    //     {
    //       name: "Consulta",
    //       description: "Consulta",
    //       price: 50,
    //       comission: 50,
    //       duration: 30,
    //     },
    //     {
    //       name: "Exame",
    //       description: "Exame",
    //       price: 50,
    //       comission: 50,
    //       duration: 30,
    //     },
    //     {
    //       name: "Cirurgia",
    //       description: "Cirurgia",
    //       price: 50,
    //       comission: 50,
    //       duration: 30,
    //     },
    //   ],
    // },
    // {
    //   name: "Educação",
    //   description: "Escolas, cursos, aulas particulares, etc.",
    //   services: [
    //     {
    //       name: "Aula particular",
    //       description: "Aula particular",
    //       price: 50,
    //       comission: 50,
    //       duration: 30,
    //     },
    //     {
    //       name: "Curso",
    //       description: "Curso",
    //       price: 50,
    //       comission: 50,
    //       duration: 30,
    //     },
    //     {
    //       name: "Escola",
    //       description: "Escola",
    //       price: 50,
    //       comission: 50,
    //       duration: 30,
    //     },
    //   ],
    // },
    // {
    //   name: "Serviços Gerais",
    //   description: "Encanador, eletricista, pedreiro, etc.",
    //   services: [
    //     {
    //       name: "Encanador",
    //       description: "Encanador",
    //       price: 50,
    //       comission: 50,
    //       duration: 30,
    //     },
    //     {
    //       name: "Eletricista",
    //       description: "Eletricista",
    //       price: 50,
    //       comission: 50,
    //       duration: 30,
    //     },
    //     {
    //       name: "Pedreiro",
    //       description: "Pedreiro",
    //       price: 50,
    //       comission: 50,
    //       duration: 30,
    //     },
    //   ],
    // },
  ],
} as const;
export type WhiteLabelProps = keyof typeof whiteLabel;
