import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentUser } from "../../redux/User/userAction"

const GeneralProfile = () => {
    const { currentUser } = useSelector(state => state.user)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser) {
            setFirstName(currentUser.firstName || "")
            setLastName(currentUser.lastName || "")
            setEmail(currentUser.email || "")
        }
    }, [currentUser])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = {
            firstName,
            lastName,
            email
        }
        try {
            const res = await axios.patch("/api/v1/users/updateMe", formData, {
                withCredentials: true,
            });
            window.location.reload()
            toast.success(res.data.status);
            dispatch(setCurrentUser(res.data.data.user));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="change-password">
            <form onSubmit={handleSubmit}>
                <input type="text" className="input-style" placeholder="FIRST NAME" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input type="text" className="input-style" placeholder="LAST NAME" value={lastName} onChange={e => setLastName(e.target.value)} />
                <input type="email" className="input-style" placeholder="EMAIL" value={email} onChange={e => setEmail(e.target.value)} />
                <button className="btn">update profile</button>
            </form>
        </div>
    )
}

export default GeneralProfile