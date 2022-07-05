// créer et appeler la fonction qui permet de récupérer l'orderid dans l'URL
// créer et appeler la fonction qui permet de rajouter l'orderid de la commande sur ta page

function principal(){
    console.log("principal")

}

principal();


function recuperer(){

    var str = "http://127.0.0.1:5500/front/html/confirmation.html?orderid=71860100-fc30-11ec-a4fc-e74f7e75caaa";
        var url = new URL(str);
        var orderNumber = url.searchParams.get("71860100-fc30-11ec-a4fc-e74f7e75caaa");
        console.log(orderNumber);

    console.log("recuperer")
}

recuperer();

function ajouter(){
    const ajoutOrder = document.querySelector("#orderId");
    const numeroConfirm = 
    `
    60324100-fb7e-11ec-87e2-31a1f0f8bf69
    `

    ajoutOrder.insertAdjacentText("afterbegin", numeroConfirm);

    console.log("ajouter")

}

ajouter();