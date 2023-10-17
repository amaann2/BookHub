import { useFormik } from "formik"
import { forgotPasswordSchema } from "../../utils/validationSchema"
import toast from "react-hot-toast"
import axios from "axios"
import { useState } from "react"
import { Hourglass } from 'react-loader-spinner'

const initialValues = {
    email: ''
}
const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const { errors, handleBlur, handleChange, handleSubmit, values, touched } = useFormik({
        initialValues,
        validationSchema: forgotPasswordSchema,
        onSubmit: async (value, action) => {
            try {
                setLoading(true)
                const data = await axios.post('/api/v1/users/forgotPassword', value)
                setLoading(false)
                toast.success(data.data.message)
                action.resetForm()
            } catch (error) {
                setLoading(false)
                toast.error(error.response.data.message)
            }
        }
    })
    return (
        <div className="account">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <h1>Oops, Forgot Your Password?</h1>
                        <p>Don't worry; it happens to the best of us. Enter your email address, and we'll send you a link to reset your password. Regain access to your account and continue your book-shopping adventure</p>
                    </div>
                    <div className="col-2">
                        <div className="form-page">
                            <form onSubmit={handleSubmit} className="form-style">
                                <input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="EMAIL ADDRESS"
                                />
                                {errors.email && touched.email ? <p className="error-fields">{errors.email}</p> : null}
                                <button className="btn" type="submit">
                                    {loading ? <Hourglass
                                        visible={true}
                                        height="20"
                                        width="20"
                                        ariaLabel="hourglass-loading"
                                        colors={['white', '#8a2aaa']}
                                    /> : 'Forgot Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword