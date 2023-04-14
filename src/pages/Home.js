import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';


const Home = () => {

    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState(0);

    const toolOptionsNames = ['All', 'Completed', 'Uncompleted', 'Favorites'];
    const toolOptions = [];

    toolOptionsNames.forEach((data, index) => {
        toolOptions.push(<div className={index === 0 ? 'option-txt selected' : 'option-txt'} key={data} onClick={() => addSelected(index)}>{data}</div>);
    });

    const addSelected = (i) => {
        let btn = document.getElementsByClassName('option-txt');
        
        for(let j=0; j<btn.length; j++){
            btn[j].classList.remove('selected');
        }

        setFilter(i);
        btn[i].classList.add('selected');
    }

    const navigate = useNavigate();
    
    return(
        <div className="container">
            <div className="App-wrapper">
                <header className="App-header">
                    <h2>Board</h2>
                    <div className="head-tools"></div>
                </header>

                <div className='options-bar'>
                    {toolOptions}
                </div>

                <div className="inner-body">
                    <TodoList todos={todos} setTodos={setTodos} type={filter}/>
                </div>

                <button className="btn foot" onClick={() => navigate('addForm')}>Add Task</button>
            </div>
        </div>
    );
}

export default Home;