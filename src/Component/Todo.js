import React, { useEffect, useState } from "react";
import axios from "axios";
import Showitem from "./Showitem";
import { useCreateTodoMutation } from '../services/todo';

const Todo = (prop) => {
    const [content, setContent] = useState('');
    const [times, setTimes] = useState('');
    const [createTodo, responseInfo] = useCreateTodoMutation();

    const onSubmitHandler = () => {
       createTodo({ content, times })
    }


    return (
        <>
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col">
                        <h3 className="text-primary font-weight-bold " >My Todo list For Today !</h3><br />
                        <label className="font-weight-bold text-danger" >Enter Your Todo</label>
                        <input type="text" id='todo-input' className="form-control form-control-lg"
                            value={content} onChange={(event) => { setContent(event.target.value) }}
                        />
                        <br />
                        <label className="font-weight-bold text-danger" >Enter Your Time Slot</label>
                        <input type="datetime-local" value={times} id="todo-time" className="form-control form-control-lg" name="appt"
                            onChange={(event) => { setTimes(event.target.value) }}
                        />
                        <div className="col-auto mt-4">
                            <button type="submit" onClick={onSubmitHandler}
                                className="btn btn-lg btn-info text-white"
                            >Add Task</button>
                            <br />
                        </div>

                    </div>

                </div>
                <br />
                <Showitem />
            </div>
        </>
    );
};
export default Todo;