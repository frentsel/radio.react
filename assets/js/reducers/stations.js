export default function stations(state = [], action) {

	if (action.type === 'GET_ALL') {
		return [];
	}

	return state;
}