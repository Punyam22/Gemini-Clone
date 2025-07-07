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

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {
      const speechText = event.results[0][0].transcript;
      setinput(speechText);
    };

    recognition.onerror = function (event) {
      console.error("Speech recognition error:", event.error);
      alert("Error with voice input: " + event.error);
    };
  };

  const speechResponse = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synth.speak(utterance);
  };

  const assessory = [
    {
      text: "Suggest some beauiful places for the road trip.",
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
        <img src={assets.download} alt="" />
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
                <Card
                  onSent={onSent}
                  key={index}
                  text={item.text}
                  icon={item.icon}
                />
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
                <div className="response">
                  <p dangerouslySetInnerHTML={{ __html: resultData }} />
                  <img onClick={() => {speechResponse(resultData.replace(/<[^>]+>/g, ''))}} src={assets.volume_up} alt="" />
                </div>  
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
              <img onClick={handleVoiceInput} src={assets.mic_icon} alt="" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
