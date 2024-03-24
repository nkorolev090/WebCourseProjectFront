import React from "react";
const RegistrationCreate = ({ addRegistration }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const car_value = e.target.elements.car_id.value;
    const status_value = e.target.elements.status.value;
    const info_value = e.target.elements.info.value;
    const registration = {
      car_id: car_value,
      info: info_value,
      status: status_value,
    };
    console.log(JSON.stringify(registration));
    const createRegistration = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registration),
      };
      const response = await fetch(
        "api/Registrations/",

        requestOptions
      );

      return await response.json().then(
        (data) => {
          console.log(data);
          if (response.ok) {
            addRegistration(data);
          }
        },
        (error) => console.log(error)
      );
    };
    createRegistration();
  };
  return (
    <React.Fragment>
      <h3>Создание новой записи</h3>
      <form onSubmit={handleSubmit}>
        <label>Id автомобиля: </label>
        <input
          type="number"
          name="car_id"
          placeholder="Введите Id автомобиля:"
        />
        <label>Id статуса: </label>
        <input type="number" name="status" placeholder="Введите Id статуса:" />
        <label>Информация: </label>
        <input type="text" name="info" placeholder="Введите информацию:" />
        <button type="submit">Создать</button>
      </form>
    </React.Fragment>
  );
};
export default RegistrationCreate;
