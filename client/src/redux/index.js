// Imports
import {
  createStore, applyMiddleware, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// App imports
import core from '../core/redux/reducer';
import layout from '../layout/redux/reducer';

// App reducer
const appReducer = combineReducers({
  core,
  layout,
});

// Root reducer
export const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

// Store
export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
