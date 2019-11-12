import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './App.css';

////////////////////////////////////////////////////////////////////////////////////////////////////

import { AppProvider } from './app-context';

////////////////////////////////////////////////////////////////////////////////////////////////////

import HomePage from './screens/Home';
import PlacePage from './screens/Place';
import PlacesPage from './screens/Places';

////////////////////////////////////////////////////////////////////////////////////////////////////

library.add(fas);

const initialState = {};
const reducer = (state = {}, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

function Reviewer() {
  const mapRef = React.useRef();

  React.useEffect(() => {
    console.log(mapRef.current);
  }, []);

  return (
    <div className="absolute inset-0">
      <div className="flex relative w-full h-full overflow-hidden">
        <div className="flex-initial relative w-full max-w-xl h-full shadow-xl">
          <div className="relative w-full max-h-full overflow-x-hidden overflow-y-auto">
            <Router>
              <Switch>
                <Route path="/places/:placeId" component={PlacePage} />
                <Route path="/places" component={PlacesPage} />
                <Route path="/" component={HomePage} />
              </Switch>
            </Router>
          </div>
        </div>

        <div className="flex-auto">
          <div ref={mapRef} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider initialState={initialState} reducer={reducer}>
      <Reviewer />
    </AppProvider>
  );
}

export default App;
