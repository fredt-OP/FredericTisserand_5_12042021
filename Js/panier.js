//Ajoute les produits du panier dans la page html//
function addBasketProduct(
    container,
    productInfo,
    productBasket,
    basketContent,
    totalPrice
    ) {
        const productContainer = document.createElement("div");
        productContainer.setAttribute("class", "row justify-content-around mb-5");
        
        const divTitle = document.createElement("div");
        divTitle.setAttribute("class", "col-md-3");
        
        const name = document.createElement("p");
        name.innerHTML = productInfo.name;
        
        const image = document.createElement("img");
        image.innerHTML = productInfo.imageUrl;
        image.setAttribute("src", productInfo.imageUrl);
        image.setAttribute("width", "30%");
        
        //Supprime élément
        const btn = document.createElement("button");
        btn.innerHTML = "Supprimer";
        btn.setAttribute("class", "bg-light text-dark");
        btn.setAttribute("data-id", productInfo._id);
        
        const divcolors = document.createElement("div");
        divcolors.setAttribute("class", "col-md-3");
        divcolors.innerHTML = productBasket.colors;
        
        const divPrice = document.createElement("div");
        divPrice.setAttribute("class", "col-md-3");
        divPrice.innerHTML = productInfo.price + "€";
        totalPrice = totalPrice + productInfo.price;
        
        //suprimer un élément du panier
        
        btn.addEventListener("click", function (e) {
            const id = e.target.getAttribute("data-id");
            
            for (let x = 0; x != basketContent.length; x = x + 1) {
                if (basketContent[x].id === id) {
                    basketContent.splice(x, 1);
                    break;
                }
            }
            localStorage.setItem("basketContent", JSON.stringify(basketContent)); //Sauvegarde du panier mis à jour
            window.location.href = "panier.html"; // retour à la page accueil
        });
        

productContainer.appendChild(divTitle)
divTitle.appendChild(name);
divTitle.appendChild(image);
divTitle.appendChild(btn);
productContainer.appendChild(divcolors);
productContainer.appendChild(divPrice);
container.appendChild(productContainer);

return totalPrice

// Validation Nom, Prénom, Ville xpression régulière formulaire
function isAlpha(value) {
    return /[a-zA-Z]+/.test(value);
}

// Validation mail expression régulière formulaire
function validateEmail(value) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
    }
    return false;
}

//Validation adresse expression régulière formulaire
function isAdresse(value) {
    return /\w+/.test(value);
}

//Message erreur du formulaire quand les champs ne sont pas remplis
function checkFormErrors(orderValidity) {
    const error = document.getElementById("error");
    error.innerHTML ="";
    let inputIds = ["name", "firstname", "email", "adresse", "city"];
    let inputTexts = ["nom", "prénom", "mail", "adresse", "ville"];
    for (let i = 0; i < inputIds.length; i = i+1) {
        const input = document.getElementById(inputIds[i]);
        if (input.value === "") {
            const errorMessage = document.createElement("p");
            errorMessage.setAttribute("class", "text-danger");
            errorMessage.innerHTML = "merci d'indiquer votre " + inputTexts[i] + ".";
            orderValidity = false;
            error.appendChild(errorMessage);
        } else {
            if (
                inputIds[i] === "name" ||
                inputIds[i] === "firstname" ||
                inputIds[i] === "city"
            ) {
                if (isAlpha(input.value) === false) {
                    const errorMessage = document.createElement("p");
                    errorMessage.setAttribute("class", "text-warning");
                    errorMessage.innerHTML =
                        "merci d'écrire votre " + inputTexts[i] + " en toutes lettres.";
                    orderValidity = false;
                    error.appendChild(errorMessage);
                }
            }
            if (inputIds[i] === "email") {
                if (validateEmail(input.value) === false) {
                    const errorMessage = document.createElement("p");
                    errorMessage.setAttribute("class", "text-warning");
                    errorMessage.innerHTML =
                        "merci d'écrire un " + inputTexts[i] + " valide";
                    orderValidity = false;
                    error.appendChild(errorMessage);
                }
            }
            if (inputIds[i] === "adresse") {
                if (isAdresse(input.value) === false) {
                    const errorMessage = document.createElement("p");
                    errorMessage.setAttribute("class", "text-warning");
                    errorMessage.innerHTML =
                        "merci d'écrire une " + inputTexts[i] + " valide";
                    orderValidity = false;
                    error.appendChild(errorMessage);
                }
            }
        }
    }
    return orderValidity;
}

//Envoyer la requête de commande

function sendOrder() {
    const name = document.getElementById("name").value;
    const firstname = document.getElementById("firstname").value;
    const mail = document.getElementById("email").value;
    const adress = document.getElementById("adresse").value;
    const city = document.getElementById("city").value;

    const formInformation = new infoForm(name, firstname, mail, adress, city);
    const basketContent = JSON.parse(localStorage.getItem("basketContent"));

    let idOrder = [];

    for (let i = 0; i < basketContent.length; i = i + 1) {
        basketContent[i].id;
        idOrder.push(basketContent[i].id);
    }
    const command = new orderinfo(formInformation, idOrder);
    post("http://localhost:3000/api/teddies/order", command)
        .then(function (reponse) {
            localStorage.setItem("basketContent", JSON.stringify([]));
            localStorage.setItem("orderConfirmation", reponse.orderId);
            window.location.href = "validate.html"; // envoi à la page de confirmation
        })
        .catch(function (err) {
            console.log(err);
            if (err === 0) {
                //requète ajax annulée
                alert("serveur HS");
            }
        });

}

//Message panier vide

function emptyBasketMessage(container) {
    const emptyBasket = document.createElement("div");
    emptyBasket.innerHTML = "Votre panier est vide";
    container.appendChild(emptyBasket);

    return container;
}

//

get("http://localhost:3000/api/teddies/")
    .then(function (response) {
        //ajouter un élément au panier
        const basketContent = JSON.parse(localStorage.getItem("basketContent")); //récupération local storage
        const container = document.getElementById("product-basket");
        if (basketContent.length === 0) {
            //Message panier vide
            emptyBasketMessage(container);
        } else {
            let totalPrice = 0;
            for (let productBasket of basketContent) {
                for (let productInfo of response) {
                    if (productBasket.id === productInfo._id) {
                        totalPrice = addBasketProduct (
                            container,
                            productInfo,
                            productBasket,
                            basketContent,
                            totalPrice
                        );
                        localStorage.setItem("totalPriceConfirmationPage", totalPrice);
                    }
                }
            }
            // calcul du total
            const totalPriceBasket = document.getElementById("total-price");
            totalPriceBasket.innerHTML = "Total: " + totalPrice + "€";
        }
    })
    .catch(function (err) {
        console.log(err);
        if (err === 0) {
            //requete ajax annulée
            alert("serveur HS");
        }
    });

    // Message d'erreur formulaire de validation

    const btn = document.getElementById("btn");

    btn.addEventListener("click", function (event) {
        event.preventDefault();
        let orderValidity = true;
        orderValidity = checkFormErrors(orderValidity);

        if (orderValidity === true) {
            sendOrder();
        }
    });
}