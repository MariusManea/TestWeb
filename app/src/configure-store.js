import { createStore } from 'redux';
import { countReducer } from './DataStore/reducer';

export const store = createStore(countReducer);