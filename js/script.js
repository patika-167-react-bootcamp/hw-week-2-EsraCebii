
const state = {
    userList: [
        {
            name: "Esra",
            balance : 600,
            id: 26
        },
        {
            name: "İsmail",
            balance: 800,
            id: 13
        }
    ],
    historyList: []
}


const optionList = [
    {
        name: "Esra"
    },
    {
        name: "İsmail"
    }
]


function renderUserList() {
    const subscribers = [
        document.getElementById("user-list"),
    ]
    subscribers.forEach(function(subscriber){
        subscriber.innerHTML = ""
        state.userList.forEach(function(item){
            const yeniLi = document.createElement("li"); 
            yeniLi.className = "list-group-item d-flex justify-content-between align-items-start";
            const dataId = item.id;
            const nameDiv = document.createElement("div");
            nameDiv.innerText = item.name;
            const span = document.createElement("span");
            span.innerHTML = "<span>" + item.balance +`<button class='btn-close ml-1' onclick='deleteUser(${dataId})'></button>` + "</span>";

            yeniLi.appendChild(nameDiv);
            yeniLi.appendChild(span);

            subscriber.appendChild(yeniLi);
           
        })
    })
  

}
function renderHistoryList() {
    const subscribers = [
        document.getElementById("history-list"),
    ]
    subscribers.forEach(function(subscriber){
        subscriber.innerHTML = ""
        state.historyList.forEach(function(item){
            const newLi = document.createElement("li");
            newLi.className = "list-group-item d-flex justify-content-between align-items-start";
            const nameDiv = document.createElement("div");
            nameDiv.innerText = `${item.timestamp} - ${item.message}`;
            const span = document.createElement("span");
            const historyId =item.id
            span.innerHTML =  `<button class='btn-close ml-1' onclick='deleteHistory(${historyId})'></button>`;
            newLi.appendChild(nameDiv);
            newLi.appendChild(span)
            
            subscriber.appendChild(newLi)      
        })
    })
}
// Yeni bir kullanıcı eklendiğinde, para transferi kısmında kullanıcı  ismi select elementine de option  olarak eklensin =>  renderOptionList fonkiyonu
function renderOptionList() {
    const subscribers = [
        document.getElementById("toUser"),
        document.getElementById("fromUser")
    ]
    subscribers.forEach(function(subscriber){
        subscriber.innerHTML = ""
        optionList.forEach(function(item){
            const newOption = document.createElement("option");
            newOption.innerText = item.name;
            newOption.setAttribute("value", item.name)
            subscriber.appendChild(newOption)
        })
    })
}
function setState(stateName, newValue) {
    state[stateName] = newValue;
    renderUserList();
    renderHistoryList();
}
const date = new Date();

// Yeni bir kullanıcı ekleme fonksiyonu yazdık. userList dizisini güncelledik.
function createUser() {
  const userName = document.getElementById("newUserName").value;
  const userBalance = document.getElementById("newUserBalance").value;
  setState("userList",[...state.userList, 
    {
        name: userName,
        balance: Number(userBalance),
        id: Date.now()
    }])
    setState("historyList",[...state.historyList,
        {
            id: Date.now(),
            timestamp: date.getHours(),
            message: `${userName} became a new customer with balance ${userBalance}.`
        }
    ])
  optionList.push({
      name: userName,
      
  });
  renderOptionList();
  console.log(state.historyList);
}

function addHistory() {
    setState("historyList", [...state.historyList])
    console.log(state.historyList);
}



function transactionalAction() {
// Gerekli değişkenleri tanımladık.
    const copy = [...state.userList]
    const senderName = document.getElementById("fromUser").value;
    const receiverName = document.getElementById("toUser").value;
    const amount = Number(document.getElementById("amount").value);
    const sender = copy.find(item => item.name === senderName);
    const receiver = copy.find(item => item.name === receiverName)
    if(sender.name === receiver.name) {
// Gönderen ve alıcı aynı kişiyse history'e bu durumu uyarı olarak ekledik.
        setState("historyList", [...state.historyList, 
            {timestamp:`${date.getHours()}:${date.getMinutes()}`,message:`Sender and receiver is same person`, id: Date.now()}
        ])
        return 

    }
    if(sender.balance < amount) {
// Gönderenin bakiyesi göndermek istediği miktardan az ise historyList' e bu durumu uyarı olarak ekledik.
        setState("historyList", [...state.historyList, 
            {timestamp:`${date.getHours()}:${date.getMinutes()}`,message:`Insufficient balance.`, id: Date.now()}
        ])
        return
    }
// Diğer koşullar dışında bir durum varsa yani her şey uygunsa para gönderme işlemini gerçekleştirdik. HistoryList'i güncelledik.
    sender.balance = sender.balance - amount;
    receiver.balance = receiver.balance + amount;
    setState("historyList", [...state.historyList, 
        {timestamp:`${date.getHours()}:${date.getMinutes()}`,message:`${sender.name} sent ${amount} to ${receiver.name}. Now ${sender.name} is ${sender.balance} ${receiver.name} is ${receiver.balance}.`, id: Date.now()}
    ])
    console.log(state.historyList);
     
}

// kullanıcı silme fonksiyonu
function deleteUser(id) { 
    const copy = [...state.userList]
    const newUserList =copy.filter(user => user.id !== id )
    setState("userList", newUserList);
    setState("historyList", [...state.historyList, 
        {timestamp:`${date.getHours()}:${date.getMinutes()}`,message:`User deleted.`, id: Date.now()}
    ])
}
function deleteHistory(id) {
// History silme fonksiyonunda bize lazım olacak değişkenleri bulduk.   
    const copy = [...state.userList]
    const senderName = document.getElementById("fromUser").value;
    const receiverName = document.getElementById("toUser").value;
    const amount = Number(document.getElementById("amount").value);
    const sender = copy.find(item => item.name === senderName);
    const receiver = copy.find(item => item.name === receiverName)
    if(copy.includes(sender) && copy.includes(receiver)) {
// Hem gönderen hem alıcı hala userList dizisinde mevcutsa  işlemi geri al
        sender.balance = sender.balance + amount;
        receiver.balance = receiver.balance - amount;
        console.log(copy, "copy");
        console.log("ikisi de var");
       setState("userList", copy)
    } else {
 // Gönderen veya alıcının herhangi biri veya ikisi de silinmişse historyList'e uyarı çıkar.
        setState("historyList", [...state.historyList, 
            {timestamp:`${date.getHours()}:${date.getMinutes()}`,message:`One or both users have been deleted.`, id: Date.now()}
        ])
    } 
// Seçtiğimiz history satırını bütün diziden filreledik onun olmadığı diziyi yeni bir objeye atadık. O objeyi de hisoryList ile değiştirdik.
        const newHistoryList = state.historyList.filter(item => item.id !== id);
        setState("historyList", newHistoryList)
    }


