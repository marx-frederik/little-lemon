import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './components/BookingForm';
import { initializeTimes, updateTimes } from './components/BookingPage.jsx';


test('renders a heading element in BookingForm', () => {

  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn();
  const onSubmit = jest.fn();


  render(<BookingForm availableTimes={availableTimes} dispatch={dispatch} onSubmit={onSubmit} />);


  const headingElement = screen.getByRole('heading', { level: 1 });
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

describe('BookingForm Validation', () => {
  test('shows validation errors when submitting an empty form', async () => {
    render(<BookingForm availableTimes={[]} dispatch={jest.fn()} onSubmit={jest.fn()} />);


    // Klicken Sie auf den Senden-Button, um das Formular zu übermitteln

    fireEvent.click(screen.getByRole('button', { name: /Make Your Reservation/i }));

    // Überprüfen, ob die Validierungsfehlermeldungen angezeigt werden
    expect(await screen.findByText(/Please choose a date./i)).toBeInTheDocument();
    expect(await screen.findByText(/Please choose a time./i)).toBeInTheDocument();
  });

  test('does not show validation errors when form is filled correctly', async () => {
    render(<BookingForm availableTimes={['17:00']} dispatch={jest.fn()} onSubmit={jest.fn()} />);

    // Füllen Sie das Formular mit gültigen Werten
    fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '2023-12-31' } });
    fireEvent.change(screen.getByLabelText(/Choose time/i), { target: { value: '17:00' } });
    fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: 'Birthday' } });

    // Klicken Sie auf den Senden-Button, um das Formular zu übermitteln
    fireEvent.click(screen.getByRole('button', { name: /Make Your Reservation/i }));

    // Überprüfen, ob keine Validierungsfehlermeldungen angezeigt werden
    expect(screen.queryByText(/Please choose a date./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Please choose a time./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Please specify the number of guests./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Please choose an occasion./i)).not.toBeInTheDocument();
  });
});