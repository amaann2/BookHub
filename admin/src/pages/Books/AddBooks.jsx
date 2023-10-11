import './addBook.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getAllCategory } from '../../redux/category/categoryAction';
import { useState } from 'react';
import toast from 'react-hot-toast'
import axios from 'axios';
import TextInput from '../../components/InputFields/TextInput';
import TextAreaInput from '../../components/InputFields/TextAreaInput';

const AddBooks = () => {
    const dispatch = useDispatch()
    const { category, error } = useSelector(state => state.category)

    const [inputValue, setInputValue] = useState({
        title: '',
        author: '',
        ISBN: '',
        publish_date: '',
        pages: '',
        description: '',
        price: '',
        image: '',
        stock: '',
        category: '',
    })
    useEffect(() => {
        if (error) console.log(error);
        dispatch(getAllCategory());
    }, [dispatch, error]);
    const handleOnchange = (e) => {
        const { name, value } = e.target
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }
    const handleCategoryChange = (e) => {
        setInputValue({
            ...inputValue,
            category: e.target.value
        })
    }
    const navigate = useNavigate()
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await axios.post('/api/v1/books', inputValue, { withCredentials: true })
            toast.success(data.data.status)
            if (data?.data?.status === 'Success') {
                navigate('/books')

            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <h6 > <Link to='/books'> &lt; Back</Link></h6>
                <ul>
                    <TextInput type='text' label='Name' required={true} name='title' value={inputValue.title} onChange={handleOnchange} />
                    <TextInput type='text' label='Author' required={true} name='author' value={inputValue.author} onChange={handleOnchange} />
                    <TextInput type='text' label='ISBN' required={true} name='ISBN' value={inputValue.ISBN} onChange={handleOnchange} />
                    <TextInput type='text' label='Publish Date' required={true} name='publish_date' value={inputValue.publish_date} onChange={handleOnchange} />
                    <TextInput type='number' label='Pages' name='pages' value={inputValue.pages} onChange={handleOnchange} />
                    <TextAreaInput label='Description' name='description' required={true} value={inputValue.description} onChange={handleOnchange} />
                    <TextInput type='number' label='price' required={true} name='price' value={inputValue.price} onChange={handleOnchange} />
                    <TextInput type='text' label='Image Link' required={true} name='image' value={inputValue.image} onChange={handleOnchange} />
                    <TextInput type='number' label='stock' name='stock' value={inputValue.stock} onChange={handleOnchange} />

                    <li>
                        <label htmlFor="name">
                            <span className="label">
                                category <span className="required-star">*</span>
                            </span>
                        </label>
                        <select name="category" value={inputValue.category}
                            onChange={handleCategoryChange}
                            required>
                            <option value="" selected>select category</option>
                            {category?.map((cat) => (
                                <>
                                    <option key={cat._id}
                                        value={cat._id}  >{cat?.name}</option>
                                </>
                            ))}
                        </select>
                    </li>
                    <br />
                    <li className='center'>
                        <button className="admin-btn">upload Book</button>
                    </li>
                </ul>
            </form>
        </div >
    )
}

export default AddBooks