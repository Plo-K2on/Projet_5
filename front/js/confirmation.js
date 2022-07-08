// créer et appeler la fonction qui permet de récupérer l'orderid dans l'URL
// créer et appeler la fonction qui permet de rajouter l'orderid de la commande sur ta page

function principal(){
    console.log("principal")

    recuperer();

    // ajouter()
}

// let orderNumber = null;

function recuperer(){

    var str = "http://127.0.0.1:5500/front/html/confirmation.html?orderid=71860100-fc30-11ec-a4fc-e74f7e75caaa";

        let url = new URL(window.location.href);
        let search_params = new URLSearchParams(url.search); 

        if(search_params.has('orderid')) {
           var orderNumber = search_params.get('orderid')

    console.log(orderNumber)
    }

    let ajoutOrder = document.querySelector("#orderId");
    // let numeroConfirm = orderNumber

    ajoutOrder.innerHTML = orderNumber;

    // console.log(numeroConfirm)

}

function ajouter(orderNumber){

    // let ajoutOrder = document.querySelector("#orderId");
    // let numeroConfirm = orderNumber

    // ajoutOrder.innerHTML = orderNumber;

    // console.log(numeroConfirm)

}
principal();



