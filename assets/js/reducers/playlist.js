export default function playlist(state = [], action) {

	if (action.type === 'GET_PLAYLIST') {
		return state;
	}

	if (action.type === 'SET_PLAYLIST') {
		state = action.playlist;
		return state;
	}

	if (action.type === 'CLEAR_PLAYLIST') {
		return state = [];
	}

	return state;
}