import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import React, { useState } from 'react';

const AddForm = () => {
    const navigate = useNavigate();

    //const [input, setInput] = useState('');
    //const [dati, setDati] = useState([]);
    const [todos, setTodos] = useState([]);

    return(
        <div className="container">
            <header className="App-header">
                <div className="head-tools">
                    <p onClick={() => navigate(-1)}>&#10094;</p>
                    <h2>Add Task</h2>
                </div>

                <div className="head-tools"></div>
            </header>

            <div className="inner-body">
                <Form
                    todos={todos}
                    setTodos={setTodos}
                />
            </div>
        </div>
    )
}

export default AddForm;