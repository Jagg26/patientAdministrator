import React, { Fragment, useState, useEffect } from 'react';
import Form from './components/Form';
import Appointment from './components/Appointment';

function App() {

  // Appointments in Local Storage
  let initialAppointments = JSON.parse(localStorage.getItem('appointments'));
  if(!initialAppointments) {
    initialAppointments = [];
  }

  // Appointments Array
  const [appointments, setAppointments] = useState(initialAppointments);

  // Use Effect for certain operations when the state change
  useEffect( () => {
    let initialAppointments = JSON.parse(localStorage.getItem('appointments'));
    
    if(initialAppointments) {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    } else {
      localStorage.setItem('appointments', JSON.stringify([]));
    }
  }, [appointments] );

  // Function for adding new appointments but saving the old ones

  const createAppointment = appointment => {
    setAppointments([...appointments, appointment]);
  }

  // Function for deleting appointment by ID

  const deleteAppointment = id => {
    const newAppointments = appointments.filter(appointment => appointment.id !== id);
    setAppointments(newAppointments);

  }

  // Conditional Message

  const title = appointments.length === 0 ? 'No Appointments' : 'Manage your Appointments';


  return (
    <Fragment>
      <h1>Patient Administrator</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form
              createAppointment={createAppointment}
            />
          </div>
          <div className="one-half column">
            <h2>{title}</h2>
            {appointments.map(appointment => (
              <Appointment
                key={appointment.id}
                appointment={appointment}
                deleteAppointment={deleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
