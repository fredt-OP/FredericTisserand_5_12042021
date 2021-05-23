// récupère l'id dans l'url
function getId() {
    const param = window.location.search;
    const id = param.replace("?id=", ""); 
    return id;
}

//Ajoute le produit dans le panier avec la couleur
function addToBasket(lenseSelected) {
    let basketContent = JSON.parse(localStorage.getItem("basketContent"));
    if (basketContent === null) {
        basketContent = [];
    }

    //Produit ahouter au local storage
    let product = new Product(id, lenseSelected);

    basketContent.push(product);
    localStorage.setItem("basketContent", JSON.stringify(basketContent));
}

// Ajoute les informations produit dans la page HTML
function addProductInfo(response) {
    const container = document.getElementById("productcontainer");

    const div = document.createElement("div");
    div.setAttribute(
        "class",
        "product-border offset-1 col-10 col-md-6 offset-md-3 mt-5 mb-5 p-3 border border-dark"

    );

    const img = document.createElement("img");
    img.setAttribute("src", response.imageUrl);
    img.setAttribute("width", "100%");

    const title = document.createElement("div");
    title.innerHTML = response.name;
    title.setAttribute("class", "producttitle text-center mb-4");

    const legend = document.createElement("div");
    legend.innerHTML = response.description;

    const price = document.createElement("p");
    price.innerHTML = response.price + "€";

    //choix couleurs
    const lenses = document.createElement("select");

    const optionDefault = document.createElement("option");
    optionDefault.innerHTML = "Merci de choisir une option";
    lenses.appendChild(optionDefault);

    //Alerte ajout panier
    const btn = document.createElement("button");
    btn.innerHTML = "Ajouter au panier";

    //Ajout d'élément au local storage
    btn.addEventListener("click", function () {
        const lense = document.getElementById("select");
        const lenseSelected = lenses[0].value;

        addToBasket(lenseSelected);
        alert("ajouté au panier");
    });

    for (let i= 0; i < response.lenses.length; i = i +1) {
        const option = document.createElement("option");
        option.setAttribute("value", response.lenses[i]);
        option.innerHTML = response.lenses[i];
        lenses.appendChild(option);
    }
    // arboresence
    container.appendChild(div);
    div.appendChild(title);
    div.appendChild(img);
    div.appendChild(legend);
    div.appendChild(lenses);
    div.appendChild(price);
    div.appendChild(btn);
}
const id = getId();
get("http://localhost:3000/api/Teddy" + id)
    .then(function (response) {
        addProductInfo(response);
    })
    .catch(function (err) {
        console.log(err)
        if (err === 0) {
            //requete ajax annulée
            alert("serveur HS");
        }
    });