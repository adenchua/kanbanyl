import React from 'react';
import BoardPage from './containers/BoardPage';
import LoginPage from './containers/LoginPage';
import { BrowserRouter, Route } from 'react-router-dom';
import CardCreationPage from './containers/CardCreationPage';
import ProfilePage from './containers/ProfilePage';
import IssuePage from './containers/IssuePage';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={LoginPage} exact />
        <Route path="/board" component={BoardPage} exact />
        <Route path="/profile" component={ProfilePage} exact />
        <Route path="/create" component={CardCreationPage} exact />
        <Route path="/issues" component={IssuePage} exact />
      </BrowserRouter>
    </div>
  );
};

export default App;
