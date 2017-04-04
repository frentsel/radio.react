import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import stations from './stations';
import player from './player';
import meta from './meta';

export default combineReducers({
	routing: routerReducer,
	stations,
	meta,
	player
});