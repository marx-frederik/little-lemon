//CallToAction (sometimes referred to as the jumbotron or the hero, this component is the call-to-action section that guides the user to click a call-to-action button while enticing them to do so in as few words as possible)
import React from 'react'
import './CallToAction.css'
import callToActionImg from '../assets/images/restauranfood.jpg'

const CallToAction = () => {
  return (
    <section>
      <div className='calltoaction'>
        <div>
            <h1>Little Lemon</h1>
            <h3>Chicago</h3>
            <p>Experience the joy of fresh, locally sourced produce delivered straight to your doorstep</p>
        </div>
        <div className='right-col'>
            <div className='image-container'>
                <img src={callToActionImg} alt="jowasgehtn" />
            </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
