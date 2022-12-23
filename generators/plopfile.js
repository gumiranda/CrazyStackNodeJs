/* eslint-disable quotes */
module.exports = function (plop) {
  plop.setGenerator("entities", {
    description: "Create a new entity",
    prompts: [{ type: "input", name: "name", message: "What is the name of the entity?" }],
    actions: [...entitiesCreations],
  });
  plop.setGenerator("useCases", {
    description: "Create a new useCase",
    prompts: [
      { type: "input", name: "name", message: "What is the name of the useCase?" },
    ],
    actions: [...useCasesCreations],
  });
  plop.setGenerator("routes", {
    description: "Create a new route",
    prompts: [{ type: "input", name: "name", message: "What is the name of the route?" }],
    actions: [...routesCreations],
  });
  plop.setGenerator("repositories", {
    description: "Create a new repository",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the repository?",
      },
    ],
    actions: [...repositoryCreations],
  });
  plop.setGenerator("controllers", {
    description: "Create a new controller",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the controller?",
      },
    ],
    actions: [...controllersCreations],
  });
  plop.setGenerator("usecasesfactories", {
    description: "Create a new use case factory",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the use case factory?",
      },
    ],
    actions: [...useCasesFactoriesCreations],
  });
  plop.setGenerator("all", {
    description: "Create a new domain",
    prompts: [{ type: "input", name: "name", message: "What is the name of the domain?" }],
    actions: [
      ...entitiesCreations,
      ...useCasesCreations,
      ...repositoryCreations,
      ...useCasesFactoriesCreations,
      ...controllersCreations,
      ...routesCreations,
    ],
  });
  plop.setGenerator("test", {
    description: "Create a new test",
    prompts: [
      { type: "input", name: "name", message: "What is the name of the file?" },
      { type: "input", name: "entity", message: "What is the name of the entity?" },
      { type: "input", name: "layer", message: "What is the name of the layer?" },
    ],
    actions: [
      {
        type: "add",
        path: "../src/slices/{{camelCase entity}}/{{camelCase layer}}/{{pascalCase name}}.spec.ts",
        templateFile: "./templates/test.spec.ts.hbs",
      },
    ],
  });
};
const useCasesCreations = [
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/repositories/contracts/index.ts",
    templateFile: "./templates/repositories/contracts/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/repositories/contracts/Add{{pascalCase name}}Repository.ts",
    templateFile: "./templates/repositories/contracts/addDomainRepository.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/repositories/contracts/Delete{{pascalCase name}}Repository.ts",
    templateFile: "./templates/repositories/contracts/DeleteDomainRepository.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/repositories/contracts/Update{{pascalCase name}}Repository.ts",
    templateFile: "./templates/repositories/contracts/UpdateDomainRepository.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/repositories/contracts/Load{{pascalCase name}}ByPageRepository.ts",
    templateFile: "./templates/repositories/contracts/loadDomainByPageRepository.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/repositories/contracts/Load{{pascalCase name}}Repository.ts",
    templateFile: "./templates/repositories/contracts/loadDomainRepository.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/add{{pascalCase name}}/Add{{pascalCase name}}.ts",
    templateFile: "./templates/useCases/addDomain/AddDomain.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/add{{pascalCase name}}/Add{{pascalCase name}}.spec.ts",
    templateFile: "./templates/useCases/addDomain/AddDomain.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/add{{pascalCase name}}/index.ts",
    templateFile: "./templates/useCases/addDomain/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/repositories/index.ts",
    templateFile: "./templates/repositories/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}/Load{{pascalCase name}}.ts",
    templateFile: "./templates/useCases/loadDomain/LoadDomain.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}/Load{{pascalCase name}}.spec.ts",
    templateFile: "./templates/useCases/loadDomain/LoadDomain.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}/index.ts",
    templateFile: "./templates/useCases/loadDomain/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}ByPage/Load{{pascalCase name}}ByPage.ts",
    templateFile: "./templates/useCases/loadDomainByPage/LoadDomainByPage.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}ByPage/Load{{pascalCase name}}ByPage.spec.ts",
    templateFile: "./templates/useCases/loadDomainByPage/LoadDomainByPage.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}ByPage/index.ts",
    templateFile: "./templates/useCases/loadDomainByPage/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/delete{{pascalCase name}}/Delete{{pascalCase name}}.ts",
    templateFile: "./templates/useCases/deleteDomain/DeleteDomain.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/delete{{pascalCase name}}/Delete{{pascalCase name}}.spec.ts",
    templateFile: "./templates/useCases/deleteDomain/DeleteDomain.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/delete{{pascalCase name}}/index.ts",
    templateFile: "./templates/useCases/deleteDomain/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/update{{pascalCase name}}/Update{{pascalCase name}}.ts",
    templateFile: "./templates/useCases/updateDomain/UpdateDomain.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/update{{pascalCase name}}/Update{{pascalCase name}}.spec.ts",
    templateFile: "./templates/useCases/updateDomain/UpdateDomain.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/update{{pascalCase name}}/index.ts",
    templateFile: "./templates/useCases/updateDomain/index.ts.hbs",
  },
];
const entitiesCreations = [
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/entities/{{pascalCase name}}Entity.ts",
    templateFile: "./templates/entities/DomainEntity.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/entities/{{pascalCase name}}Entity.spec.ts",
    templateFile: "./templates/entities/DomainEntity.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/entities/index.ts",
    templateFile: "./templates/entities/index.ts.hbs",
  },
];
const repositoryCreations = [
  {
    type: "modify",
    path: "../src/slices/{{camelCase name}}/repositories/index.ts",
    pattern: /(\/\/ IMPORT MODULE FILES)/g,
    template: '$1\nexport * from "./{{camelCase name}}Repository";',
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/repositories/{{camelCase name}}Repository.ts",
    templateFile: "./templates/repositories/domainRepository.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/repositories/{{camelCase name}}Repository.specdb.ts",
    templateFile: "./templates/repositories/domainRepository.specdb.ts.hbs",
  },
];
const useCasesFactoriesCreations = [
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/index.ts",
    templateFile: "./templates/useCases/index.ts.hbs",
  },
  {
    type: "modify",
    path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}ByPage/index.ts",
    pattern: /(\/\/ IMPORT MODULE FILES)/g,
    template: '$1\nexport * from "./Load{{pascalCase name}}ByPageFactory";',
  },
  {
    type: "modify",
    path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}/index.ts",
    pattern: /(\/\/ IMPORT MODULE FILES)/g,
    template: '$1\nexport * from "./Load{{pascalCase name}}Factory";',
  },
  {
    type: "modify",
    path: "../src/slices/{{camelCase name}}/useCases/update{{pascalCase name}}/index.ts",
    pattern: /(\/\/ IMPORT MODULE FILES)/g,
    template: '$1\nexport * from "./Update{{pascalCase name}}Factory";',
  },
  {
    type: "modify",
    path: "../src/slices/{{camelCase name}}/useCases/delete{{pascalCase name}}/index.ts",
    pattern: /(\/\/ IMPORT MODULE FILES)/g,
    template: '$1\nexport * from "./Delete{{pascalCase name}}Factory";',
  },
  {
    type: "modify",
    path: "../src/slices/{{camelCase name}}/useCases/add{{pascalCase name}}/index.ts",
    pattern: /(\/\/ IMPORT MODULE FILES)/g,
    template: '$1\nexport * from "./Add{{pascalCase name}}Factory";',
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}ByPage/Load{{pascalCase name}}ByPageFactory.ts",
    templateFile: "./templates/useCases/loadDomainByPage/LoadDomainByPageFactory.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/update{{pascalCase name}}/Update{{pascalCase name}}Factory.ts",
    templateFile: "./templates/useCases/updateDomain/UpdateDomainFactory.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/add{{pascalCase name}}/Add{{pascalCase name}}Factory.ts",
    templateFile: "./templates/useCases/addDomain/AddDomainFactory.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/delete{{pascalCase name}}/Delete{{pascalCase name}}Factory.ts",
    templateFile: "./templates/useCases/deleteDomain/DeleteDomainFactory.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/useCases/load{{pascalCase name}}/Load{{pascalCase name}}Factory.ts",
    templateFile: "./templates/useCases/loadDomain/LoadDomainFactory.ts.hbs",
  },
];
const controllersCreations = [
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/index.ts",
    templateFile: "./templates/controllers/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/load{{pascalCase name}}ByPage/load{{pascalCase name}}ByPageController.ts",
    templateFile:
      "./templates/controllers/loadDomainByPage/loadDomainByPageController.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/load{{pascalCase name}}ByPage/load{{pascalCase name}}ByPageControllerFactory.ts",
    templateFile:
      "./templates/controllers/loadDomainByPage/loadDomainByPageControllerFactory.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/load{{pascalCase name}}ByPage/load{{pascalCase name}}ByPageController.spec.ts",
    templateFile:
      "./templates/controllers/loadDomainByPage/loadDomainByPageController.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/load{{pascalCase name}}ByPage/index.ts",
    templateFile: "./templates/controllers/loadDomainByPage/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/load{{pascalCase name}}/load{{pascalCase name}}Controller.ts",
    templateFile: "./templates/controllers/loadDomain/loadDomainController.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/load{{pascalCase name}}/load{{pascalCase name}}ControllerFactory.ts",
    templateFile: "./templates/controllers/loadDomain/loadDomainControllerFactory.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/load{{pascalCase name}}/load{{pascalCase name}}Controller.spec.ts",
    templateFile: "./templates/controllers/loadDomain/loadDomainController.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/load{{pascalCase name}}/index.ts",
    templateFile: "./templates/controllers/loadDomain/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/add{{pascalCase name}}/add{{pascalCase name}}Controller.ts",
    templateFile: "./templates/controllers/addDomain/addDomainController.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/add{{pascalCase name}}/add{{pascalCase name}}ControllerFactory.ts",
    templateFile: "./templates/controllers/addDomain/addDomainControllerFactory.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/add{{pascalCase name}}/add{{pascalCase name}}Controller.spec.ts",
    templateFile: "./templates/controllers/addDomain/addDomainController.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/add{{pascalCase name}}/index.ts",
    templateFile: "./templates/controllers/addDomain/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/delete{{pascalCase name}}/delete{{pascalCase name}}Controller.ts",
    templateFile: "./templates/controllers/deleteDomain/deleteDomainController.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/delete{{pascalCase name}}/delete{{pascalCase name}}ControllerFactory.ts",
    templateFile:
      "./templates/controllers/deleteDomain/deleteDomainControllerFactory.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/delete{{pascalCase name}}/delete{{pascalCase name}}Controller.spec.ts",
    templateFile:
      "./templates/controllers/deleteDomain/deleteDomainController.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/delete{{pascalCase name}}/index.ts",
    templateFile: "./templates/controllers/deleteDomain/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/update{{pascalCase name}}/update{{pascalCase name}}Controller.ts",
    templateFile: "./templates/controllers/updateDomain/updateDomainController.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/update{{pascalCase name}}/update{{pascalCase name}}ControllerFactory.ts",
    templateFile:
      "./templates/controllers/updateDomain/updateDomainControllerFactory.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/update{{pascalCase name}}/update{{pascalCase name}}Controller.spec.ts",
    templateFile:
      "./templates/controllers/updateDomain/updateDomainController.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/controllers/update{{pascalCase name}}/index.ts",
    templateFile: "./templates/controllers/updateDomain/index.ts.hbs",
  },
];
const routesCreations = [
  {
    type: "add",
    path: "../src/application/infra/routes/{{camelCase name}}/{{camelCase name}}Adapter.ts",
    templateFile: "templates/routes/domain/domainAdapter.ts.hbs",
  },
  {
    type: "add",
    path: "../src/application/infra/routes/{{camelCase name}}/{{camelCase name}}Schema.ts",
    templateFile: "templates/routes/domain/domainSchema.ts.hbs",
  },
  {
    type: "add",
    path: "../src/application/infra/routes/{{camelCase name}}/index.ts",
    templateFile: "templates/routes/domain/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/application/infra/routes/{{camelCase name}}/{{camelCase name}}Router.ts",
    templateFile: "templates/routes/domain/domainRouter.ts.hbs",
  },
  {
    type: "add",
    path: "../src/application/infra/routes/{{camelCase name}}/{{camelCase name}}Router.test.ts",
    templateFile: "templates/routes/domain/domainRouter.test.ts.hbs",
  },
  {
    type: "modify",
    path: "../src/application/infra/routes/index.ts",
    pattern: /(\/\/ IMPORT MODULE FILES)/g,
    template: '$1\nimport { {{camelCase name}} } from "./{{camelCase name}}";',
  },
  {
    type: "modify",
    path: "../src/application/infra/routes/index.ts",
    pattern: /(\/\/ ADD FUNCTION IMPORTS)/g,
    template: "$1\n{{camelCase name}},",
  },
];
