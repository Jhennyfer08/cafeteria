import { response } from "express";
import { executeQuery } from "../db/db.js";

class Foods {
    constructor({
        id = null,
        name,
        description,
        price,
        category,
        quantity,
        weight,
        picture,
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
        this.weight = weight;
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

    static async selectFoods() {
        let query = `
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
        `;

        let result = await executeQuery(query);
        return result[0];
    }

    async selectFoodByName() {
        let query = `
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
        `;

        let params = [this.normalize(this.name)];

        try {
            let result = await executeQuery(query, params);
            return result[0][0].id;
        } catch (error) {
            return null;
        }
    }

    async selectFoodById() {
        let query = `
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
                id = ?
        `;

        let params = [this.id];

        let result = await executeQuery(query, params);
        return result[0][0];
    }

    async insertFood() {
        let query = `
            INSERT INTO 
            foods(
                name,
                description,
                price,
                category,
                quantity,
                weight,
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
            this.weight,
            this.picture,
        ];

        try {
            let result = await executeQuery(query, params);
            this.id = result[0].insertId;
        } catch (error) {
            return null;
        }
    }

    async updateFood() {
        let query = `
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
                id = ?
        `;

        let params = [
            this.normalize(this.name),
            this.normalize(this.description),
            this.price,
            this.normalize(this.category),
            this.quantity,
            this.weight,
            this.picture,
            this.id,
        ];

        try {
            let result = await executeQuery(query, params);
            return result[0];
        } catch (error) {
            return null;
        }
    }

    async deleteFood() {
        let query = `
            DELETE FROM 
                foods 
            WHERE
                id = ?
        `;

        let params = [this.id];
        await executeQuery(query, params);
    }
}

export { Foods };
