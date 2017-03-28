import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import stations from './stations';
import player from './player';

export default combineReducers({
	routing: routerReducer,
	stations,
	player
});