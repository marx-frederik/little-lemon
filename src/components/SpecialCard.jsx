import React from 'react'
import './SpecialCard.css'

const SpecialCard = (props) => {
  return (

    <div className="card" >
    <img src={props.image} alt={props.title} />
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <span>{props.price}</span>
      <p className="card-text">{props.description}</p>
      <a href="#" className="btn btn-primary">Order</a>
    </div>
  </div>
  )
}

export default SpecialCard