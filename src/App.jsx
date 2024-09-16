import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'


let nextId=1;

function App() {

  const [tname, setTname] = useState('');
  const [tdesc, setTdesc] = useState('');
  const  [todos,setTodos]=useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingId, setIsEditingId] = useState(null);
  const [currentValue, setCurrentValue] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [Status, setStatus]=useState(1);

  const handleChange =(Todo,index,value)=>{

setTodos([...todos.filter((e) => e.id !== Todo.id),
  {
    id: Todo.id,
    tname: Todo.tname,
    tdesc: Todo.tdesc,
    tstatus: value,
 
  }
])
  }

const setCardData =() =>
{
  if (!isEditing)
  {
  setTodos([
    ...todos,
    { id: nextId++,
       tname: tname,
       tdesc: tdesc,
       tstatus: currentValue
       }
  ]);
  setTname('');
  setTdesc('');
  setCurrentValue(1);
}
else
{

  setTodos([...todos.filter((todo) => todo.id !== isEditingId),
    {
      id: isEditingId,
      tname: tname,
      tdesc: tdesc,
      tstatus: currentValue,
   
    }
  ])

    setTname('');
    setTdesc('');
    setCurrentValue(1);
    setIsEditing(false);
    setIsEditingId(null);
}
}

const deleteTask = (index) => {
  const newArray = todos.filter((todo, i) => i !== index);
  setTodos(newArray);
};

const handleFilter = (value) => {
  const filtervalue = value;
  console.log(filtervalue);

  if(filtervalue==0)
  {
  const  filter = todos.filter(todo => todo.tstatus == 0);
    setFilteredUsers( filter);
  
  }
  if(filtervalue==1)
    {
    const  filter = todos.filter(todo => todo.tstatus == 1);
      setFilteredUsers( filter);
    }

 // setTodos(filtered);
 //console.log(todos);

 //const filteredUsers = todos.filter(todo => todo.tstatus == 0);
 //console.log(filteredUsers);


};

const editTask =(todo,index)=>{
 
    setIsEditing(true);
    setIsEditingId(todo.id);
    setTname(todo.tname);
    setTdesc(todo.tdesc);
    setCurrentValue(todo.tstatus)
}

const handleStatus = (newStatus)=>{
  setStatus(newStatus);
}



const filteredTasks = todos.filter(todo => todo.tstatus==Status);




  return (
    <>
    <div>
      <div className="container">
{/* Header*/}
        <div className="row">
          <div className="col-lg-12">
          <h2>My todo</h2>
          </div>
        </div>
{/*Input,Button */}
        <div className="row">
          <div className="col-lg-4">
          <input type="text"  value ={tname} onChange={e => setTname(e.target.value)} className="form-control" placeholder="Todo Name"/>
          </div>
          <div className="col-lg-4">
          <input type="text" value={tdesc} onChange={e => setTdesc(e.target.value)} className="form-control" placeholder="Todo Description"/>
          </div>
          <div className="col-lg-4">
          <div className="d-grid gap-2">
          <button type="button" onClick={setCardData} className="btn btn-success">{isEditing ? 'Update Todo' : 'Add Todo'}</button>
          </div>
          </div>
        </div>
{/* Header,Filter*/}
        <div className="row">
          <div className="col-lg-8">
          <h1>My Todos</h1>
          </div>
          <div className="col-lg-2">
            <b>Status Filter :</b>
            </div>
          <div className="col-lg-2">
             <select className="form-select form-select-sm" aria-label="Large select example"
             onChange={(e) => handleStatus(e.target.value)}>
  {/*<option selected>Open this select menu</option>*/}
 
  <option value="1">Not Completed</option>
  <option value="0">Completed</option>
  
</select>
          </div>
        </div>

<div className="row row-cols-1 row-cols-md-3 g-4">
  {filteredTasks.map((todo,index) => (

 <div key={index} className="col">
    <div className="card h-100">
      <div className="card-body">
        <p className="card-title">Name: {todo.tname} -  {todo.id}</p>
        <p className="card-title">Description: {todo.tdesc}</p>
        <p>
          Status: 
          <select className="form-select form-select-sm" aria-label="Large select example"         
           value={todo.tstatus}
           onChange={(e)=> handleChange(todo,index,e.target.value)}>

  <option value="0">Completed</option>
  <option value="1">Not Completed</option>
</select>
        </p>
        <p><button onClick={()=> editTask(todo,index)}>Edit</button>
        <button onClick={()=> deleteTask(index)}>Delete</button></p>

      </div>
    </div>
    </div>
  ))}
  </div>
      </div>
    </div>
    </>
  )
}

export default App
