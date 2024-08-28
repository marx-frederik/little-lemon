import { render, screen } from '@testing-library/react';
import BookingForm from './components/BookingForm';
import { initializeTimes,availableTimesReducer, updateTimes } from './components/BookingPage.jsx';


test('renders a heading element in BookingForm', () => {

  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn();
  const onSubmit = jest.fn();


  render(<BookingForm availableTimes={availableTimes} dispatch={dispatch} onSubmit={onSubmit} />);


  const headingElement = screen.getByRole('heading', { level: 2 });
  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveTextContent('Book Now');
});



// Mock fetchAPI-Funktion
test('initializeTimes returns a non-empty array of times', () => {
  const times = initializeTimes();
  expect(Array.isArray(times)).toBe(true);
  expect(times.length).toBeGreaterThan(0);
});


test('updateTimes sets new available times correctly', () => {
  const initialState = ['17:00', '18:00', '19:00'];
  const newTimes = ['20:00', '21:00'];
  const action = { type: 'SET_TIMES', payload: newTimes };

  const newState = updateTimes(initialState, action);

  expect(newState).toEqual(newTimes);
});

test('updateTimes returns the same state for unknown action type', () => {
  const initialState = ['17:00', '18:00', '19:00'];
  const action = { type: 'UNKNOWN_ACTION', payload: ['20:00', '21:00'] };

  const newState = updateTimes(initialState, action);

  expect(newState).toEqual(initialState);
});

