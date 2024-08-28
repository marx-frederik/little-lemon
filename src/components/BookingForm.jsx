import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchAPI } from "./API.js";
import "./BookingForm.css";

const BookingForm = ({ availableTimes, dispatch, onSubmit }) => {

  const validationSchema = Yup.object({
    date:Yup.string().required("Please choose a date."),
    time: Yup.string().required("Please choose a time."),
    guests: Yup.number()
      .min(1, "Must be at least 1 guest.")
      .max(10, "Cannot be more than 10 guests.")
      .required("Please specify the number of guests."),
    occasion: Yup.string().required("Please choose an occasion."),
  });

  const handleDateChange = (e, formik) => {
    const date = new Date(e.target.value);
    const times = fetchAPI(date);
    dispatch({ type: "SET_TIMES", payload: times });
    formik.setFieldValue('date', e.target.value);
  };

  return (
    <Formik
      initialValues={{
        date: "",
        time: "",
        guests: 1,
        occasion: "Birthday",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {(formik) => (
        <Form
          style={{
            display: "grid",
            maxWidth: "200px",
            gap: "20px",
            margin: "0 auto",
          }}
        >
          <div>
            <h1>Book Now</h1>
            <label htmlFor="date">Choose date</label>
            <Field
              type="date"
              id="date"
              name="date"
              onChange={(e) => handleDateChange(e, formik)}
              className={
                formik.touched.date && formik.errors.date ? "input-error" : ""
              }
              aria-required="true"
              aria-invalid={formik.touched.date && formik.errors.date ? 'true' : 'false'}
              aria-describedby="date-error"
            />
            <ErrorMessage
              name="date"
              component="div"
              className="error-message"
            />
          </div>

          <div>
            <label htmlFor="time">Choose time</label>
            <Field
              as="select"
              id="time"
              name="time"
              disabled={!availableTimes.length}
              className={
                formik.touched.time && formik.errors.time ? "input-error" : ""
              }
              aria-required="true"
              aria-invalid={formik.touched.time && formik.errors.time ? 'true' : 'false'}
              aria-describedby="time-error"
            >
              <option value="" label="Select time" />
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="time"
              component="div"
              className="error-message"
            />
          </div>

          <div>
            <label htmlFor="guests">Number of guests</label>
            <Field
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="10"
              className={
                formik.touched.guests && formik.errors.guests
                  ? "input-error"
                  : ""
              }
              aria-required="true"
              aria-invalid={formik.touched.guests && formik.errors.guests ? 'true' : 'false'}
              aria-describedby="guests-error"
            />
            <ErrorMessage
              name="guests"
              component="div"
              className="error-message"
            />
          </div>

          <div>
            <label htmlFor="occasion">Occasion</label>
            <Field
              as="select"
              id="occasion"
              name="occasion"
              className={
                formik.touched.occasion && formik.errors.occasion
                  ? "input-error"
                  : ""
              }
              aria-required="true"
              aria-invalid={formik.touched.occasion && formik.errors.occasion ? 'true' : 'false'}
              aria-describedby="occasion-error"
            >
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
            </Field>
            <ErrorMessage
              name="occasion"
              component="div"
              className="error-message"
            />
          </div>

          <button type="submit">Make Your Reservation</button>
        </Form>
      )}
    </Formik>
  );
};

export default BookingForm;
