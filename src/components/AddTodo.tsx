import React, { useState, type FormEvent } from 'react'

import {useDispatch } from"react-redux";
import { addTodo } from '../features/todos/todoSlice';

const AddTodo = () => {
    const [input , setInput] = useState('')
    const dispatch = useDispatch()

    function handleSubmit(e:FormEvent){
        e.preventDefault();
        dispatch(addTodo(input))
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input onChange={(e)=>setInput(e.target.value)}>

            </input>
            <button type='submit'>
    Add todo
            </button>
        </form>
    </div>
  )
}

export default AddTodo