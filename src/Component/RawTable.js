import {React} from 'react'; 

export default function RawTable({contact, clickEdit, deleteButton}){
    return(
        
       
        <tr>
            <td>{contact.fullName}</td>
            <td>{contact.address}</td>
            <td>{contact.phoneNumber}</td>
            <td>{contact.email}</td>
            <td> <button onClick= {(event)=>(clickEdit(event, contact))}>Edit</button><button onClick= {(event)=>(deleteButton(event, contact.id))}>Delete</button></td>
        </tr>
           )
}