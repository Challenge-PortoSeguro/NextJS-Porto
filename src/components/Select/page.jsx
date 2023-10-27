import "./styles.css";

export default function Select({ placeholder, onChange, value, options, label, name, error, register }) {
    return (
        <div className="select-container">
            <label>{label}</label>
            <select
                name={name}
                onChange={onChange}
                value={value}
                {...register}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options?.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="error">{error}</span>}
        </div>
    );
}
