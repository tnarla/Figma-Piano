import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";

interface Message {
  intent: "play" | "keyboard";
  sound: string;
}

function useDataFromWidget<T>() {
  const [data, setData] = useState<T | null>(null);

  useLayoutEffect(() => {
    const listener = (event: MessageEvent) => {
      setData(event.data.pluginMessage);
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  return data;
}

const keyToNote: { [key: string]: string } = {
  a: "C",
  w: "C#",
  s: "D",
  e: "D#",
  d: "E",
  f: "F",
  g: "G",
  t: "F#",
  h: "A",
  j: "C",
  y: "G#",
  u: "A#",
};

const noteMapping: { [sound: string]: string } = {
  C: "https://freesound.org/data/previews/39/39196_35187-lq.mp3",
  "C#": "https://freesound.org/data/previews/39/39195_35187-lq.mp3",
  "D#": "https://freesound.org/data/previews/39/39195_35187-lq.mp3",
  "F#": "https://freesound.org/data/previews/39/39195_35187-lq.mp3",
  "G#": "https://freesound.org/data/previews/39/39195_35187-lq.mp3",
  "A#": "https://freesound.org/data/previews/39/39195_35187-lq.mp3",
  D: "https://freesound.org/data/previews/39/39197_35187-lq.mp3",
  E: "https://freesound.org/data/previews/39/39198_35187-lq.mp3",
  F: "https://freesound.org/data/previews/39/39199_35187-lq.mp3",
  G: "https://freesound.org/data/previews/39/39200_35187-lq.mp3",
  A: "https://freesound.org/data/previews/39/39201_35187-lq.mp3",
  B: "https://freesound.org/data/previews/39/39202_35187-lq.mp3",
};

function App() {
  const data = useDataFromWidget<Message>();

  useEffect(() => {
    if (!data) return;

    function onKeyPress(e: KeyboardEvent) {
      if (!keyToNote[e.key]) return;

      parent.postMessage(
        {
          pluginMessage: { type: "keyboard", note: keyToNote[e.key] },
        },
        "*"
      );

      const audio = new Audio();
      audio.src = noteMapping[keyToNote[e.key]];
      audio.play();

      audio.addEventListener("error", () => {
        parent.postMessage(
          {
            pluginMessage: { type: "close" },
          },
          "*"
        );
      });
    }

    if (data.intent === "keyboard") {
      window.addEventListener("keypress", onKeyPress);
    }
    
    return () => {
      window.removeEventListener("keypress", onKeyPress);
    };
  }, [data]);

  useEffect(() => {
    if (!data) return;

    if (data.intent === "play" && data.sound) {
      const audio = new Audio();
      audio.src = noteMapping[data.sound];
      audio.play();

      audio.addEventListener("error", () => {
        parent.postMessage(
          {
            pluginMessage: { type: "close" },
          },
          "*"
        );
      });

      audio.addEventListener("ended", () => {
        parent.postMessage(
          {
            pluginMessage: { type: "close" },
          },
          "*"
        );
      });
    }
  }, [data]);

  return (
    <div className="App">
      <div>Use your keyboard to play notes!</div>
    </div>
  );
}

export default App;
