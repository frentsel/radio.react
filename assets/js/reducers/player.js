export default function player(state = "http://stream.deep1.ru:8000/deep1mp3", action) {

	if (action.type === 'SET') {
		return state = action.url;
	}

	return state;
}