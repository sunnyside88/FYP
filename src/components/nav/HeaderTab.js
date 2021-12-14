import { Tabs } from 'antd'
import { TabPane } from 'rc-tabs'

import ProductGeneralContent from '../../pages/product/ProductGeneralContent';

const HeaderTab = ({ tabSchema }) => {
  function callback(key) {
    console.log(key);
  }

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      {tabSchema.map((item, index) => {
        return <TabPane
          tab={item.tab} key={index}>
            {item.content}
        </TabPane>
      })}
    </Tabs>
  )
}

export default HeaderTab