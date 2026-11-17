async function getProducts(route) {
    try {
        const response = await fetch(`http://localhost:3000/${route}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(`Identified error on getProducts: ${error}`);
    }
}

async function loadProducts(config, data = null) {
    try {

        if (!data) {
            data = await getProducts(config.route);

            if (config.route === "foods") {
                foodsData = data;
            } else if (config.route === "drinks") {
                drinksData = data;
            }
        }

        const objectCard = document.getElementById(config.route);
        objectCard.innerHTML = "";

        data.forEach((item) => {
            const div = document.createElement("div");
            div.className = config.route;
            div.innerHTML = `
                <img src="${item.picture}" alt="Imagem da Bebida">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <span>R$: ${item.price} | ${item[config.measure]} ${config.unit} </span>
            `;
            objectCard.appendChild(div);
        });
    } catch (error) {
        console.log(`Identified error on loadProducts: ${error}`);
    }
}

async function searchProducts(value) {

    value = value.toLowerCase().trim();

    const filteredFood = foodsData.filter(food => {
        return Object.values(food)
            .join(" ")
            .toLowerCase()
            .includes(value)
    });

    const filteredDrink = drinksData.filter(drink => {
        return Object.values(drink)
            .join(" ")
            .toLowerCase()
            .includes(value)
    });

    await loadProducts({
        route: "foods",
        measure: "weight",
        unit: "g",
    },
        filteredFood);

    await loadProducts({
        route: "drinks",
        measure: "size",
        unit: "ml",
    },
        filteredDrink);
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