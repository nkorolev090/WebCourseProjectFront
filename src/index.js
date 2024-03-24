import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Registration from "./Components/Registration/Registration";
import RegistrationCreate from "./Components/RegistrationCreate/RegistrationCreate";
import RegistrationUpdate from "./Components/RegistrationUpdate/RegistrationUpdate";
import Layout from "./Components/Layout/Layout";
import LogIn from "./Components/LogIn/LogIn";
import LogOff from "./Components/LogOff/LogOff";
import RegUser from "./Components/RegUser/RegUser"

import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState({ isAuthenticated: false, userDTO: null });

  const getUser = async () => {
    return await fetch("api/account/isauthenticated")
      .then((response) => {
        response.status === 401 &&
          setUser({ isAuthenticated: false, userDTO: null });
        return response.json();
      })
      .then(
        (data) => {
          console.log(data);
          if (typeof data !== "undefined") {
            setUser({ isAuthenticated: true, userDTO: data.userDTO });
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
        obj.info = udptRegistration.info;
        obj.status = udptRegistration.status;
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
          <Route index element={<h3>Главная страница</h3>} />
          <Route
            path="/registrations"
            element={
              <>
                {user.userDTO != null && user.isAuthenticated && user.userDTO.isClient ? (
                  <RegistrationCreate addRegistration={addRegistration} />
                ) : (
                  ""
                )}
                {user.userDTO != null && user.isAuthenticated ? (
                  <>
                    <RegistrationUpdate updtRegistration={updateRegistration} />
                    <Registration
                      user={user}
                      registrations={registrations}
                      setRegistrations={setRegistrations}
                      removeRegistration={removeRegistration}
                    />
                  </>
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
            element={<RegUser user={user} setUser={setUser} getUser={getUser} />}
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
