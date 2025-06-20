import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevPrompt, setprevPrompt] = useState([]);
  const [showResults, setshowResults] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setresultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function() {
      setresultData(prev => prev+nextWord)
    }, 75*index);
  };

  const newChat = () => {
    setloading(false);
    setshowResults(false);
  }

  const onSent = async (prompt) => {
    setresultData("");
    setloading(true);
    setshowResults(true);
    let response;
    if(prompt !== undefined){
      response = await runChat(prompt)
      setrecentPrompt(prompt)
    }
    else{
      setprevPrompt(prev=>[...prev, input]);
      setrecentPrompt(input);
      response = await runChat(input);
    }
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for(let i=0; i<newResponseArray.length; i++){
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord+" ");
    }
    setloading(false);
    setinput("");
  };

  const contextValue = {
    prevPrompt,
    setprevPrompt,
    onSent,
    setrecentPrompt,
    recentPrompt,
    showResults,
    loading,
    resultData,
    input,
    setinput,
    newChat
  };

  return (
    <context.Provider value={contextValue}>{props.children}</context.Provider>
  );
};

export default ContextProvider;
