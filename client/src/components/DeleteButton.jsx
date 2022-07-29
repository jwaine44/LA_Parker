import React from 'react'
import axios from 'axios';
import '../App.css';

const DeleteButton = (props) => {

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/spots/${props.deleteId}`)
            .then(res => props.onDelete(props.deleteId))
            .catch(err => console.log(err))
    }

  return (
    <button className = 'btnred' onClick = {() => handleDelete()}>Delete</button>
  )
}

export default DeleteButton