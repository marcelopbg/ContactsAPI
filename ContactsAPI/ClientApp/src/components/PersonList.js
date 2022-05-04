import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Button, Table } from "reactstrap";


const PersonList = () => {
    
    let navigate = useNavigate();
    const [personList, setPersonList] = useState([]);
    
    useEffect(() => {
        load();
    }, []);
    
    const bindContactType = (type) => {
        if (type === 1) {
            return 'Email';
        }
        if (type === 2) {
            return 'Phone';
        }
        if (type === 3) {
            return 'WhatsApp';
        }
    }
    
    const handleDelete = (id) => {
        axios.delete(`api/Person/${id}`).then(res => {
            console.log(res);
            load();
            toast.success('Person deleted successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    const handleEdit = (id) => {
        navigate('/create-person', { state: { id } })
    }

    const load = () => {
        axios.get('api/Person').then(res => {
            const personList = res.data?.map(person => {
                person.contacts = JSON.parse(person.contacts);
                return person;
            });
            setPersonList(personList);
            console.log(personList);
        })
    }

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <h1 className="mb-3">Contacts </h1>
                <Button color="success" className="h-50 align-self-center" onClick={() => { navigate('create-person') }}> Add Contact </Button>
            </div>
            <Table
                responsive
                size=""
                striped
            >
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Person
                        </th>
                        <th>
                            Contacts
                        </th>
                        <th className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {personList.map((person, index) => {
                        return (
                            <tr key={'person' + index}>
                                <th scope="row">
                                    {person.id}
                                </th>
                                <td>
                                    {person.name}
                                </td>
                                <td>
                                    <ul>
                                        {person.contacts.map((contact, index) => {
                                            return (
                                                <li key={'contact' + index}><b> {bindContactType(contact.contactType)}:</b> {contact.contact} </li>
                                            )
                                        })}
                                    </ul>
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-primary" onClick={() => handleEdit(person.id)}>Edit</button>
                                    <button className="btn btn-danger ms-2" onClick={() => handleDelete(person.id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}
export default PersonList