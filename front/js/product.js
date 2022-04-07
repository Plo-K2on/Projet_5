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

      function addToCart (){
        // j'initialise un tableau
        // ok pour cette première étape mais ce n'est pas complet
        // l'idée c'est que tu récupère le localstorage courant que tu stock ensuite dans ta variable tableau
        //  => si le localstorage est vide donc tu initialise ta varible allitems avec un tableau vide
        //  => si le localstorage n'est pas vide, alors allitems prends la valeurs du localstorage (qui est un tableau)
        // Je récupère le localstorage existant
        let allItems = JSON.parse(localStorage.getItem('panier')) || []
        console.log('before', allItems)
        // j'initialise mon item à ajouter dans le panier
        let itemCart = {}

        // je récupère les valeurs des selects
        let variant = document.getElementById ('colors').value
        let quantity = document.getElementById ('quantity').value

        // j'ajoute ces valeurs + les infos du produit dans mon itemCart
        itemCart.info = product
        itemCart.selectedVariant = variant
        itemCart.quantity = parseInt(quantity)
        console.log ('itemCart', itemCart)
 
        // je push mon itemCart dans le tableau si il n'existe pas déja
        // sinon on augment la quantité
        // utiliser la methode .find comme vu pendant la session
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        const monTableau = [
          {nom: 'Sinopé', quantité: 0},
          {nom: 'Cyllène', quantité: 0},
          {nom: 'Calycé', quantité: 0},
          {nom: 'Autonoé', quantité: 0},
          {nom: 'Eurydomé', quantité: 0},
          {nom: 'Hélicé', quantité: 0},
          {nom: 'Thyoné', quantité: 0},
          {nom: 'Orthosie', quantité: 0}
        ];

        const resultat = monTableau.find(produit => produit.nom > 2);

        console.log(resultat);

        // utiliser une conditionnelle

        if (produit.nom > 2){
          resultat
        }
          
        // } else if (produit.nom  > 5) {

        
        // si un element est déja présent dans le tableau alors on augmente uniquement la quantité
        
        itemCart.quantity += parseInt(quantity) // soit ca
        
        allItems.push(itemCart) // soit ca

        // j'enregistre ce tableau dans le localstorage
        localStorage.setItem('panier' , JSON.stringify(allItems));

        console.log ('after', localStorage)


        var el = document.querySelector('#utilisateur');

        chaîne = element.dataset.allItems;
        element.dataset.allItems = chaîne;
        
      }
      
      
          
      // if(!localStorage.getItem('panier')) {
      //   populateStorage();
      // } else {
      //   setStyles();
      // }

      // localStorage.setItem('panier', tontableau);

