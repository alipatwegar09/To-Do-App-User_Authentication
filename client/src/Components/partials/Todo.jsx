import React from 'react'
import moment  from 'moment/moment'
import { deleteTodoApi, markTodoApi } from '../../services/api.js'
import { toast } from 'react-toastify'
function Todo({todo,setRefreshList}) {
  const handleDelete=async ()=>{
    const result=await deleteTodoApi({
      todo_id:todo._id
    })
    console.log(result)
    if(result.data.status === 200){
      setRefreshList(new Date())
      toast('Deleted')
    }else{
      toast('failed to delete , please try again')
    }
  }

  const handleMarkTodo=async ()=>{
    const result=await markTodoApi({
      todo_id:todo._id
    })
    if(result.data.status === 200){
      setRefreshList(new Date())
      toast(result.data.message)
    }else{
      toast('failed to mark , please try again')
    }
  }
  return (
    <div className="card bg-light mb-3 my-2 mx-3 " style={{maxWidth: '20rem'}}>
    <div className="card-header">
      {todo.isCompleted ?'Completed': 'Not completed'}</div>
    <div className="card-body">
      <h4 className="card-title" style={{textDecoration:todo.isCompleted? 'line-through':'none'}}>
        {todo.desc}
      </h4>
      <p className="card-text">{moment(todo.date).fromNow()}</p>
    </div>
    <div className="actionButtons" style={{display:'flex' , justifyContent:'space-between', alignItems:"flex-end", paddingBottom:'10px'}}>
        <div className="deleteButton">
          <button style={{background:"red"}} onClick={handleDelete}>Delete</button>
        </div>
        <div className="markTodo">
          <button onClick={handleMarkTodo} style={{background:"lightgreen"}}>{todo.isCompleted?'Mark Uncomplete': 'Mark Complete'}</button>
        </div>
      </div>
  </div>
  )
}

export default Todo
