module.exports = function (plop) {
    plop.setGenerator("entities", {
        description: "Create a new entity",
        prompts: [
            { type: "input", name: "name", message: "What is the name of the entity?" },
        ],
        actions: [...entitiesCreations],
    });
    plop.setGenerator("useCases", {
        description: "Create a new useCase",
        prompts: [
            { type: "input", name: "name", message: "What is the name of the useCase?" },
        ],
        actions: [...useCasesCreations],
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
    plop.setGenerator("all", {
        description: "Create a new domain",
        prompts: [
            { type: "input", name: "name", message: "What is the name of the domain?" },
        ],
        actions: [...entitiesCreations, ...useCasesCreations, ...repositoryCreations],
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
        templateFile:
            "./templates/repositories/contracts/loadDomainByPageRepository.ts.hbs",
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
