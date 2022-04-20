import { Modal, Button, Progress } from "antd";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { importFile } from "../../data/product.api";
import { useSelector } from "react-redux";

const ImportModal = ({ isModalVisible, modal, setVisible }) => {
  const [csvFile, setCsvFile] = useState("");
  const [key, setKey] = useState("");
  const [modalText, setModalText] = useState("Import " + modal);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [userToken, setUserToken] = useState("");

  let { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user) {
      setUserToken(user.token);
    }
  }, [user]);

  const handleFileUpload = (e) => {
    var file = e.target.files[0];
    setCsvFile(file);
  };

  const handleOk = () => {
    setKey(Date.now());
    setVisible(false);
    setShowProgress(false);
    window.location.reload();
  };

  const handleCancel = () => {
    setKey(Date.now());
    setVisible(false);
    setShowProgress(false);
  };

  const upload = async () => {
    if (!csvFile) {
      toast.error("Missing upload file!");
      return;
    }
    let csvData = new FormData();
    csvData.append("file", csvFile);
    await importFile(csvData, setProgress, setShowProgress, userToken);
  };

  return (
    <>
      <Modal
        title={modalText}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          key={key}
        />
        <Button onClick={upload}>Upload</Button>
        {showProgress ? <Progress percent={progress} size="small" /> : null}
      </Modal>
    </>
  );
};

export default ImportModal;
