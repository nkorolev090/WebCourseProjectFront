import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";

const RegUser = ({ user, setUser, getUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const regUser = async (formValues) => {
    event.preventDefault();

    // console.log(email.value, password.value)
    const requestOptions = {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formValues.name,
        midname: formValues.midname,
        surname: formValues.surname,
        phoneNumber: formValues.phoneNumber,
        email: formValues.email,
        password: formValues.password,
        passwordConfirm: formValues.passwordConfirm,
      }),
    };
    return await fetch("api/account/register", requestOptions)
      .then((response) => {
        // console.log(response.status)
        response.status !== 200 &&
          setUser({ isAuthenticated: false, userDTO: null, userRole: "" });
        return response.json();
      })
      .then(
        (data) => {
          console.log("Data:", data);
          if (
            typeof data !== "undefined"
          ) {
            getUser();
            setUser({ isAuthenticated: true, userDTO: null, userRole: "" });
            localStorage.setItem('jwt_token', data.token);
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
        <h3 style={{ color: "GrayText" }}>
          Пользователь {user.userDTO.userName} успешно зарегистрирован в системе
        </h3>
      ) : (
        <>
          <h3 style={{ color: "GrayText" }}>Зарегистрироваться</h3>
          <Form
            onFinish={regUser}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinishFailed={renderErrorMessage}
            autoComplete="off"
          >
            <Form.Item label="Имя" name="name" rules={[{ required: false }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Отчество"
              name="midname"
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Фамилия"
              name="surname"
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Телефон"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста введите номер телефона",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Пожалуйста введите почту" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Пожалуйста введите пароль" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Потдвердите пароль"
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста введите пароль  еще раз",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
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
export default RegUser;
