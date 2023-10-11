import { Link, useNavigate } from 'react-router-dom'
import TextInput from '../../components/InputFields/TextInput'
import { useState } from 'react';
import TextAreaInput from '../../components/InputFields/TextAreaInput';
import toast from 'react-hot-toast'
import axios from 'axios';


const AddCategory = () => {

    const [inputValue, setInputValue] = useState({
        name: '',
        description: '',
    })
    const handleOnchange = (e) => {
        const { name, value } = e.target
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }
    const navigate = useNavigate()
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await axios.post('/api/v1/category', inputValue, { withCredentials: true })
            toast.success(data.data.status)
            if (data?.data?.status === 'Success') {
                navigate('/category')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (

        <div>
            <form onSubmit={handleOnSubmit}>
                <h6 > <Link to='/category'> &lt; Back</Link></h6>
                <ul>
                    <TextInput type='text' label='Name' required={true} name='name' value={inputValue.name} onChange={handleOnchange} />
                    <TextAreaInput label='category' name='description' required={true} value={inputValue.description} onChange={handleOnchange} />
                    <li className='center'>
                        <button className="admin-btn">Add Category</button>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default AddCategory