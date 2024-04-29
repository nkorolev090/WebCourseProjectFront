import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";

const LogIn = ({ user, setUser, getUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const logIn = async (formValues) => {

    try{
      const requestOptions = {
        method: "POST",
  
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
      };
      return await fetch("api/account/login", requestOptions)
        .then((response) => {
          response.status !== 200 &&
            setUser({ isAuthenticated: false, userDTO: null, userRole: "" });
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
              setUser({
                isAuthenticated: true,
                userDTO: null,
                userRole: data.userRole,
              });
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
    }
    catch(error){
      console.log("LogIn error", error)
    }
  };
  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>);
  return (
    <>
      {user.userDTO != null && user.isAuthenticated ? (
        <h3 style={{color: 'GrayText'}}>Пользователь {user.userDTO.userName} успешно вошел в систему</h3>
      ) : (
        <>
          <h3 style={{color: 'GrayText'}} >Вход</h3>
          <Form
            onFinish={logIn}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinishFailed={renderErrorMessage}
            autoComplete="off">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Пожалуйста введите почту" },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: "Пожалуйста введите пароль" },
              ]}>
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Запомнить меня</Checkbox>
              {renderErrorMessage()}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>
          </Form>
          {renderErrorMessage()}
        </>
      )}
    </>
  );
};
export default LogIn;
