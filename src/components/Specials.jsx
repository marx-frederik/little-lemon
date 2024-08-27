import React from 'react'
import SpecialCard from './SpecialCard'
import './Specials.css'

const Specials =  ()=>{
  return (
    <section className="specials-section">
      <div className='container'>
        <div className='specials-header'>
          <h1>This Weeks Specials</h1>
          <button className='btn btn-primary'>Online Menu</button>
        </div>
        <div className="specials">
          <SpecialCard
              image="https://via.placeholder.com/150"
              title="Greek Salad"
              price={12.99}
              description=""
          />
          <SpecialCard
              image="https://via.placeholder.com/150"
              title="Greek Salad"
              price={5.99}
              description=""
          />
          <SpecialCard
              image="https://via.placeholder.com/150"
              title="Greek Salad"
              price={5.00}
              description=""
          />
        </div>
      </div>
      </section>
  )
}

export default Specials;
