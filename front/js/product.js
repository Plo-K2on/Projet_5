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








      

      // let idElem = document.createElement('id')
      // idElem.innerText = product._id;
      // // select_id.appendChild(optionElem)
      
    

    
      // let optionElem = document.createElement('name')
      // optionElem.innerText = name;
      // // selectColors.appendChild(optionElem)
      // console.log("name" + name);
    

    // for (let price of product.price) {
    //   let optionElem = document.createElement('prix')
    //   optionElem.innerHTML = price;
    //   // selectColors.appendChild(optionElem)
    //   console.log("prix" + price);
    // }

    
      // let optionElem = document.createElement('image')
      // optionElem.innerText = imageUrl;
      // // selectColors.appendChild(optionElem)
      // console.log("image" + imageUrl);
    

    // attention cas particulier pour les colors, ce sont des boucles
    let selectColors = document.getElementById ("colors");
      
      for (let colors of product.colors) {
        let optionElem = document.createElement('option')
        optionElem.innerText = colors;
        selectColors.appendChild(optionElem)
        console.log("couleurs" + colors);
      }

    
  });
