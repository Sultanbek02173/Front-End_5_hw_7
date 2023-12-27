import React, { useEffect, useState } from 'react';
import './main.css';
import { useSelector, useDispatch } from 'react-redux';
import fetchAllUsers, { fetchAddToUser, fetchChangeToUser, fetchDeleteToUser } from '../../store/reducer/userCreated';
import { Spinner, Table, Button } from 'react-bootstrap';

const Main = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const [flag, setFlag] = useState(false);
    const [id, setId] = useState(0);
    const [chanmone, setChanmone] = useState('');
    const [chanmtwo, setChanmtwo] = useState(0);
    const [flaginp1, setFlaginp1] = useState(true);
    const [flaginp2, setFlaginp2] = useState(true);
    const [flaginp3, setFlaginp3] = useState(true);
    const [flaginp4, setFlaginp4] = useState(true);

    const dispatch = useDispatch();
    const { users, errorUsers, userStatus } = useSelector((state) => state.userList);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const deleteClass = (id) => {
        setFlag(true);

        setId(id);
        setChanmone(users[id - 1].name);
        setChanmtwo(users[id - 1].age);
    };

    const changeClass = () => {
        setFlag(false);
    }

    const renderUser = (item, idx) => {
        const { id, name, age } = item;
        return (
            <tr style={{ width: '100%' }} key={`user-${id}`}>
                <td style={{ width: '10%' }}>{idx + 1}</td>
                <td style={{ width: '30%' }}>{name}</td>
                <td style={{ width: '20%' }}>{age}</td>
                <td style={{ width: '40%' }}>

                    <Button onClick={() => {
                        deleteClass(id);
                    }} style={{ marginRight: '150px' }} variant='primary'>Изменить</Button>

                    <Button onClick={() => dispatch(fetchDeleteToUser(id))} variant='danger'>Удалить</Button></td>
            </tr>
        );
    }

    const cases = {
        pending: <Spinner style={{ margin: '100px auto' }} />,
        rejected: <div style={{ textAlign: 'center' }}>{errorUsers}</div>,
        empty: <div style={{ textAlign: 'center' }}>No data</div>,
    }
    return (
        <div >
            <div className="container">

                <h2>Список пользователей</h2>


                <div className="form-group">
                    <label>Имя:</label>
                    <input value={name} onChange={(ev) => {
                        setName(ev.target.value);
                    }} className={flaginp1 ? "form-control" : "form-control error"} />
                </div>

                <div className="form-group">
                    <label>Возраст:</label>
                    <input value={age} onChange={(ev) => {
                        setAge(ev.target.value)
                    }} className={flaginp2 ? "form-control" : "form-control error"} />
                </div>

                <div className="panel-body">

                    <button onClick={() => {
                        if (name === '' && age === '') {
                            setFlaginp1(false);
                            setFlaginp2(false);
                        } else if (name === '') {
                            setFlaginp1(false);
                            setFlaginp2(true);
                        } else if (age === '' || (/^(0|[0-9]\d*)$/.test(age)) !== true) {
                            setFlaginp1(true);
                            setFlaginp2(false);
                        } else {
                            setFlaginp1(true);
                            setFlaginp2(true);
                            dispatch(fetchAddToUser({ id: users.length + 1, name: name, age: Number(age) }));
                            setName('');
                            setAge('');
                        }
                    }} type="button" className="btn btn-sm btn-primary">Сохранить</button>

                    <button onClick={() => {
                        setName('');
                        setAge('');
                    }} type="button" className="btn btn-sm btn-primary">Сбросить</button>

                </div>

                {
                    userStatus === 'fulfilled' ? (
                        <Table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Имя</th>
                                    <th>возраст</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(renderUser)}
                            </tbody>
                        </Table>
                    ) : (
                        cases[userStatus]
                    )
                }

            </div>

            <div className={flag ? "modal_shell" : "modal_shell hide"} id="modal_shell">
                <div className="modal_overlay" id="modal_overlay"></div>
                <div className="modals">
                    <input
                        type="text"
                        className={flaginp3 ? "form-control" : "form-control error"}
                        id="change-name"
                        name="changeName"
                        value={chanmone}
                        onChange={(ev) => {
                            setChanmone(ev.target.value);
                        }}
                    />
                    <hr />
                    <input
                        type="text"
                        className={flaginp4 ? "form-control" : "form-control error"}
                        id="change-age"
                        name="changeAge"
                        value={chanmtwo}
                        onChange={(ev) => {
                            setChanmtwo(ev.target.value);
                        }}
                    />
                    <hr />
                    <button type='button' onClick={() => {
                        if (chanmone === '' && chanmtwo === '') {
                            setFlaginp3(false);
                            setFlaginp4(false);
                        } else if (chanmone === '') {
                            setFlaginp3(false);
                            setFlaginp4(true);
                        } else if (chanmtwo === '' || (/^(0|[0-9]\d*)$/.test(chanmtwo)) !== true) {
                            setFlaginp3(true);
                            setFlaginp4(false);
                        } else {
                            setFlaginp3(true);
                            setFlaginp4(true);
                            changeClass();
                            dispatch(fetchChangeToUser({ id: id, name: chanmone, age: chanmtwo }));
                        }


                    }} className="btn btn-primary">Press</button>

                </div>
            </div>
        </div>
    );
}

export default Main;
