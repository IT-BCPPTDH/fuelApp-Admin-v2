import { useState } from 'react'
import { DatePicker } from '@fluentui/react-datepicker-compat'
import { makeStyles, shorthands, Input, Label, Combobox, Option } from '@fluentui/react-components'
import './element.css'

const useStyles = makeStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      ...shorthands.gap('2px'),
      maxWidth: '200px',
    },
    combo: {
      display: 'grid',
      gridTemplateRows: 'repeat(1fr)',
      justifyItems: 'start',
      ...shorthands.gap('2px'),
      maxWidth: '180px'
    },
    formName: {
      color: 'green',
      fontSize: '1.2em',
      marginBottom: '0'
    },
    control:{
      maxWidth: '200px', 
      minWidth: '180px'
    }
  })
export const FormElement = ({ inputId, name, label, type, options, value, onChange, disabled, readOnly }) => {
    const styles = useStyles();
    const formatDate = (date) => {
      if (date instanceof Date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`;
      }
      return '';
    };
    const renderInput = () => {
      switch (type) {
        case 'DatePicker':
          return (
            <DatePicker
              id={inputId}
              placeholder={`Select ${label}...`}
              value={value}
              formatDate={formatDate}
              onChange={(e) => onChange(e, { name: name, value: e.target.value })}
            />
          );
        case 'Combobox':
          return (
            // <Combobox
            //   id={inputId}
            //   placeholder={`Select ${label}`}
            //   style={{  maxWidth: '200px', 
            //   minWidth: '180px' }}
            //   onChange={(e) => onChange(e, { name: name, value: e.target.value })}
            // >
            //   {options.map(option => (
            //     <Option key={option}>
            //       {option}
            //     </Option>
            //   ))}
            // </Combobox>

            <ComboBoxCustom inputId={inputId} name={name} label={label} options={options} handleChange={onChange} />
          );
        case 'Input':
          return (
            <Input
              value={value}
              id={inputId}
              readOnly={readOnly} 
              disabled={disabled}
              onChange={(e) => onChange(e, { name: name, value: e.target.value })}
            />
          );
        case 'StaticInfo':
          return(
            <h5 className={styles.formName}>{value}</h5>
          );
        default:
          return null;
      }
    };
  
    return (

      <div className={styles.root}>
        <Label htmlFor={inputId}>{label}</Label>
        {renderInput()}
      </div>
    );
  };


const ComboBoxCustom = (props) => {
  
  const {inputId, name, label, options, handleChange } = props

  const [matchingOptions, setMatchingOptions] = useState([...options]);
  const [customSearch, setCustomSearch] = useState();


  const onChange = (event) => {
    const value = event.target.value.trim();
    const matches = options.filter(
      (option) => option.toLowerCase().indexOf(value.toLowerCase()) === 0
    );
    setMatchingOptions(matches);
    if (value.length && matches.length < 1) {
      setCustomSearch(value);
    } else {
      setCustomSearch(undefined);
    }
  };

  const onOptionSelect = (event, data) => {
    const matchingOption =
      data.optionText && options.includes(data.optionText);
    if (matchingOption) {
      setCustomSearch(undefined);
    } else {
      setCustomSearch(data.optionText);
      handleChange(event, { name: name, value: data.optionText })
    }
    
  };

  return (

      <Combobox
        aria-labelledby={inputId}
         style={{  maxWidth: '200px',  minWidth: '180px' }}
        freeform
        placeholder={`Select ${label}`}
        onChange={onChange}
        onOptionSelect={onOptionSelect}
      >
        {customSearch ? (
          <Option key="freeform" text={customSearch}>
            Search for  {customSearch}
          </Option>
        ) : null}
        {matchingOptions.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
 
  );
};


