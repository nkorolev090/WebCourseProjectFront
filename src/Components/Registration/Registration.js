import React, { useEffect } from 'react'
import './Style.css'

const Registration = ({ registrations, setRegistrations, removeRegistration, user }) => {

    useEffect(() => {
           
    const getRegistrations = async () => {

        const requestOptions = {
            method: 'GET'
        }
        if(user.userDTO != null){
            if(user.userDTO.client != null){
                return await fetch(`api/Registrations/byClientId?client_id=${user.userDTO.client.id}`, requestOptions)

                .then(response => response.json())
                .then(
                    (data) => {
                        console.log('Data:', data)
                        setRegistrations(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            }
            if(user.userDTO.mechanic !== null){
                return await fetch(`api/Registrations/byMechanicId?mechanic_id=${user.userDTO.mechanic.id}`, requestOptions)

                .then(response => response.json())
                .then(
                    (data) => {
                        console.log('Data:', data)
                        setRegistrations(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            }
        }
        
    }
    
        getRegistrations()
    }, [setRegistrations])
 
    const deleteItem = async ({ id }) => {
        const requestOptions = {
            method: 'DELETE'
        }
        return await fetch(`api/Registrations/${id}`,
            requestOptions)

            .then((response) => {
                if (response.ok) {
                    removeRegistration(id)
                }
            },
                (error) => console.log(error)
            )
    }
    return (
        <React.Fragment>
            <h3>Список регистраций</h3>
            {registrations.map(({id, car_name, reg_date, info, status_name, reg_price }) => (
                <div className="Registration" key={id} id={id} >
                    <strong > {id}: {status_name} </strong>
                    <button onClick={() => deleteItem({ id })}>Удалить</button>
                    <div>
                    <br/> Дата создания запси: {reg_date}
                    <br/> Автомобиль: {car_name}
                    <br/> <i>{info}</i>
                    <br/> {reg_price}
                    </div>
                </div>
            ))}
        </React.Fragment>
    )
}
export default Registration