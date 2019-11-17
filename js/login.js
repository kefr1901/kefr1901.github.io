if (document.cookie !== "login=true") {
    window.location.href = "../";
}

function logOut() { // deletes cookie on logout
    document.cookie = "login=false; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/;"
    if (document.cookie !== "login=true") {
        window.location.href = "../";
    }
}