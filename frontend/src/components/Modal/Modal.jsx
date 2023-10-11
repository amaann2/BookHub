import { useState } from 'react';
import Rate from '../Review/Rate';
import toast from "react-hot-toast";
import './modal.css'
import axios from 'axios';
const Modal = ({ closeModal, id }) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = {
            rating,
            comment
        }
        try {
            const { data } = await axios.post(`/api/v1/review/${id}`, form, { withCredentials: true })
            toast.success(data.message)
            closeModal()
            window.location.reload()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return <div className="modal-container" onClick={(e) => {
        if (e.target.className === "modal-container") closeModal()
    }}>
        <div className="modal">
            <form onSubmit={handleSubmit} className="form-style">
                <Rate rating={rating} onRating={rate => setRating(rate)} />
                <textarea name="comment" rows="7" placeholder='what your feedback?' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>

                <button className="btn" >
                    submit
                </button>
            </form>
        </div>
    </div >;
};

export default Modal;