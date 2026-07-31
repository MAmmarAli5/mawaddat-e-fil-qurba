const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

    const password = document.getElementById("password").value;

    if (password === "Mawaddat2026") {

        localStorage.setItem("adminLoggedIn", "true");

        window.location.href = "admin.html";

    } else {

        document.getElementById("error").innerHTML =
            "Wrong Password";

    }

});
