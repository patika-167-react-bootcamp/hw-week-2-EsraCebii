function createUser() {
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
}