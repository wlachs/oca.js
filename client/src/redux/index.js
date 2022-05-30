// Imports
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Persistence
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// App imports
import core from '../core/redux/reducer';
import { HARD_RESET } from '../core/redux/action_types';

// Persistence config
const persistConfig = {
  key: 'core',
  storage,
  whitelist: ['bearer'],
};

// App reducer
const appReducer = combineReducers({
  core: persistReducer(persistConfig, core),
});

// Root reducer
function rootReducer(state, action) {
  switch (action.type) {
    case HARD_RESET:
      return appReducer(undefined, action);
    default:
      return appReducer(state, action);
  }
}

// Store
function generateStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
  );

  const persistor = persistStore(store);
  return { store, persistor };
}

export default generateStore();
