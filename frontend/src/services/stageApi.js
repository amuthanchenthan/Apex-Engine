import axios from "axios";

const API = "https://apex-engine-backend.onrender.com/api/stages";

const token = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const loadStages = () =>
    axios.get(API, token());

export const saveStages = (stages) =>
    axios.post(API, stages, token());