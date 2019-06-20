import axios from "axios";

const instance = axios.create({
    baseURL: "https://recipe-app-a49d9.firebaseio.com/"
});

export default instance;
