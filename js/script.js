const state = {
  userList: [
    {
      name: "Esra",
      balance: 600,
      id: 26,
    },
    {
      name: "İsmail",
      balance: 800,
      id: 13,
    },
  ],
  historyList: [],
  filteredList: [],
  stockList: [],
  cartList: [],
  optionList: [
    {
      name: "Esra",
      id: 26
    },
    {
      name: "İsmail",
      id: 13
    }
  ]
};



function renderUserList() {
  const subscribers = [document.getElementById("user-list")];
  subscribers.forEach(function (subscriber) {
    subscriber.innerHTML = "";
    state.userList.forEach(function (item) {
      const yeniLi = document.createElement("li");
      yeniLi.className =
        "list-group-item d-flex justify-content-between align-items-start";
      const dataId = item.id;
      const nameDiv = document.createElement("div");
      nameDiv.innerText = item.name;
      const span = document.createElement("span");
      span.innerHTML =
        "<span>" +
        item.balance +
        `<button class='btn-close ml-1' onclick='deleteUser(${dataId})'></button>` +
        "</span>";
      yeniLi.appendChild(nameDiv);
      yeniLi.appendChild(span);

      subscriber.appendChild(yeniLi);
    });
  });
  const totalLi = document.createElement("li");
  totalLi.className =
  "list-group-item d-flex justify-content-between align-items-start";
  
  // Total fiyatıoluştur
}

function renderProductList() {
  const subscribers = [document.getElementById("stock-list")];
  subscribers.forEach(function (subscriber) {
    subscriber.innerHTML = "";
    state.stockList.forEach(function (item) {
      const yeniLi = document.createElement("li");
      yeniLi.className =
        "list-group-item d-flex justify-content-between align-items-start";
      const dataId = item.id;
      const nameDiv = document.createElement("div");
      nameDiv.innerText = item.name;
      const span = document.createElement("span");
      span.innerHTML =
        "<span>" +
        item.amount +
        `<button class='btn btn-secondary btn-sm' onclick='addToCart(${dataId})'>add to cart</button>` +
        "</span>";
      yeniLi.appendChild(nameDiv);
      yeniLi.appendChild(span);

      subscriber.appendChild(yeniLi);
    });
  });
}


function renderCartList() {
  const subscribers = [document.getElementById("cart-list")];
  subscribers.forEach(function (subscriber) {
    subscriber.innerHTML = "";
    state.cartList.forEach(function (item) {
      const yeniLi = document.createElement("li");
      yeniLi.className =
        "list-group-item d-flex justify-content-between align-items-start";
      const dataId = item.id;
      const nameDiv = document.createElement("div");
      nameDiv.className= "row";
      const nameCol = document.createElement("div");
      nameCol.className = "col-4"
      nameCol.innerText = item.name;
      const amountCol = document.createElement("div");
      nameCol.className = "col-4"
      amountCol.innerText = item.amount;;
      const priceCol = document.createElement("div");
      priceCol.className = "col-4"
      priceCol.innerText = item.price;
      yeniLi.appendChild(nameCol);
      yeniLi.appendChild(amountCol);
      yeniLi.appendChild(priceCol);

      subscriber.appendChild(yeniLi);
    });
    const totalPrice = state.cartList.reduce((arr, item) => {
      return arr + item.price
    },0)
    const totalLi = document.createElement("li");
    totalLi.className =
      "list-group-item d-flex justify-content-between align-items-start";
   
    totalLi.innerHTML = "<div>" + "Total Price:" + "" +
    `<span id="totalPrice">${totalPrice}</span>` +
    "</div>";;
    subscriber.appendChild(totalLi)
  });
 

}

function renderHistoryList() {
  const subscribers = [document.getElementById("history-list")];
  subscribers.forEach(function (subscriber) {
    subscriber.innerHTML = "";
    state.historyList.forEach(function (item) {
      const newLi = document.createElement("li");
      newLi.className =
        "list-group-item d-flex justify-content-between align-items-start";
      const nameDiv = document.createElement("div");
      nameDiv.innerText = `${item.timestamp} - ${item.message}`;
      const span = document.createElement("span");
      const historyId = item.id;
      span.innerHTML = `<button class='btn-close ml-1' onclick='deleteHistory(${historyId})'></button>`;
      newLi.appendChild(nameDiv);
      newLi.appendChild(span);

      subscriber.appendChild(newLi);
    });
  });
}
// History dizisini kaybetmemek için yeni bir dizi oluşturduk. Filterenen halini bu diziye atadık.
function renderFilteredList() {
  const subscribers = [document.getElementById("history-list")];
  subscribers.forEach(function (subscriber) {
    subscriber.innerHTML = "";
    state.filteredList.forEach(function (item) {
      const newLi = document.createElement("li");
      newLi.className =
        "list-group-item d-flex justify-content-between align-items-start";
      const nameDiv = document.createElement("div");
      nameDiv.innerText = `${item.timestamp} - ${item.message}`;
      const span = document.createElement("span");
      const historyId = item.id;
      span.innerHTML = `<button class='btn-close ml-1' onclick='deleteHistory(${historyId})'></button>`;
      newLi.appendChild(nameDiv);
      newLi.appendChild(span);

      subscriber.appendChild(newLi);
    });
  });
}
// Yeni bir kullanıcı eklendiğinde, para transferi kısmında kullanıcı  ismi select elementine de option  olarak eklensin =>  renderOptionList fonkiyonu
function renderOptionList() {
  const subscribers = [
    document.getElementById("toUser"),
    document.getElementById("fromUser"),
  ];
  subscribers.forEach(function (subscriber) {
    subscriber.innerHTML = "";
    state.optionList.forEach(function (item) {
      const newOption = document.createElement("option");
      newOption.innerText = item.name;
      newOption.setAttribute("value", item.name);
      subscriber.appendChild(newOption);
    });
  });
}
function renderSalesList() {
  const subscribers = [
    document.getElementById("cartOwner"),
  ];
  subscribers.forEach(function (subscriber) {
    subscriber.innerHTML = "";
    state.optionList.forEach(function (item) {
      const newOption = document.createElement("option");
      newOption.innerText = item.name;
      newOption.setAttribute("value", item.name);
      subscriber.appendChild(newOption);
    });
  });
}
function setState(stateName, newValue) {
  state[stateName] = newValue;
  renderUserList();
  renderHistoryList();
  renderProductList();
  renderCartList()
  renderOptionList()
  renderSalesList()
}
const date = new Date();

// Yeni bir kullanıcı ekleme fonksiyonu yazdık. userList dizisini güncelledik.
function createUser() {
  const userName = document.getElementById("newUserName").value;
  const userBalance = document.getElementById("newUserBalance").value;
  setState("userList", [
    ...state.userList,
    {
      name: userName,
      balance: Number(userBalance),
      id: Date.now(),
    },
  ]);
  setState("historyList", [
    ...state.historyList,
    {
      id: Date.now(),
      timestamp: date.getHours(),
      message: `${userName} became a new customer with balance ${userBalance}.`,
    },
  ]);
  setState("optionList", [
    ...state.optionList,
    {
      id: Date.now(),
      name: userName,
    },
  ]);
  
  console.log(state.historyList);
}
function createProduct() {
  const productName = document.getElementById("productName").value;
  const amountStock = document.getElementById("amountStock").value;
  const priceProduct = document.getElementById("priceProduct").value;
  setState("stockList", [
    ...state.stockList,
    {
      name: productName,
      amount: Number(amountStock),
      id: Date.now(),
      price: Number(priceProduct),
    },
  ]);
  renderProductList();
}

function addHistory() {
  setState("historyList", [...state.historyList]);
  console.log(state.historyList);
}

function transactionalAction() {
  // Gerekli değişkenleri tanımladık.
  const copy = [...state.userList];
  const senderName = document.getElementById("fromUser").value;
  const receiverName = document.getElementById("toUser").value;
  const amount = Number(document.getElementById("amount").value);
  const sender = copy.find((item) => item.name === senderName);
  const receiver = copy.find((item) => item.name === receiverName);
  if (sender.name === receiver.name) {
    // Gönderen ve alıcı aynı kişiyse history'e bu durumu uyarı olarak ekledik.
    setState("historyList", [
      ...state.historyList,
      {
        timestamp: `${date.getHours()}:${date.getMinutes()}`,
        message: `Sender and receiver is same person`,
        id: Date.now(),
      },
    ]);
    return;
  }
  if (sender.balance < amount) {
    // Gönderenin bakiyesi göndermek istediği miktardan az ise historyList' e bu durumu uyarı olarak ekledik.
    setState("historyList", [
      ...state.historyList,
      {
        timestamp: `${date.getHours()}:${date.getMinutes()}`,
        message: `Insufficient balance.`,
        id: Date.now(),
      },
    ]);
    return;
  }
  // Diğer koşullar dışında bir durum varsa yani her şey uygunsa para gönderme işlemini gerçekleştirdik. HistoryList'i güncelledik.
  sender.balance = sender.balance - amount;
  receiver.balance = receiver.balance + amount;
  const input = document.getElementById("search-input").value.toLowerCase();
  // Filtre varken para transferi gerekleştiğinde işlem hemen filtrelenmiş listede gözüksün.
  if (input) {
    setState("filteredList", [
      ...state.filteredList,
      {
        timestamp: `${date.getHours()}:${date.getMinutes()}`,
        message: `${sender.name} sent ${amount} to ${receiver.name}. Now ${sender.name} is ${sender.balance} ${receiver.name} is ${receiver.balance}.`,
        id: Date.now(),
        sender: `${sender.name}`,
        receiver: `${receiver.name}`,
      },
    ]);
    renderFilteredList();
    console.log(state.filteredList, "filteredLit");
  } else {
    setState("historyList", [
      ...state.historyList,
      {
        timestamp: `${date.getHours()}:${date.getMinutes()}`,
        message: `${sender.name} sent ${amount} to ${receiver.name}. Now ${sender.name} is ${sender.balance} ${receiver.name} is ${receiver.balance}.`,
        id: Date.now(),
        sender: `${sender.name}`,
        receiver: `${receiver.name}`,
      },
    ]);
  }
}

// kullanıcı silme fonksiyonu
function deleteUser(id) {
  const copy = [...state.userList];
  const newUserList = copy.filter((user) => user.id !== id);
  setState("userList", newUserList);
  setState("historyList", [
    ...state.historyList,
    {
      timestamp: `${date.getHours()}:${date.getMinutes()}`,
      message: `User deleted.`,
      id: Date.now(),
    },
  ]);
  
}
function deleteHistory(id) {
  // History silme fonksiyonunda bize lazım olacak değişkenleri bulduk.
  const copy = [...state.userList];
  const senderName = document.getElementById("fromUser").value;
  const receiverName = document.getElementById("toUser").value;
  const amount = Number(document.getElementById("amount").value);
  const sender = copy.find((item) => item.name === senderName);
  const receiver = copy.find((item) => item.name === receiverName);
  if (copy.includes(sender) && copy.includes(receiver)) {
    // Hem gönderen hem alıcı hala userList dizisinde mevcutsa  işlemi geri al
    sender.balance = sender.balance + amount;
    receiver.balance = receiver.balance - amount;
    console.log(copy, "copy");
    console.log(sender, receiver);
    console.log("ikisi de var");
  } else {
    // Gönderen veya alıcının herhangi biri veya ikisi de silinmişse historyList'e uyarı çıkar.
    setState("historyList", [
      ...state.historyList,
      {
        timestamp: `${date.getHours()}:${date.getMinutes()}`,
        message: `One or both users have been deleted.`,
        id: Date.now(),
      },
    ]);
  }
  // Seçtiğimiz history satırını bütün diziden filreledik onun olmadığı diziyi yeni bir objeye atadık. O objeyi de historyList ile değiştirdik.
  const newHistoryList = state.historyList.filter((item) => item.id !== id);
  setState("historyList", newHistoryList);
}

// Filtreleme işlemi
function handleChange() {
  const copy = [...state.historyList];
  const input = document.getElementById("search-input").value.toLowerCase();
  const filter = document.getElementById("selectFilter").value;

  if (filter === "both") {
    // inputtaki değer hem sender hem receiver olarak aratılıyorsa
    const filteredList = copy.filter(
      (item) =>
        item.sender.toLowerCase() || item.receiver.toLowerCase() === input
    );
    setState("filteredList", filteredList);
    renderFilteredList();
  }

  if (filter === "sender") {
    //  input değeri sender olarak isteniyorsa;
    const filteredSender = copy.filter(
      (item) => item.sender && item.sender.toLowerCase() === input
    );
    console.log(filteredSender, "filtered");
    setState("filteredList", filteredSender);
    renderFilteredList();
  }
  if (filter === "receiver") {
    // sadece receiver olarak input değeri giriliyorsa;
    const filteredReceiver = copy.filter(
      (item) => item.receiver && item.receiver.toLowerCase() === input
    );
    console.log(filteredReceiver);
    setState("filteredList", filteredReceiver);

    renderFilteredList();
  }
}
//Sepete ekleme fonksiyonu
function addToCart(id) {
  const copy = [...state.stockList];
  const List = copy.filter((item) => item.id === id);
  const product = List[0];

  const copy2 = [...state.cartList];
  const addedCart = copy2.filter(item=> item.id === id);
  const sameProduct = addedCart[0]
  // Ürün zaten sepette varsa yeniden ürün ekleme miktarı ve fiyatı artır
  if(addedCart.length >= 1) {
    const unchangedProducts = state.cartList.filter(item => item.name !== sameProduct.name);
    setState("cartList", unchangedProducts);
    setState("cartList", [
      ...state.cartList,
      {
        name: sameProduct.name,
        amount: Number(sameProduct.amount + 1),
        id: sameProduct.id,
        price: product.price * Number(sameProduct.amount + 1),
      },
    ]);

    // eklenen ürün sepette yoksa;
  } else {
    setState("cartList", [
      ...state.cartList,
      {
        name: product.name,
        amount: 1,
        id: product.id,
        price: Number(product.price),
      },
    ]);

  }
  renderCartList();
}


function sale(){
  const copy =[...state.userList]
  const buyer = document.getElementById("cartOwner").value;
  // satan alan kişinin bakiyesini yenileyelim.
  const cartOwner = copy.find((user)=> user.name === buyer);
  const newList = copy.filter((user) => user.name !== buyer);
  const totalPrice = document.getElementById("totalPrice").innerText;

  // kullanıcının yeterli parası varsa;
  if(cartOwner.balance >= totalPrice) {
    newList.push({
      name: cartOwner.name,
      balance: cartOwner.balance-Number(totalPrice),
      id: cartOwner.id
  
    })
    setState("userList", newList);
    const copyProductList = [...state.stockList];
    newProductList = state.stockList.filter((stock) => {
      const productVarmı = state.cartList.map(item =>item.name === stock.name);
      const amountProduct = state.cartList.find(item =>item.name === stock.name);
      console.log(amountProduct.amount, "amountProduct");
      if(productVarmı) {
        const filteredList = copyProductList.filter(item =>item.name !== stock.name)
        filteredList.push({
          name: stock.name,
          amount: Number(stock.amount)- Number(amountProduct.amount),
          id: Date.now(),
          price: Number(stock.price),
        })
        setState("stockList", filteredList)
        console.log(state.stockList, "stockList");
      } else {
        console.log("ürün yok");
      }
    })
  } else {
    // parası olmadığı için satın alamazsa historyList e durumu ekle
    setState("historyList", [
      ...state.historyList,
      {
        timestamp: `${date.getHours()}:${date.getMinutes()}`,
        message: `The sale could not take place because the user named ${cartOwner.name} does not have enough money.`,
        id: Date.now(),
      },
    ]);
  }

 
}
