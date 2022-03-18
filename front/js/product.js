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
    let itemImgElem = document.querySelector('.item__img');
    let titleElem = document.getElementById('title');
    titleElem.innerHTML = product.name

    // faire afficher les infos du produit (comme pour la liste des produits)
    for (let _id of product._id) {
      let optionElem = document.createElement('id')
      optionElem.innerText = _id;
      // select_id.appendChild(optionElem)
      console.log("id" + _id);
    }

    for (let name of product.name) {
      let optionElem = document.createElement('name')
      optionElem.innerText = name;
      // selectColors.appendChild(optionElem)
      console.log("name" + name);
    }

    for (let price of product.price) {
      let optionElem = document.createElement('prix')
      optionElem.innerHTML = price;
      // selectColors.appendChild(optionElem)
      console.log("prix" + price);
    }

    for (let imageUrl of product.imageUrl) {
      let optionElem = document.createElement('image')
      optionElem.innerText = imageUrl;
      // selectColors.appendChild(optionElem)
      console.log("image" + imageUrl);
    }

    // attention cas particulier pour les colors, ce sont des boucles
    let selectColors = document.getElementById ("colors");
      
      for (let colors of product.colors) {
        let optionElem = document.createElement('option')
        optionElem.innerText = colors;
        selectColors.appendChild(optionElem)
        console.log("couleurs" + colors);
      }

    
  });
