import React, { Fragment, useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';


const Form = ({createAppointment}) => {

    // Create Appointment's State
    const [appointment, setAppointment] = useState({
        pet: '',
        owner: '',
        date: '',
        hour: '',
        symptoms: ''
    });

    const [ error, setError ] = useState(false);

    // Function for every time an user writes a new input
    const handleChange = e => {
        setAppointment({
            ...appointment, 
            [e.target.name]: e.target.value 
        })
    };

    // Extract values
    const { pet, owner, date, hour, symptoms } = appointment;

    // When user submit his appointment
    const submitAppointment = e => {
    e.preventDefault();

    // Validate
    if(pet.trim() === '' || owner.trim() === '' || date.trim() === '' 
    || hour.trim() === '' || symptoms.trim() === ''){
        setError(true);
        return;
    }

    // Delete validation alert
    setError(false);

    // Asign an ID
    appointment.id = shortid();


    // Create the appointment

    createAppointment(appointment);

    //Reset Form

    setAppointment({
        pet: '',
        owner: '',
        date: '',
        hour: '',
        symptoms: ''
    });
}


    return (
        <Fragment>
            <h2>Make an Appointment</h2>

            { error ? <p className="alerta-error">You have to fill every input</p>   : null}

            <form
                onSubmit={submitAppointment}
            >
                <label>Pet's Name</label>
                <input
                    type="text"
                    name="pet"
                    className="u-full-width"
                    placeholder="Pet's Name"
                    onChange={handleChange}
                    value={pet}
                />

                <label>Owner´s Name</label>
                <input
                    type="text"
                    name="owner"
                    className="u-full-width"
                    placeholder="Pet Owner's Name"
                    onChange={handleChange}
                    value={owner}
                />

                <label>Date</label>
                <input
                    type="date"
                    name="date"
                    className="u-full-width"
                    onChange={handleChange}
                    value={date}
                />

                <label>Hour</label>
                <input
                    type="time"
                    name="hour"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hour}
                />

                <label>Symptoms</label>
                <textarea
                    className="u-full-width"
                    name= "symptoms"
                    onChange={handleChange}
                    value={symptoms}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Add Appointment</button>
            </form>
        </Fragment>
    );
}

Form.propTypes = {
    createAppointment: PropTypes.func.isRequired
}

export default Form;