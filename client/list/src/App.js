import './App.css';
import React, { useEffect, useState } from 'react';
import TodoList from './Components/TodoList';

function App() {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [data, setData] = useState(null);
  const [listInfo, setListInfo] = useState(true);
  
  const readAPIList = async () => {
    const response = await fetch("http://localhost:3000/api/todo");
    const data = await response.json();
    setData(data);
    console.log(data);
};

useEffect(() => {
  readAPIList()
}, [])

  function handleSubmit(e) {
    e.preventDefault();
    const data = { title, comment};
    fetch('http://localhost:3000/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
       },
      body: JSON.stringify(data)
    })
  }

  const handleList = (sts) =>{
    setListInfo(sts);
  }

  const removeTodo = (title) => {
    console.log(title);
    fetch('http://localhost:3000/api/todo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
      .then(() => {readAPIList();})
  };


  return (
  <div className='App'>
    {listInfo? (<div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input className='iptEdit' type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Comment:
          <input className='iptEdit' type="text" value={comment} onChange={e => setComment(e.target.value)} />
        </label>
        <button className="BTN" type="submit">Submit</button>
      </form>
    <button className="BTN" onClick={() => {handleList(false)}}>Show To do's</button>
    </div>): (
    <div>  
      {data && data.map((list) => (
        <TodoList
        title={list.title}
        comment={list.comment}
        id={list._id}
        removeTodo={() => {removeTodo(list.title)}}
        />
      ))}
      <button className="BTN" onClick={() => {handleList(true)}}>Back</button>
    </div>    
    )}
    </div>
    
  );
}

export default App;
