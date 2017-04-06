export default function player(state = "", action) {

	if (action.type === 'SET') {
		return state = action.url;
	}

	return state;
}