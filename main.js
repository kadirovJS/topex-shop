let con = document.getElementById("con");
let form = document.getElementById("form");
let postBtn =document.getElementById("post")
let load  = document.getElementById("load")

let api = "https://topex-shop-bec.onrender.com/products"

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);

  let obj = Object.fromEntries(formData);
  addData(obj);
  load.style.display = "block"
});


con.addEventListener("click" , ( e ) => {
  console.log(e.target.dataset)
  if(e.target.classList.contains("del")){
    let id = e.target.dataset.id
    deleteProduct(id)
  }
})


function deleteProduct(productId){
  
  fetch(`${api}/${productId}` , 
    {
      method:"DELETE",
      headers:{
           "ngrok-skip-browser-warning": "true",
           "Content-type": "application/json",
      },
    }).then((res) => res.json())
      .then((data) => {
        getDat()
      })
      .catch((err) => console.log(err))
      .finally(() => {})
}

function addData(value) {
  fetch(api, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-type": "application/json",
    },
    body: JSON.stringify(value),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      getDat();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      
         load.style.display = "none"
    });
}

function getDat() {
  fetch(api, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      renderUI(data);
    })
    .catch((err) => console.log(err))
    .finally(() => {});
}

getDat();

function renderUI(arr) {
  con.innerHTML = "";

  arr.forEach((products) => {
    con.innerHTML += `<div class="max-w-sm rounded-2xl overflow-hidden text-center shadow-lg bg-white p-5">
  <img 
    class="h-[400px]w-full rounded-xl"
    src="${products.image}"
    alt=""
  >
  <h2 class="text-xl font-bold mt-4">
    ${products.name}
  </h2>
  <h2 class="text-xl mt-2 ">
    Price:${products.price}
  </h2>
  <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
    Batafsil
  </button>

  <button data-id="${products.id}" class="del mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
    O'chirish
  </button>

</div>`;
  });
}
