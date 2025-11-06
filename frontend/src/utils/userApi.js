import axios from "axios";
import {jwtDecode} from "jwt-decode";

const token = localStorage.getItem("campusvinculum");
const user = token ? jwtDecode(token) : null; 


export const GetUserData = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/users/${user.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetStudentData = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/students/profile`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};