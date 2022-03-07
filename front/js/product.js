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
    console.log('dataFromAPI', dataFromAPI)
    // stocker les infos du produit dans la variable product

    // création du noeud parent

    // faire afficher les infos du produit (comme pour la liste des produits)
    // attention cas particulier pour les colors, ce sont des boucles

  });







