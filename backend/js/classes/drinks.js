import { response } from "express";
import { executeQuery } from "../db/db.js";

class Drinks {
    constructor({
        id = null,
        name,
        description,
        price,
        category,
        quantity,
        size,
        picture,
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
        this.size = size;
        this.picture = picture;
    }

    normalize(text) {
        try {
            text = text.trim();
            text = text === "" ? null : text;
        } catch (error) {
            text = null;
        }

        return text;
    }

    static async selectDrinks() {
        let query = `
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
        `;

        let result = await executeQuery(query);
        return result[0];
    }

    async selectDrinkById() {
        let query = `
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
        WHERE
            id = ?
        `;

        let params = [
            this.id
        ]

        let result = await executeQuery(query, params);
        return result[0];
    }

    async insertDrink() {
        let query = ` 
            INSERT INTO 
            drinks(
                name,
                description,
                price,
                category,
                quantity,
                size,
                picture
            ) VALUES (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )
        `;

        let params = [
            this.normalize(this.name),
            this.normalize(this.description),
            this.price,
            this.normalize(this.category),
            this.quantity,
            this.size,
            this.picture,
        ];

        let result = await executeQuery(query, params);
        this.id = result[0].insertId;
    }

    async deleteDrink() {
        let query = `
            DELETE FROM 
                drinks
            WHERE
                id = ?
        `;

        let params = [this.id];
        let result = await executeQuery(query, params);
    }
}

export { Drinks };
