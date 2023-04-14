import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const ADD_TODO = gql`
  mutation CreateTodo($title: String!, $date: String!, $startTime: String!, $endTime: String!) {
    createTodo(
        title: $title,
        date: $date,
        startTime: $startTime,
        endTime: $endTime
    ) {
      id
      title
      date
      startTime
      endTime
      completed
    }
  }
`;

const Form = ({todos, setTodos}) => {

    const navigate = useNavigate();

    const [createTodo, {loading, error}] = useMutation(ADD_TODO, {
        onCompleted: () => {
            console.log('todo added');
        },
        onError: () => {
            console.log('error adding');
        }
    })

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('12:30');
    const [endTime, setEndTime] = useState('12:30');

    const onFormSubmit = (event) => {
        event.preventDefault();
        let id = uuidv4();
        const obj = [
            ...todos,
            {
                id,
                title,
                date,
                startTime,
                endTime,
                completed: false
            }
        ];
        
        console.log(obj);
        createTodo({
            variables: {
                title,
                date,
                startTime,
                endTime,
                completed: false
            }
        });
        setTodos(obj);

        setTimeout(() => {
            navigate(-1);
        }, 500);
    }

    return (
        <form onSubmit={onFormSubmit}>
            <h3>Title</h3>
            <input 
                type="text" 
                placeholder="Design team meeting"
                value={title} 
                required 
                onChange={event => setTitle(event.target.value)}
            />
            
            <h3>Deadline</h3>
            <input type='date'
                placeholder="Date"
                value={date}
                required 
                onChange={(event) => setDate(event.target.value)}></input>

            <div className="mid-container">
                <div className="mid-container-in">
                    <h3>Start Time</h3>
                    <input type='time' 
                        placeholder="Start Time"
                        value={startTime} 
                        onInput={(event) => setStartTime(event.target.value)}></input>
                </div>

                <div className="mid-container-in">
                    <h3>End Time</h3>
                    <input type='time' 
                        placeholder="End Time"
                        value={endTime} 
                        onInput={(event) => setEndTime(event.target.value)}></input>
                </div>
            </div>

            <button className="btn foot" type="submit">Create New Task</button>
        </form>
        
    );
}

export default Form;