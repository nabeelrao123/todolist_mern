import React, { useEffect, useState } from "react";
import axios from "axios";
import Showitem from "./Showitem";




const Todo = () => {
    const [content, setContent] = useState("");
    const [item, setItem] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/list').then((reponse) => {
            setItem(reponse.data);
        }).catch(() => {
            console.log('error')
        })

    }, [item]);


    const handleChange = (e) => setContent(e.target.value);
    const createTodo = (e) => {
        axios.post('http://localhost:3002/', { content }).then((reponse) => {
        }).catch(() => {
            console.log('error')
        })
        e.preventDefault();
        setContent('');
        document.getElementById('todo-input').value = '';
    };

    return (
        <>
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col">
                        <h3 className="text-primary font-weight-bold " >My Todo list For Today !</h3><br />
                        <input id='todo-input'
                            className="form-control form-control-lg" onChange={handleChange}
                        />


                        <div className="col-auto mt-4">
                            <button onClick={createTodo}
                                className="btn btn-lg btn-info text-white"
                            >Add Task</button>
                            <br/>
                        </div>
                    </div>

                </div>
                <br />
                <Showitem props={item} />
            </div>
        </>
    );
};
export default Todo;