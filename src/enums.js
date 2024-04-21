//import { Option } from "antd";
import { Select } from "antd";
import React from "react";

const statuses = [
  {
    id: '1',
    name: "На обработке",
  },
  {
    id: '2',
    name: "Одобрена",
  },
  {
    id: '3',
    name: "Отклонена ",
  },
  {
    id: '4',
    name: "Завершена",
  },
  {
    id: '5',
    name: "Гарантийный ремонт",
  },
];
export const STATUS = (RegistrationUpdate, updateRegistration, record) => 
  statuses.map(status => //{
    // return (
      (<Select.Option
        key= {`${status.id}`}
        value={`${status.id}`}
      >
        <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              const registration = {
                id: record.id,
                car_id: record.car_id,
                info: record.info,
                status: status.id,
                status_name: status.name,
              };
              RegistrationUpdate(updateRegistration, registration);
            }}
          >
            {status.name}
          </a>
        </Select.Option>)
    );
//  }
//);
//[
//   {
//     value: "1",
//     label: (
//       <a
//         target="_blank"
//         rel="noopener noreferrer"
//         onClick={() => {
//         const registration = {
//               id: record.id,
//               car_id: record.car_id,
//               info: record.info,
//               status: 1,
//               status_name: "На обработке",
//             };
//           RegistrationUpdate(updateRegistration, registration);
//         }}
//       >
//         На обработке
//       </a>
//     ),
//   },
// {
//   value: "2",
//   label: (
//       <a
//         target="_blank"
//         rel="noopener noreferrer"
//         onClick={() => {
//         const registration = {
//               id: record.id,
//               car_id: record.car_id,
//               info: record.info,
//               status: 2,
//               status_name: "Одобрена",
//             };
//           RegistrationUpdate(updateRegistration, registration);
//         }}
//       >
//         Одобрена
//       </a>
//     ),
// },
// {
//   value: "3",
//   label: "Отклонена",
// },
// {
//   value: "4",
//   label: "Завершена",
// },
// {
//   value: "5",
//   label: "Гарантийный ремонт",
// },
//];
