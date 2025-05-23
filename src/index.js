import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Registration from "./Components/Registration/Registration";
import RegistrationCreate from "./Components/RegistrationCreate/RegistrationCreate";
import Cart from "./Components/Cart/Cart";
import Layout from "./Components/Layout/Layout";
import LogIn from "./Components/LogIn/LogIn";
import LogOff from "./Components/LogOff/LogOff";
import RegUser from "./Components/RegUser/RegUser";
import Main from "./Components/Main/Main";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    userDTO: null,
    userRole: "",
  });

  const getUser = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization": "Bearer "+localStorage.getItem("jwt_token")}
    };
    return await fetch("api/account/isauthenticated", requestOptions)
      .then((response) => {
        response.status === 401 &&
          setUser({ isAuthenticated: false, userDTO: null, userRole: "" });
        return response.json();
      })
      .then(
        (data) => {
          console.log(data);
          if (typeof data !== "undefined") {
            setUser({
              isAuthenticated: true,
              userDTO: data.userDTO,
              userRole: data.userRole,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getUser();
  }, [setUser]);

  const [registrations, setRegistrations] = useState([]);
  const addRegistration = (registration) =>
    setRegistrations([...registrations, registration]);

  const removeRegistration = (removeId) =>
    setRegistrations(registrations.filter(({ id }) => id !== removeId));

  const updateRegistration = (udptId, udptRegistration) => {
    console.log(udptRegistration);
    const newRegistrations = registrations.map((obj) => {
      if (obj.id == udptId) {
        obj.car_id = udptRegistration.car_id;
        obj.car_name = udptRegistration.car_name;
        obj.info = udptRegistration.info;
        obj.status = udptRegistration.status;
        obj.status_name = udptRegistration.status_name;
      }
      return obj;
    });
    console.log(newRegistrations);
    setRegistrations(newRegistrations);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route
            index
            element={
              <>
              <Main/>
              </>
            }
          />
          <Route
            path="/registrations"
            element={
              <>
                {user.userRole == "client" || user.userRole == "mechanic" ? (
                  <>
                    <Registration
                      user={user}
                      registrations={registrations}
                      setRegistrations={setRegistrations}
                      removeRegistration={removeRegistration}
                      updateRegistration={updateRegistration}
                    />
                  </>
                ) : (
                  ""
                )}
              </>
            }
          />
          <Route
            path="/registration_create"
            element={
              <>
                {user.userRole == "client" ? (
                  <RegistrationCreate
                    user={user}
                    addRegistration={addRegistration}
                  />
                ) : (
                  ""
                )}
              </>
            }
          />
                    <Route
            path="/cart"
            element={
              <>
                {user.userRole == "client" ? (
                  <Cart
                  />
                ) : (
                  ""
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={<LogIn user={user} setUser={setUser} getUser={getUser} />}
          />
          <Route path="/logoff" element={<LogOff setUser={setUser} />} />
          <Route
            path="/reguser"
            element={
              <RegUser user={user} setUser={setUser} getUser={getUser} />
            }
          />
          <Route path="*" element={<h3>404</h3>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
