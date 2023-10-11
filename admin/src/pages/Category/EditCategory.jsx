import TextInput from "../../components/InputFields/TextInput"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import TextAreaInput from "../../components/InputFields/TextAreaInput";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast'

const EditCategory = () => {
    const [inputValue, setInputValue] = useState({
        name: '',
        description: '',
    })
    const { id } = useParams()
    useEffect(() => {
        const getSingleCategory = async () => {
            try {
                const { data } = await axios.get(`/api/v1/category/${id}`, { withCredentials: true })
                console.log(data.data.data)
                if (data.data.data) {
                    setInputValue({
                        name: data.data.data.name || '',
                        description: data.data.data.description || ''
                    })
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        getSingleCategory()
    }, [id])

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
            const data = await axios.patch(`/api/v1/category/${id}`, inputValue, { withCredentials: true })
            toast.success(data.data.status)
            navigate('/category')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div>
            <form onSubmit={handleOnSubmit} >
                <h6 > <Link to='/category'> &lt; Back</Link></h6>
                <ul>
                    <TextInput type='text' label='Name' required={true} name='name' value={inputValue.name} onChange={handleOnchange} />
                    <TextAreaInput label='category' name='description' required={true} value={inputValue.description} onChange={handleOnchange} />
                    <li className='center'>
                        <button className="admin-btn">edit category</button>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default EditCategory