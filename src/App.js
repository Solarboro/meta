import logo from './logo.svg';
import './App.css';
import { App as AntApp, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { useState } from 'react';

function App() {

  const [locale] = useState(zhCN);

  return (
    <div className="App">

      <ConfigProvider
        locale={locale}
        componentSize='small'
        theme={
          {
            token: {
              colorTextHeading: 'grey',
              colorPrimary: '#006564'
            }
          }
        }
      >
        <AntApp>

        </AntApp>
      </ConfigProvider>
      
    </div>
  );
}

export default App;
