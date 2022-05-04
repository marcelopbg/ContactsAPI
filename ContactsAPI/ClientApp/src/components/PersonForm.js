import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, FormGroup, Input } from 'reactstrap';
import { phoneMask } from '../utils/masks';

const PersonForm = () => {

    const location = useLocation();
    let navigate = useNavigate();

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const personId = location?.state?.id;
        if (personId) {
            if (personId) {
                axios.get(`api/Person/${personId}`).then(res => {
                    setName(res.data.name);
                    setContacts(JSON.parse(res.data.contacts));
                    setIsEdit(true);
                })
            }
        }
    }, [location?.state?.id])


    const [name, setName] = useState('');
    const [contacts, setContacts] = useState([])
    const [newContact, setNewContact] = useState({ contact: '', contactType: 0 })

    const setContactType = (index, contactType) => {
        const newContacts = [...contacts]
        newContacts[index].contactType = parseInt(contactType);
        newContacts[index].contact = '';
        setContacts(newContacts);
    }
    const setContact = (index, contact) => {
        const newContacts = [...contacts]
        newContacts[index].contact = contact;
        setContacts(newContacts);
    }

    const removeContact = (index) => {
        const newContacts = [...contacts];
        newContacts.splice(index, 1);
        setContacts(newContacts);
    }

    const addContact = () => {
        const newContacts = [...contacts];
        newContacts.push({ contact: newContact.contact, contactType: newContact.contactType });
        setContacts(newContacts);
        setNewContact({ contact: '', contactType: 0 });
    }

    const handleSave = () => {
        if (isEdit) {
            axios.put(`api/Person/${location.state.id}`, { name, contacts: JSON.stringify(contacts) }).then(() => {
                toast.success('Person updated successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }).catch(err => {
                console.log(err);
            })
        } else {
            axios.post('api/Person', { name, contacts: JSON.stringify(contacts) })
                .then(res => {
                    toast.success('Person created successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    console.log(res);
                    console.log(res.data);
                    setName("");
                    setContacts([]);
                    setNewContact({ contact: '', contactType: 0 });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (<>
        <h1>Create Person</h1>

        <FormGroup className='mb-3 mt-5'>
            <Input
                onChange={(e) => { setName(e.target.value) }}
                value={name}
                id="name"
                name="name"
                placeholder="Write person's name"
                type="name"
            />
        </FormGroup>
        <br />
        <h3 className='mb-3'>Contacts </h3>
        <div className='row mb-3'>
            <div className='col-4'>
                <Input
                    defaultValue={0}
                    onChange={(e) => { setNewContact({ contact: '', contactType: parseInt(e.target.value) }) }}
                    value={newContact.contactType}
                    id="type"
                    name="type"
                    type="select"
                >
                    <option value={0} disabled>
                        Select contact type
                    </option>
                    <option
                        value={1}>
                        Email
                    </option>
                    <option
                        value={2}>
                        Phone
                    </option>
                    <option
                        value={3}>
                        WhatsApp
                    </option>
                </Input>
            </div>
            <div className="col d-flex">
                {newContact.contactType === 0 && (
                    <Input
                        disabled={true}
                        value={newContact.contact}
                        name='contact'>
                    </Input>
                )}
                {newContact.contactType === 1 && (
                    <Input
                        value={newContact.contact}
                        onChange={(e) => { setNewContact({ contact: e.target.value, contactType: newContact.contactType }) }}
                        type="email"
                        name='contact'>
                    </Input>
                )}
                {(newContact.contactType === 2 || newContact.contactType === 3) && (
                    <Input
                        maxLength={15}
                        value={phoneMask(newContact.contact)}
                        onChange={(e) => { setNewContact({ contact: e.target.value, contactType: newContact.contactType }) }}
                        name='contact'>
                    </Input>
                )}

                <Button className='primary ms-3' color='success' onClick={addContact}> <b>+</b> </Button>
            </div>
        </div>
        {contacts && contacts.length > 0 && contacts.map((contact, index) => {
            return (
                <div className='row mb-3' key={index}>
                    <div className='col-4'>
                        <Input
                            onChange={(e) => { setContactType(index, e.target.value) }}
                            value={contact.contactType}
                            name="type"
                            type="select"
                        >
                            <option value={0} disabled>
                                Select contact type
                            </option>
                            <option
                                value={1}>
                                Email
                            </option>
                            <option
                                value={2}>
                                Phone
                            </option>
                            <option
                                value={3}>
                                WhatsApp
                            </option>
                        </Input>
                    </div>
                    <div className="col d-flex">
                        {contact.contactType === 0 && (
                            <Input
                                disabled={true}
                                value={contact.contact}
                                name="contact">
                            </Input>
                        )}
                        {contact.contactType === 1 && (
                            <Input
                                value={contact.contact}
                                onChange={(e) => { setContact(index, e.target.value) }}
                                type="email"
                                name="contact">
                            </Input>
                        )}
                        {(contact.contactType === 2 || contact.contactType === 3) && (
                            <Input
                                maxLength={15}
                                value={phoneMask(contact.contact)}
                                onChange={(e) => { setContact(index, e.target.value) }}
                                name="contact">
                            </Input>
                        )}

                        <Button className='primary ms-3' color='danger' onClick={() => removeContact(index)}> <b>-</b> </Button>
                    </div>
                </div>
            );
        })}

        <div className='ms-auto mt-5' style={{ width: 'fit-content' }}>
            <Button
                color='secondary'
                className='me-2'
                onClick={() => navigate('/')}
            > Cancel </Button>
            <Button
                color='primary'
                onClick={handleSave}
            > Save </Button>
        </div>
    </>)
}

export default PersonForm; 