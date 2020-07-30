const initialState = {
    position: [0, 0],   // x / y
    spriteLocation: '0px 0px',  // adding comma btn x & y will add center, center   
    direction: 'SOUTH',
    walkIndex: 0,
}

const playerReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'MOVE_PLAYER':
            return {
                ...action.payload
            }

        default:
            return state
    }
}



export default playerReducer
