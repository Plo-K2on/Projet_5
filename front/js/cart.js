
// Récuperer les elements du panier depuis le localstorage
// Faire afficher les éléments de allItems (le panier) dans la page panier
// Ajouter la possibilitée de modifier un article dans le panier
// Ajouter la possibilitée de supprimer un article dans le panier
// Créer une fonction pour calculer et afficher le prix total du panier en fonction des éléments de celui-ci
// Créer une fonction pour calculer et afficher le nombre total d'articles du panier en fonction des éléments de celui-ci
// Récupérer et analyser les données saisies par l’utilisateur dans le formulaire.
// Afficher un message d’erreur si besoin.
// Créer un objet contact
// Créer un tableau d'ID de produits.
// Effectuer une requête POST (en lui passant dans un objet les infos de contact et le tableau d'ID de produit) sur l’API et récupérer l’identifiant de commande dans la réponse de celle-ci.
// Rediriger l’utilisateur sur la page Confirmation, en passant l’id de commande dans l’URL, dans le but d’afficher le numéro de commande sur la page de confirmation


function principal() {
  console.log("ma fonction principale démarre ici")
  // Récuperer les elements du panier depuis le localstorage
  let allItems = JSON.parse(localStorage.getItem('panier')) || []

  // Faire afficher les éléments de allItems (le panier) dans la page panier
  // j'appelle ma fonction affichePanier
  affichePanier(allItems)
}
  
// fonction pour afficher le contenu du localstorage sur la page panier
function affichePanier(elementsPanier) {
  console.log("je dois afficher le panier, comment faire Hugo ? ")
  elementsPanier.forEach(element => {
    console.log("element", element)
    // soit utiliser la meme methode que dans la page scripts

    // ou utiliser

    const cartContainer = document.getElementById("cart__items")
    cartContainer.innerHTML += 
    `
    <h3>${element.info.name}</h3>
    <p>${element.info.altTxt}</p>
    <p>${element.info.colors}</p>
    <p>${element.info.description}</p>
    <p>${element.info.price}</p>
    <p>${element.info._id}</p>
    <div class="cart__item__img">
      <img src="${element.info.imageUrl}" alt="Photographie d'un canapé">
    </div>
    `

  });
}
  
// Ma page se charge j'appelle ma fonction principale qui est exécuté en premier
principal();

// gestionnaires des evènements
  