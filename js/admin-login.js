const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    if (
        username === "admin"
        &&
        password === "123456"
    ){

        localStorage.setItem("adminLoggedIn","true");

        window.location.href="admin.html";

    }

    else{

        alert("Wrong Username or Password");

    }

});
