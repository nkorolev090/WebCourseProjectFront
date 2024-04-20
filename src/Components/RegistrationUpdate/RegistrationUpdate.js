//import React from "react";
const RegistrationUpdate = async ( updtRegistration, registration ) => {
  //const handleSubmit = (e) => {
  //e.preventDefault();
  // const id_value = e.id
  // const car_value = e.car_id;
  // const status_value = e.info;
  // const info_value = e.status;
  // const registration = {
  //   id: id_value,
  //   car_id: car_value,
  //   info: info_value,
  //   status: status_value,
  // };
 //

  console.log(JSON.stringify(registration));

  //const updateRegistration = async () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registration),
    };
    const response = await fetch(
      `api/Registrations/${registration.id}`,
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
  //};
  //};
  // return (
  //   <React.Fragment>
  //     <h3>Обновление записи</h3>
  //     <form onSubmit={handleSubmit}>
  //       <label>Id: </label>
  //       <input type="number" name="id" placeholder="Введите Id регистрации:" />
  //       <label>Id автомобиля: </label>
  //       <input
  //         type="number"
  //         name="car_id"
  //         placeholder="Введите Id автомобиля:"
  //       />
  //       <label>Id статуса: </label>
  //       <input type="number" name="status" placeholder="Введите Id статуса:" />
  //       <label>Информация: </label>
  //       <input type="text" name="info" placeholder="Введите информацию:" />
  //       <button type="submit">Обновление</button>
  //     </form>
  //   </React.Fragment>
  // );
};
export default RegistrationUpdate;
