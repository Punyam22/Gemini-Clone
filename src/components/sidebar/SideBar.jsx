import React, { useContext, useState } from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import BottomButton from "./BottomButton";
import { context } from "../../context/Context";

const SideBar = () => {
  const [extended, setextended] = useState(false);
  const { onSent, prevPrompt, setrecentPrompt, newChat} = useContext(context);

  const loadPrompt = async (prompt) => {
    setrecentPrompt(prompt)
    await onSent(prompt)
  }

  const accessory = [
    { icon: assets.question_icon, text: "Help" },
    { icon: assets.history_icon, text: "Activity" },
    { icon: assets.setting_icon, text: "Settings" },
  ];

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setextended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <div className="recent-title">Recent</div>
            {prevPrompt.map((item, index) => {
              return (
                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0,18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        {accessory.map((item, index) => (
          <BottomButton
            key={index}
            icon={item.icon}
            text={item.text}
            extended={extended}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
