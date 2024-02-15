import { useState } from "react";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { TimePicker } from "@fluentui/react-timepicker-compat";
import {
  makeStyles,
  shorthands,
  Input,
  Label,
  Combobox,
  Option,
  RadioGroup,
  Radio,
  useId,
} from "@fluentui/react-components";
import "./element.css";
import { styled } from "@fluentui/react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),
    maxWidth: "200px",
  },
  combo: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    ...shorthands.gap("2px"),
    maxWidth: "180px",
  },
  formName: {
    color: "green",
    fontSize: "1.2em",
    marginBottom: "0",
  },
  control: {
    maxWidth: "200px",
    minWidth: "180px",
  },
  timepicker: {
    maxWidth: "200px",
    minWidth: "90px",
  },
});
export const FormElement = ({
  name,
  label,
  type,
  options,
  value,
  handleChange,
  disabled,
  readOnly
}) => {
  const styles = useStyles();
  const formatDate = (date) => {
    if (date instanceof Date) {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return "";
  };
  const inputId = useId(name)
  const renderInput = () => {
    switch (type) {
      case "DatePicker":
        return (
          <DatePicker
            id={inputId}
            placeholder={`Select ${label}...`}
            value={value}
            name={name}
            formatDate={formatDate}
            onSelectDate={(e) => handleChange(e, { name: name, value: e })}
            // onSelectDate={(e) => console.log(e)}
          />
        );
      case "Combobox":
        return (
          <ComboBoxCustom
            inputId={inputId}
            name={name}
            label={label}
            options={options}
            handleChange={handleChange}
            value={value}
          />
        );
      case "Input":
        return (
          <Input
            value={value}
            id={inputId}
            name={name}
            readOnly={readOnly}
            disabled={disabled}
            onChange={(e) => handleChange(e, { name: name, value: e.target.value })}
          />
        );
      case "RadioButton":
        return (
          <RadioGroup
            id={inputId}
            layout="horizontal"
            name={name}
            onChange={(e) => handleChange(e, { name: name, value: e.target.value })}
          >
            {options.map((option,key) => (
              <Radio key={key} value={option} label={option} />
            ))}
          </RadioGroup>
        );
      case "TimePicker":
        return (
          <TimePicker id={inputId} name={name} startHour={8} endHour={20} onTimeChange={(e, data) => handleChange(e, { name: name, value: data})} className={styles.timepicker}/>
        );
      case "TextDataView":
        return (
          <>
            <div id={inputId} className="data-value">{value}</div>
          </>
        );
     
      case "StaticInfo":
        return <h5 id={inputId} className={styles.formName}>{value}</h5>;
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
  const { inputId, name, label, options, handleChange, value } = props;
  console.log(value);
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

    const matchingOption = data.optionText && options.includes(data.optionText);
    if (matchingOption) {
      setCustomSearch(data.optionText);
      handleChange(event, { name: name, value: data.optionText });
    
    } else {
      setCustomSearch(undefined);
    }
  };
  const defVal = [props.value]
  
  return (

    <Combobox
      id={inputId}
      aria-labelledby={inputId}
      style={{ maxWidth: "200px", minWidth: "180px" }}
      freeform
      placeholder={`Select ${label}`}
      onChange={onChange}
      onOptionSelect={onOptionSelect}
      // selectedKey = {value}
      // defaultValue={value}
      defaultSelectedOptions={[value]}
    >
      {customSearch ? (
        <Option key="freeform" text={customSearch}>
          Search for {customSearch}
        </Option>
      ) : null}
      {matchingOptions.map((option) => (
        <Option key={option}>{option}</Option>
      ))}
    </Combobox>

  );
};
