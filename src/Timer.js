import "./Timer.css";
import { useState, useRef, useEffect } from "react";

function convertTime(ts) {
  return `${ts.toISOString().substring(0, 10)}T${ts
    .toTimeString()
    .substring(0, 8)}`;
}

function newTimestamp() {
  const ts = new Date();
  ts.setHours(ts.getHours() + 12);
  ts.setSeconds(0);
  ts.setMilliseconds(0);
  return convertTime(ts);
}

export default function (params) {
  const { closeOnClick, id, existingTimestamp, existingTitle } = params;
  const [countdown, setCountdown] = useState("00 h 00 m 00 s");
  const [timestamp, setTimestamp] = useState(existingTimestamp ?? newTimestamp());
  const [now] = useState(convertTime(new Date()));
  const [title, setTitle] = useState(existingTitle ?? "Timer");
  const timeRemaining = useRef(0);
  const interval = useRef(null);

  function writeToStorage(field, value) {
    const timers = JSON.parse(localStorage.getItem("timers")) ?? {};
    const timerObj = timers[id] ?? { title };
    timerObj[field] = value;
    timers[id] = timerObj;
    localStorage.setItem("timers", JSON.stringify(timers));
  }

  function remove() {
    const timers = JSON.parse(localStorage.getItem("timers")) ?? {};
    delete timers[id];
    localStorage.setItem("timers", JSON.stringify(timers));
  }

  function generateCountdown() {
    if (interval.current) {
      clearInterval(interval.current);
    }
    const chosenTime = new Date(timestamp);
    writeToStorage('timestamp', timestamp);
    interval.current = setInterval(() => {
      timeRemaining.current = chosenTime - new Date();
      if (timeRemaining.current <= 0) {
        timeRemaining.current = 0;
        clearInterval(interval.current);
      }
      const h = Math.floor(timeRemaining.current / 3600000).toLocaleString(
        "en-US",
        { minimumIntegerDigits: 2 }
      );
      const m = Math.floor(
        (timeRemaining.current - h * 3600000) / 60000
      ).toLocaleString("en-US", { minimumIntegerDigits: 2 });
      const s = Math.floor(
        (timeRemaining.current - h * 3600000 - m * 60000) / 1000
      ).toLocaleString("en-US", { minimumIntegerDigits: 2 });
      setCountdown(`${h} h ${m} m ${s} s`);
    }, 1000);
  }

  useEffect(() => {
    if (existingTimestamp) {
      generateCountdown();
    }
  }, []);
  
  return (
    <div className="Timer">
      <button
        className="remove-button"
        onClick={() => {
          if (interval.current) {
            clearInterval(interval.current);
          }
          remove();
          closeOnClick();
        }}
      >
        x
      </button>
      <br />
      <span>{title}</span>
      <br />
      <button
        onClick={() => {
          const newTitle = window.prompt("new title:");
          if (newTitle) {
            writeToStorage("title", newTitle);
            setTitle(newTitle);
          }
        }}
      >
        edit
      </button>
      <br />
      <br />
      <input
        type="datetime-local"
        min={now}
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
      />
      <button onClick={generateCountdown}>start</button>
      <br />
      <br />
      <code>{countdown}</code>
      <br />
      <br />
    </div>
  );
}
