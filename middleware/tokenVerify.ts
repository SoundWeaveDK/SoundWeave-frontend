//check if the token in localstorage is valid or not by sending a request to the server using javascript and axios

export default function () {
    if (localStorage.getItem('token') === null) {
        document.body.style.filter = "blur(10px)";
        document.body.style.pointerEvents = "none";
        window.location.href = '/login';
    } else {

    }
}