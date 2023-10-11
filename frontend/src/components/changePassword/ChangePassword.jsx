import './changePassword.css'
import { useFormik } from "formik"
import { updatePasswordSchema } from "../../utils/validationSchema"
import { Hourglass } from 'react-loader-spinner'
import useFetch from '../../hooks/useFetch'
const initialValues = {
    currentPassword: '',
    password: '',
    confirmPassword: ''
}
const ChangePassword = () => {
    const { fetchData, loading } = useFetch()

    const { errors, handleBlur, handleChange, handleSubmit, values, touched } = useFormik({
        initialValues,
        validationSchema: updatePasswordSchema,
        onSubmit: async (value, action) => {

            fetchData('/api/v1/users/updateMyPassword', 'patch', values)
            action.resetForm()
        }
    })
    return (
        <div className="change-password">
            <form onSubmit={handleSubmit} >
                <input type="password" placeholder="current Password" name='currentPassword' className="input-style" value={values.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {errors.currentPassword && touched.currentPassword ? <p className="error-fields">{errors.currentPassword}</p> : null}
                <input type="password" placeholder="new Password" name='password' className="input-style" value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {errors.password && touched.password ? <p className="error-fields">{errors.password}</p> : null}
                <input type="password" placeholder="confirm new Password" name='confirmPassword' className="input-style" value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {errors.confirmPassword && touched.confirmPassword ? <p className="error-fields">{errors.confirmPassword}</p> : null}
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
    )
}

export default ChangePassword