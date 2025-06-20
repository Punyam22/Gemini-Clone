import React from 'react'
import './Main.css'

const Card = ({icon, text}) => {
  return (
    <div>
        <div className="card">
            <p>{text}</p>
            <img src={icon} alt="" />
        </div>
    </div>
  )
}

export default Card