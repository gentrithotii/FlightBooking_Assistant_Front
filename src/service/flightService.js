import axios, { Axios } from "axios";

const URL = "http://localhost:8080/api/flights/available";

export const getAvailableFlights = async () => {
  try {
    const response = await axios.get(URL);

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Could not fetch flights");
    throw error;
  }
};
