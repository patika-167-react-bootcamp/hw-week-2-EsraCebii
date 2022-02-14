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
          balance: 600,
        },
        {
          name: "İsmail",
          balance: 1000,
        },
      ]
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
const id = function () { // creates a unique ID
    return Math.ceil(Math.random()*100000-1);
};

function transactionalAction() {
    const sender = document.getElementById("fromUser").value;
    const receiver = document.getElementById("toUser").value;
    console.log(sender,receiver);
}
