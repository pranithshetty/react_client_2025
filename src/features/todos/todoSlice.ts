import {createSlice, nanoid} from '@reduxjs/toolkit'
import { type ITodoState } from './types'

const initialState:ITodoState = {todos:[{id: 1, text: "hello", isComplete: false}]}

export const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo: (state,action)=>{
            const newTodo = {
                id: nanoid(),
                text: action.payload,
                isComplete: false
            }

            state.todos.push(newTodo)
        },
        removeTodo:(state,action)=>{
            state.todos = state.todos.filter((todo)=>(action.payload !== todo.id))
        },
        completeTodo:(state,action)=>{
            state.todos = state.todos.map((todo)=>{
                if(todo.id == action.payload.id){
                    return {
                        ...todo,
                        isComplete: !action.payload.isComplete
                      }
                } else {
                    return todo
                }
            })
        },
        updateTodo:(state,action)=>{
            state.todos = state.todos.map((todo)=>{
                if(todo.id == action.payload.id){
                    return {
                        ...todo,
                        text: action.payload.text
                      }
                } else {
                    return todo
                }
            })
        }

    }

})

export const {addTodo,removeTodo, completeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer