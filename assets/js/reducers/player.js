export default function player(state = "", action) {

	if (action.type === 'SET') {
		return state = action.url;
	}

	if (action.type === 'GET') {
		return state;
	}

	if (action.type === 'PLAY') {
		return state;
	}

	if (action.type === 'PAUSE') {
		return state;
	}

	if (action.type === 'STOP') {
		return state;
	}

	return state;
}