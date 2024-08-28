import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import "./BookingPage.css"
import { fetchAPI, submitAPI } from "./API.js"

export function updateTimes(state,action) {
    switch (action.type) {
        case 'SET_TIMES':
            return action.payload;
        default:
          return state;
      }
}

export function initializeTimes(){
    const d = new Date();
    return  fetchAPI(d);
}

const BookingPage = () => {
const [availableTimes, dispatch]= useReducer(updateTimes, [], initializeTimes);
const navigate = useNavigate();

    const submitForm = (formData) => {
        const res = submitAPI(formData);
        if(res){
            navigate("/confirmation");
        }
    }
  return (
    <section className="reservation-section">
        <BookingForm
            availableTimes={availableTimes}
            dispatch={dispatch}
            onSubmit={submitForm}
        />
    </section>
  );
};

export default BookingPage;
