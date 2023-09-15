import React, { useState } from 'react'
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from '../api/apiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'

const TodoList = () => {

    const [newTodo, setNewTodo] = useState('')

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()
    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    console.log('Todos')
    console.log(todos)

    const handleSubmit = (e) => {
        e.preventDefault()

        // Add Todo
        addTodo({
            userId: 1,
            title: newTodo,
            completed: false
        })
        setNewTodo('')
    }

    const newItemSection = 
        <form className='form-horizontal' onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-10">
                    <input 
                        type='text' 
                        id='new-todo' 
                        className='form-control' 
                        value={newTodo} 
                        onChange={(e) => setNewTodo(e.target.value)} 
                        placeholder='Enter new todo'
                    />
                </div>
                <div className="col-1">
                    <button className='submit btn btn-primary'>
                        <FontAwesomeIcon icon={faUpload} />
                    </button>
                </div>
            </div>
        </form>

    let content;
    // Define conditional content
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = 
        
                <ul className="list-group mt-4">
                    {
                         todos?.map(todo => {
                            return (
                                <li className='list-group-item' key={todo.id}>
                                    <div className="row">
                                        <div className="col-1">
                                            <input 
                                                type="checkbox" 
                                                checked={todo.completed} 
                                                id={todo.id} 
                                                onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                                            />
                                        </div>
                                        <div className="col-9">
                                            <label htmlFor={todo.id}>
                                                {todo.title}
                                            </label>
                                        </div>
                                        <div className="col-1">
                                            <button className='btn btn-danger' onClick={() => deleteTodo({ id: todo.id })}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <>
            <main className='mb-4'>
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <h1 className='text-primary text-center'>Todo List</h1>
                        {newItemSection}
                        {content}
                    </div>
                </div>
            </main>
        </>
    )
}

export default TodoList