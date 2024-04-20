import React from "react";
export const STATUS = (RegistrationUpdate, updateRegistration, record) => [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
        const registration = {
              id: record.id,
              car_id: record.car_id,
              info: record.info,
              status: 1,
              status_name: "На обработке",
            }; 
          RegistrationUpdate(updateRegistration, registration);
        }}
      >
        На обработке
      </a>
    ),
  },
  {
    key: "2",
    label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
          const registration = {
                id: record.id,
                car_id: record.car_id,
                info: record.info,
                status: 2,
                status_name: "Одобрена",
              }; 
            RegistrationUpdate(updateRegistration, registration);
          }}
        >
          Одобрена
        </a>
      ),
  },
  {
    key: "3",
    label: "Отклонена",
  },
  {
    key: "4",
    label: "Завершена",
  },
  {
    key: "5",
    label: "Гарантийный ремонт",
  },
];
