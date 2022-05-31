import { ObjectId } from "mongodb";

export const mapAnyToMongoObject = (anyObject: any): any => {
    if (
        !anyObject ||
        typeof anyObject !== "object" ||
        !Object.keys(anyObject) ||
        Object.keys(anyObject)?.length === 0
    ) {
        return null;
    }
    const mongoObject: any = {};
    Object.keys(anyObject).forEach((key: string) => {
        if (
            (key?.includes?.("Id") || key?.includes?.("_id")) &&
            typeof anyObject[key] === "string"
        ) {
            mongoObject[key] = new ObjectId(anyObject[key]);
        } else if (key?.includes?.("Ids") || key?.includes?.("_ids")) {
            mongoObject[key] = anyObject[key]?.map((id: string) => new ObjectId(id));
        } else {
            mongoObject[key] = anyObject[key];
        }
    });
    return mongoObject;
};
