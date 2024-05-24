SELECT 'initDate' as dateinit, 'endDate', 'professionalId', 'cancelled', 'active', 'serviceId', 'createdAt', 'updatedAt' FROM "appointment"
JOIN "users" ON "appointment"."professionalId" = "users"._id




WHERE 'professionalId' = 'f10f3f9a-493a-4cc2-93bb-851eb4fa5e54'
AND 'initDate' <= '2043-02-23T23:59:59-03:00'
AND 'initDate' >= '2043-02-23T00:00:00-03:00'
AND 'endDate' <= '2043-02-23T23:59:59-03:00'
AND 'endDate' >= '2043-02-23T00:00:00-03:00'
AND cancelled = false AND active = true
order by dateinit ASC
JOIN user AS professionalDetails ON professionalId = user._id
SELECT initDate, endDate, professionalDetails.ownerId
JOIN owner AS owner ON professionalDetails.ownerId = owner._id
SELECT initDate, endDate, owner.days1, owner.hourStart1, owner.hourEnd1, owner.hourLunchEnd1, owner.hourLunchStart1, owner.days2, owner.hourStart2, owner.hourEnd2, owner.hourLunchEnd2, owner.hourLunchStart2, owner.days3, owner.hourStart3, owner.hourEnd3, owner.hourLunchEnd3, owner.hourLunchStart3
GROUP BY owner SELECT _id, data.initDate, data.endDate

