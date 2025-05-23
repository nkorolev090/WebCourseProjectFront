import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const LogOff = ({ setUser }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    showModal();
  }, []);

  const logOff = async (event) => {
    event.preventDefault();
    try{
      const requestOptions = {
        method: "POST",
      };
      
      return await fetch("api/account/logoff", requestOptions).then(
        (response) => {
          localStorage.setItem("jwt_token", "");
          response.status === 200 &&
            setUser({ isAuthenticated: false, userDTO: null, userRole: "" })
          response.status === 401 ? navigate("/login") : navigate("/");
          setOpen(false);
        }
      );
    }
    catch(error){
      console.log("LogOff error", error)
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      <Modal title="Title" open={open} onOk={logOff} onCancel={handleCancel}>
        <p>Выполнить выход?</p>
      </Modal>
    </>
  );
};
export default LogOff;
