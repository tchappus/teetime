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
    const timer = <Timer key={1} closeOnClick={() => removeTimer("1", timerList, setTimers)} />;
    timerList.current = timerList.current.concat(timer);
    setTimers(timerList.current);
  }, []);

  return (
    <div className="App">
      {timers}
      <BigButton onClick={() => {
        const id = new Date().getTime();
        const timer = <Timer key={id} closeOnClick={() => removeTimer(`${id}`, timerList, setTimers)} />
        timerList.current = timerList.current.concat(timer);
        setTimers(timerList.current);
      }} />
    </div>
  );
}

export default App;
