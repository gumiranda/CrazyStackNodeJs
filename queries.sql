SELECT
    users.*,
    ST_DistanceSphere(
        ST_SetSRID(
            ST_MakePoint(
                (users.coord->'coordinates'->>0)::float,
                (users.coord->'coordinates'->>1)::float
            ), 4326
        ),
        ST_SetSRID(ST_MakePoint(-46.6333, -23.5505), 4326)
    ) AS distance
FROM
    users;



SELECT
    users.*,
    ST_DistanceSphere(
        ST_SetSRID(
            ST_MakePoint(
                (users.coord->'coordinates'->>0)::float,
                (users.coord->'coordinates'->>1)::float
            ), 4326
        ),
        ST_SetSRID(ST_MakePoint(-46.6333, -23.5505), 4326)
    ) AS distance
FROM
    users
WHERE
    users.coord->'coordinates'->>0 IS NOT NULL
    AND users.coord->'coordinates'->>1 IS NOT NULL
ORDER BY
    ST_DistanceSphere(
        ST_SetSRID(
            ST_MakePoint(
                (users.coord->'coordinates'->>0)::float,
                (users.coord->'coordinates'->>1)::float
            ), 4326
        ),
        ST_SetSRID(ST_MakePoint(-46.6333, -23.5505), 4326)
    ) ASC;
