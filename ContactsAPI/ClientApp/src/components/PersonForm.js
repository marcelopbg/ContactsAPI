import { FormGroup, Input, Button, Container } from 'reactstrap'
import { useState, useEffect } from 'react'
import { phoneMask } from '../utils/masks'

const PersonForm = () => {
    const [contacts, setContacts] = useState([])
    const [newContact, setNewContact] = useState({ contact: '', contactType: 0 })

    useEffect(() => {
        
    })

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

    return (<>
        <Container>

            <h1>Create Person</h1>

            <FormGroup className='mb-3 mt-5'>
                <Input
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

            <div className='d-flex'>
                <Button
                    color='primary mt-3 ms-auto'
                    onClick={
                        () => {
                            console.log(contacts);
                        }
                    }> Save </Button>
            </div>
        </Container>
    </>)
}

export default PersonForm;