let title = document.getElementById("title");
let price = document.getElementById("price excluding tax");
let costs = document.getElementById("costs on purchase");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;


// get total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +costs.value + +taxes.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

// create product

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    costs: costs.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if(title.value !='' 
  && price.value !='' 
  && category.value !=''
  && newPro.count < 500){
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
      clearData()
    }

  }else {
    dataPro[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  // save localstorage

  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
};

// clear inputs (entrer un prdt)

function clearData() {
  title.value = "";
  price.value = "";
  costs.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read (les prdts qui entrent)

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += ` 
  <tr>
  <td>${i+1}</td>
  <td>${dataPro[i].title}</td>
  <td>${dataPro[i].price}</td>
  <td>${dataPro[i].costs}</td>
  <td>${dataPro[i].taxes}</td>
  <td>${dataPro[i].discount}</td>
  <td>${dataPro[i].total}</td>
  <td>${dataPro[i].category}</td>
  <td><button onclick = "updateData( ${i} )" id="update">update</button></td>
  <td><button onclick = "deleteData( ${i} )" id="delete">delete</button></td>
</tr>
  `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
<button onclick="deleteAll()">delete All(${dataPro.length})</button>
`;
  } else {
    btnDelete.innerHTML = "";
  }
}

showData();

// delete

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// count (ajouter combien des prds entrer)

// update

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  costs.value = dataPro[i].costs;
  taxes.value = dataPro[i].taxes;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "Update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search by Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search by Category";
  }
  search.focus();
  search.value = '';
  showData()
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += ` 
  <tr>
  <td>${i}</td>
  <td>${dataPro[i].title}</td>
  <td>${dataPro[i].price}</td>
  <td>${dataPro[i].costs}</td>
  <td>${dataPro[i].taxes}</td>
  <td>${dataPro[i].discount}</td>
  <td>${dataPro[i].total}</td>
  <td>${dataPro[i].category}</td>
  <td><button onclick = "updateData( ${i} )" id="update">update</button></td>
  <td><button onclick = "deleteData( ${i} )" id="delete">delete</button></td>
</tr>
  `;
      }
    }

  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += ` 
  <tr>
  <td>${i}</td>
  <td>${dataPro[i].title}</td>
  <td>${dataPro[i].price}</td>
  <td>${dataPro[i].costs}</td>
  <td>${dataPro[i].taxes}</td>
  <td>${dataPro[i].discount}</td>
  <td>${dataPro[i].total}</td>
  <td>${dataPro[i].category}</td>
  <td><button onclick = "updateData( ${i} )" id="update">update</button></td>
  <td><button onclick = "deleteData( ${i} )" id="delete">delete</button></td>
</tr>
  `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}


