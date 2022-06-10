
// OK Récuperer les elements du panier depuis le localstorage
// OK Faire afficher les éléments de allItems (le panier) dans la page panier
// OK Ajouter la possibilitée de modifier un article dans le panier
// OK Ajouter la possibilitée de supprimer un article dans le panier
// OK Créer une fonction pour calculer et afficher le prix total du panier en fonction des éléments de celui-ci
// OK Créer une fonction pour calculer et afficher le nombre total d'articles du panier en fonction des éléments de celui-ci
// Récupérer et analyser les données saisies par l’utilisateur dans le formulaire.
// Afficher un message d’erreur si besoin.
// Créer un objet contact
// Créer un tableau d'ID de produits.
// Effectuer une requête POST (en lui passant dans un objet les infos de contact et le tableau d'ID de produit) sur l’API et récupérer l’identifiant de commande dans la réponse de celle-ci.
// Rediriger l’utilisateur sur la page Confirmation, en passant l’id de commande dans l’URL, dans le but d’afficher le numéro de commande sur la page de confirmation

var allItems = [];

function principal() {
  // console.log("ma fonction principale démarre ici")
  // Récuperer les elements du panier depuis le localstorage
  allItems = JSON.parse(localStorage.getItem('panier')) || []

  // Faire afficher les éléments de allItems (le panier) dans la page panier
  // j'appelle ma fonction affichePanier
  affichePanier(allItems)
}
  
// fonction pour afficher le contenu du localstorage sur la page panier
function affichePanier(elementsPanier) {
  console.log('Mon panier', elementsPanier)
  elementsPanier.forEach((element, index) => {

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
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
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
  panier.forEach(produit => {
    totalQuantite += parseInt(produit.quantity)
    totalPrix += parseInt(produit.quantity * produit.info.price)
    
  });

  
  let quantityElem = document.querySelector('#totalQuantity');
  let priceElem = document.querySelector('#totalPrice');
  quantityElem.innerHTML = totalQuantite;
  priceElem.innerHTML = totalPrix;
 
}


function supprimer(monIndexTableau){
  console.log ('je dois supprimer un element du panier', monIndexTableau)
  // supprimer visuellement sur ta page 
  let boutonsSupprimeElem = [...document.getElementsByClassName('deleteItem')]
  let itemASupprimer = boutonsSupprimeElem[monIndexTableau].closest('.cart__item')
  itemASupprimer.remove()
  // mettre a jour le tableau allITems
  console.log('BEFORE', allItems)
  allItems.splice(monIndexTableau, 1)
  console.log('AFTER', allItems)
  localStorage.setItem('panier', JSON.stringify(allItems))
  totalPanier(allItems)
  // mettre a jour le localstorage avec allitems
  
}

function modifier(indexTab2, newQuantity){
  // mettre a jour le tableau allITems
  allItems[indexTab2].quantity = newQuantity
  console.log('allItems', allItems)
  // mettre a jour le localstorage avec allitems
  localStorage.setItem('panier', JSON.stringify(allItems))
  totalPanier(allItems)
  indexTab2 = parseInt(newQuantity)
}
// Ma page se charge j'appelle ma fonction principale qui est exécuté en premier
principal();

// gestionnaires des evènements

  let boutonsSupprimeElem = [...document.getElementsByClassName('deleteItem')]
// boucler sur boutonsSupprimeElem avec forEach (en utilisant element et index)
  boutonsSupprimeElem.forEach((element, index) => {
// dans le forEach utiliser addEventListener
// au lieu de mettre modif comme sur exemple, utiliser element (cf foreach plus hautt)
// utiliser l'evenement clic
// appeler la fonction supprimer dans le corps de ton gestionnaire d'evenements
      element.addEventListener('click', function () {
          supprimer(index)
      })
  });

  let boutonsModifierElem = [...document.getElementsByClassName('itemQuantity')]
  boutonsModifierElem.forEach((element, index) => {
    console.log("element", element)
      element.addEventListener('change', function () {
        // Recuperer la valeur de l'input
        console.log(element.value)
        const valueInput = element.value
        // la passer en param en second arguments de la function modifier
        modifier(index, valueInput)
        
      })
  });

  ///////////////////  REGEX  \\\\\\\\\\\\\\\\\\\\\\\\\\\\

  var firstName = document.getElementById("firstName");

  firstName.addEventListener("keyup", function (event) {
    var regexNom = new RegExp (/^([a-zA-Z]){4,20}$/);
    if(firstName.validity.typeMismatch) {
      firstName.setCustomValidity("J'attend un prénom");
    } else {
      firstName.setCustomValidity("");
    }
  });

  var lastName = document.getElementById("lastName");

  lastName.addEventListener("keyup", function (event) {
    var regexNom =  new RegExp (/^([a-zA-Z]){4,20}$/);
    if(lastName.validity.typeMismatch) {
      lastName.setCustomValidity("J'attend un nom");
    } else {
      lastName.setCustomValidity("");
    }
  });

  var address = document.getElementById("address");

  address.addEventListener("keyup", function (event) {
    var regexAdress = new RegExp (/^([a-zA-Z0-9]){4,20}$/);
    if(address.validity.typeMismatch) {
      address.setCustomValidity("J'attend une adresse");
    } else {
      address.setCustomValidity("");
    }
  });

  var city = document.getElementById("city");

  city.addEventListener("keyup", function (event) {
    var regexNom = new RegExp (/^([a-zA-Z]){4,20}$/);
    if(city.validity.typeMismatch) {
      city.setCustomValidity("J'attend une ville");
    } else {
      city.setCustomValidity("");
    }
  });

  var email = document.getElementById("email");

  email.addEventListener("keyup", function (event) {
    var regexMail = new RegExp (/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{4,20}$/);
    if(email.validity.typeMismatch) {
      email.setCustomValidity("J'attend un e-mail");
    } else {
      email.setCustomValidity("");
    }
  });

