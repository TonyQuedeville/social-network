import axios from "axios"

export const makeRequest = axios.create({
    baseURL: `http://${window.location.hostname}:8080`,
    withCredentials: true, // pour inclure les cookies dans les requètes
})

// axios.post = Create
// axios.get = Read
// axios.put = Update
// axios.delete = Delete