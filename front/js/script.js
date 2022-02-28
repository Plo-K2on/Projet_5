// fetch("http://localhost:3000/api/products/");

// const obj = {
//     colors: [
//       Blue,
//       White,
//       Black
//     ],
//     _id: 107fb5b75607497b96722bda5b504926,
//     name: Kanap Sinopé,
//     price: 1849,
//     imageUrl: http://localhost:3000/images/kanap01.jpeg,
//     description: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum,
//     altTxt: "Photo d'un canapé bleu, deux places";
//   },
var Tableproduits = []  
fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(dataFromAPI) {
    console.log(dataFromAPI);
    Tableproduits = dataFromAPI; // données de l'Api stockés dans ma variable produits

    // variable eltItems = balise qui a pour id 'items'
    let eltItems = document.getElementById('items');
    
    // je boucle sur mon tableau de produits
    for (let produit of Tableproduits) {
      console.log('name' + produit.name);

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
     
      // eltItems.innerHTML = "<a href=''>TEST</a>";

      // création des éléments
      let p = document.createElement("texte");
      let img = document.createElement("img");

      // manipulation (affectation de valeurs)
      p.innerHTML = produit.description;
      img.src = produit.imageUrl;

      // test
      // intégration des éléments dans le DOM
      article.appendChild(p);
      article.appendChild(img);
      eltItems.appendChild(productLink)
    }

    // for (let produit of Tableproduits) {
    //   console.log('image' + produit.imageUrl);
    //   // let article = document.createElement("article");
    //   let img = document.createElement("img");
    //   img.innerHTML = produit.imageUrl
    //   eltItems.appendChild(article)
    //   article.appendChild(img);
    //   }

  })
  // .catch(function(err) {
  //   // Une erreur est survenue
  // });


//   const numberOfProducts = 8;
// for (let i = 0; i < numberOfProducts; i++) {
//    console.log("numberItems");
// }


// var str = "http://localhost:3000/api/products";
// var url = new URL(str);
// var name = url.searchParams.get("name");
// console.log(name);

// var str = "http://localhost:3000/api/products";
// var url = new URL(str);
// var search_params = new URLSearchParams(url.search); 
// if(search_params.has('name')) {
//   var name = search_params.get('name');
//   console.log(name)
// }

// for (var p of mySearchParams);