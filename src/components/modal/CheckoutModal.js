import { Modal, Layout, Row, Col, Button } from "antd";
import { useEffect, useState } from "react";

const CheckoutModal = ({ isModalVisible, setVisible, formData }) => {
  const { Header, Footer, Sider, Content } = Layout;
  const style = { background: "#0092ff", padding: "8px 0" };

  useEffect(() => {}, []);

  const handleCancel = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  const handleOk = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  const renderAmtSuggestion = () =>{
    
  }

  return (
    <>
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        width={500}
      >
        <Layout>
          <Header style={{ backgroundColor: "white", textAlign: "center" }}>
            <h1>{formData.totalAmtCart}</h1>
          </Header>
          <Content style={{padding:10}}>
            <Row gutter={16} justify="center">
              <Col className="gutter-row" span={6}>
                <div>
                  <Button style={{width:'100%'}}>$20.44</Button>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Button style={{width:'100%'}}>$20.44</Button>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Button style={{width:'100%'}}>$20.44</Button>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Button style={{width:'100%'}}>$20.44</Button>
                </div>
              </Col>
            </Row>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Modal>
    </>
  );
};

export default CheckoutModal;
