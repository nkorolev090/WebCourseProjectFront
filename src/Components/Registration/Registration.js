import React, { useEffect } from "react";
import {  Table } from "antd";
import { REGISTRATION_COLUMNS } from "../../enums";
import RegistrationUpdate from "../RegistrationUpdate/RegistrationUpdate";
import "./Style.css";

const Registration = ({
  registrations,
  setRegistrations,
  removeRegistration,
  updateRegistration,
  user,
}) => {
  
  useEffect(() => {
    const getRegistrations = async () => {
      setRegistrations(null);
      const requestOptions = {
        method: "GET",
      };
      if (user.userRole != undefined) {
        return await fetch(`api/Registrations`, requestOptions)
          .then((response) => response.json())
          .then(
            (data) => {
              console.log("Data:", data);
              setRegistrations(data);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    };

    getRegistrations();
  }, [setRegistrations]);

  const deleteItem = async (id) => {
    const requestOptions = {
      method: "DELETE",
    };
    return await fetch(`api/Registrations/${id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          removeRegistration(id);
        }
      },
      (error) => console.log(error)
    );
  };

  return (
    <React.Fragment>
      <h3>Список записей</h3>
      {registrations != null && (
        <Table dataSource={registrations} columns={REGISTRATION_COLUMNS(RegistrationUpdate, updateRegistration, deleteItem)} />
      )}
    </React.Fragment>
  );
};
export default Registration;
