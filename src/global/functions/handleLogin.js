//dummy login function
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
        window.dispatchEvent(new Event("storage"));
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

export default handleLogin