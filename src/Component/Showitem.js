import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { Button } from 'bootstrap';
import { Modal } from 'react-bootstrap';
import { useDeleteTodoMutation, useCreateTodoMutation, useUpdateTodoMutation, useGetTodoByIdMutation } from '../services/todo';
import EasyEdit from 'react-easy-edit';


const Showitem = (prop) => {
    const [Item, SetItem] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3002/todos').then((response) => {
            SetItem(response.data);
        }).catch(() => {
            console.log('error')
        })
    }, [Item])

    let dates = new Date();
    const [DeleteTodo, getdeleteresponse] = useDeleteTodoMutation();
    const [UpdateTodo, getupdateresponse] = useUpdateTodoMutation();
    const [GetTodo, gettodoresponse] = useGetTodoByIdMutation();
    const [content, setContent] = useState();
    const [times, setTimes] = useState('');
    const [datas, SetData] = useState();
    const [check, setCheck] = useState(true);
    const [date, setDate] = useState(dates.toLocaleString());
    const Tdoditem = prop.props;
    const EditData = (event) => {
        GetTodo(event.target.value);
    }
    const onSubmitChanges = (event) => {
        const id = event.target.value;
        UpdateTodo({ id, content, times });

    }
    return (
        <>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {(gettodoresponse.data) ? (<>
                            <div class="modal-body">
                                <label className="font-weight-bold text-danger" >Enter Your Todo</label>
                                <input type="text" id='todo-input' onChange={(event) => { setContent(event.target.value) }} className="form-control form-control-lg" defaultValue={gettodoresponse.data[0].content} />
                                <br />
                                <label className="font-weight-bold text-danger" >Enter Your Time Slot</label>
                                <input type="datetime-local" id="appt" defaultValue={gettodoresponse.data[0].times} onChange={(event) => { setTimes(event.target.value) }} className="form-control form-control-lg" name="appt" />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" value={gettodoresponse.data[0]._id} onClick={onSubmitChanges} class="btn btn-primary">Save changes</button>
                            </div>
                        </>) : (' ')}
                    </div>
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Checked</th>
                        <th scope="col">Todolist</th>
                        <th scope="col">TimeSlot</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Item.map((currentvalue, index) => {
                            return <>
                                <tr>
                                    <td><input type="checkbox" onChange={() => { setCheck(!check) }} defaultValue={check} /></td>
                                    <td>{currentvalue.content} </td>
                                    <td>{currentvalue.times} </td>
                                    <td><span class="badge bg-secondary">  {currentvalue.times <= date ? 'active' : 'overdue'}</span></td>
                                    <td>
                                        <button onClick={() => DeleteTodo(currentvalue._id)} className="btn btn-md btn-danger">Delete</button>
                                        <button value={currentvalue._id} onClick={EditData} className="m-2 btn btn-md btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" >Edit</button></td>
                                </tr>
                            </>
                        })

                    }
                </tbody>
            </table>
        </>
    )
}

export default Showitem;