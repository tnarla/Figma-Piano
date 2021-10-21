import React, { useEffect, useLayoutEffect, useState } from 'react'
import './App.css'

interface Message {
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

const noteMapping: { [sound: string]: string}  = {
    "C": "https://freesound.org/data/previews/39/39196_35187-lq.mp3",
    "C#": "https://freesound.org/data/previews/39/39195_35187-lq.mp3",
    "D#": "https://freesound.org/data/previews/39/39195_35187-lq.mp3",
    "F#": "https://freesound.org/data/previews/39/39195_35187-lq.mp3",
    "G#": "https://freesound.org/data/previews/39/39195_35187-lq.mp3",
    "A#": "https://freesound.org/data/previews/39/39195_35187-lq.mp3",
    "D": "https://freesound.org/data/previews/39/39197_35187-lq.mp3",
    "E": "https://freesound.org/data/previews/39/39198_35187-lq.mp3",
    "F": "https://freesound.org/data/previews/39/39199_35187-lq.mp3",
    "G": "https://freesound.org/data/previews/39/39200_35187-lq.mp3",
    "A": "https://freesound.org/data/previews/39/39201_35187-lq.mp3",
    "B": "https://freesound.org/data/previews/39/39202_35187-lq.mp3"
}

function App() {
  const data = useDataFromWidget<Message>();
  console.log(data);

  useEffect(() => {
    if (!data) return;
    
    if (data.sound) {
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
  }, [data])

  return (
    <div className="App">
    </div>
  )
}

export default App
