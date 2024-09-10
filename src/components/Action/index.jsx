import React from 'react';
import { EuiButtonIcon } from '@elastic/eui';

const ActionButtons = ({ item}) => {
  return (
    <div className='action-buttons'>
      <EuiButtonIcon
        iconType="pencil"
        aria-label="Edit"
        color="success"
        // onClick={() => onEdit(item)}
      />
      <EuiButtonIcon
        iconType="trash"
        aria-label="Delete"
        color="danger"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item, e);
        }}
      />
    </div>
  );
};

export default ActionButtons;
