import React, { useEffect, useState } from 'react';
import {
  EuiBasicTable,
  EuiCard,
} from '@elastic/eui';

const TableDataDetails = ({pageOfItems, columns, getCellProps}) => {
  return (
    <>
    <EuiCard style={{  width: '600vh', overflowX: 'auto' }} >
      <EuiBasicTable
        tableCaption="Demo of EuiBasicTable"
        items={pageOfItems}
        columns={columns}
        cellProps={getCellProps}
      />
    </EuiCard>
    </>
  );
};

export default TableDataDetails;
