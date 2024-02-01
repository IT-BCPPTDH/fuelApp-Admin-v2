import { useRef, useEffect, useState, useMemo } from 'react';
import jspreadsheet from 'jspreadsheet-ce';
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm';
import { colHeaderDistance } from '../helpers/columnHelper';
import { dataDigger } from '../data/digger';
import FormComponent from '../components/FormComponent';


const shiftOptions = ['Day', 'Night'];

const JSpreadsheet = ({ data }) => {
  const jRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          data,
          columns: colHeaderDistance.columnHeader,
          tableHeight: '500px',
          tableOverflow: true,
          lazyLoading: true,
          loadingSpin: true,
          minDimensions: [6, 10],
        };

        if (!jRef.current.jspreadsheet) {
          jspreadsheet(jRef.current, options);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data]);

  return <div ref={jRef} className='mt1em' />;
};

const DistanceEntryPage = () => {
  const currentDate = new Date();

  const [formData, setFormData] = useState({
    formID: 'Form Entry Data Distance',
    site: 'BCP',
    stafEntry: 'Nama Lengkap',
    tanggal: currentDate,
    shift: '',
    timeStart: '',
    timeEnd: '',
  });

  const components = useMemo(() => [
    {
      name: 'formID',
      grid: 'col-3',
      label: 'Form ID',
      value: formData.formID,
      type: 'StaticInfo',
    },
    // {
    //   name: 'site',
    //   grid: 'col-2',
    //   label: 'Site',
    //   value: formData.site,
    //   readOnly: true,
    //   disabled: true,
    //   type: 'Input',
    // },
    // {
    //   name: 'stafEntry',
    //   grid: 'col-2',
    //   label: 'Staf Entry',
    //   value: formData.stafEntry,
    //   readOnly: true,
    //   disabled: true,
    //   type: 'Input',
    // },
    {
      name: 'tanggal',
      grid: 'col-2',
      label: 'Tanggal',
      value: formData.tanggal,
      readOnly: false,
      disabled: false,
      type: 'DatePicker',
    },
    {
      name: 'shift',
      grid: 'col-2',
      label: 'Shift',
      value: formData.shift,
      readOnly: false,
      disabled: false,
      type: 'Combobox',
      options: shiftOptions,
    },
    {
      name: 'timeStart',
      grid: 'col-2',
      label: 'Time Start',
      value: formData.timeStart,
      readOnly: false,
      disabled: false,
      type: 'TimePicker',
    },
    {
      name: 'timeEnd',
      grid: 'col-2',
      label: 'Time End',
      value: formData.timeEnd,
      readOnly: false,
      disabled: false,
      type: 'TimePicker',
    },
  ], [formData]);

  const handleChange = () => {
    // Handle form data changes
  };

  return (
    <>
      <HeaderPageForm title={`Distance Data Entry - ${currentDate.toDateString()}`} />
      <div className='form-wrapper'>
        <FormComponent handleChange={handleChange} components={components} />
        <JSpreadsheet data={dataDigger} />
      </div>
    </>
  );
};

export default DistanceEntryPage;
