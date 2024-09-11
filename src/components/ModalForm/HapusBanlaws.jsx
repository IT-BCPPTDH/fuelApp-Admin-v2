import { useState } from 'react';
import ModalFormUnit from './ModalFormUnit'; // Pastikan ini adalah jalur yang benar

const ModalHapusBanlaws = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Menyimpan item yang sedang diedit

  const handleEdit = (item) => {
    setSelectedItem(item); // Set the item to be edited
    setIsModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setIsModalVisible(false); // Hide the modal
  };

  return (
    <>
      <EuiButtonIcon
        iconType="pencil"
        aria-label="Edit"
        color="success"
        onClick={() => handleEdit(item)} // Call handleEdit with the item
      />
      {isModalVisible && (
        <ModalFormUnit
          item={selectedItem} // Pass the selected item to the modal
          onClose={closeModal} // Provide a way to close the modal
        />
      )}
    </>
  );
};

export default ModalHapusBanlaws;
