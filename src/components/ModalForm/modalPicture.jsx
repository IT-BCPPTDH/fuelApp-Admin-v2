import React, { useState } from 'react';
import { EuiOverlayMask, EuiModal, EuiModalBody, EuiImage } from '@elastic/eui';
import imgUnavailable from '../../images/no-img.png';

const PictureCell = ({ photo }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const imageSrc = photo || imgUnavailable;

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
          src={imageSrc}
          alt="Thumbnail"
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
                src={imageSrc}
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
