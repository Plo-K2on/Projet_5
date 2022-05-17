
// OK Récuperer les elements du panier depuis le localstorage
// OK Faire afficher les éléments de allItems (le panier) dans la page panier
// Ajouter la possibilitée de modifier un article dans le panier
// Ajouter la possibilitée de supprimer un article dans le panier
// OK Créer une fonction pour calculer et afficher le prix total du panier en fonction des éléments de celui-ci
// OK Créer une fonction pour calculer et afficher le nombre total d'articles du panier en fonction des éléments de celui-ci
// Récupérer et analyser les données saisies par l’utilisateur dans le formulaire.
// Afficher un message d’erreur si besoin.
// Créer un objet contact
// Créer un tableau d'ID de produits.
// Effectuer une requête POST (en lui passant dans un objet les infos de contact et le tableau d'ID de produit) sur l’API et récupérer l’identifiant de commande dans la réponse de celle-ci.
// Rediriger l’utilisateur sur la page Confirmation, en passant l’id de commande dans l’URL, dans le but d’afficher le numéro de commande sur la page de confirmation


function principal() {
  console.log("ma fonction principale démarre ici")
  // Récuperer les elements du panier depuis le localstorage
  let allItems = JSON.parse(localStorage.getItem('panier')) || []

  // Faire afficher les éléments de allItems (le panier) dans la page panier
  // j'appelle ma fonction affichePanier
  affichePanier(allItems)
}
  
// fonction pour afficher le contenu du localstorage sur la page panier
function affichePanier(elementsPanier) {
  console.log("je dois afficher le panier, comment faire Hugo ? ")
  elementsPanier.forEach((element, index) => {
    console.log("element", element)
    // soit utiliser la meme methode que dans la page scripts

    // ou utiliser

    const cartContainer = document.getElementById("cart__items")
    cartContainer.innerHTML += 

    `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
      <div class="cart__item__img">
        <img src=${element.info.imageUrl} alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${element.info.name}</h2>
          <p>${element.selectedVariant}</p>
          <p>${element.info.price}</p>
        </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
      </div>
    </article>
    `
    
  });

  // j'appelle ma fonction total pour afficher les prix total du panier
  totalPanier(elementsPanier)
}

function totalPanier (panier) {
  let totalPrix = 0;
  let totalQuantite = 0
  console.log('ma fonction total est appelé')
  panier.forEach(produit => {
    totalQuantite += produit.quantity
    totalPrix += produit.quantity * produit.info.price  
  });
  console.log ("totalQuantitée", totalQuantite)
  console.log ("totalPrix", totalPrix)

  
  let quantityElem = document.querySelector('#totalQuantity');
  let priceElem = document.querySelector('#totalPrice');
  quantityElem.innerHTML = totalQuantite;
  priceElem.innerHTML = totalPrix;
 
}


function supprimer(indexTab){
  console.log ('je dois supprimer un element du panier', indexTab)
}
// Ma page se charge j'appelle ma fonction principale qui est exécuté en premier
principal();

// gestionnaires des evènements

  let boutonsSupprimeElem = [...document.getElementsByClassName('deleteItem')]
// boucler sur boutonsSupprimeElem avec forEach (en utilisant element et index)
  boutonsSupprimeElem.forEach((element, index) => {
    console.log("element", element)
// dans le forEach utiliser addEventListener
// au lieu de mettre modif comme sur exemple, utiliser element (cf foreach plus hautt)
// utiliser l'evenement clic
// appeler la fonction supprimer dans le corps de ton gestionnaire d'evenements
    element.addEventListener('click', function () {
        supprimer()
    })
  });



  // closest(deleteItem)
  // let modif = document.querySelector('.value');
  // let supprime = document.querySelector('deleteItem');
  // const modif = document.getElementById("modifQuantity")
  // modif.addEventListener('change', function () {
  // result.textContent = this.value;
    
  // });
  