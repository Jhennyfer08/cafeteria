import express from 'express';
import cors from 'cors';
import {Foods} from './classes/foods.js';
import {Drinks} from './classes/drinks.js';

try {
    await process.loadEnvFile('.env');
} catch (error) {
    console.log('Impossible to read .env file');
}

const app = express();
app.use(cors());
app.use(express.json());

// FOODS
app.get('/foods', async(req, res) => {
    const foods = await Foods.selectFoods();
    res.send(foods);
});

app.post('/food', async(req,res) => {
    const body = req.body;
    const foods = new Foods(body);

    try {
        await food.insertFood();
        res.send({
            message: `Prato ${foods.id} - ${foods.name} cadastrado com sucesso`
        });
    } catch (error) {
        res.send({
            message: `Não foi possível cadastrar o prato`
        });
    }
});

app.delete('/food/:id', async(req, res) => {
    const foods = new Foods({
        id: req.params.id
    });

    await foods.deleteFood();
    res.send({
        message: `Prato ${food.id} excluído com sucesso.`
    });
});


// DRINKS
app.get('/drinks', async(req, res) => {
    const drinks = await Drinks.selectDrinks();
    res.send(drinks);
});

app.post('/drink', async(req, res) => {
    const body = req.body;
    const drinks = new Drinks(body);

    try {
        await drinks.insertDrink();
        res.send({
            message: `Bebida ${drinks.id} - ${drinks.name} cadastrada com sucesso.`
        });
    } catch (error) {
        res.send({
            message: `Não foi possível cadastrar a bebida`
        });
    }
});

app.delete('/drink/:id', async(req, res) => {
    const drinks = new Drinks({
        id: req.params.id
    });

    await drinks.deleteDrink();
    res.send({
        message: `Bebida ${drinks.id} excluída com sucesso`
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});