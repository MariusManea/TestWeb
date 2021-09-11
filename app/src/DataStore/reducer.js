export const countReducer = function (state = [], action) {
    switch (action.type) {
        case "UPDATE":
            return localStorage.getItem('data') ? [...state, ...JSON.parse(localStorage.getItem('data'))] : state;
        case "RESET":
            return [];
        default:
            return state;
    }
};