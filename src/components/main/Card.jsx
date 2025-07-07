import React, { useContext } from 'react';
import { context } from "../../context/Context";
import './Main.css';

const Card = ({icon, text, onSent}) => {

  return (
    <div>
        <div className="card" onClick = {() => onSent(text)}>
            <p>{text}</p>
            <img src={icon} alt="" />
        </div>
    </div>
  )
}

export default Card