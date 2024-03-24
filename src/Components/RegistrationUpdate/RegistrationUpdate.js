import React from "react";
const RegistrationUpdate = ({ updtRegistration }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const id_value = e.target.elements.id.value;
    const car_value = e.target.elements.car_id.value;
    const status_value = e.target.elements.status.value;
    const info_value = e.target.elements.info.value;
    const registration = {
      id: id_value,
      car_id: car_value,
      info: info_value,
      status: status_value,
    };
    console.log(JSON.stringify(registration));
    const updateRegistration = async () => {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registration),
      };
      const response = await fetch(
        `api/Registrations/${id_value}`,

        requestOptions
      );

      return await response.text().then(
        () => {
          if (response.ok) {
            updtRegistration(registration.id, registration);
          }
        },
        (error) => console.log(error)
      );
    };
    updateRegistration();
  };
  return (
    <React.Fragment>
      <h3>Обновление записи</h3>
      <form onSubmit={handleSubmit}>
        <label>Id: </label>
        <input type="number" name="id" placeholder="Введите Id регистрации:" />
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
        <button type="submit">Обновление</button>
      </form>
    </React.Fragment>
  );
};
export default RegistrationUpdate;
