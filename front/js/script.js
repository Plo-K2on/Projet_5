
var Tableproduits = []  
fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(dataFromAPI) {
    Tableproduits = dataFromAPI; // données de l'Api stockés dans ma variable produits

    // variable eltItems = balise qui a pour id 'items'
    let eltItems = document.getElementById('items');
    
    // je boucle sur mon tableau de produits
    for (let produit of Tableproduits) {

      let productLink = document.createElement("a")
      productLink.href = "./product.html?id=" + produit._id

      // je créé une balise article que je stock dans la
      // variable article
      let article = document.createElement("article");

      // je créé un élément h3 que je stock dans
      // la variable h3
      let h3 = document.createElement("h3");
      

      // je rajoute l'élément article dans mon élément items
      // pour le faire afficher
      productLink.appendChild(article)

      // le h3 a pour text TEST
      h3.innerHTML = produit.name

      // h3 est ajouté au contenu de ma variable article
      article.appendChild(h3);
     
      // création des éléments
      let p = document.createElement("p");
      let img = document.createElement("img");

      // manipulation (affectation de valeurs)
      p.innerHTML = produit.description;
      img.src = produit.imageUrl;
      
      // intégration des éléments dans le DOM
      article.appendChild(img);
      eltItems.appendChild(productLink)
      article.appendChild(p);
    }
  });