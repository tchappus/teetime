import { useState } from 'react';
import BigButton from './BigButton.js';
import Timer from './Timer.js';

function App() {

  const [timerList, setTimerList] = useState([<Timer />]);

  return (
    <div className="App">
      {timerList}
      <BigButton onClick={() => setTimerList(timerList.concat(<Timer />))} />
    </div>
  );
}

export default App;
