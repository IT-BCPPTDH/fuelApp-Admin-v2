import { useState, useEffect } from "react";
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
import {
  Virtualizer,
  useStaticVirtualizerMeasure,
} from "@fluentui/react-components/unstable";
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),
    // maxWidth: "200px",
  },
  combo: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    ...shorthands.gap("2px"),
    maxWidth: "180px",
  },
  formName: {
    color: "#056b99",
    lineHeight: '15px',
    // fontSize: "1.2em",
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
  listbox: {
    maxHeight: "250px",
  },
  option: {
    height: "32px",
  },
});

const FormElement =  ({
  name,
  label,
  type,
  options,
  value,
  handleChange,
  disabled,
  readOnly,
  placeholder,
}) => {
  const styles = useStyles();

  const onFormatDate = (date) => {
    return !date
      ? ""
      : date.getDate().toString().padStart(2, "0") +
          "-" +
          (date.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          date.getFullYear();
  };  

  const inputId = useId(name);
  const renderInput = () => {
    switch (type) {
      case "DatePicker":
        return (
          <DatePicker
            id={inputId}
            placeholder={`Select ${label}...`}
            value={value ? new Date(value) : ""}
            name={name}
            formatDate={onFormatDate}
            onSelectDate={(e) => handleChange(e, { name: name, value: e })}
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
            value={value ?? ""}
            id={inputId}
            name={name}
            readOnly={readOnly}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) =>
              handleChange(e, { name: name, value: e.target.value })
            }
          />
        );
      case "RadioButton":
        return (
          <RadioGroup
            id={inputId}
            layout="horizontal"
            name={name}
            value={value ?? "Day"}
            onChange={(e) =>
              handleChange(e, { name: name, value: e.target.value })
            }>
            {options.map((option, key) => (
              <Radio key={key} value={option} label={option} />
            ))}
          </RadioGroup>
        );
      case "TimePicker":
        return (
          <TimePicker
            id={inputId}
            name={name}
            value={value ?? ""}
            freeform
            onTimeChange={(e, data) =>
              handleChange(e, { name: name, value: data })
            }
            formatOptions={{
              hour12: false,
              hour: "numeric",
              minute: "numeric",
            }}
            locale="id-ID"
            className={styles.timepicker}
          />
        );
      case "TextDataView":
        return (
          <>
            <div id={inputId} className="data-value">
              {value}
            </div>
          </>
        );

      case "StaticInfo":
        return (
          <p id={inputId} className={styles.formName}>
            {value}
          </p>
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
}

const ComboBoxCustom =  (props) => {
  const { inputId, name, label, options, handleChange, value } = props;
  const [matchingOptions, setMatchingOptions] = useState([]);
  const styles = useStyles();
  const [itemHeight] = useState(10);
  const [numberOfItems, setNumberofItems] = useState(0);
  const [inputValue, setInputValue] = useState(null)

  const onChange = (event) => {
    const inputValuen = event.target.value.trim();

    handleChange(event, { name, value: inputValuen });

    const matches = matchingOptions.filter(
      (option) => option.toLowerCase().indexOf(inputValuen.toLowerCase()) === 0
    );
    setMatchingOptions(matches);
  };

  const onOptionSelect = (event, data) => {
    const isOptionMatching = data.optionText && matchingOptions.includes(data.optionText);
    if (isOptionMatching) {
      handleChange(event, { name, value: data.optionText });
    }
  };

  useEffect(() => {
    setMatchingOptions([...options]);
    setNumberofItems(options.length);

    if (typeof value === 'function') {
     setInputValue("")
    } else {
      setInputValue(value)
    }
  }, [options, value]);

  const { virtualizerLength, bufferItems, bufferSize, scrollRef } =
    useStaticVirtualizerMeasure({
      defaultItemSize: itemHeight,
      direction: "vertical",
    });

  return (
    <Combobox
      id={inputId}
      aria-labelledby={inputId}
      listbox={{ ref: scrollRef, className: styles.listbox }}
      style={{  minWidth: "180px" }}
      freeform
      placeholder={`Select ${label}`}
      onChange={onChange}
      onOptionSelect={onOptionSelect}
      defaultSelectedOptions={inputValue ? [inputValue] : [""]}
      value={inputValue ?? ""}
    >
      <Virtualizer
        numItems={numberOfItems}
        virtualizerLength={virtualizerLength}
        bufferItems={bufferItems}
        bufferSize={bufferSize}
        itemSize={itemHeight}
      >
        {(index) => {
          const option = matchingOptions[index];
          return (
            <Option
              key={index}
              aria-posinset={index}
              aria-setsize={numberOfItems}
            >
              {option}
            </Option>
          );
        }}
      </Virtualizer>
    </Combobox>
  );
}

export default FormElement
FormElement.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.any,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string
};

ComboBoxCustom.propTypes={
  inputId: PropTypes.any,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  handleChange: PropTypes.any,
  value: PropTypes.any
}