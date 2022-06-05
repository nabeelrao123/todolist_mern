import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { Button } from 'bootstrap';

const Showitem = (prop) => {

    const [content, Setcontent] = useState();
    const [datas, Setdata] = useState();

    const items = prop.props;
    const deletedata = (event) => {
        const id = event.target.value;
        axios.delete('http://localhost:3002/list', { id }).then((reponse) => {
        }).catch(() => {
            console.log('error');
        })
    }
    const getcurntdata = (event) => {
        const id = event.target.id;
        console.log(id);
        axios.get(`http://localhost:3002/getdata/:${id}`).then((response) => {
            let dtas = response.data;
            Setdata({ dtas });
            console.log(datas.dtas.content);
        }).catch(() => {
            console.log('error');
        })
    }
    const savechange = (event) => {
        const userid = event.target.value;
        axios.put(`http://localhost:3002/updatedata/:${userid}`, { content }).then((response) => {
            console.log(response)
        }).catch((response) => {
        })
        // Setdata('');

    }
    return (
        <>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Todolist</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((value, index) => {
                        return <> <tr>
                            <th scope="row">{index}</th>
                            <td>{value.content}</td>
                            <td>
                                <button value={value._id} onClick={deletedata} className="btn btn-md btn-danger">Delete</button>
                                <button value={value._id} onClick={getcurntdata} className="btn btn-md btn-warning">Edit</button></td>
                        </tr>
                        </>
                    })}

                </tbody>
            </table>

            {(datas != null) ? (
                <form>
                    <input
                        onChange={(event) => { Setcontent(event.target.value) }}
                        type="text"
                        defaultValue={datas.dtas.content}
                    />
                    <br />
                    <button value={datas.dtas._id} onClick={savechange} className="btn btn-md btn-primary mt-3">Save Changes</button>
                </form>

            ) : ('')
            }

        </>
    )
}

export default Showitem;