import {Modal, Button } from 'antd'
import {useState } from 'react';


const ImportModal = ({isModalVisible, onCancel, onOk, modal}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Import " + modal);

  return (
    <>
      <Modal
        title={modalText}
        visible={isModalVisible}
        onOk={onOk}
        onCancel={onCancel}
      >
      
      </Modal>
    </>
  );
};

export default ImportModal