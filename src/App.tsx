import React from 'react';
import Board from './containers/BoardPage';
import LoginPage from './containers/LoginPage';
import { BrowserRouter, Route } from 'react-router-dom';
import CardCreationPage from './containers/CardCreationPage';
import ProfilePage from './containers/ProfilePage';

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
