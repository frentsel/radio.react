export default function player(state = "play", action) {

    if (action.type === 'PLAY') {
        state = 'play';
        return state;
    }

    if (action.type === 'PAUSE') {
        state = 'pause';
        return state;
    }

    if (action.type === 'END') {
        state = 'end';
        return state;
    }

    return state;
}