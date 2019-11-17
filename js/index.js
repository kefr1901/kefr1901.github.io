var loginUser = [{
        username: "ashur",
        password: "admin"
    },
    {
        username: "kevin",
        password: "admin"
    },
    {
        username: "mathias",
        password: "admin"
    }
]

function logIn() {
    let username = document.getElementById("loginuser").value
    let password = document.getElementById("loginpw").value


    for (i = 0; i < loginUser.length; i++) {

        if (username == loginUser[i].username && password == loginUser[i].password) {
            window.location.href = "crm/index.html";
            console.log(username + " You are logged in!");
            let date = new Date();
            date.setDate(date.getDate()+1);
            document.cookie = "login=true; expires=" + date + "; path=/;";
            return;
        }
    }
    $(".hidden").addClass("show");
    //alert("Wrong username or password");

}