import axios from "axios";
import {jwtDecode} from "jwt-decode";

const token = localStorage.getItem("campusvinculum");
const user = token ? jwtDecode(token) : null; 


export const GetUserData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/${user.id}`,
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
      `http://localhost:3000/api/students/profile`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};