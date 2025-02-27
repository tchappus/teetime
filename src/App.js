import { useState, useRef, useEffect } from 'react';
import BigButton from './BigButton.js';
import Timer from './Timer.js';

function removeTimer(id, timerList, setTimers) {
  timerList.current = timerList.current.filter(t => t.key !== id);
  setTimers(timerList.current);
}

function App() {

  const timerList = useRef([]);
  const [timers, setTimers] = useState();

  useEffect(() => {
    const existingTimers = JSON.parse(localStorage.getItem("timers"));
    for (const t in existingTimers) {
      timerList.current = timerList.current.concat(
        <Timer 
          key={t} 
          id={t} 
          closeOnClick={() => removeTimer(t, timerList, setTimers)}
          existingTimestamp={existingTimers[t]['timestamp']}
          existingTitle={existingTimers[t]['title']}
           />);
    }
    setTimers(timerList.current);
  }, []);

  return (
    <div className="App">
      {timers}
      <BigButton onClick={() => {
        const id = new Date().getTime();
        const timer = <Timer key={id} id={`${id}`} closeOnClick={() => removeTimer(`${id}`, timerList, setTimers)} />
        timerList.current = timerList.current.concat(timer);
        setTimers(timerList.current);
      }} />
    </div>
  );
}

export default App;
