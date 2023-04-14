import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

const GET_TODOS = gql`
  query {
    todos {
      id
      title
      date
      startTime
      endTime
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: String) {
    deleteTodo(id: $id){
      id
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String, $completed: Boolean) {
    updateTodo(
      id: $id,
      completed: $completed
    ){
      id
      title
      date
      startTime
      endTime
      completed
    }
  }
`;



const TodoList = ({todos, setTodos, type}) => {

  //TODOS MUTATIONS
    const [deleteTodo] = useMutation(DELETE_TODO, {
      onCompleted: () => {
          console.log('todo deleted');
      },
      onError: () => {
          console.log('error deleting');
      },
      refetchQueries: [{query: GET_TODOS}]
    });

    const [updateTodo] = useMutation(UPDATE_TODO, {
      onCompleted: () => {
          console.log('todo updated');
      },
      onError: () => {
          console.log('error updated');
      },
      refetchQueries: [{query: GET_TODOS}]
    });

    //LOAD ALL TODOS
    const { loading, error, data } = useQuery(GET_TODOS, {fetchPolicy: 'cache-and-network'});

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error</p>;

    const items = [];
    data.todos.map((todo) => {
      items.push(<div className={type === 0 || (type === 1 && todo.completed) || (type === 2 && !todo.completed) ?  'todo-list' : 'todo-list hide' } key={todo.id}>
        <div className={todo.completed ? 'mark-item completed' : 'mark-item'} 
          key={'marker-' + todo.id}
          onClick={() => changeTodo(todo)}
        ></div>
        <p className='todo-item'>{todo.title}</p>
        <div className='delete-item' onClick={() => delTodo(todo.id)}>&#10006;</div>
      </div>);
    });

    items.reverse();

    //BUTTONS FUNCTIONS
    const delTodo = (id) => {
        setTodos(todos.filter((to) => to.id !== id));
        deleteTodo({
          variables:{
            id
          }
        });
    }

    const changeTodo = (todo) => {
        setTodos(
            todos.map((item) => {
                if(todo.id === item.id){
                    return{...item, completed: !item.completed}
                }

                return item;
            })
        );
        //console.log(todo.completed, !todo.completed);
        let bool = !todo.completed;
        updateTodo({
          variables:{
            id: todo.id,
            completed: bool
          }
        });
    }

    return(
        <div>
            {items}
        </div>
    )
}

export default TodoList;

