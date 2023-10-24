import React, { useState, useEffect } from "react";
import { dquote_backend } from "../../declarations/dquote_backend/index";
const App = () => {
  const [id, setId] = useState("1293");
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    fetchAdvice();
  }, []);

 

    const randomNumberInRange = (min, max) => { 
        return Math.floor(Math.random()*(max - min + 1)) + min; 
    }; 

   

    const fetchAdvice = async()=>{
        const num = randomNumberInRange(1,10);
        const randomNumber = num.toString();
        console.log(randomNumber)
        const result = await dquote_backend.fetch(randomNumber);
        console.log(result.advice);
        setId(result.author);
        setAdvice(result.advice);
    }


  const anime = () => {
    let speak = document.querySelector(".speak");
    let speakLogo = document.querySelector(".speakLogo");

    speakLogo.setAttribute(
      "src",
      "https://img.icons8.com/ultraviolet/80/null/medium-volume--v2.png"
    );
    speakLogo.style.filter = "invert(50%)";

    setTimeout(() => {
      setTimeout(() => {
        speak.style.backgroundColor = "white";
        speakLogo.setAttribute(
          "src",
          "https://img.icons8.com/carbon-copy/100/null/medium-volume.png"
        );
        speakLogo.style.filter = "invert(0%)";
      }, 1000);
    }, 1000);
  };

  const copyClipboard = () => {
    copyAnime();
    let adviceText = document.getElementsByClassName("heading")[0].innerText;
    navigator.clipboard.writeText(adviceText).then(
      () => {
        console.log("Content copied to clipboard");
      },
      () => {
        console.error("Failed to copy");
      }
    );
  };

  const textSpeak = () => {
    anime();
    const synth = window.speechSynthesis;
    let ourText = document.getElementsByClassName("heading")[0].innerText;
    const utterThis = new SpeechSynthesisUtterance(ourText);
    const voices = synth.getVoices();

    utterThis.voice = voices[6];

    synth.speak(utterThis);
  };

  const copyAnime = () => {
    let copy = document.querySelector(".copy");
    let copyLogo = document.querySelector(".copyLogo");
    copyLogo.setAttribute("src", "https://img.icons8.com/ios/50/null/pass.png");
    copyLogo.style.height = "29px";
    copy.style.backgroundColor = "#6be3a2";
  };

  const shareTwitter = () => {
    const navUrl =
      "https://twitter.com/intent/tweet?text=" +
      document.getElementsByClassName("heading")[0].innerText;
    window.open(navUrl, "_blank");
  };

  return (
    <div className="app">
      <div className="card">
        <p className="advice_id">~ {id}</p>
        <h1 className="heading">
          <img
            className="left-quote"
            src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/null/external-inverted-quotation-mark-used-to-highlight-dialogues-text-shadow-tal-revivo.png"
          />
          {advice}
          <img
            className="right-quote"
            src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/null/external-closing-inverted-quotation-bracket-mark-used-to-highlight-dialogues-text-shadow-tal-revivo.png"
          />
        </h1>
        <button className="button" onClick={fetchAdvice}>
          <span>New Quote</span>
        </button>
        <div className="share-icon">
          <div className="round_icon speak" onClick={textSpeak}>
            <img
              className="speakLogo"
              src="https://img.icons8.com/carbon-copy/100/null/medium-volume.png"
            />
          </div>
          <div className="round_icon copy" onClick={copyClipboard}>
            <img
              className="copyLogo"
              src="https://img.icons8.com/parakeet/96/null/copy.png"
            />
          </div>
          <div className="round_icon share" onClick={shareTwitter}>
            <img src="https://img.icons8.com/office/80/null/twitter.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
