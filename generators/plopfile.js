module.exports = function (plop) {
    plop.setGenerator("entities", {
        description: "Create a new entity",
        prompts: [
            { type: "input", name: "name", message: "What is the name of the entity?" },
        ],
        actions: [...entitiesCreations],
    });
};

const entitiesCreations = [
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/entities/{{camelCase name}}Entity.ts",
        templateFile: "./templates/entities/DomainEntity.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/entities/{{camelCase name}}Entity.spec.ts",
        templateFile: "./templates/entities/DomainEntity.spec.ts.hbs",
    },
    {
        type: "add",
        path: "../src/slices/{{camelCase name}}/entities/index.ts",
        templateFile: "./templates/entities/index.ts.hbs",
    },
];
