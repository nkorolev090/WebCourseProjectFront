import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { REGISTRATION_SLOTS_COLUMNS, REGISTRATION_COLUMNS } from "../../enums";
import RegistrationUpdate from "../RegistrationUpdate/RegistrationUpdate";
import "./Style.css";

const Registration = ({
  registrations,
  setRegistrations,
  removeRegistration,
  updateRegistration,
  user,
}) => {
  const [openRegInfo, setOpenRegInfo] = useState(false);
  const [slots, setSlots] = useState();
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

  const getRegistrationInfo = async(reg_id) =>{
    setSlots(null);
      const requestOptions = {
        method: "GET",
      };
      if (user.userRole != undefined) {
        return await fetch(`api/Registrations/${reg_id}`, requestOptions)
          .then((response) => response.json())
          .then(
            (data) => {
              console.log("Data:", data);
              setSlots(data.slots);
              console.log(slots)
              setOpenRegInfo(true);
            },
            (error) => {
              console.log(error);
            }
          );
      }
  };

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
        <Table
          dataSource={registrations}
          columns={REGISTRATION_COLUMNS(
            RegistrationUpdate,
            updateRegistration,
            deleteItem,
            getRegistrationInfo,
            user.userRole
          )}
        />
      )}

      <Modal
        title="Информация о записи"
        onCancel={() => setOpenRegInfo(false)}
        open={openRegInfo}
        width="80%"
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        footer={[
          <Button key="back" onClick={() => setOpenRegInfo(false)}>
            Назад
          </Button>
        ]}
      >
        <Table
          dataSource={slots}
          columns={REGISTRATION_SLOTS_COLUMNS}
        ></Table>
      </Modal>
    </React.Fragment>
  );
};
export default Registration;
