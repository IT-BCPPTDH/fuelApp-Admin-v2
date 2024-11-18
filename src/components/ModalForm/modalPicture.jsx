import React, { useState } from 'react';
import { EuiOverlayMask, EuiModal, EuiModalBody, EuiImage } from '@elastic/eui';

const PictureCell = ({ photo }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const closeModal = () => setIsModalVisible(false);
    const showModal = () => setIsModalVisible(true);
  
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
            src={photo}
            alt="Photo"
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
                  src={photo}
                  alt="Full Picture"
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

export default PictureCell;