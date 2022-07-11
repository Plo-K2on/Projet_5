
function principal(){
    recuperer();
}

function recuperer(){

    let url = new URL(window.location.href);
    let search_params = new URLSearchParams(url.search); 

    let orderNumber;

    if(search_params.has('orderid')) {
        orderNumber = search_params.get('orderid')

        let ajoutOrder = document.querySelector("#orderId");

        ajoutOrder.innerHTML = orderNumber;
    }
}

principal();