import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: { list: [{ completed: false, id: "1", text: "Sample" }] },
    reducers: {
        addTodo: (state, action) => {
            state.list.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.list = state.list.filter(todo => todo.id !== action.payload);
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.list.find(todo => todo.id === id);
            if (todo) {
                todo.text = text;
            }
        },
        toggleTodo: (state, action) => {
            const todo = state.list.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    }
});

export const { addTodo, removeTodo, updateTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;