// const APP_URL = process.env.APP_URL;

// async function loadForm(type) {
//     const response = await 
// }

async function displayFoods() {
    try {
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
                    <span>R$: ${food.price} | ${food.weight} g</span>
                </div>

                <div class="btn-area">
                    <button type="button" id="deleteBtn" onclick="deleteObject('foods', ${food.id})">Excluir</button>
                    <button type="button" id="editBtn" onclick="editObject('foods', ${food.id})">Editar</button>
                </div>
            `;
            foodCard.appendChild(div);
        });

        form.onsubmit = registerFood;
    } catch (error) {
        console.log(`Identified error on displayFoods: ${error}`);
    }
}

async function displayDrinks() {
    try {
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
                    <span>R$: ${drink.price} | ${drink.size} ml</span>
                </div>

                <div class="btn-area">
                    <button type="button" id="deleteBtn" onclick="deleteObject('drinks', ${drink.id})">Excluir</button>
                    <button type="button" id="editBtn" onclick="editObject('drinks', ${drink.id})">Editar</button>
                </div>
            `;
            drinkCard.appendChild(div);
        });

        form.onsubmit = registerDrink;
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

function changeProduct(type, option) {
    const cards = document.querySelectorAll(".card");
    const slider = document.querySelector(".slider");
    const form = document.getElementById("form");
    const item = document.querySelector(".form-item.change");

    const input = item.querySelector("input");
    const label = item.querySelector("label");

    form.dataset.type = type;

    document.querySelectorAll(".option").forEach((btn) => {
        btn.classList.remove("active");
    });

    option.classList.add("active");

    if (type !== "food") {
        cards[0].classList.add("hidden");
        cards[1].classList.remove("hidden");

        form.onsubmit = registerDrink;

        input.id = "size";
        label.textContent = "Tamanho:";

        slider.style.transform = "translateX(100%)";
    } else {
        cards[1].classList.add("hidden");
        cards[0].classList.remove("hidden");
        form.onsubmit = registerFood;

        input.id = "weight";
        label.textContent = "Peso:";

        slider.style.transform = "translateX(0)";
    }

    label.setAttribute = ("for", input.id);
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
    const input = document.getElementById("picture").files[0];

    const formData = new FormData();
    formData.append("picture", input);

    const response = await fetch(`http://localhost:3000/upload`, {
        method: "POST",
        body: formData,
    });

    return await response.json();
}

async function registerFood(event) {
    event.preventDefault();

    const picture = await uploadPicture();

    const food = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: Number(document.getElementById("price").value),
        category: document.getElementById("category").value,
        quantity: Number(document.getElementById("quantity").value),
        weight: Number(document.getElementById("weight").value),
        picture: picture.url,
    };

    try {
        let result;
        if (editing.id) {
            result = await update("foods", food, editing.id);
        } else {
            result = await create(food, "food");
        }
        console.log(result.message);
    } catch (error) {
        console.error(`Identified error on registerFood: ${error.message}`);
    }
}

async function registerDrink(event) {
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
        if (editing.id) {
            result = await update("drinks", drink, editing.id);
        } else {
            result = await create(drink, "drink");
        }
        // alert(result.message);
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

        editing.id = id;
        editing.route = route;

        ((document.getElementById("name").value = object.name),
            (document.getElementById("description").value = object.description),
            (document.getElementById("price").value = object.price),
            (document.getElementById("category").value = object.category),
            (document.getElementById("quantity").value = object.quantity));

        if (route === "foods") {
            changeProduct("food", document.querySelectorAll(".option")[0]);
            document.getElementById("weight").value = object.weight;
        } else {
            changeProduct("drink", document.querySelectorAll(".option")[1]);
            document.getElementById("size").value = object.size;
        }

        document.getElementById("submitBtn").textContent = "Salvar";

        const input = document.getElementById("picture");
        const message = document.querySelector(".form-label.picture");
        message.textContent = object.picture.split("/").pop();

        if (input.files.length > 0) {
            const picture = await uploadPicture();
            message.textContent = picture.url.split("/").pop();
        }
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

        console.log(data);
    } catch (error) {
        console.error(`Identified error on editObject: ${error}`);
    }
}

//------------------------------------//
//          INITIALIZE
//------------------------------------//

async function initRegister() {
    await displayFoods();
    await displayDrinks();
}
