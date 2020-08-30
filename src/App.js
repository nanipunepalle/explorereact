import React from 'react';
import Radar from 'radar-sdk-js';
import Home from './Home';

function App() {
  const publishableKey = "prj_live_pk_3bb22a86ba4987c58bb96bcee419db8c41368c62";
  console.log(publishableKey);
  React.useEffect(() => {
    Radar.initialize(publishableKey);
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <Home></Home>
      </header>
    </div>
  );
}

export default App;
