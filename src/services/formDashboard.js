import { URL_API } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity,
});

const summaryForm = async (requestBody) => {
  try {
    const response = await api.get(URL_API.formDashboard + requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

const tableForm = async (requestBody) => {
  try {
    const response = await api.get(URL_API.formTable + requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

const insertData = async (requestBody) => {
  try {
    const response = await api.post(URL_API.addTransaction, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

const updateData = async (requestBody) => {
  try {
    const response = await api.put(URL_API.updateTransaction, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      console.error("Error: Unexpected response status", response.status);
      throw new Error(`Failed to update. Status code: ${response.status}`);
    }
  } catch (error) {
    // Improved error logging
    console.error("Error updating data:", error.message || error);
    throw error; // Rethrow the error to propagate it up
  }
};

const delData = async (id) => {
  try {
    const response = await api.put(URL_API.delformData + id, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

const getDataLKF = async (requestBody) => {
  try {
    const response = await api.get(URL_API.getDataPrint + requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

const getDataById = async (lkfId) => {
  try {
    const response = await api.get(`${URL_API.getDataLkf}${lkfId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("📡 Response from getDataLKF:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching LKF by ID:", error.message);
    throw error;
  }
};

const updateLkf = async (requestBody) => {
  try {
    const response = await api.put(URL_API.updateLkf, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating LKF:", error.message);
    throw error;
  }
};

const formService = {
  summaryForm,
  tableForm,
  insertData,
  delData,
  updateData,
  getDataById,
  updateLkf,
  getDataLKF,
};

export default formService;
