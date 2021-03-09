import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import AuthContext from "../../Context/AuthContext.js";
import UserCredentials from "../../components/UserCredentials/UserCredentials.jsx";
import API from "../../util/API.js";

const Login = () => {
  const history = useHistory();
  const { setJwt } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isInvalid, setIsInvalid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleUserCredentials = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = credentials;
      const { data } = await API.loginUser(email, password);
      if (!data.success) {
        setIsInvalid(true);
      } else {
        setJwt(data.info);
        history.push("/home");
      }
    } catch (err) {
      console.log(err);
      alert("Our server might need a reminder too!");
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <UserCredentials
        credentials={credentials}
        handleInputChange={handleInputChange}
        handleUserCredentials={handleUserCredentials}
        isInvalid={isInvalid}
      />
      <Link to="/">Don&apos;t have an account? Sign up!</Link>
    </div>
  );
};

export default Login;