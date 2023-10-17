import { Link } from "react-router-dom"
import './account.css'
import { useFormik } from 'formik'
import { loginSchema } from "../../utils/validationSchema"
import useFetch from "../../hooks/useFetch"
import { Hourglass } from "react-loader-spinner"
const initialValues = {
    email: "",
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

            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <h1>Welcome Back!</h1>
                        <p>Step into a world of literary style and convenience. Log in to your account to access your favorite books, exclusive offers, and a seamless shopping experience. Your literary journey awaits!</p>
                    </div>
                    <div className="col-2">
                        <div className="form-page" >
                            <form onSubmit={handleSubmit} className="form-style">
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    placeholder="EMAIL ADDRESS"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
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

                                <button className="btn" type="submit">
                                    {loading ? <Hourglass
                                        visible={true}
                                        height="20"
                                        width="20"
                                        ariaLabel="hourglass-loading"
                                        colors={['white', '#8a2aaa']}
                                    /> : 'login'}
                                </button>

                                <p>
                                    Don't have an account ? <Link to="/register">Sign up</Link>
                                </p>
                                <p>
                                    <Link to="/forgotPassword">Forgot password</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;