import {React} from 'react'; 

export default function EditTable({contact, editOnChangeDataCapture, cancelButton}){
    return (
        <tr>
            <td><input type="text" name="fullName" placeholder="Enter a name" defaultValue={contact.fullName} onChange={editOnChangeDataCapture} required="required"></input></td>
            <td><input type="text" name = "address" placeholder="Enter a address"  defaultValue={contact.address} onChange = {editOnChangeDataCapture} required="required"></input> </td>
            <td><input type="text" name = "phoneNumber" placeholder="Enter a phoneNumber" defaultValue={contact.phoneNumber}  onChange = {editOnChangeDataCapture} required="required"></input></td>
            <td><input type="email" name = "email" placeholder="Enter a email"  defaultValue={contact.email} onChange = {editOnChangeDataCapture} required="required"></input></td>
            <td><button type="submit">Save</button>
            <button onClick={cancelButton}>Cancel</button></td>
        </tr>

    )
}