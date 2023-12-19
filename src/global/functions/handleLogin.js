import { login } from "components/AxiosInterceptor/AxiosInterceptor";
import { useNavigate } from "react-router-dom";


/*
const handleLogin = (credentials) => {
  if (credentials) {
    var path = `/Login`
    var options = {
      // have to have this to allow cookie to be sent to server. Therefore authentication session can be reserved.
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }
  } else {
    path = `/api/user`
    options = { credentials: 'same-origin' }
  }
  fetch(path, options)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    })
    .then(login => {
      this.setState({ loggedin: login.success, user: login.user})
    })
}
*/

const handleLogin = async (username, password) => {
  const userData = {
    username,
    password
  };
  //const navigate = useNavigate();

  console.log(JSON.stringify(userData.username));
  try {
    const response = await login(userData);
    console.log("Login called:", response);

    return response;
    //if success than change to homescreen
    // Reset all form inputs to initial state
    //navigate("/");
  } catch (error) {
    console.error("Error creating meeting:", error);
    // Handle the error as needed
  } 
 
};
/*
const handleLogin = async (username, password, handleErrorCallback) => {
  try {
    const response = await fetch('/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Authentication successful, handle the response data here
      localStorage.setItem('authenticated', true);
      localStorage.setItem('loggedUser', username);
      window.dispatchEvent(new Event('storage'));
      console.log('Set loggedUser in localStorage: ' + username);
      console.log('loggedUser localstorage: ' + localStorage.getItem('loggedUser'));
      return { success: true };
    } else {
      // Authentication failed, handle error
      const error = {
        type: data.errorType, // Adjust this based on the error response structure from your backend
        msg: data.errorMessage,
      };
      return { success: false, error };
    }
  } catch (error) {
    // Handle fetch error
    console.log('Login error:', error);
    //handleErrorCallback(error);
    return { success: false, error: { type: 'fetch', msg: 'Fetch error' } };
  }
};*/

//dummy login function
/*
const handleLogin = (username, password, handleErrorCallback) =>{
    //dummy login data
    const users = [
        { username: "ana", password: "ana" },
        { username: "alo", password: "bre" }
    ]
    
    
    let error = {
        type: '',
        msg: ''
    }
    // const navigate = useNavigate();
    const account = users.find((user) => user.username === username);
    if (account) {
      if (account.password === password) {
        localStorage.setItem("authenticated", true);
        localStorage.setItem("loggedUser", username)
        window.dispatchEvent(new Event("storage"));
        console.log("Set loggedUser in localStorage: " + username);
        console.log("loggedUser localstorage: " + localStorage.getItem("loggedUser"));
        return {success: true}
      } else {
        // invalid pass
        error.msg = "invalid password"
        error.type = "pass"
        return {success: false, error}
      }
    } else {
      // invalid username
        error.msg = "invalid username"
        error.type = "uname"
        return {success: false, error}
    }
}
*/
export default handleLogin