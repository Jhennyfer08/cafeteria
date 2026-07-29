SELECT 
    id,
    name,
    description,
    price,
    category,
    quantity,
    weight,
    picture
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
    size,
    picture
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
    weight,
    picture
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

SELECT  
    id,
    name,
    description,
    price,
    category,
    quantity,
    weight,
    picture
FROM 
    foods
WHERE
    id = 2;


UPDATE 
    foods
SET 
    name = ?,
    description = ?,
    price = ?,
    category = ?,
    quantity = ?,
    weight = ?,
    picture = ?
WHERE
    id = ?;

