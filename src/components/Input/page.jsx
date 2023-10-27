import "./styles.css";

export default function Input({ type = "text", placeholder, onChange, value, label, name, error, register }){
    return(
        <div className="input-container">
            <label>{label}</label>
            <input 
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                {...register}
            />
            {error && <span className="error">{error}</span>}
        </div>
    )
}