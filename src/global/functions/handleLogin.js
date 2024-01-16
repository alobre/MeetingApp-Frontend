/*

Login helper function. Takes in the username and password
and authenticates the credentials via LDAP

*/

import { login } from "components/AxiosInterceptor/AxiosInterceptor";
import { useNavigate } from "react-router-dom";

const handleLogin = async (username, password) => {
  const userData = {
    username,
    password,
  };

  console.log(JSON.stringify(userData.username));
  try {
    const response = await login(userData);
    console.log("Login called:", response);

    return response;
  } catch (error) {
    console.error("Error creating meeting:", error);
  }
};

export default handleLogin;
