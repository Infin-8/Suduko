const actions = {

    loadBoards: payload => ({ type: "LOAD-BOARDS", payload }),
    resetBoards: () => ({ type: "RESET" }),
    loadCurrent: payload => ({ type: "LOAD-CURRENT", payload }),
    resetCurrent: () => ({ type: "RESET-CURRENT" }),
    setCurrent: payload => ({ type: "SET-CURRENT", payload }),
    shiftSelected: payload => ({ type: "SHIFT-SELECTED", payload }),
    pushSelected: payload => ({ type: "PUSH-SELECTED", payload }),
    updateTime: payload => ({ type: "PLAYING-SINCE", payload }),
    annotate: payload => ({ type: "ANNOTATE", payload }),
    deleteAnnotation: payload => ({ type: "DELETE-ANNOTATION", payload }),
    loadSaved: payload => ({ type: "LOAD-SAVED", payload }),
    loadResponse: payload => ({ type: 'LOAD-RESPONSE', payload })
}


export default actions