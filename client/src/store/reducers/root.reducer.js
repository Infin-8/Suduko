import boardsReducer from './boards.reducer'
import currentReducer from './current.reducer'


const rootReducer = (state, action) => ({

    boards: boardsReducer(state.boards, action),
    current: currentReducer(state.current, action)

})

export default rootReducer