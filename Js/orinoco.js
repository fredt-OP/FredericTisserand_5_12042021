
function addProduct(responseProduct, section) {
const div = document.createElement("div");
div.innerHTML = responseProduct.name;
div.setAttribute (
    "class",
    "col-md-5 product-border mt-5 mb-4 col-sm-6 ml-4 border border-dark"
);

const img = document.createElement("img");
img.setAttribute("src", responseProduct.imageURL);
img.setAttribute("width", "100%");

const legend = document.createElement("div");
legend.innerHTML = responseProduct.description;

const colors = document.createElement("p");
colors.innerHTML = "choix des couleurs " + responseProduct.colors;

const price = document.createElement("p");
price.innerHTML = responseProduct.price + "€";

const link = document.createElement("a");
link.setAttribute("href", "produit.html?id=" + responseProduct._id);

section[1].appendChild(div);
div.appendChild(link);
link.appendChild(img);
div.appendChild(legend);
div.appendChild(colors);
div.appendChild(price);
}

// Ajoute une div
function addDivToFixDisplay(section) {
    const div = document.createElement("div");
    div.setAttribute("class", "col-md-5 mt-5 mb-4 ml-4 mr-4");
    section[1].appendChild(div);
}

get("http://localhost:3000/api/teddies")
    .then(function (response) {
        const section = document.getElementsByClassName("row")

        for (let i = 0; i < response.length; i = i +1) {
            addProductInfo(response[i], section);
        }
        if (response.length *2 === 1) {
            addDivToFixDisplay(section);
        }
    })
    .catch(function (err) {
        console.log(err);
        if (err === 0) {
            alert("serveur HS");
        }
    });