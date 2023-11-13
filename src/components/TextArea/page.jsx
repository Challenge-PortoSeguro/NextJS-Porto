import React from "react";
import "./styles.css";

export default function TextArea({
  placeholder,
  onChange,
  value,
  label,
  name,
  error,
  register,
  maxLength,
}) {
  const handleTextArea = (e) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="textarea-container">
      <label>{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        onChange={handleTextArea}
        value={value}
        {...register}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
