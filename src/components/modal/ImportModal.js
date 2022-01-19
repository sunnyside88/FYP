import { Modal, Button, Progress } from 'antd'
import { useState } from 'react';
import { importFile } from '../../data/product.api';

const ImportModal = ({ isModalVisible, modal, setVisible }) => {
  const [csvFile, setCsvFile] = useState("");
  const [key, setKey] = useState("")
  const [modalText, setModalText] = useState("Import " + modal);
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)

  const handleFileUpload = (e) => {
    var file = e.target.files[0]
    setCsvFile(file)
  }

  const handleOk = () =>{
    setKey(Date.now())
    setVisible(false)
    setShowProgress(false)
  }

  const handleCancel = () =>{
    setKey(Date.now())
    setVisible(false)
    setShowProgress(false)
  }

  const upload = async () => {
    let csvData = new FormData();
    csvData.append("file", csvFile);
    await importFile(csvData, setProgress, setShowProgress)
  }

  return (
    <>
      <Modal
        title={modalText}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <input type="file" accept=".csv" onChange={handleFileUpload} key={key} />
        <Button onClick={upload}>Upload</Button>
        {showProgress ? <Progress percent={progress} size="small" /> : null}
      </Modal>
    </>
  );
};

export default ImportModal