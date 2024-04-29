const RegistrationUpdate = async (updtRegistration, registration) => {
  try {
    console.log(JSON.stringify(registration));

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
  } catch (error) {
    console.log("Registration update error", error);
  }
};
export default RegistrationUpdate;
