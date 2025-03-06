import axios from "axios";
function upload(path, userForm) {
    const params = new FormData();
    for (let key in userForm) {
        params.append(key, userForm[key]);
    }
    return axios
        .post(path, params, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
}
export default upload