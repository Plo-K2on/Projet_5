// initialisation de variables global 
let idProduct = null;
let product = null;

// récupérer l'id du produit grace à URLSearchParams
let url = new URL(window.location.href);
let search_params = new URLSearchParams(url.search); 

// stocker cette id dans une variable
if(search_params.has('id')) {
  idProduct = search_params.get('id')
  // console.log('idProduct', idProduct)
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
        // console.log("couleurs" + colors);
      }
  });

      // Gestionnaire d'évenement
      const elt = document.getElementById('addToCart');
      elt.addEventListener('click', function () {
        // appel de la fonction
         addToCart ()
        });

      function addToCart (){
      
        let allItems = JSON.parse(localStorage.getItem('panier')) || []
        let itemCart = {}
        let variant = document.getElementById ('colors').value
        let quantity = document.getElementById ('quantity').value
        
        itemCart.info = product
        itemCart.selectedVariant = variant
        itemCart.quantity = parseInt(quantity)
        console.log ('itemCart', itemCart)

      // Ajouter 2 produits du même nom dans le panier puis verifier le resultat
      // Si le produit n'apparait qu'une seul fois mais avec une quantité de 2 : ne rien faire
      // Si le nom du produit apparaît 2 fois, il faut assembler les 2 produits
      // Utiliser la méthode .find pour trouver tout les éléments en doublons 
      // Ensuite utiliser une conditionnelle pour executer l'action souhaiter en cas de doublons
      // Répeter l'action d'ajouts au panier de plusieurs produit du même nom puis verifier le resultat
        










      }
