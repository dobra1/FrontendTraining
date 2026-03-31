import React from "react";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}: FormInputProps) {
  return (
    <div className="form-group">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormInput;
