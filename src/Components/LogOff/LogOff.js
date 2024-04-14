import React from "react";
import { useNavigate } from "react-router-dom";
const LogOff = ({ setUser }) => {
  const navigate = useNavigate();
  const logOff = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
    };
    return await fetch("api/account/logoff", requestOptions).then(
      (response) => {
          if(response.status === 200){
            setUser({ isAuthenticated: false, userDTO: null, userRole: "" });
            navigate("/");
          }
         
      }
    );
  };
  return (
    <>
      <p></p>
      <form onSubmit={logOff}>
        <button type="submit">Выход</button>
      </form>
    </>
  );
};
export default LogOff;
