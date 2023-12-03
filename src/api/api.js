import axios from "axios";
// just a demo
export const getAllDrvier = () => {
    return axios.request({
        url: "/api",
        method: "get"
    })
}