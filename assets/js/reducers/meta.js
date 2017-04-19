export default function meta(state = {}, action) {

	if (action.type === 'SET_META') {
		return state = action.meta;
	}

	return state;
}