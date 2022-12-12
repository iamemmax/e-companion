import axios from "axios";
// const API_URL = "https://essential-dating-api.herokuapp.com/api/posts/new";



export const createPost = async (postData, token) => {
    const response = await axios.post("https://essential-dating-api.herokuapp.com/api/posts/new", postData, {
        headers: {
            "Content-type": "Application/json",
            'Authorization': `Berear ${token}`
        },
    });
    console.log(response.data)

    return response.data;
};

// export const forgetPassword = async (userData) => {
//     const response = await axios.get("https://essential-dating-api.herokuapp.com/api/users/forget-password", userData);
//     return response.data;
// };