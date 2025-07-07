import { createContext, useEffect, useState } from "react";
import runChat from "../config/gemini";

export const context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevPrompt, setprevPrompt] = useState([]); 
  const [showResults, setshowResults] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setresultData] = useState("");

  useEffect(() => {
    const savedKeys = JSON.parse(localStorage.getItem("promptKeys")) || [];
    const savedChats = savedKeys
      .map((key) => {
        try {
          return JSON.parse(localStorage.getItem(key));
        } catch {
          return null;
        }
      })
      .filter((chat) => chat && chat.prompt);
    setprevPrompt(savedChats);
  }, []);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setresultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setshowResults(false);
    setloading(false);
    setinput("");
    setresultData("");
    setrecentPrompt("");
  };

  const deletePrompt = (id) => {
    const updatedKeys = (JSON.parse(localStorage.getItem("promptKeys")) || []).filter(
      (key) => key !== id
    );
    localStorage.setItem("promptKeys", JSON.stringify(updatedKeys));
    localStorage.removeItem(id);
    setprevPrompt((prev) => prev.filter((chat) => chat.id !== id));
  };

  const onSent = async (prompt) => {
    setresultData("");
    setloading(true);
    setshowResults(true);

    const currentPrompt = prompt?.trim() || input.trim();
    if (!currentPrompt) {
      setloading(false);
      return;
    }

    setrecentPrompt(currentPrompt);

    let response;
    const savedKeys = JSON.parse(localStorage.getItem("promptKeys")) || [];
    for (const key of savedKeys) {
      const chat = JSON.parse(localStorage.getItem(key));
      if (chat?.prompt === currentPrompt) {
        response = chat.response;
        break;
      }
    }

    if (!response) {
      try {
        response = await runChat(currentPrompt);
      } catch (err) {
        console.error(err);
        setresultData("Error fetching response.");
        setloading(false);
        return;
      }

      const id = `chat_${Date.now()}`;
      const chatEntry = { id, prompt: currentPrompt, response };
      localStorage.setItem(id, JSON.stringify(chatEntry));
      const updatedKeys = [...savedKeys, id];
      localStorage.setItem("promptKeys", JSON.stringify(updatedKeys));
      setprevPrompt((prev) => [...prev, chatEntry]);
    }

    const responseArray = response.split("**");
    let newResponse = "";
    responseArray.forEach((chunk, i) => {
      newResponse += i % 2 === 1 ? `<b>${chunk}</b>` : chunk;
    });
    const formatted = newResponse.split("*").join("<br/>");
    formatted.split(" ").forEach((w, i) => delayPara(i, w + " "));

    setloading(false);
    setinput("");
  };

  return (
    <context.Provider value={{
      prevPrompt,
      onSent,
      newChat,
      deletePrompt,
      recentPrompt,
      showResults,
      loading,
      resultData,
      input,
      setinput,
    }}>
      {props.children}
    </context.Provider>
  );
};

export default ContextProvider;