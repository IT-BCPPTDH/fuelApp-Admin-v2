import { useState, useRef, useCallback, useEffect } from "react";
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
  listbox: {
    maxHeight: "250px",
  },
  option: {
    height: "32px",
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
  readOnly,
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
            value={value ? new Date(value) : null}
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
          <h5 id={inputId} className={styles.formName}>
            {value}
          </h5>
        );
      default:
        return null;
    }
  };

  useEffect(() => {

  }, [options,renderInput])

  return (
    <div className={styles.root}>
      <Label htmlFor={inputId}>{label}</Label>
      {renderInput()}
    </div>
  );
};


const ComboBoxCustom = (props) => {
  const { inputId, name, label, options, handleChange, value } = props;
  const [matchingOptions, setMatchingOptions] = useState([...options]);
  const [customSearch, setCustomSearch] = useState("");
  const styles = useStyles();

  const onChange = (event) => {
    const value = event.target.value.trim();
    handleChange(event, { name: name, value: value });

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

  const itemHeight = 10;
  const numberOfItems = options.length;

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
      style={{ maxWidth: "200px", minWidth: "180px" }}
      freeform
      placeholder={`Select ${label}`}
      onChange={onChange}
      onOptionSelect={onOptionSelect}
      defaultSelectedOptions={value ? [value] : []}
      value={value ?? ""}>
      <Virtualizer
        numItems={numberOfItems}
        virtualizerLength={virtualizerLength}
        bufferItems={bufferItems}
        bufferSize={bufferSize}
        itemSize={itemHeight}>
        {(index) => {
          const option = matchingOptions[index];
          return (
            <Option
              key={index}
              aria-posinset={index}
              aria-setsize={numberOfItems}>
              {option}
            </Option>
          );
        }}
      </Virtualizer>
    </Combobox>
  );
};
