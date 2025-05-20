const output = document.getElementById("output");
const buyNow = document.getElementById("buyNow");
const shoppingItems = document.getElementById("shopping-items");
const detailsContainer = document.getElementById("details-container");
const productQuantity=document.getElementById("productQuantity");
const productPrice=document.getElementById("productPrice");
const deliveryCharge=document.getElementById("deliveryCharge");
const tax=document.getElementById("tax");
const total=document.getElementById("total");

const showProfileData = async () => {
    const res = await fetch(`https://fakestoreapi.com/products`,{
        method: "GET",
    })
    const data = await res.json()
    for (const user of data) {
        const div = document.createElement("div");
        div.classList.add("border-4","bg-gray-100");
        div.innerHTML = `
            <div><img class="h-[300px] w-full p-4" src="${user.image}" alt=""></div>
            <div class="bg-black text-white border p-4">
                <h2 class="p-2 text-3xl font-bold">${user.title}</h2>
                <p class="p-2 text-xl">Category: ${user.category}</p>
                <p class="p-2 text-2xl font-bold">Price: ${user.price}</p>
                <p class="p-2 text-xl">Rating: ${user.rating.rate}</p>
                <p class="p-2 text-xl">Review: ${user.rating.count}</p>
                <div class="flex items-center justify-center gap-4">
                    <button onclick="addToCart(${user.id})" class="bg-green-400 cursor-pointer hover:text-white p-2 text-xl font-bold">Add to cart</button>
                    <button onclick="shoppingDetails(${user.id})" class="bg-blue-400 cursor-pointer hover:text-white p-2 text-xl font-bold">Details</button>
                </div>
            </div>
        `
        shoppingItems.appendChild(div);
    }
}

const shoppingDetails = (id) =>{
    detailsContainer.classList.remove("hidden");
    detailsContainer.innerHTML = ``
    fetch(`https://fakestoreapi.com/products/${id}`).then(response=>response.json()).then((data) =>{
        const div = document.createElement("div");
        div.classList.add("border-4","block", "bg-gray-200", "p-4");
        div.innerHTML = `
        <div class="flex justify-center"><img class="p-4 h-[400px] w-auto" src="${data.image}" alt=""></div>
        <div class="bg-black text-white p-4">
          <h2 class="text-3xl mb-4"><span class="font-bold ">Product name: </span>${data.title}</h2>
          <p class="text-xl mb-4"><span class="font-bold">Details: </span>${data.title}</p>
          <button onclick="closeDetails()" class=" bg-red-500 cursor-pointer hover:text-white p-4 text-xl">Close</button>
        </div>
        `
        detailsContainer.appendChild(div);
    })
}

const closeDetails = () =>{
    detailsContainer.classList.add("hidden");
}

const addToCart = (id) =>{

    fetch(`https://fakestoreapi.com/products/${id}`).then(response=>response.json()).then((data) =>{
        //let productQuantity = 0
        productQuantity.innerHTML = Number(productQuantity.innerHTML)+ Number(1)
        //productPrice.innerHTML = Number(productPrice.innerHTML) + Number(data.price);
        let priceDigit = Number(productPrice.innerHTML) + Number(data.price);
        productPrice.innerHTML = priceDigit.toFixed(2);
        deliveryCharge.innerHTML = Number(20);
        tax.innerHTML = Number(0).toFixed(2);
        //total.innerHTML = Number(productPrice.innerHTML)  + Number(tax.innerHTML) + Number(deliveryCharge.innerHTML);
        let calcTotal = Number(productPrice.innerHTML)  + Number(tax.innerHTML) + Number(deliveryCharge.innerHTML);
        total.innerHTML = calcTotal.toFixed(2);


    })
}

showProfileData()

buyNow.addEventListener('click',()=>{
    output.classList.remove("hidden");
})


