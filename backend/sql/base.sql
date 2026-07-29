CREATE DATABASE IF NOT EXISTS coffee_shop;
DROP DATABASE IF EXISTS cafeteria;

USE coffee_shop;

DROP TABLE IF EXISTS foods;
DROP TABLE IF EXISTS drinks;


CREATE TABLE IF NOT EXISTS foods(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT NULL,
    price DECIMAL(8, 2) NOT NULL,
    category VARCHAR(20),
    quantity INT NOT NULL,
    weight DECIMAL(8, 2),
    picture TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS drinks(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT NULL,
    price DECIMAL(8, 2) NOT NULL,
    category VARCHAR(20),
    quantity INT NOT NULL,
    size VARCHAR(20) NOT NULL,
    picture TEXT NOT NULL
);

INSERT INTO 
    foods(
        name,
        description,
        price,
        category,
        quantity,
        weight,
        picture
    ) VALUES
    (
        'Bolo de Cenoura',
        'Bolo de cenoura com calda de chocolate 70% Cacau.',
        15.99,
        'Doces',
        1,
        120,
        'http://localhost:3000/bolo-cenoura.svg'
    ),
    (
        'Petit Gateau',
        'Bolo de chocolate com sorvete de baunilha e ganache 80% cacau',
        23.79,
        'Doces',
        1,
        240,
        'http://localhost:3000/petit-gateau.svg'
    ),
    (
        'Bolo de Fubá',
        'Bolo de Fubá especial da roça com fermetação natural do leite',
        7.50,
        'Café da tarde',
        1,
        100,
        'http://localhost:3000/bolo-fuba.svg'
    ),
    (
        'Pão de queijo recheado',
        'Pão de queijo recheado com (frango desfiado, costelinha, nutella, queijo parmesão)',
        12.90,
        'Café da tarde',
        4,
        80,
        'http://localhost:3000/pao-queijo-recheado.svg'
    );

    INSERT INTO 
    drinks(
        name,
        description,
        price,
        category,
        quantity,
        size,
        picture
    ) VALUES
    (
        'Café expresso',
        'Café italiano prensado',
        8.00,
        'Tradicionais',
        1,
        200,
        'http://localhost:3000/cafe-expresso.svg'
    ),
    (
        'Cappuccino',
        'Café expresso, leite vaporizado e uma camada generosa de espuma de leite',
        12.45,
        'Tradicionais',
        1,
        200,
        'http://localhost:3000/capuccino.svg'
    ),
    (
        'Mocha',
        'Bebida à base de café expresso combinada com chocolate (em forma de xarope, calda ou pó) e leite vaporizado',
        12.45,
        'Especiais',
        1,
        180,
        'http://localhost:3000/mocha.svg'
    ),
    (
        'Latte de Baunilha',
        'Café expresso e leite vaporizado, finalizado com uma fina camada de espuma de leite',
        17.98,
        'Especiais',
        1,
        200,
        'http://localhost:3000/latte-baunilha.svg'
    ),
    (
        'Macchiato Caramelizado',
        'Caramel Macchiato é uma bebida composta por leite vaporizado, xarope de baunilha, espresso e calda de caramelo',
        23.99,
        'Especiais',
        1,
        220,
        'http://localhost:3000/macchiato-caramelizado.svg'
    );

