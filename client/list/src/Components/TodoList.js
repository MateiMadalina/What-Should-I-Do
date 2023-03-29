import React, {useState } from 'react';

const TodoList = (props) => {
  const title = props.title;
  const comment = props.comment;
  const removeTodo = props.removeTodo;
  const id = props.id;
  const [editList, setEditList] = useState(true);
  const [editTitle, setEditTitle] = useState(title);
  const [editComment, setEditComment] = useState(comment);
console.log(editTitle)

const handleSubmit = () =>{
  const data = { _id: id, title:editTitle, comment:editComment};
  console.log(data)
  fetch('http://localhost:3000/api/todo', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json',
     },
    body: JSON.stringify(data)
  })
}

  return (
    <div>
      {editList? (
          <table>
            <tr>
              <th>{title}</th>
              <th>{comment}</th>
              <th><button className="BTN" onClick={() => {setEditList(false)}}>Edit</button> </th>
              <th><button className="BTN" onClick={removeTodo}>Remove</button></th>
            </tr>
          </table>
      ): (
        <table>
           <th><input className='inputEdit' type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)}/></th> 
           <th><input className='inputEdit' type="text" value={editComment} onChange={e => setEditComment(e.target.value)}/></th>
           <th><button type="submit" className="BTN" onClick={() => {setEditList(true);handleSubmit();}}>Done</button></th> 
        </table>
      )}
      
    </div>
  );
};

export default TodoList;
