CREATE DATABASE IF NOT EXISTS coffee_shop;
DROP DATABASE IF EXISTS cafeteria;

USE coffee_shop;

DROP TABLE IF EXISTS comidas;
DROP TABLE IF EXISTS bebidas;


CREATE TABLE IF NOT EXISTS foods(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250) NULL,
    price DECIMAL(8, 2) NOT NULL,
    category VARCHAR(20),
    quantity INT NOT NULL,
    weight DECIMAL(8, 2)
);

CREATE TABLE IF NOT EXISTS drinks(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250) NULL,
    price DECIMAL(8, 2) NOT NULL,
    category VARCHAR(20),
    quantity INT NOT NULL,
    size VARCHAR(20)
);

INSERT INTO 
    foods(
        name,
        description,
        price,
        category,
        quantity,
        weight
    ) VALUES
    (
        'Bolo de Cenoura',
        'Bolo de cenoura com calda de chocolate 70% Cacau.',
        15.99,
        'Doces',
        1,
        120
    ),
    (
        'Petit Gateau',
        'Bolo de chocolate com sorvete de baunilha e ganache 80% cacau',
        23.79,
        'Doces',
        1,
        240
    ),
    (
        'Bolo de Fubá',
        'Bolo de Fubá especial da roça com fermetação natural do leite',
        7.50,
        'Café da tarde',
        1,
        100
    ),
    (
        'Pão de queijo recheado',
        'Pão de queijo recheado com (frango desfiado, costelinha, nutella, queijo parmesão)',
        12.90,
        'Café da tarde',
        4,
        80
    ),
    (
        'Cookies',
        'Cookies cremosos recheados de nutella com gotas de chocolate',
        12.00,
        'Doces',
        6,
        50
    );

    INSERT INTO 
    drinks(
        name,
        description,
        price,
        category,
        quantity,
        size
    ) VALUES
    (
        'Café expresso',
        'Café italiano prensado',
        8.00,
        'Tradicionais',
        1,
        200
    ),
    (
        'Cappuccino',
        'Café expresso, leite vaporizado e uma camada generosa de espuma de leite',
        12.45,
        'Tradicionais',
        1,
        200
    ),
    (
        'Mocha',
        'Bebida à base de café expresso combinada com chocolate (em forma de xarope, calda ou pó) e leite vaporizado',
        12.45,
        'Especiais',
        1,
        180
    ),
    (
        'Latte de Baunilha',
        'Café expresso e leite vaporizado, finalizado com uma fina camada de espuma de leite',
        17.98,
        'Especiais',
        1,
        200
    ),
    (
        'Macchiato Caramelizado',
        'Caramel Macchiato é uma bebida composta por leite vaporizado, xarope de baunilha, espresso e calda de caramelo',
        23.99,
        'Especiais',
        1,
        220
    );

