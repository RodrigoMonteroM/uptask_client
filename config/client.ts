import axios from "axios";

const cliente = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_BACKEND}`
});

export default cliente;