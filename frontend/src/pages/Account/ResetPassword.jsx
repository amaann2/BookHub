import { useFormik } from "formik"
import { resetPasswordSchema } from "../../utils/validationSchema"
import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
const initialValues = {
    password: '',
    confirmPassword: ''
}
const ResetPassword = () => {
    const { id } = useParams()
    const { fetchData } = useFetch()

    const { errors, handleBlur, handleChange, handleSubmit, values, touched } = useFormik({
        initialValues,
        validationSchema: resetPasswordSchema,
        onSubmit: async (value, action) => {
            fetchData(`/api/v1/users/resetPassword/${id}`, 'post', value)
            action.resetForm()
        }
    })
    return (
        <div className="account">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <h1>Reset Your Password</h1>
                        <p>Your security is our priority. Choose a new password for your account. Make it strong and unique to keep your book shopping experience safe and enjoyable. Secure your style!</p>
                    </div>
                    <div className="col-2">
                        <div className="form-page">
                            <form onSubmit={handleSubmit} className="form-style">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="PASSWORD"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                />
                                {errors.password && touched.password ? <p className="error-fields">{errors.password}</p> : null}

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="CONFIRM PASSWORD"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"

                                />
                                {errors.confirmPassword && touched.confirmPassword ? <p className="error-fields">{errors.confirmPassword}</p> : null}
                                <button className="btn" type="submit">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword