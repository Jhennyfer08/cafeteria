// const APP_URL = process.env.APP_URL;
async function initRegister() {
    await displayProducts({
        route: "foods",
        measure: "weight",
        unit: "g",
    });

    await displayProducts({
        route: "drinks",
        measure: "size",
        unit: "ml",
    });
}

async function initIndex() {
    await loadProducts({
        route: "foods",
        measure: "weight",
        unit: "g",
    });

    await loadProducts({
        route: "drinks",
        measure: "size",
        unit: "ml",
    });
}

async function getProducts(route) {
    try {
        const response = await fetch(`http://localhost:3000/${route}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(`Identified error on loadDrinks: ${error}`);
    }
}

async function loadProducts(config) {
    try {
        const data = await getProducts(config.route);

        const objectCard = document.getElementById(config.route);
        objectCard.innerHTML = "";

        data.forEach((item) => {
            const div = document.createElement("div");
            div.className = config.route;
            div.innerHTML = `
                <img src="${item.picture}" alt="Imagem da Bebida">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <span>R$: ${item.price} | ${item[config.measure]} ${config.unit}</span>
            `;
            objectCard.appendChild(div);
        });
    } catch (error) {
        console.log(`Identified error on loadProducts: ${error}`);
    }
}

async function displayProducts(config) {
    try {
        const data = await getProducts(config.route);

        const objectCard = document.getElementById(config.route);
        objectCard.innerHTML = "";

        data.forEach((item) => {
            const div = document.createElement("div");
            div.className = config.route;
            div.innerHTML = `
                <h2>${item.name}</h2>
                <span>R$: ${item.price} | ${item[config.measure]} ${config.unit}</span>
                <div class="btn-area">
                    <button type="button" id="deleteBtn" onclick="deleteObject(${config.route}, ${item.id})">Excluir</button>
                    <button type="button" id="editBtn" onclick="editObject(${config.route}, ${item})">Editar</button>
                </div>
            `;
            objectCard.appendChild(div);
        });
    } catch (error) {
        console.log(`Identified error on displayProducts: ${error}`);
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

function changeProduct(type) {
    const cards = document.querySelectorAll(".card");
    const form = document.getElementById("form");
    const item = document.querySelector(".form-item.change");

    const input = item.querySelector("input");
    const label = item.querySelector("label");

    form.dataset.type = type;

    cards.forEach((card) => {
        if (card.classList.contains("hidden")) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });

    if (type !== "food") {
        form.onsubmit = registerDrink;

        input.id = "size";
        label.textContent = 'Tamanho:';
    } else {
        form.onsubmit = registerFood;
        
        input.id = "weight";
        label.textContent = 'Peso:';
    }

    label.setAttribute = ("for", input.id);
}

function fileName() {
    const file = document.getElementById("picture").files[0];
    const message = document.querySelector(".form-label.picture");

    if (file) {
        message.textContent = file.name;
    }
}

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

async function registerFood(event) {
    event.preventDefault();

    const input = document.getElementById("picture").files[0];

    const formData = new FormData();
    formData.append("picture", input);

    const response = await fetch(`http://localhost:3000/upload`, {
        method: "POST",
        body: formData,
    });

    const picture = await response.json();

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
        const result = await create(food, "food");
        alert(result.message);
    } catch (error) {
        alert(error.message);
        console.error(`Identified error on registerFood: ${error.message}`);
    }
}

async function registerDrink(event) {
    event.preventDefault();

    const input = document.getElementById("picture").files[0];

    const formData = new FormData();
    formData.append("picture", input);

    const response = await fetch(`http://localhost:3000/upload`, {
        method: "POST",
        body: formData,
    });

    const picture = await response.json();

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
        const result = await create(drink, "drink");
        alert(result.message);
        console.log(drink);
    } catch (error) {
        console.error(`Identified error on registerDrink: ${error.message}`);
    }
}

// async function editObject(route, object) {
//     try {
//         const response = await fetch(`http://localhost:3000/${route}/${object.id}`, {
//             method: "DELETE",
//         });

//         const data = await response.text();

//         if (!response.ok) {
//             throw new Error(
//                 data.message || "Não foi possível concluir a exclusão.",
//             );
//         }

//         await init();
//         console.log(data);

//     } catch (error) {
//         console.error(`Identified error on deleteObject: ${error}`);
//     }
// }
