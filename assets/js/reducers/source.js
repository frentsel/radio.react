export default function source(state = "", action) {

    if (action.type === 'SET') {
        if (state !== action.url)
            return state = action.url;
    }

    if (action.type === 'GET') {
        return state;
    }

    return state;
}