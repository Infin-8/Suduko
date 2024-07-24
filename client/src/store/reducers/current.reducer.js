import action_types from "./action.types"
const { LOAD_CURRENT, RESET_CURRENT, SET_CURRENT, SHIFT_SELECTED, PUSH_SELECTED, ANNOTATE, DELETE_ANNOTATION, LOAD_SAVED } = action_types

const currentReducer = (state, action) => {

    switch (action.type) {

        case LOAD_CURRENT:
            return {
                ...action.payload,
                matrix: JSON.parse(action.payload.matrix),
                complete: JSON.parse(action.payload.matrix).flat().map(num => num.toString()).join(''),
                mapped: {
                    render: JSON.parse(action.payload.mapped.render)
                        .map((item, i) => item.mutable
                            ? ({
                                ...item,
                                index: i,
                                annotate: {
                                    render: false,
                                    values: [
                                        { value: 1, shouldRender: false },
                                        { value: 2, shouldRender: false },
                                        { value: 3, shouldRender: false },
                                        { value: 4, shouldRender: false },
                                        { value: 5, shouldRender: false },
                                        { value: 6, shouldRender: false },
                                        { value: 7, shouldRender: false },
                                        { value: 8, shouldRender: false },
                                        { value: 9, shouldRender: false }
                                    ]
                                }
                            })
                            : ({ ...item, index: i })),
                    selected: JSON.parse(action.payload.mapped.selected),
                    history: JSON.parse(action.payload.mapped.history)
                }
            }

        case RESET_CURRENT:
            return null

        case SET_CURRENT:
            return {
                ...state,
                mapped: {
                    ...state.mapped,
                    render: state.mapped.render
                        .map((item, i) => i === action.payload.index
                            ? ({ ...item, value: action.payload.num, mutable: !!action.payload.num ? false : true, annotate: { ...item.annotate, render: false } })
                            : item)
                }
            }

        case SHIFT_SELECTED:
            return {
                ...state,
                mapped: {
                    ...state.mapped,
                    selected: [...state.mapped.selected].filter((_, i, arr) => i !== arr.findIndex(value => value === action.payload))
                }
            }

        case PUSH_SELECTED:
            return {
                ...state,
                mapped: {
                    ...state.mapped,
                    selected: [...state.mapped.selected, action.payload]
                }
            }

        case ANNOTATE:
            return {
                ...state,
                mapped: {
                    ...state.mapped,
                    render: [...state.mapped.render]
                        .map((item, i) => i === action.payload.index
                            ? ({
                                ...item,
                                mutable: true,
                                render: action.payload.annotate.render,
                                annotate: {
                                    ...item.annotate,
                                    render: action.payload.annotate.render,
                                    values: item.annotate.values.map(item => action.payload.annotate.number === item.value
                                        ? ({ ...item, shouldRender: !item.shouldRender })
                                        : item)
                                }
                            })
                            : item)
                }
            }

        case DELETE_ANNOTATION:
            return {
                ...state,
                mapped: {
                    ...state.mapped,
                    render: [...state.mapped.render]
                        .map((item, i) => i === action.payload.index
                            ? ({
                                ...item,
                                annotate: {
                                    ...item.annotate,
                                    render: false,
                                    values: item.annotate.values.map(item => ({ ...item, shouldRender: false }))
                                }
                            })
                            : item)
                }
            }

        case LOAD_SAVED:
            return JSON.parse(action.payload)

        default:
            return state
    }
}

export default currentReducer