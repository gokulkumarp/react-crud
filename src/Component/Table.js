import {React, useEffect, useState} from 'react';
import EditTable from './EditTable';
import RawTable from './RawTable';
import { nanoid } from 'nanoid'
import '../App.css'
import axios from 'axios';

export default function Table(){

    const [contacts, setContact] = useState([])

    const [addFormData, setAddFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '', 
        email: ''
    })

    const [editButton, setEditButton] = useState(null)

    const [loading, setLoading] = useState(false)

    const [editFormData, setEditFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '', 
        email: ''
    })

    useEffect(()=>{
        const getData = async ()=>{
            setLoading(true)
            const response = await axios.get("http://localhost:3000/contacts/")
            setContact(response.data)
            setLoading(false)
        }
        getData();
    },[])

    

    const addOnChangeDataCapture = (event)=>{
        event.preventDefault();

        setAddFormData({...addFormData, [event.target.name]: event.target.value})
    }

    const addButtonFunctionality = async (event)=>{
        event.preventDefault();
        const newaddformdata = {
            id : nanoid(),
            fullName: addFormData.fullName, 
            address: addFormData.address, 
            phoneNumber: addFormData.phoneNumber, 
            email: addFormData.email
    }
    
    const response = await axios.post("http://localhost:3000/contacts/", newaddformdata)
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

  const editOnChangeDataCapture = (event)=>{
    event.preventDefault();

    setEditFormData({...editFormData, [event.target.name]: event.target.value})
  }

  const updateButtonFunctionality = async (event)=>{
    event.preventDefault();
    console.log(contacts)
      const newEditFormData = {
        fullName: editFormData.fullName, 
        address: editFormData.address, 
        phoneNumber: editFormData.phoneNumber, 
        email: editFormData.email
      }
      const response = await axios.put(`http://localhost:3000/contacts/${editButton}`, newEditFormData)
      const newEditContacts = [...contacts]
      const index = contacts.findIndex((contact)=>contact.id===editButton)
      newEditContacts[index] = newEditFormData

      setContact(newEditContacts)
      setEditButton(null)
  }


  const deleteButton = async (event, contactID)=>{
      const newDeleteEditContacts = [...contacts]
      const response = await axios.delete(`http://localhost:3000/contacts/${contactID}`)
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
        <form onSubmit= {updateButtonFunctionality}>
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
                {loading?(<h1>Loading...</h1>):(contacts.map((tableData)=>
                <>
                {tableData.id === editButton ? <EditTable contact={tableData} editOnChangeDataCapture={editOnChangeDataCapture} cancelButton={cancelButton}/> : <RawTable contact={tableData} clickEdit= {clickEdit} deleteButton = {deleteButton}/>   } 
                
                
                </>
                ))}   
                
                   
            </tbody>
        </table> 
        </form>
        <div>
            <form onSubmit = {addButtonFunctionality}>
             <input type="text" name="fullName" placeholder="Enter a name" onChange={addOnChangeDataCapture} required="required"></input>   
             <input type="text" name = "address" placeholder="Enter a address" onChange={addOnChangeDataCapture} required="required"></input>   
             <input type="text" name = "phoneNumber" placeholder="Enter a phoneNumber" onChange={addOnChangeDataCapture} required="required"></input>   
             <input type="email" name = "email" placeholder="Enter a email" onChange={addOnChangeDataCapture} required="required"></input>   
            <button type= "Submit">Add</button> 
            </form>   
        </div>
    </>
    )
    
}