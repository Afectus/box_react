import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route } from 'react-router-dom';
import history from './functions/history';

import MainView from './components/views/Main';
import LoginView from './components/views/Login';
import SearchView from './components/card/SearchView';
import NewCardView from './components/card/NewView';
import CardEditView from './components/card/EditView';
import CardRelativesView from './components/card/RelativesView';

import allReducers from './reducers';

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={MainView} />
                <Route exact path="/login" component={LoginView} />
                <Route exact path="/search" component={SearchView} />
                <Route exact path="/search/:type/:search" component={SearchView} />
                <Route exact path="/new" component={NewCardView} />
                <Route exact path="/card/:phone" component={CardEditView} />
                <Route exact path="/card-rel/:phone/" component={CardRelativesView} />
                <Route exact path="/card-rel/:phone/:edit" component={CardRelativesView} />
                <Route exact path="/card/:phone/:saved" component={CardEditView} />
            </div>
курва
        </Router>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
