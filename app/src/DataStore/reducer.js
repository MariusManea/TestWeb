import Axios from "axios";

export const countReducer = function (state = [], action) {
    switch (action.type) {
        case "UPDATE":
            Axios({
                method: "GET",
                url: "http://localhost:9000/api/v1/users",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            }).then(res => {
                return res.data.response
            }).catch(error => {
                if (error && error.response && (error.response.status === 401 || error.response.status === 403)) {
                    return state;
                }
            });
            return state;
        case "RESET":
            return [];
        default:
            return state;
    }
};