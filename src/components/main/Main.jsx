import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import Card from "./Card";
import { context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setinput,
    input,
  } = useContext(context);

  const assessory = [
    {
      text: "Suggest some beauiful pictures for the road trip.",
      icon: assets.compass_icon,
    },
    {
      text: "Briefly summarize the concept: Database Management.",
      icon: assets.bulb_icon,
    },
    {
      text: "Brainstorm team bonding exercise for out work retreat.",
      icon: assets.message_icon,
    },
    { text: "Improve the readability of this code.", icon: assets.code_icon },
  ];

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Punyam</span>
              </p>
            </div>
            <div className="cards">
              {assessory.map((item, index) => (
                <Card key={index} text={item.text} icon={item.icon} />
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <p> {recentPrompt} </p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setinput(e.target.value)}
              value={input}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  onSent();
                }
              }}
              type="text"
              placeholder="Enter your search here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
