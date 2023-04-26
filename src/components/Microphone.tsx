import { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useThemeContext } from "../context/themeContext";

function Microphone() {
  const { lightmode, setLightMode } = useThemeContext();

  const { transcript, resetTranscript } = useSpeechRecognition({
    commands: [
      {
        command: "open *",
        callback: (test) => {
          console.log(test);
        },
      },
    ],
    // commands: [
    //   {
    //     command: "open *",
    //     callback: () => {},
    //     // callback: (website: string) => {
    //     //   window.open("http://" + website.split(" ").join(""));
    //     // },
    //   },
    //   {
    //     command: "change background colour to *",
    //     callback: () => {},
    //     // callback: (color: string) => {
    //     //   document.body.style.background = color;
    //     // },
    //   },
    //   {
    //     command: "reset",
    //     callback: () => {},
    //   },
    //   ,
    //   {
    //     command: "reset background colour",
    //     callback: () => {},
    //     // callback: () => {
    //     //   document.body.style.background = `rgba(0, 0, 0, 0.8)`;
    //     // },
    //   },
    // ],
  });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef<HTMLDivElement | null>(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div className="mircophone-container">Browser is not Support Speech Recognition.</div>;
  }
  const handleListing = () => {
    setIsListening(true);
    if (microphoneRef.current) microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    if (microphoneRef.current) microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  return (
    <div className="microphone">
      {lightmode ? "light" : "dark"}
      <button onClick={() => setLightMode(!lightmode)}>change</button>

      <div className="microphone-wrapper">
        <div className="mircophone-container">
          <div className="microphone-icon-container user-point" ref={microphoneRef} onClick={handleListing}>
            test
          </div>
          <div className="microphone-status">{isListening ? "Listening........." : "Click to start Listening"}</div>
          {isListening && (
            <button className="microphone-stop btn" onClick={stopHandle}>
              Stop
            </button>
          )}
        </div>
        {transcript && (
          <div className="microphone-result-container">
            <div className="microphone-result-text">{transcript}</div>
            <button className="microphone-reset btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Microphone;
