import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import promises from "fs/promises";
import { Foods } from "./classes/foods.js";
import { Drinks } from "./classes/drinks.js";

try {
    await process.loadEnvFile(".env");
} catch (error) {
    console.log("Impossible to read .env file");
}

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

// FOODS
app.get("/foods", async (req, res) => {
    const foods = await Foods.selectFoods();

    // const formattedFoods = foods.map((food) => ({
    //     ...food,
    //     picture: food.picture?.toString("utf-8") ?? null,
    // }));

    res.send(foods);
});

// POST + IMAGE STORAGE

const uploadPath = "tmp";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const date = new Date().toISOString().replace(/\D/g, "");
        const ext = file.originalname.split(".").pop();

        cb(null, `${date}.${ext}`);
    },
});

const upload = multer({ storage });

app.use(express.static(uploadPath));

app.post("/upload", upload.single("picture"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Arquivo não enviado",
        });
    } else {
        const uri = `${req.protocol}://${req.get("host")}`;
        res.status(201).json({
            success: true,
            message: "Imagem enviada com sucesso.",
            file: req.file.filename,
            url: `${uri}/${req.file.filename}`,
        });
    }
});

app.post("/food", async (req, res) => {
    const body = req.body;
    const foods = new Foods(body);

    try {
        await foods.insertFood();

        res.send({
            message: `Prato ${foods.id} - ${foods.name} cadastrado com sucesso`,
        });
    } catch (error) {
        res.send({
            message: `Não foi possível cadastrar o prato`,
        });
    }
});

app.delete("/foods/:id", async (req, res) => {
    const foods = new Foods({
        id: req.params.id,
    });

    const food = (await foods.selectFoodById())[0];

    if (!food) {
        return res.status(404).send({
            message: "Prato não encontrado.",
        });
    }

    console.log(food);
    console.log(food.picture);
    console.log(typeof food.picture);

    const fileName = new URL(food.picture).pathname.split("/").pop();
    await promises.unlink(`${uploadPath}/${fileName}`);

    try {
        await foods.deleteFood();

        res.send({
            message: `Prato ${foods.id} excluído com sucesso.`,
        });
    } catch (error) {
        console.error(error);

        res.status(500).send({
            message: error.message,
        });
    }
});

// DRINKS
app.get("/drinks", async (req, res) => {
    const drinks = await Drinks.selectDrinks();

    // const formattedDrinks = drinks.map((drink) => ({
    //     ...drink,
    //     picture: drink.picture?.toString() ?? null,
    // }));

    res.send(drinks);
});

app.post("/drink", async (req, res) => {
    const body = req.body;
    const drinks = new Drinks(body);

    try {
        await drinks.insertDrink();
        res.send({
            message: `Bebida ${drinks.id} - ${drinks.name} cadastrada com sucesso.`,
        });
    } catch (error) {
        res.send({
            message: `Não foi possível cadastrar a bebida`,
        });
    }
});

app.delete("/drinks/:id", async (req, res) => {
    const drinks = new Drinks({
        id: req.params.id,
    });

    const drink = await drinks.selectDrinkById();

    if (!drink) {
        return res.status(404).send({
            message: "Bebida não encontrada.",
        });
    }

    const fileName = new URL(drink.picture).pathname.split("/").pop();
    await promises.unlink(`${uploadPath}/${fileName}`);

    try {
        await drinks.deleteDrink();
        res.send({
            message: `Bebida ${drinks.id} excluída com sucesso`,
        });
    } catch (error) {
        res.send({
            message: `Não foi possível excluir a bebida`,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});
