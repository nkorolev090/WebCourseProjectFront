import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegUser = ({ user, setUser, getUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const regUser = async (event) => {
    event.preventDefault();
    var { email, password, passwordConfirm } = document.forms[0];
    // console.log(email.value, password.value)
    const requestOptions = {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        passwordConfirm : passwordConfirm.value,
      }),
    };
    return await fetch("api/account/register", requestOptions)
      .then((response) => {
        // console.log(response.status)
        response.status !== 200 && setUser({ isAuthenticated: false, userDTO: null });
        return response.json();
      })
      .then(
        (data) => {
          console.log("Data:", data);
          if (
            typeof data !== "undefined" &&
            typeof data.email !== "undefined"
          ) {
            getUser();
            setUser({ isAuthenticated: true, userDTO: null});
            navigate("/");
          }
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setErrorMessages(data.error);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>);
  return (
    <>
      {user.userDTO != null && user.isAuthenticated ? (
        <h3>Пользователь {user.userDTO.userName} успешно зарешистрирован в системе</h3>
      ) : ("")}
        <>
          <h3>Зарегистрироваться</h3>
          <form onSubmit={regUser}>
            <label>Пользователь </label>
            <input type="text" name="email" placeholder="Логин" />
            <br />
            <label>Пароль </label>
            <input type="text" name="password" placeholder="Пароль" />
            <br />
            <label>Подтвердите пароль </label>
            <input type="text" name="passwordConfirm" placeholder="Подтвердите пароль" />
            <br />
            <button type="submit">Войти</button>
          </form>
          {renderErrorMessage()}
        </>
    </>
  );
};
export default RegUser;