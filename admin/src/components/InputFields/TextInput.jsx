const TextInput = ({ type, label, name, value, onChange, required }) => {
    return (
        <li>
            <label htmlFor="name">
                <span className="label">
                    {label}
                    {required ? <span className="required-star">*</span> : ''}
                </span>
            </label>
            <input
                type={type}
                id={label}
                name={name}
                value={value}
                placeholder={label}
                onChange={onChange}
                required
            />
        </li>
    )
}

export default TextInput