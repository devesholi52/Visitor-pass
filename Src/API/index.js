import axios from "axios";
import Appurl from "../API/Constant"

export const Login = data => {
    return axios
        .post(Appurl.LOGIN, data)
        .then(res => {
            return res;
        })
        .catch(e => console.log('err from API index ::: ', e));
};