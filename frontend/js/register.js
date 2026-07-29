// const APP_URL = process.env.APP_URL;

async function loadForm(type) {
    const response = await fetch(`forms/${type}Form.html`);
    const html = await response.text();

    document.getElementById("formContainer").innerHTML = html;
}

async function displayFoods() {
    try {
        await loadForm("foods");
        const form = document.getElementById("form");
        const data = await getProducts("foods");

        const foodCard = document.getElementById("foods");
        foodCard.innerHTML = "";

        data.forEach((food) => {
            const div = document.createElement("div");
            div.className = "foods";
            div.innerHTML = `
                <div class="info-area">
                    <h2>${food.name}</h2>
                    <span>R$: ${food.price} | ${food.weight} g | ${food.quantity} Un</span>
                </div>

                <div class="btn-area">
                    <button type="button" id="deleteBtn" onclick="deleteObject('foods', ${food.id})">Excluir</button>
                    <button type="button" id="editBtn" onclick="editObject('foods', ${food.id})">Editar</button>
                </div>
            `;
            foodCard.appendChild(div);
        });

        document.getElementById("foods").classList.remove("hidden");
        document.getElementById("drinks").classList.add("hidden");
    } catch (error) {
        console.log(`Identified error on displayFoods: ${error}`);
    }
}

async function displayDrinks() {
    try {
        await loadForm("drinks");
        const form = document.getElementById("form");
        const data = await getProducts("drinks");

        const drinkCard = document.getElementById("drinks");
        drinkCard.innerHTML = "";

        data.forEach((drink) => {
            const div = document.createElement("div");
            div.className = "drinks";
            div.innerHTML = `
                <div class="info-area">
                    <h2>${drink.name}</h2>
                    <span>R$: ${drink.price} | ${drink.size} ml | ${drink.quantity} Und</span>
                </div>

                <div class="btn-area">
                    <button type="button" id="deleteBtn" onclick="deleteObject('drinks', ${drink.id})">Excluir</button>
                    <button type="button" id="editBtn" onclick="editObject('drinks', ${drink.id})">Editar</button>
                </div>
            `;
            drinkCard.appendChild(div);
        });

        document.getElementById("drinks").classList.remove("hidden");
        document.getElementById("foods").classList.add("hidden");
    } catch (error) {
        console.log(`Identified error on displayDrinks: ${error}`);
    }
}

function fileName() {
    const file = document.getElementById("picture").files[0];
    const message = document.querySelector(".form-label.picture");

    if (file) {
        message.textContent = file.name;
    }
}

async function changeProduct(option) {
    const slider = document.querySelector(".slider");

    if (option === "food") {
        await displayFoods();
        slider.style.transform = "translateX(0)";
    } else {
        await displayDrinks();
        slider.style.transform = "translateX(100%)";
    }
}

//===============================//
//      POST, PUT & DELETE
//===============================//

async function create(object, route) {
    try {
        const response = await fetch(`http://localhost:3000/${route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Não foi possível concluir o cadastro.",
            );
        }

        return data;
    } catch (error) {
        console.error(`Identified error on create: ${error}`);
    }
}

async function uploadPicture() {
    const input = document.getElementById("picture");
    const file = input.files[0];

    if (!file) {
        throw new Error("Nenhuma imagem selecionada.");
    }

    const formData = new FormData();
    formData.append("picture", file);

    const response = await fetch(`http://localhost:3000/upload`, {
        method: "POST",
        body: formData,
    });

    return await response.json();
}

async function registerFood(event, id = null) {
    event.preventDefault();

    const form = event.target;
    let picture = form.dataset.picture;

    const input = document.getElementById("picture").files[0];

    if (input) {
        const images = await uploadPicture();
        picture = images.url;
    }

    const food = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: Number(document.getElementById("price").value),
        category: document.getElementById("category").value,
        quantity: Number(document.getElementById("quantity").value),
        weight: Number(document.getElementById("weight").value),
        picture: picture,
    };

    try {
        let result;
        if (id !== null) {
            result = await update("foods", food, id);
        } else {
            result = await create(food, "food");
        }
        console.log(result.message);
    } catch (error) {
        console.error(`Identified error on registerFood: ${error.message}`);
    }
}

async function registerDrink(event, id = null) {
    event.preventDefault();

    const picture = await uploadPicture();

    const drink = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: Number(document.getElementById("price").value),
        category: document.getElementById("category").value,
        quantity: Number(document.getElementById("quantity").value),
        size: Number(document.getElementById("size").value),
        picture: picture.url,
    };

    try {
        let result;
        if (id !== null) {
            result = await update("drinks", drink, id);
        } else {
            result = await create(drink, "drink");
        }
        console.log(result.message);
    } catch (error) {
        console.error(`Identified error on registerDrink: ${error.message}`);
    }
}

async function deleteObject(route, id) {
    try {
        const response = await fetch(`http://localhost:3000/${route}/${id}`, {
            method: "DELETE",
        });

        const data = await response.text();

        if (!response.ok) {
            throw new Error(
                data.message || "Não foi possível concluir a exclusão.",
            );
        }

        await init();
        console.log(data);
    } catch (error) {
        console.error(`Identified error on deleteObject: ${error}`);
    }
}

async function editObject(route, id) {
    try {
        const response = await fetch(`http://localhost:3000/${route}/${id}`);
        const object = await response.json();

        ((document.getElementById("name").value = object.name),
            (document.getElementById("description").value = object.description),
            (document.getElementById("price").value = object.price),
            (document.getElementById("category").value = object.category),
            (document.getElementById("quantity").value = object.quantity));

        if (route === "foods") {
            document.getElementById("weight").value = object.weight;
        } else {
            document.getElementById("size").value = object.size;
        }

        const input = document.getElementById("picture");
        const message = document.querySelector(".form-label.picture");
        message.textContent = object.picture.split("/").pop();

        document.getElementById("submitBtn").textContent = "Salvar";

        form.onsubmit = function (event) {
            if (route === "foods") {
                registerFood(event, id);
            } else {
                registerDrink(event, id);
            }
        };
    } catch (error) {
        console.error(error);
    }
}

async function update(route, object, id) {
    try {
        const response = await fetch(`http://localhost:3000/${route}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Não foi possível concluir a atualização.",
            );
        }

        return data;
    } catch (error) {
        console.error(`Identified error on editObject: ${error}`);
    }
}

//------------------------------------//
//          INITIALIZE
//------------------------------------//
