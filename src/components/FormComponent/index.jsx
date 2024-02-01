import { useEffect } from 'react';
import { FormElement } from './elements';

const FormComponent = ({ handleChange, components }) => {
  return (
    <div className='row'>
      {components.map((val, key) => (
        <div key={key} className={val.grid}>
          <FormElement 
            key={key} 
            name={val.name}
            label={val.label}
            type={val.type}
            options={val.options}
            value={val.value}
            onChange={handleChange}
            disabled={val.disabled}
            readOnly={val.readOnly}
            columns={val.columns}
          />
        </div>
      ))}
    </div>
  );
};

export default FormComponent