SELECT 
    id,
    name,
    description,
    price,
    category,
    quantity,
    weight
FROM 
    foods
;

SELECT  
    id,
    name,
    description,
    price,
    category,
    quantity,
    size
FROM 
    drinks
;

SELECT 
    id, 
    name, 
    description,
    price,
    category,
    quantity,
    weight
FROM
    foods
WHERE
    name = ?
;

DELETE FROM 
    foods 
WHERE
    id = ?
;

DELETE FROM 
    drinks
WHERE
    id = ?
;