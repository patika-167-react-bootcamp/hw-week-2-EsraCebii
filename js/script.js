// Witout Helper Create user function
/* function createUser() {
    const userName = document.getElementById("newUserName").value;
    const userBalance = document.getElementById("newUserBalance").value;
    const yeniLi = document.createElement("li"); 
    yeniLi.className = "list-group-item d-flex justify-content-between align-items-start";
    const name = document.createElement("div");
    name.innerText = userName;
    const balance = document.createElement("span");
    balance.innerText = userBalance;
    yeniLi.appendChild(name);
    yeniLi.appendChild(balance);
    const list = document.getElementById("user-list");
    list.appendChild(yeniLi)
    console.log(userName, userBalance);
} */

const state = {
    userList: [
        {
          name: "Esra",
          balance: 10,
        },
        {
          name: "İsmail",
          balance: 20,
        },
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
            const nameDiv = document.createElement("div");
            nameDiv.innerText = item.name;
            const balanceSpan = document.createElement("span");
            balanceSpan.innerText = item.balance
            yeniLi.appendChild(nameDiv);          
            yeniLi.appendChild(balanceSpan);
            subscriber.appendChild(yeniLi)
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
            newLi.className = "list-group-item";
            newLi.innerText = `${item.timestamp} - ${item.message}`, 
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

function createUser() {
  const userName = document.getElementById("newUserName").value;
  const userBalance = document.getElementById("newUserBalance").value;
  setState("userList",[...state.userList, 
    {
        name: userName,
        balance:userBalance
    }])
  optionList.push({
      name: userName,
  });
  renderOptionList();
}
function addHistory(value) {
    setState("historyList", [...state.historyList])
}
const date = new Date();

function transactionalAction() {
    const copy = [...state.userList]
    const senderName = document.getElementById("fromUser").value;
    const receiverName = document.getElementById("toUser").value;
    const amount = Number(document.getElementById("amount").value);
    const sender = copy.find(item => item.name === senderName);
    const receiver = copy.find(item => item.name === receiverName)
    if(sender.name === receiver.name) {
        setState("historyList", [...state.historyList, 
            {timestamp:`${date.getHours()}:${date.getMinutes()}`,message:`Sender and receiver is same person`}
        ])
        return 

    }
    if(sender.balance < amount) {
        setState("historyList", [...state.historyList, 
            {timestamp:`${date.getHours()}:${date.getMinutes()}`,message:`Insufficient balance.`}
        ])
        return
    }
    sender.balance = sender.balance - amount;
    receiver.balance = receiver.balance + amount;
    setState("historyList", [...state.historyList, 
        {timestamp:`${date.getHours()}:${date.getMinutes()}`,message:`${sender.name} sent ${amount} to ${receiver.name}. Now ${sender.name} is ${sender.balance} ${receiver.name} is ${receiver.balance}.`}
    ])
     
}

