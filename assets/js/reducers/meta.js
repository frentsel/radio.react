export default function meta(state = [], action) {

	if (action.type === 'SET') {
		return [];
	}

	return state;
}