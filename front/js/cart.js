var allItems = [];
var boutonsModifierElem = []
var boutonsSupprimeElem = []

function principal() {
  // Récuperer les elements du panier depuis le localstorage
  allItems = JSON.parse(localStorage.getItem('panier')) || []

  verifPrixPanier(true)
}

// fonction pour récupérer les produits en fonction des id du panier
function verifPrixPanier(displayCart) {
  fetch("http://localhost:3000/api/products/")
    .then(response => response.json())
    .then(products => {
        for (let product of products) {
          for (let i = 0; i < allItems.length; i++) {
              if (allItems[i].info._id === product._id) {
                allItems[i].info.price = product.price
              }
          }
      }
      if (displayCart){
        affichePanier(allItems)
      }
    })
    // .catch(error => console.log(error));
}


// fonction pour afficher le contenu du localstorage sur la page panier
function affichePanier(elementsPanier) {
  elementsPanier.forEach((element, index) => {

    const cartContainer = document.getElementById("cart__items")
    cartContainer.innerHTML += 
      `
      <article class="cart__item" data-id=${element.info.id} data-color=${element.selectedVariant}>
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

  
    majGestionnaireEvenements()
  
  // j'appelle ma fonction total pour afficher les prix total du panier
  totalPanier(elementsPanier)
}

function totalPanier (panier) {
  let totalPrix = 0;
  let totalQuantite = 0
  panier.forEach(produit => {
    console.log("produit", produit.info)
    totalQuantite += parseInt(produit.quantity)
    totalPrix += parseInt(produit.quantity * produit.info.price)
    
  });

  
  let quantityElem = document.querySelector('#totalQuantity');
  let priceElem = document.querySelector('#totalPrice');
  quantityElem.innerHTML = totalQuantite;
  priceElem.innerHTML = totalPrix;
}

function supprimer(monIndexTableau){
  // supprimer visuellement sur ta page 
  // let boutonsSupprimeElem = [document.getElementsByClassName('deleteItem')]
  let itemASupprimer = boutonsSupprimeElem[monIndexTableau].closest('.cart__item')
  itemASupprimer.remove()
  // mettre a jour le tableau allITems
  allItems.splice(monIndexTableau, 1)
  let itemsInCart = allItems
  itemsInCart.forEach(singleItem => {
    delete singleItem.info.price
  })
  localStorage.setItem('panier', JSON.stringify(itemsInCart))
  verifPrixPanier()
  totalPanier(allItems)
  // mettre a jour le localstorage avec allitems

  majGestionnaireEvenements()
}

function modifier(indexTab2, newQuantity) {
  // mettre a jour le tableau allITems
  allItems[indexTab2].quantity = newQuantity
  // mettre a jour le localstorage avec allitems
  let itemsInCart = allItems
  itemsInCart.forEach(singleItem => {
    delete singleItem.info.price
  })
  localStorage.setItem('panier', JSON.stringify(itemsInCart))
  verifPrixPanier()
  totalPanier(allItems)
  indexTab2 = parseInt(newQuantity)
}

principal();

// gestionnaires des evènements

function majGestionnaireEvenements() {
  boutonsModifierElem = document.getElementsByClassName('itemQuantity')
  boutonsSupprimeElem = document.getElementsByClassName('deleteItem')
  
  for (let i = 0; i < boutonsSupprimeElem.length; i++) {
    boutonsSupprimeElem[i].addEventListener('click', function () {
        supprimer(i)
    })
  }


  for (let i = 0; i < boutonsModifierElem.length; i++) {
    boutonsModifierElem[i].addEventListener('change', function () {
      // Recuperer la valeur de l'input
      if (boutonsModifierElem[i]) {
        modifier(i, boutonsModifierElem[i].value)
      }
    })
  }
}


  ///////////////////  REGEX  \\\\\\\\\\\\\\\\\\\\\\\\\\\\

let firstName = document.getElementById("firstName");
let firstNameErrorElem = document.getElementById("firstNameErrorMsg");
let errorFirstName = true;

var lastName = document.getElementById("lastName");
let lastNameErrorElem = document.getElementById("lastNameErrorMsg");
let errorLastName = true;

var address = document.getElementById("address");
let addressErrorElem = document.getElementById("addressErrorMsg");
let errorAddress = true;

var city = document.getElementById("city");
let cityErrorElem = document.getElementById("cityErrorMsg");
let errorCity = true;

var email = document.getElementById("email");
let emailErrorElem = document.getElementById("emailErrorMsg");
let errorEmail = true;


function firstNameControl() {

  let firstNameControl = firstName.value
  var regexNom = new RegExp (/^[a-zà-ï- ]+$/gi);
  if(regexNom.test(firstNameControl)) {
    firstNameErrorElem.innerHTML = ""
    errorFirstName = false;
  } else {
    firstNameErrorElem.innerHTML = "Le prénom ne doit être constitué que de lettres"
  }
  return errorFirstName
}

function lastNameControl(){

  let lastNameControl = lastName.value;
  var regexNom = RegExp (/^[a-zà-ï- ]+$/gi);
  if(regexNom.test(lastNameControl)) {
    lastNameErrorElem.innerHTML = ""
    errorLastName = false;
  } else {
    lastNameErrorElem.innerHTML = "Le nom ne doit être constitué que de lettres"
  }
  return errorLastName;
}

function adressControl(){
    
  let adressControl = address.value
  var regexAddress = new RegExp (/^[0-9a-zà-ï- ]+$/gi);
  if(regexAddress.test(adressControl)) {
    addressErrorElem.innerHTML = ""
    errorAddress = false;
  } else {
    addressErrorElem.innerHTML = "L'adresse doit comporter un numéro de rue ainsi que le nom de la rue"
  }
  return errorAddress
}

function cityControl(){

  let cityControl = city.value
  var regexAddress = new RegExp (/^[0-9a-zà-ï- ]+$/gi);
  if(regexAddress.test(cityControl)) {
    addressErrorElem.innerHTML = ""
    errorCity = false;
  } else {
    cityErrorElem.innerHTML = "L'adresse doit comporter un numéro de rue ainsi que le nom de la rue"
  }
  return errorCity
}

function emailControl(){

  let emailControl = email.value
  var regexEmail = new RegExp (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  if(regexEmail.test(emailControl)) {
    emailErrorElem.innerHTML = ""
    errorEmail = false;
  } else {
    emailErrorElem.innerHTML = "L'email doit être composer de @ et .com/fr"
  }
  return errorEmail
}

function sendOrder() {

  let contact = {
    firstName : firstName.value,
    lastName : lastName.value,
    address : address.value,
    city : city.value,
    email : email.value,
  }

  let products = []
  allItems.forEach(el => {
    products.push(el.info._id)
  })
        
  // faire un fetch a l'api en POST
  let clientOrder = { contact, products}

  fetch("http://localhost:3000/api/products/order", {
    method: 'POST',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(clientOrder)
  })

  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function(dataFromAPI) {
    let order = dataFromAPI.orderId;
    localStorage.clear();
    document.location.href="http://127.0.0.1:5500/front/html/confirmation.html?orderid="+order; 
  })
}

firstName.addEventListener("keyup", function (event) {
  firstNameControl()
});

lastName.addEventListener("keyup", function (event) {
  lastNameControl();
});

address.addEventListener("keyup", function (event) {
  adressControl()
});

city.addEventListener("keyup", function (event) {
  cityControl()
});

email.addEventListener("keyup", function (event) {
  emailControl()
});

////////////////////// REGEX CONTROL \\\\\\\\\\\\\\\\\\\\

  
let boutonCommanderElem = document.getElementById("order");
  boutonCommanderElem.addEventListener("click",(event) => {
  event.preventDefault();

  firstNameControl();
  lastNameControl();
  adressControl();
  cityControl();
  emailControl();

  if(!errorFirstName && !errorLastName && !errorAddress && !errorCity && !errorEmail && allItems.length > 0){
    sendOrder()
  };
})