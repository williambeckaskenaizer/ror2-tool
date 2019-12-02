import React from 'react';
import './App.css';
import SearchAppBar from './TopMenuBar';
import { useRoutes } from 'hookrouter';
import Routes from './navigation/router';

function App() {
  const routeResult = useRoutes(Routes);
  return (
    <div className="App">
      <SearchAppBar/>
      {routeResult}
    </div>
  );
}

export default App;
