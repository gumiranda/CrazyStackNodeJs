SELECT "owner","initDate","endDate" FROM "appointment"
JOIN "users" ON "appointment"."professionalId" = "users"._id
JOIN "owner" ON "users"."ownerId" = "owner"._id
WHERE "professionalId" = 'f0bcc675-728e-4705-8ad2-50828dd0dc7f'
AND "initDate" <= '2043-02-23T23:59:59-03:00'
AND "initDate" >= '2043-02-23T00:00:00-03:00'
AND "endDate" <= '2043-02-23T23:59:59-03:00'
AND "endDate" >= '2043-02-23T00:00:00-03:00'
AND "appointment".cancelled = false AND "appointment".active = true
ORDER BY "initDate" ASC
