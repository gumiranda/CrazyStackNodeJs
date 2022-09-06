import {
  numberFields,
  numberFieldsWithOperations,
} from "@/application/helpers/utils/numberFields";
import { ObjectId } from "mongodb";
import { subHours } from "date-fns";

export const mapQueryParamsToQueryMongo = (queryParams: any): any => {
  if (
    !queryParams ||
    typeof queryParams !== "object" ||
    !Object.keys(queryParams) ||
    Object.keys(queryParams)?.length === 0
  ) {
    return null;
  }
  const newQuery: any = {};
  const keys = Object.keys(queryParams);
  for (const key of keys) {
    if (key?.includes?.("Ids")) {
      const auxArraySplitted = queryParams[key].split?.(",");
      const arrayIdsMapped = auxArraySplitted?.map?.(
        (elementId: string) => new ObjectId(elementId)
      );
      newQuery[key] = { $elemMatch: { $in: arrayIdsMapped } };
    } else if (key?.includes?.("Id")) {
      newQuery[key] = new ObjectId(queryParams[key]);
    } else if (!isNaN(Number(queryParams[key])) && numberFields?.includes?.(key)) {
      newQuery[key] = { $eq: Number(queryParams[key]) };
    } else if (
      !isNaN(Number(queryParams[key])) &&
      numberFieldsWithOperations?.includes?.(key)
    ) {
      const aux = key?.split?.("operator");
      newQuery[aux?.[0]] = { ["$" + aux?.[1]]: Number(queryParams[key]) };
    } else if (key?.includes?.("textregex")) {
      newQuery[key?.replace?.("textregex", "")] = {
        $regex: queryParams[key],
        $options: "i",
      };
    } else if (key?.includes?.("text")) {
      newQuery.$text = {
        $search: queryParams[key],
        $caseSensitive: false,
        $diacriticSensitive: false,
      };
    } else if (key?.includes?.("isPast")) {
      newQuery[key?.replace?.("isPast", "")] = {
        $lte: subHours(new Date(), 4)?.toISOString(),
      };
    } else if (key?.includes?.("isFuture")) {
      newQuery[key?.replace?.("isFuture", "")] = {
        $gte: subHours(new Date(), 4)?.toISOString(),
      };
    } else if (keys?.includes?.("endDate") && key?.includes?.("initDate")) {
      newQuery["initDate"] = {
        $gte: queryParams["endDate"],
        $lte: queryParams["initDate"],
      };
    } else if (!key?.includes?.("endDate")) {
      newQuery[key] = queryParams[key];
    }
  }
  return newQuery;
};
export const mountGeoNearQuery = (geoNearQueryParams: any): any => {
  if (
    !geoNearQueryParams ||
    typeof geoNearQueryParams !== "object" ||
    !Object.keys(geoNearQueryParams) ||
    Object.keys(geoNearQueryParams)?.length === 0 ||
    !geoNearQueryParams?.coordinates
  ) {
    return null;
  }
  return {
    near: { type: "Point", coordinates: geoNearQueryParams?.coordinates },
    query: geoNearQueryParams?.query,
    distanceField: "distance",
    maxDistance: 20000000,
    spherical: true,
  };
};
