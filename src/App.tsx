import React from 'react';
import Board from './Containers/Board';
import LoginPage from './Containers/LoginPage';
import { BrowserRouter, Route } from 'react-router-dom';
import CardCreationPage from './Containers/CardCreationPage';
import ProfilePage from './Containers/ProfilePage';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={LoginPage} exact />
        <Route path="/board" component={Board} exact />
        <Route path="/profile" component={ProfilePage} exact />
        <Route path="/create" component={CardCreationPage} exact />
      </BrowserRouter>
    </div>
  );
};

export default App;
