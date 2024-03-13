// import { FormElement } from './elements';
import PropTypes from 'prop-types';
import React from 'react';
const FormElement = React.lazy(() => import('./elements'))

const FormComponent = React.memo(({ handleChange, components }) => {
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
            handleChange={handleChange}
            disabled={val.disabled}
            readOnly={val.readOnly}
            placeholder={val.placeholder}
          />
        </div>
      ))}
    </div>
  );
});

FormComponent.propTypes = {
  handleChange: PropTypes.any,
  components: PropTypes.any,
};

FormComponent.displayName = 'FormComponent'; // Add display name here

export default FormComponent;
