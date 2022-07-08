
// OK Récuperer les elements du panier depuis le localstorage
// OK Faire afficher les éléments de allItems (le panier) dans la page panier
// OK Ajouter la possibilitée de modifier un article dans le panier
// OK Ajouter la possibilitée de supprimer un article dans le panier
// OK Créer une fonction pour calculer et afficher le prix total du panier en fonction des éléments de celui-ci
// OK Créer une fonction pour calculer et afficher le nombre total d'articles du panier en fonction des éléments de celui-ci
// OK Récupérer et analyser les données saisies par l’utilisateur dans le formulaire.
// OK Afficher un message d’erreur si besoin.
// OK Créer un objet contact
// OK Créer un tableau d'ID de produits.
// OK Effectuer une requête POST (en lui passant dans un objet les infos de contact et le tableau d'ID de produit) sur l’API et récupérer l’identifiant de commande dans la réponse de celle-ci.
// OK Rediriger l’utilisateur sur la page Confirmation, en passant l’id de commande dans l’URL, dans le but d’afficher le numéro de commande sur la page de confirmation

var allItems = [];
// var products = []

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

  let firstName = document.getElementById("firstName");
  let firstNameErrorElem = document.getElementById("firstNameErrorMsg");
  let errorFirstName = true;

  firstName.addEventListener("keyup", function (event) {
    var regexNom = new RegExp (/^[a-zà-ï- ]+$/gi);
    if(regexNom.test(firstName.value)) {
      firstNameErrorElem.innerHTML = ""
      errorFirstName = false;
    } else {
     firstNameErrorElem.innerHTML = "Le prénom ne doit être constitué que de lettres"
    }
  });


  var lastName = document.getElementById("lastName");
  let lastNameErrorElem = document.getElementById("lastNameErrorMsg");
  let errorLastName = true;

  lastName.addEventListener("keyup", function (event) {
    var regexNom =  new RegExp (/^[a-zà-ï- ]+$/gi);
    if(regexNom.test(lastName.value)) {
      lastNameErrorElem.innerHTML = ""
      errorLastName = false;
    } else {
      lastNameErrorElem.innerHTML = "Le nom ne doit être constitué que de lettres"
    }
  });


  var address = document.getElementById("address");
  let addressErrorElem = document.getElementById("addressErrorMsg");
  let errorAddress = true;

  address.addEventListener("keyup", function (event) {
    var regexAddress = new RegExp (/^[0-9a-zà-ï- ]+$/gi);
    if(regexAddress.test(address.value)) {
      addressErrorElem.innerHTML = ""
      errorAddress = false;
    } else {
      addressErrorElem.innerHTML = "L'adresse doit comporter un numéro de rue ainsi que le nom de la rue"
    }
  });


  var city = document.getElementById("city");
  let cityErrorElem = document.getElementById("cityErrorMsg");
  let errorCity = true;

  city.addEventListener("keyup", function (event) {
    var regexNom = new RegExp (/^[a-zà-ï- ]+$/gi);
    if(regexNom.test(city.value)) {
      cityErrorElem.innerHTML =""
      errorCity = false;
    } else {
      cityErrorElem.innerHTML = "Le nom de la ville ne doit être constitué que de lettres"
    }
  });


  var email = document.getElementById("email");
  let emailErrorElem = document.getElementById("emailErrorMsg");
  let errorEmail = true;

  email.addEventListener("keyup", function (event) {
    var regexEmail = new RegExp (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if(regexEmail.test(email.value)) {
      emailErrorElem.innerHTML = ""
      errorEmail = false;
    } else {
      emailErrorElem.innerHTML = "L'email doit être composer de @ et .com/fr"
    }
  });


////////////////////// REGEX CONTROL \\\\\\\\\\\\\\\\\\\\

  
  let boutonCommanderElem = document.getElementById("order");
   boutonCommanderElem.addEventListener("click",(event) => {
    event.preventDefault();

    function firstNameControl(){

      let firstNameControl2 = firstName.value;
      var regexNom = RegExp (/^[a-zà-ï- ]+$/gi);
      if(regexNom.test(firstNameControl2)) {
        firstNameErrorElem.innerHTML = ""
        errorFirstName = false;
      } else {
      firstNameErrorElem.innerHTML = "Le prénom ne doit être constitué que de lettres"
      }
    }

    function lastNameControl(){

      let lastNameControl2 =  lastName.value;
      var regexNom = RegExp (/^[a-zà-ï- ]+$/gi);
      if(regexNom.test(lastNameControl2)) {
        lastNameErrorElem.innerHTML = ""
        errorLastName = false;
      } else {
        lastNameErrorElem.innerHTML = "Le nom ne doit être constitué que de lettres"
      }
    }

    function adressControl(){
      
      let adressControl2 = address.value;
      var regexAddress = RegExp (/^[0-9a-zà-ï- ]+$/gi);
      if(regexAddress.test(adressControl2)) {
        addressErrorElem.innerHTML = ""
        errorAddress = false;
      } else {
        addressErrorElem.innerHTML = "L'adresse doit comporter un numéro de rue ainsi que le nom de la rue"
      }
    }

    function cityControl(){

      let cityControl2 = city.value
      var regexNom = RegExp (/^[a-zà-ï- ]+$/gi);
      if(regexNom.test(cityControl2)) {
        cityErrorElem.innerHTML =""
        errorCity = false;
      } else {
        cityErrorElem.innerHTML = "Le nom de la ville ne doit être constitué que de lettres"
      }
    }

    function emailControl(){

      let emailControl2 = email.value
      var regexEmail = RegExp (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
      if(regexEmail.test(emailControl2)) {
        emailErrorElem.innerHTML = ""
        errorEmail = false;
      } else {
        emailErrorElem.innerHTML = "L'email doit être composer de @ et .com/fr"
      }
    }


    if(firstNameControl(firstName.value) && lastNameControl(lastName.value) && adressControl(address.value) && cityControl(city.value) && emailControl(email.value)){

      firstNameErrorElem.innerHTML = ""
      errorFirstName = false;

      lastNameErrorElem.innerHTML = ""
      errorLastName = false;

      addressErrorElem.innerHTML = ""
      errorAddress = false;

      cityErrorElem.innerHTML =""
      errorCity = false;

      emailErrorElem.innerHTML = ""
      errorEmail = false;

    }else{

      firstNameErrorElem.innerHTML = "Le prénom ne doit être constitué que de lettres"

      lastNameErrorElem.innerHTML = "Le nom ne doit être constitué que de lettres"

      addressErrorElem.innerHTML = "L'adresse doit comporter un numéro de rue ainsi que le nom de la rue"

      cityErrorElem.innerHTML = "Le nom de la ville ne doit être constitué que de lettres"

      emailErrorElem.innerHTML = "L'email doit être composer de @ et .com/fr"

    };

     
    // si je n'ai pas d'erreur sur le formulaire
    // alors je peux executer le reste
    // if( regexEmail.test(email.value) ET condition 2 ET condition 3){
    //   alors je fais le reste du traitement 
    // }

    let contact = {
      firstName : firstName.value,
      lastName : lastName.value,
      address : address.value,
      city : city.value,
      email : email.value,
    }


    let products = []
    allItems.forEach(el => {
      console.log("el", el)
      products.push(el.info._id)
    })
    console.log("products", products)
    
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
      console.log("dataFromAPI", dataFromAPI)
      let order = dataFromAPI.orderId
        document.location.href="http://127.0.0.1:5500/front/html/confirmation.html?orderid="+order; 
    })
  })

    // orderId = 60324100-fb7e-11ec-87e2-31a1f0f8bf69
  
