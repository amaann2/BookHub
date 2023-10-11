import { useFormik } from "formik"
import { Link } from "react-router-dom"
import { registerSchema } from "../../utils/validationSchema"
import { ThreeDots } from "react-loader-spinner"

import useFetch from "../../hooks/useFetch"
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}
const Register = () => {
    const { fetchData, loading } = useFetch()
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: registerSchema,
        onSubmit: (value, action) => {
            fetchData('/api/v1/users/signup', 'post', value)
            action.resetForm()
        }
    })
    return (
        <div className="account">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <h1>Join Our Book Enthusiasts Community</h1>
                        <p>Discover the latest literary trends, elevate your reading game, and expand your book collection. Sign up today and become a part of our vibrant community of book enthusiasts. Immerse yourself in the world of literature!</p>
                    </div>
                    <div className="col-2">
                        <div className="form-page">
                            <form onSubmit={handleSubmit} className="form-style">
                                <input
                                    type="name"
                                    name="firstName"
                                    placeholder="FIRST NAME"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                />
                                {errors.firstName && touched.firstName ? <p className="error-fields">{errors.firstName}</p> : null}
                                <input
                                    type="name"
                                    name="lastName"
                                    placeholder="LAST NAME"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                />
                                {errors.lastName && touched.lastName ? <p className="error-fields">{errors.lastName}</p> : null}

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="EMAIL"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                />
                                {errors.email && touched.email ? <p className="error-fields">{errors.email}</p> : null}

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

                                <p>By creating an account, I consent to the  processing <br /> of my  personal data in accordance with  the <br /> PRIVACY POLICY</p>
                                <button className="btn" type="submit">{loading ? <ThreeDots
                                    height="20"
                                    width="20"
                                    radius="9"
                                    color="white"
                                    ariaLabel="three-dots-loading"
                                    visible={true}
                                /> : 'Register'}</button>

                                <p>
                                    Already have an account ? <Link to="/login"> login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register