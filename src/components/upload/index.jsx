import React, { useState, Fragment } from 'react';
import {
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiSwitch,
  useGeneratedHtmlId,
} from '@elastic/eui';

const uploadImage =  () => {
  const [files, setFiles] = useState({});
  const [large, setLarge] = useState(true);
  const filePickerId = useGeneratedHtmlId({ prefix: 'filePicker' });
  const onChange = (files) => {
    setFiles(files.length > 0 ? Array.from(files) : []);
  };
  const renderFiles = () => {
    if (files.length > 0) {
      return (
        <ul>
          {files.map((file, i) => (
            <li key={i}>
              <strong>{file.name}</strong> ({file.size} bytes)
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <p>Upload Image</p>
      );
    }
  };
  return (
    <Fragment>
      <EuiFlexGroup>
        <EuiFlexItem grow={2}>
      
          <EuiSpacer />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText>
            <p>Upload Image</p>
            {renderFiles()}
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );
};

export default  uploadImage