import React from 'react'
import "./SideBar.css";

const BottomButton = ({icon, text, extended}) => {
  return (
    <div>
        <div className={`bottom-items recent-entry `}>
            <img src={icon} alt="" />
            {extended ? <p>{text}</p> : null}
        </div>
    </div>
  )
}

export default BottomButton