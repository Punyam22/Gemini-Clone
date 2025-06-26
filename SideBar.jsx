import React, { useContext, useState } from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import BottomButton from "./BottomButton";
import { context } from "../../context/Context";

const SideBar = () => {
  const [extended, setextended] = useState(false);
  const { onSent, prevPrompt, newChat, deletePrompt } = useContext(context);

  const loadPrompt = (promptStr) => {
    onSent(promptStr);
  };

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
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <div className="recent-title">Recent</div>
            {prevPrompt.map((item) => (
              <div
                className="recent-entry"
                key={item.id}
                
              >
                <img src={assets.message_icon} onClick={() => loadPrompt(item.prompt)} alt="" />
                <p>{item.prompt.slice(0, 18)}...</p>
                <div
                  className="delete-button"
                  title="Delete"
                  onClick={() => deletePrompt(item.id)}
                >
                  <img src= {assets.plus_icon} alt="" />
                </div>
              </div>
            ))}
          </div>
        )}
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