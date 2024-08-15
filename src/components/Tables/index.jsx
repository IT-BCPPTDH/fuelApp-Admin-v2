import React, { useState } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiFieldText,
  EuiLink,
  EuiSelect,
} from '@elastic/eui';
import PropTypes from 'prop-types';

const DynamicTable = ({
  data = [],
  columnsConfig = [],
  onRowClick = () => {},
  onExport = () => {},
  initialSearchValue = '',
  title = 'Dynamic Table',
  placeholderSearch = 'Search data',
}) => {
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [columns, setColumns] = useState(columnsConfig);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleExportClick = () => {
    if (onExport) {
      onExport(); // Custom export functionality
    }
  };

  const filteredItems = data.filter(item =>
    columns.some(column => {
      const value = item[column.field] ? item[column.field].toString() : '';
      return value.toLowerCase().includes(searchValue.toLowerCase());
    })
  );

  const handleColumnChange = (e) => {
    const selectedColumns = e.target.value;
    setColumns(columnsConfig.filter(col => selectedColumns.includes(col.field)));
  };

  return (
    <div>
      <h2>{title}</h2>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        <EuiFieldText
          placeholder={placeholderSearch}
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="Search data"
        />
        <EuiSelect
          options={columnsConfig.map(col => ({ value: col.field, text: col.name }))}
          onChange={handleColumnChange}
          aria-label="Select columns"
          multiple
        />
        <EuiButton
          style={{ background: '#73A33F', color: 'white' }}
          color="primary"
          onClick={handleExportClick}
        >
          Export
        </EuiButton>
      </div>
      <EuiBasicTable
        tableCaption="Demo of Dynamic Table"
        items={filteredItems}
        columns={columns}
        rowProps={(item) => ({
          'data-test-subj': `row-${item.station}`,
          className: 'customRowClass',
          onClick: () => onRowClick(item), // Handle row click action
        })}
        cellProps={(item, column) => ({
          className: 'customCellClass',
          'data-test-subj': `cell-${item.station}-${String(column.field)}`,
          textOnly: true,
        })}
      />
    </div>
  );
};

DynamicTable.propTypes = {
  data: PropTypes.array.isRequired,
  columnsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      truncateText: PropTypes.bool,
      mobileOptions: PropTypes.shape({
        render: PropTypes.func,
        header: PropTypes.bool,
        truncateText: PropTypes.bool,
        enlarge: PropTypes.bool,
        width: PropTypes.string,
      }),
    })
  ).isRequired,
  onRowClick: PropTypes.func,
  onExport: PropTypes.func,
  initialSearchValue: PropTypes.string,
  title: PropTypes.string,
  placeholderSearch: PropTypes.string,
};

export default DynamicTable;
