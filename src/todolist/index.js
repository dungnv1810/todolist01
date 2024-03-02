import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import './style.css'
const data = [
    {
        id: 1,
        username: 'Nguyễn Văn Dũng',
    },
    {
        id: 2,
        username: 'Nguyễn Quốc Anh',
    },
    {
        id: 3,
        username: 'Nguyễn Minh Hiếu'
    },
    {
        id: 4,
        username: 'Nguyễn Mỹ Huyền'
    }
]
const Todolist = () =>{
    const [userName, setUserName] = useState('');
    const [listUserName, setListUserName] = useState([]);
    const [isAddButton, setIsAddButton] = useState(true);
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    
    const handleInputOnchange = (event) =>{
        const value = event.target.value;
        setUserName(value)
    }
    const handleInputAddressOnchange = (event) =>{
        const value = event.target.value;
        setAddress(value)
    }
    const handleInputEmailOnchange = (event) =>{
        const value = event.target.value;
        setEmail(value)
    }
    const handleInputNumberOnchange = (event) =>{
        const value = event.target.value;
        setNumber(value)
    }
    //Button AddUserName
    const handleAddUserButton = () =>{
        //B1: Lấy giá trị user name người dùng nhập vào => (lấy trong state(useState))
        //B2: Khởi tạo opject mới (id và uesername)
        const newUser = {
            id: uuidv4(),
            username: userName,
            address: address,
            email: email,
            number: number,
            isActive: false,
        }
        //B3: Tạo mảng mới thêm phần tử cuối mảng mới hoặc đầu thêm opject vào trong lisUserName
        const newListUserName = [newUser, ...listUserName, ]
        //B4: Render lại => hiển thị da phần tử vừa thêm
        setListUserName(newListUserName);
        setUserName('');
        setAddress('');
        setNumber('');
        setEmail('')
    }

    const handleDeleteUserName = (userId) => {
        const newListUserName = listUserName.filter((item, index, array)=>{
            return item.id !== userId;
        });
        setListUserName(newListUserName)
    }
    const handleEditUserButton = () => {
        console.log(currentUser)
        const newListUser = listUserName.map((item, index, array) =>{
            if(item.id === currentUser.id){
                return{
                    ...item,
                    username: userName,
                    address: address,
                    email: email,
                    number: number
                }
            }
            return item;
        })
        setListUserName(newListUser);
        setIsAddButton(true);
        setUserName('');
        setNumber('');
        setEmail('');
        setAddress('');
    }
    const handleEditUserName = (user) => {
        console.log(user)
        const {username, address, email,  number} = user;
        setUserName(username);
        setAddress(address);
        setNumber(number);
        setEmail(email);
        setIsAddButton(false);
        setCurrentUser(user)
    }

    return(
        <React.Fragment>
        <div className="todolist">
            <h1>todolist: {userName}</h1>
            <input
                type={'text'}
                name="null"
                placeholder="username"
                value={userName}
                onChange={(event) =>handleInputOnchange(event)}
            />
            <input
                type={'text'}
                name="null"
                placeholder="address"
                value={address}
                onChange={(event) =>handleInputAddressOnchange(event)}
            />
            <input
                type={'email'}
                name="null"
                placeholder="email"
                value={email}
                onChange={(event) => handleInputEmailOnchange(event)}
            />
            <input
                type={'number'}
                name="null"
                placeholder="number"
                value={number}
                onChange={(event) => handleInputNumberOnchange(event)}
            />
            {
                isAddButton ? (<button onClick={handleAddUserButton}>addUser</button>) 
                : (<button onClick={handleEditUserButton}>editUser</button>)
            }
            
            <h2>listUserName</h2>
            <table className="table" border='1' cellspacing='0px' cellpadding='10px'>
                <tr>
                    <th>Stt</th>
                    <th>userName</th>
                    <th>number</th>
                    <th>email</th>
                    <th>address</th>
                    <th>active</th>
                    <th>action</th>
                </tr>
                {
                    listUserName.map((item, index, array)=>{
                        return(
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.username}</td>
                                <td>{item.number}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td>
                                    <span style={{
                                        color: item.isActive ? 'red' : 'green',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: '5px',
                                        padding: '5px 8px'
                                    }}>
                                        {item.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUserName(item.id)}>Delete</button>
                                    <button onClick={() => handleEditUserName(item)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
        </React.Fragment>
    )
}
export default(Todolist);