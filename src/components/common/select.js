import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select name={name} id={name} {...rest} className="form-control" required>
          <option value="--Please select the role--" />
          {options.map(option => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  };
  
export default Select;