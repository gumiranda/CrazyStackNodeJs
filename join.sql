SELECT "initDate" as dateinit, "endDate", "professionalId", 'cancelled', 'active', "serviceId", 'createdAt', 'updatedAt' FROM "appointment"
JOIN "users" ON "appointment"."professionalId" = "users"._id
JOIN "owner" ON "users"."ownerId" = "owner"._id
WHERE "professionalId" = 'f10f3f9a-493a-4cc2-93bb-851eb4fa5e54'
AND "initDate" <= '2043-02-23T23:59:59-03:00'
AND "initDate" >= '2043-02-23T00:00:00-03:00'
AND "endDate" <= '2043-02-23T23:59:59-03:00'
AND "endDate" >= '2043-02-23T00:00:00-03:00'
AND "appointment".cancelled = false AND "appointment".active = true
order by dateinit ASC
