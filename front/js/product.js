// initialisation de variables global 
let idProduct = null;
let product = null;

// récupérer l'id du produit grace à URLSearchParams
let url = new URL(window.location.href);
let search_params = new URLSearchParams(url.search); 

// stocker cette id dans une variable
if(search_params.has('id')) {
  idProduct = search_params.get('id')
  console.log('idProduct', idProduct)
}
// faire un appel a l'api en concaténant l'url de l'api + la variable qui stock l'id du produit
fetch("http://localhost:3000/api/products/" + idProduct)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(dataFromAPI) {
    // stocker les infos du produit dans la variable product
    product = dataFromAPI;
    console.log('product', product)

    // création ou positionnement sur le noeud parent
    
    let titleElem = document.getElementById('title');
    let priceElem = document.getElementById('price');
    let descriptionElem = document.getElementById ('description')
    titleElem.innerHTML = product.name

    // faire afficher les infos du produit (comme pour la liste des produits)
    
    // Selectionner le parent de l'image
    let itemImgElem = document.querySelector('.item__img');
    // Créer un élement image
    let img = document.createElement("img");
    // hydrater sa prop source
    img.src = product.imageUrl
    // hydrater sa prop Alt
    img.alt = product.altTxt
    // Injecter element img dans son parent
    itemImgElem.appendChild(img) 

    // Name/title
    let h1 = document.createElement("title");
    titleElem.innerHTML = product.name

    // prix
    let span = document.createElement("price");
    priceElem.innerHTML = product.price

    // description
    let id = document.createElement("description");
    descriptionElem.innerHTML = product.description


    // attention cas particulier pour les colors, ce sont des boucles
    let selectColors = document.getElementById ("colors");
      
      for (let colors of product.colors) {
        let optionElem = document.createElement('option')
        optionElem.innerText = colors;
        optionElem.value = colors
        selectColors.appendChild(optionElem)
        console.log("couleurs" + colors);
      }
  });

      // Gestionnaire d'évenement
      const elt = document.getElementById('addToCart');
      elt.addEventListener('click', function () {
        // appel de la fonction
         addToCart ()
        });

      // Localstorage

      // def de la fonction
        function addToCart (){
          let variant = document.getElementById ('colors').value
          let itemCart = {}
          itemCart.info = product
          itemCart.selectedVariant = variant
          console.log ('itemCart', itemCart)

          let variantQauntity = document.getElementById ('quantity').value
          let itemQuantity = {}
          itemQuantity.info = product
          itemQuantity.selectedVariant = variantQauntity
          console.log ('itemQuantity', itemQuantity)
          
          let allItems = []

          allItems.push(itemCart)

          localStorage.setItem('panier', allItems);
          
          let objJson = {
            itemCart : 1,
            itemQuantity : 1,
        }
        let objLinea = JSON.stringify(objJson);
        localStorage.setItem("obj",objLinea);

        console.log (localStorage)

          // let cartLink = document.createElement("a")
          // cartLink.href = "./cart.html?id" + itemCart._id


          // ajouter la quantité dans une nouvelle propriété de l'objet itemCart
          // ajouter l'objet itemCart dans le panier
          //// créer un tableau vide (nommé allItems)
          //// dans ce tableau vide on va push objet itemCart
          //// enregistrer le tableau dans localstorage
          ////(il va falloir peut etre utiliser JSON.stringify(surtontableau))
          // faire un console.log du localstorage
        }

    
          
      // if(!localStorage.getItem('panier')) {
      //   populateStorage();
      // } else {
      //   setStyles();
      // }

      // localStorage.setItem('panier', tontableau);

