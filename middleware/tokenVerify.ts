//check if the token in localstorage is valid or not by sending a request to the server using javascript and axios

import axios from '@/utils/axiosInstance.ts'

export default function () {
    if (localStorage.getItem('token') === null) {
        document.body.style.filter = "blur(10px)";
        document.body.style.pointerEvents = "none";
        window.location.href = '/login';
    } else {

    }
}