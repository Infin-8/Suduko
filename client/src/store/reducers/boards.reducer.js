import action_types from "./action.types"
const { LOAD_BOARDS, RESET_BOARDS, UPDATE_TIME } = action_types

const boardsReducer = (state, action) => {

    switch (action.type) {

        case LOAD_BOARDS:
            return action.payload

        case RESET_BOARDS:
            return []

        case UPDATE_TIME:
            return [...state]
                .map(item => item._id === action.payload.id
                    ? ({ ...item, playingSince: action.payload.time })
                    : item)

        default:
            return state
    }
}

export default boardsReducer