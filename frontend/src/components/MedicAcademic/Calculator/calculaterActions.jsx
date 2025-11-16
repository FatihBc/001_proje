export const APPLY_NUMBER = 'APPLY_NUMBER';
export const CHANGE_OPERATION = 'CHANGE_OPERATION';
export const CLEAR_DISPLAY = 'CLEAR_DISPLAY';
export const EVALUATE = 'EVALUATE';
export const MEMORY_ADD = 'MEMORY_ADD';
export const MEMORY_RECALL = 'MEMORY_RECALL';
export const MEMORY_CLEAR = 'MEMORY_CLEAR';

export const applyNumber = (number) => ({
    type: APPLY_NUMBER,
    payload: number,
});

export const changeOperation = (operation) => ({
    type: CHANGE_OPERATION,
    payload: operation,
});

export const handleClear = () => ({
    type: CLEAR_DISPLAY,
});

export const evaluate = () => ({
    type: EVALUATE,
});

export const memoryAdd = () => ({
    type: MEMORY_ADD,
});

export const memoryRecall = () => ({
    type: MEMORY_RECALL,
});

export const memoryClear = () => ({
    type: MEMORY_CLEAR,
});
