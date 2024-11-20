import React, { useState } from 'react';
import { EuiOverlayMask, EuiModal, EuiModalBody, EuiImage } from '@elastic/eui';
import signUnavailable from '../../images/no-sign.png';

const SignatureCell = ({ signature }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const closeModal = () => setIsModalVisible(false);
    const showModal = () => setIsModalVisible(true);
  
    const signSrc = signature ? signature : signUnavailable;
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
          onClick={showModal}
        >
          <img
            src={signSrc}
            alt="Signature"
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'cover',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
  
        {isModalVisible && (
          <EuiOverlayMask>
            <EuiModal onClose={closeModal} style={{ maxWidth: 600 }}>
              <EuiModalBody>
                <EuiImage
                  src={signSrc}
                  alt="Full Signature"
                  size="full"
                  style={{
                    maxHeight: '80vh',
                    objectFit: 'contain',
                  }}
                />
              </EuiModalBody>
            </EuiModal>
          </EuiOverlayMask>
        )}
      </>
    );
};

export default SignatureCell;