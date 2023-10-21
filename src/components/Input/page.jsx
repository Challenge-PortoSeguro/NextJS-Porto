import "./styles.css";

export default function Input({ type = "text", placeholder, onChange, value, label }){
    return(
        <div className="input-container">
            <label>{label}</label>
            <input 
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}