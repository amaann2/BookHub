import { Link } from "react-router-dom"
import './account.css'
import { useFormik } from 'formik'
import { loginSchema } from "../../utils/validationSchema.js"
import useFetch from "../../hooks/useFetch"
import { ThreeDots } from "react-loader-spinner"
const initialValues = {
    email: "admin@bookhub.io",
    password: ""
}
const Login = () => {
    const { fetchData, loading } = useFetch()
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values, action) => {
            fetchData('/api/v1/users/login', 'post', values)
            action.resetForm()
        }
    })



    return (
        <div className="account">
            <div className="info">
            </div>
            <div className="container">
                <div className="row">

                    <div className="col-2">
                        <div className="form-page" >
                            <form onSubmit={handleSubmit} className="form-style">
                                <h2 className="white">BOOKHUB Admin login </h2>
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    placeholder="USERNAME"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    readOnly
                                />
                                {errors.email && touched.email ? <p className="error-fields">{errors.email}</p> : null}
                                <input
                                    type="password"
                                    name="password"
                                    autoComplete="off"
                                    placeholder="PASSWORD"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password ? <p className="error-fields">{errors.password}</p> : null}

                                <button className="admin-btn" type="submit">{loading ? <ThreeDots
                                    height="20"
                                    width="20"
                                    radius="9"
                                    color="white"
                                    ariaLabel="three-dots-loading"
                                    visible={true}
                                /> : 'login'}</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;