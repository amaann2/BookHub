import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
const VerfiryEmail = () => {
    const { token } = useParams()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const { data } = await axios.get(`/api/v1/users/confirmEmail/${token}  `)
                setMessage(data.message)
            } catch (error) {
                setError(error.response.data.message)
            }
        }
        verifyEmail()
    }, [token])
    return (
        <div id="card" className="animated fadeIn">
            <div id="upper-side">
                <h3 id="status">{message ? 'Success' : 'Error'}</h3>
            </div>
            <div id="lower-side">
                <p id="message">
                    {message && message}
                    {error && error}
                </p>
                <Link to={'/login'} className='btn '>
                    Login here
                </Link>
            </div>
        </div>
    )
}

export default VerfiryEmail