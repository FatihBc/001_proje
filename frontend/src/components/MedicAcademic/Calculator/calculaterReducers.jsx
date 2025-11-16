import {
    APPLY_NUMBER,
    CHANGE_OPERATION,
    CLEAR_DISPLAY,
    EVALUATE,
    MEMORY_ADD,
    MEMORY_RECALL,
    MEMORY_CLEAR,
} from "./calculaterActions.jsx";

export const initialState = {
    total: '0',
    tempMemory: '0',
    operation: '+',
    memory: '0',
};

const calculateResult = (num1, num2, operation) => {
    switch (operation) {
        case '+':
            return num1 + num2;
        case '*':
            return num1 * num2;
        case '-':
            return num1 - num2;
        case '/':
            return num1 / num2;
        default:
            return 0;
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case APPLY_NUMBER:
            return {
                ...state,
                total:
                    !state.total || state.total === '0'
                        ? String(action.payload)
                        : state.total + String(action.payload),
            };

        case CHANGE_OPERATION:
            return {
                ...state,
                operation: action.payload,
                tempMemory: state.total,
                total: '0',
            };

        case CLEAR_DISPLAY:
            return { ...state, total: '0' };

        case EVALUATE:
            return {
                ...state,
                total: calculateResult(
                    Number(state.tempMemory),
                    Number(state.total),
                    state.operation
                ).toString(),
            };

        case MEMORY_ADD:
            return { ...state, memory: state.total, total: '0' };

        case MEMORY_RECALL:
            return { ...state, total: state.memory };

        case MEMORY_CLEAR:
            return { ...state, memory: '0' };

        default:
            return state;
    }
};

export default reducer;
