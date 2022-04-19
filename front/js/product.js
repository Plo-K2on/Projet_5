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

     let error = 0
      // SI la quantité sélectionné est ÉGAL à 0
      // ALORS je fait apparaitre un message d'alerte
      if (quantity == 0) {
        error = 1
        alert("panier vide")
      }

      // SI la variante sélectionné est VIDE
      // ALORS je fait apparaitre un message d'alerte
      if (variant == '') {
        error = 1
        alert("panier vide")
      }
      
      // SI il n'y a pas d'erreur
      if (error == 0){
      }
      
      console.log('allItems', allItems)
      // vérifier que l'ID ET la variante de l'itemCart qu'on rajoute ne se trouvent pas dans 
      // const found = array1.find(element => element > 10);
      const found = allItems.find(ligne => product._id == ligne.info._id && product.variant == ligne.variant)
      console.log('found', found)

      // SI l'ID du produit et La même variante sont présent dans allItems
      // ALORS j'augmente la quantité de ce produit dans allItems
      // SINON j'augmente la quantité de itemCart ET j'ajoute itemCart au tableau allItems
      
      if (product._id && product.variant in allItems) {
      
      }else if (product.quantity + 1){
        
      }else if (itemCart + 1){ // j'ai un doute de si je dois utiliser + ou += .
      }
      allItems.push(itemCart)
      
      // J'enregistre allItems dans le localStorage a la place de l'ancienne valeur
      localStorage.getItem('panier')

    }
