const rowEl = document.querySelector('.row')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const sortInputs = document.querySelectorAll('[name=sortByPrice]')
const selectCategory = document.getElementById('selectCategory')
const changePrice = document.getElementById('changePrice')
const totalItems = document.getElementById('totalItems')
const totalPay = document.getElementById('totalPay')
const market=document.getElementById('MarketItems')
const modal = document.getElementById("myoffcanvas");
const modalbody = document.getElementById("modalbody");
const myoffcanvese = document.getElementById("myBtn");
const closemyoffcanvese = document.getElementsByClassName("close")[0];
const windows=document.getElementById("addwindow");
const additems=document.getElementById("additems");
const closeadditems = document.getElementsByClassName("closes")[0];
const addProduct=document.getElementById("addProdect")
const removeitem=document.getElementById("removeitems")
const removeWindow=document.getElementById("removewindow")
const closeremoveitems = document.getElementsByClassName("remove")[0];
const removeProduct=document.getElementById("removeProdect")

const products = 
[
    {
       "id":"1",
        "cat":"food",
        "name":"Milk",
        "price":"6",
        "image":"https://cdn.pixabay.com/photo/2017/07/05/15/41/milk-2474993_150.jpg"
    },
    {
       "id":"2",
        "cat":"food",
        "name":"Bread",
        "price":"8",
        "image":"https://cdn.pixabay.com/photo/2014/07/22/09/59/bread-399286_150.jpg"
    },
    {
       "id":"4",
        "cat":"food",
        "name":"Eggs",
        "price":"12",
        "image":"https://cdn.pixabay.com/photo/2015/09/17/17/19/egg-944495_150.jpg"
    },
    {
       "id":"3",
        "cat":"clothing",
        "name":"Coat",
        "price":"120",
        "image":"https://cdn.pixabay.com/photo/2015/05/29/19/19/person-789663_150.jpg"
    },
    {
       "id":"5",
        "cat":"clothing",
        "name":"Dress",
        "price":"4000",
        "image":"https://cdn.pixabay.com/photo/2016/06/29/04/17/wedding-dresses-1485984_150.jpg"
    },
    {
       "id":"6",
        "cat":"clothing",
        "name":"Shirt",
        "price":"70",
        "image":"https://cdn.pixabay.com/photo/2014/08/05/10/31/waiting-410328_150.jpg"
    },
    {
       "id":"7",
        "cat":"animals",
        "name":"Dog food",
        "price":"70",
        "image":"https://cdn.pixabay.com/photo/2017/04/07/10/53/dog-2210717_150.jpg"
    },
    {
       "id":"8",
        "cat":"animals",
        "name":"Cat toy",
        "price":"50",
        "image":"https://cdn.pixabay.com/photo/2018/07/21/09/17/cat-3552143_150.jpg"
    }
];

const originalProducts = [...products]
let basket = [];

const showTotalItems = ()=>{
  totalItems.innerHTML =  basket.reduce((p, c) =>{
    return p +  c.qty
  }, 0)
}
const calculateTotalPay = ()=>{
    totalPay.innerHTML = basket.reduce((p, c) =>{
        return p + c.price * 1 * c.qty
       }, 0)
}
const removeFromBasket = (obj) => {
  basket = basket.filter((item) => item.id !== obj.id);
  showTotalItems();
  calculateTotalPay();
  renderBasket();
  console.log(obj.id);
};
const updateQty = (productId, op) => {
  basket = basket.map((el) => {
    if (el.id === productId) {
      if (op === '+') {
        el.qty++;
      } else {
        el.qty--;
        if (el.qty < 1) {
          return removeFromBasket(el);
        }
      }
    }
    return el;

  }).filter(el=>el);
};
  
const renderBasket = () => {
  market.innerHTML = '';
  modalbody.innerHTML='';
  const cardEl = basket.map(item => {
    const itemInBasket = { ...item };
    return CardInbasket(itemInBasket);
  });
  market.append(...cardEl);
  modalbody.append(...cardEl);
};
const CardInbasket = (obj) => {
  const cardEl = document.createElement('div');
  cardEl.className = 'card p-2 my-2 shadow';
  const card = document.createElement('div');
  card.className = 'row';
  const cardElv = document.createElement('div');
  cardElv.className = 'd-flex justify-content-between align-items-center';
  const xDiv = document.createElement('div');
  const xcreate = document.createElement('i');
  xcreate.className = 'bi bi-x';
  xDiv.id=`x_${obj.id}`
  xDiv.addEventListener("click", () => removeFromBasket(obj));
  xDiv.append(xcreate)
  cardElv.append(xDiv);
  cardElv.append(card);
  card.innerHTML = `
    <img src="${obj.image}" alt="${obj.name}">
    <h2>${obj.name}<br><small>Price:${obj.price}</small></h2>
    <div>Category: ${obj.cat}</div>
    <p>Total Item: ${obj.qty}</p>
  `
  const btn = document.createElement('button');
  const btn1 = document.createElement('button');
  btn.className = 'btn btn-success mx-auto my-1 w-25';
  btn.innerHTML = `+`;
  btn.id = `id_${obj.id}`;
  btn.addEventListener('click', handleAddToCartClick);
  btn1.className = 'btn btn-danger mx-auto my-1 w-25';
  btn1.innerHTML = `-`;
  btn1.id = `id_${obj.id}`;
  btn1.addEventListener('click', handleRemoveFromCartClick);
  cardEl.append(cardElv);
  card.append(btn, btn1);
  cardEl.append(card);
  return cardEl;
};

const handleAddToCartClick = (e) => {
  const productId = e.target.id.split('_')[1];
  const product = products.find(el => el.id == productId);
  if (!basket.find(el => el.id === product.id)) {
    const newProduct = { ...product };
    newProduct.qty = 1;
    basket.push(newProduct);
  } else {
    updateQty(productId, '+');
  }
  showTotalItems();
  calculateTotalPay();
  renderBasket();
};

const handleRemoveFromCartClick = (e) => { 
  const productId = e.target.id.split('_')[1];
  updateQty(productId, '-');
  showTotalItems();
  calculateTotalPay();
  renderBasket();
};

const createCard = (obj)=>{
  const cardEl = document.createElement('div')
  cardEl.className = 'col-md-4 p-2'
  const card = document.createElement('div')
  card.className = 'card p-2 shadow-white'
  card.innerHTML = `
    <img src="${obj.image}" alt="${obj.name}">
    <h2>${obj.name}<br><small>Price:${obj.price}</small></h2>
    <div>Category: ${obj.cat}</div>
    <div>Prudect ID: ${obj.id}</div>
  `;
  const btn = document.createElement('button')
  btn.className = 'btn btn-success mx-auto my-1 w-50'
  btn.innerHTML = `Buy Now!!!`
  btn.id = `id_${obj.id}`
  btn.addEventListener('click', handleAddToCartClick)
  card.append(btn)
  cardEl.append(card) 
  return cardEl
}

console.log(market);
const addContent = (holder, content) => holder.append(content)

const renderCards = (arr, holder) =>{
  holder.innerHTML = '';
  arr.map(el => addContent(holder, createCard(el)))
}
const handleSearch = ()=>{
  const term = searchInput.value 
  const filtered = products.filter(el => el.name.toLowerCase().includes(term.toLowerCase()))
  renderCards(filtered, rowEl)
}
const handleSelectCategory = ()=>{
  const category = selectCategory.value;
  let filtered =[...products];
  if (category !== 'all')
    filtered =  products.filter(el => el.cat === category)
  renderCards(filtered, rowEl)
}
renderCards(products, rowEl)

const handleSort = (e)=>{
  const sortOptions = {
      low: (a,b)=> a.price - b.price,
      high: (b,a)=> a.price - b.price
  }
  console.log(sortOptions['low']);
  let  sortedProducts = [...products]
  if (e.target.value !=='luck')
  sortedProducts.sort(sortOptions[e.target.value])
  renderCards(sortedProducts, rowEl)
}
const handleChangePrice = ()=>{
  const products = products.map(el =>{
    const product = {...el}
    product.price = (product.price * changePrice.value).toFixed(2)
    return product
  })
  renderCards(products, rowEl)
}

const click = () => {
  modal.style.display = "block";
};

myoffcanvese.addEventListener("click", click);

const closer = () => {
  modal.style.display = "none";
};

closemyoffcanvese.addEventListener("click", closer);
const win=(e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
}
modal.addEventListener("click",win)
const clickadditem = () => {
  additems.style.display = "block";
};
windows.addEventListener("click", clickadditem);
const closeadditem = () => {
  additems.style.display = "none";
};
closeadditems.addEventListener("click", closeadditem);
const winadditem=(e) => {
  if (e.target === additems) {
    additems.style.display = "none";
  }
}
additems.addEventListener("click",winadditem)
const clickremoveitem = () => {
  removeitem.style.display = "block";
};

removeWindow.addEventListener("click", clickremoveitem);

const closeremoveitem = () => {
  removeitem.style.display = "none";
};

closeremoveitems.addEventListener("click", closeremoveitem);
const winremoveitem=(e) => {
  if (e.target === removeitem) {
    removeitem.style.display = "none";
  }
}
removeitem.addEventListener("click",winremoveitem)
const addProducts=()=>{
  let obj = {};
  obj.id = `${products.length + 1}`;
  obj.cat = document.getElementById('addCat').value;
  obj.name = document.getElementById('addName').value;
  obj.price = document.getElementById('addPrice').value;
  obj.image = document.getElementById('addImg').value;
  if (obj.cat != '' && obj.name != '' && obj.price != '' && obj.image != ''&& obj.name) {
    products.push(obj);
    renderCards(products,rowEl);
  }
}
const removeProducts = () => {
  const removeId = document.getElementById('removeid').value;
  const removeName = document.getElementById('removeName').value;
  const finditem = products.find(el => el.name == removeName && el.id == removeId);
  console.log(finditem);
  if (finditem != undefined) {
      products.splice(finditem.id - 1, 1);
      document.getElementById('info_div').innerHTML = `<p class="text-success">Removed successfully!</p>`;

      let count = 1;
      products.forEach(el => el.id = `${count++}`);
      renderCards(products,rowEl);
      console.log(products);

  } else
      document.getElementById('info_div').innerHTML = `<p class="text-danger">U idiot try again and write well the  Product id and the name Product  ⚠</p>`;

};
removeProduct.addEventListener("click",removeProducts)
sortInputs.forEach(el => el.addEventListener('change', handleSort))
searchBtn.addEventListener('click', handleSearch )
selectCategory.addEventListener('change' , handleSelectCategory)
changePrice.addEventListener('change', handleChangePrice)
addProduct.addEventListener("click",addProducts)