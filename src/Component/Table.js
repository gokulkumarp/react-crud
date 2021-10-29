import {React, useState} from 'react';
import data from '../tableData.json'
import EditTable from './EditTable';
import RawTable from './RawTable';
import { nanoid } from 'nanoid'
import '../App.css'

export default function Table(){

    const [contacts, setContact] = useState(data)

    const [addFormData, setAddFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '', 
        email: ''
    })

    const [editButton, setEditButton] = useState(null)

    const [editFormData, setEditFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '', 
        email: ''
    })

    const handleFormData = (event)=>{
        event.preventDefault();

        setAddFormData({...addFormData, [event.target.name]: event.target.value})
        // const fieldName = event.target.getAttribute('name'); 
        // const fieldValue = event.target.value;
        
        // const newFormData = {...addFormData}
        // newFormData[fieldName] = fieldValue
        // setAddFormData(newFormData)
    }

    const submitFormData = (event)=>{
        event.preventDefault();
        const newaddformdata = {
            id : nanoid(),
            fullName: addFormData.fullName, 
            address: addFormData.address, 
            phoneNumber: addFormData.phoneNumber, 
            email: addFormData.email
    }
    const newContacts = [...contacts, newaddformdata]
    setContact(newContacts)
    event.target.reset();  
  }

  const clickEdit = (event, contact)=>{
      console.log(contact)
    setEditButton(contact.id)
    const newEditForm = {
        id  : contact.id,
        fullName: contact.fullName, 
        address: contact.address, 
        phoneNumber: contact.phoneNumber, 
        email: contact.email
      }
    setEditFormData(newEditForm)
  }

  const editHandleFormData = (event)=>{
    event.preventDefault();

    setEditFormData({...editFormData, [event.target.name]: event.target.value})


  }

  const submitEditFormData = (event)=>{
    event.preventDefault();
    console.log(contacts)
      const newEditFormData = {
        id  : editButton,
        fullName: editFormData.fullName, 
        address: editFormData.address, 
        phoneNumber: editFormData.phoneNumber, 
        email: editFormData.email
      }
      const newEditContacts = [...contacts]
      const index = contacts.findIndex((contact)=>contact.id===editButton)
      newEditContacts[index] = newEditFormData

      setContact(newEditContacts)
      setEditButton(null)
  }


  const deleteButton = (event, contactID)=>{
    event.preventDefault();
      const newDeleteEditContacts = [...contacts]
      const index = contacts.findIndex((contact)=>contact.id===contactID)
      newDeleteEditContacts.splice(index, 1)
      setContact(newDeleteEditContacts)

  }
  const cancelButton = (event)=>{
    event.preventDefault();
    setEditButton(null) 
  }

    return(
        <>
        <p>Table component</p>
        <form onSubmit= {submitEditFormData}>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {contacts.map((tableData)=>
                <>
                {tableData.id === editButton ? <EditTable contact={tableData} editHandleFormData={editHandleFormData} cancelButton={cancelButton}/> : <RawTable contact={tableData} clickEdit= {clickEdit} deleteButton = {deleteButton}/>   } 
                
                
                </>
                )}          
            </tbody>
        </table> 
        </form>
        <div>
            <form onSubmit = {submitFormData}>
             <input type="text" name="fullName" placeholder="Enter a name" onChange={handleFormData} required="required"></input>   
             <input type="text" name = "address" placeholder="Enter a address" onChange={handleFormData} required="required"></input>   
             <input type="text" name = "phoneNumber" placeholder="Enter a phoneNumber" onChange={handleFormData} required="required"></input>   
             <input type="email" name = "email" placeholder="Enter a email" onChange={handleFormData} required="required"></input>   
            <button type= "Submit">Add</button> 
            </form>   
        </div>
    </>
    )
    
}