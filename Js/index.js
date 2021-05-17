// --- Récuparation des données de l'API --- //
fetch('http://localhost:3000/api/teddies')
  .then((response) => response.json())
  .then((response) => {
  
    console.log(response); // Visualisation des données récuperées //

    // Création de la variable qui s'ajoutera aux éléments //
    let getAllTeddies = "";

    // Boucle pour récupérer les données des produits //
    for(let i = 0; i < response.length; i++) {
      console.log(response[i].name); // Visualisation si la boucle est opérationnel //
      
      // Création de l'élément en HTML //
      getAllTeddies += 
      `<li class="item">
        <div class="card mb-3">
          <div id="cardProduct" class="row g-0">
            <div class="col-md-4">
              <img src="${response[i].imageUrl}" class="img-thumbnail shadow" alt="Ours en peluche" />
            </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title fs-4">${response[i].name}</h2>
                  <p class="card-text">${response[i].description}</p>
                  <p class="card-text text-muted fs-5">${(response[i].price/100).toFixed(2).replace(".",",")}€</p>
                  <br />
                  <a
                    class="btn btn-outline-primary w-25"
                    href="./product.html?${response[i]._id}"
                    >Détail</a>
                </div>
              </div>
          </div>
        </div>
      </li>`
    }
    
     // Insertion des éléments recuperés dans la page index.html //
    document.getElementById("items").innerHTML = getAllTeddies
})

// Message d'erreur //
.catch(e => {
  errorMessage();
  console.log(e);
});

//  Message d'erreur si pas de connexion au serveur //
function errorMessage() {
  let messageError = "";
  messageError += `<p class="fw-bold text-center fs-1">"Petit problème de connexion au serveur... 🥺"</p>`
  document.querySelector(".error").innerHTML = messageError;
}