import axios from "axios";

const GetUserData = async () => {
  try {
    const response = await axios.get(
      ``,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return await response.data.data;
  } catch (error) {
    console.log(error);
  }
};