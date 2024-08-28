import React, { useState, useReducer, useEffect } from 'react';
import {submitAPI} from "./API.js" 
import {fetchAPI} from "./API.js" 

const BookingForm = ({availableTimes, dispatch}) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '17:00',
    guests: 1,
    occasion: 'none',
  });

  useEffect(() => {
    if (formData.date) {
        const times = fetchAPI(new Date(formData.date));
          dispatch({ type: 'SET_TIMES', payload: times });
          setFormData((prev) => ({ ...prev, time: times[0] || '' }));
        
      }
  }, [formData.date, dispatch]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier können Sie die Formulardaten senden oder weiterverarbeiten
    dispatch({ type: 'REMOVE_TIME', payload: formData.time });

    console.log(submitAPI(formData));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', maxWidth: '200px', gap: '20px' }}>
        <h2>Book Now</h2>
      <label htmlFor="date">Choose date</label>
      <input 
        type="date" 
        id="date" 
        value={formData.date} 
        onChange={handleChange} 
      />
      
      <label htmlFor="time">Choose time</label>
      <select 
        id="time" 
        value={formData.time} 
        onChange={handleChange}
      >
        {availableTimes.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
      
      <label htmlFor="guests">Number of guests</label>
      <input 
        type="number" 
        id="guests" 
        value={formData.guests} 
        onChange={handleChange} 
        placeholder="1" 
        min="1" 
        max="10" 
      />
      
      <label htmlFor="occasion">Occasion</label>
      <select 
        id="occasion" 
        value={formData.occasion} 
        onChange={handleChange}
      >
        <option>Birthday</option>
        <option>Anniversary</option>
      </select>
      
      <input type="submit" value="Make Your reservation" />
    </form>
  );
};

export default BookingForm;
