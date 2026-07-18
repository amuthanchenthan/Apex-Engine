import axios from "axios";

const API = "http://apex-engine-backend.onrender.com/api/executions";

const getToken = () => localStorage.getItem("token");

export const saveExecution = async (execution) => {

    const response = await axios.post(

        API,

        execution,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return response.data;

};

export const getExecutions = async () => {

    const response = await axios.get(

        API,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return response.data;

};
export const getLatestBuy = async (strategyId) => {

    const response = await axios.get(

        `${API}/latest-buy/${strategyId}`,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return response.data;

};