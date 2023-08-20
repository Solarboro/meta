import logo from './logo.svg';
import './App.css';
import { App as AntApp, ConfigProvider, Divider, Space } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { useState } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/notfound';
import LoginPage from './pages/Login';
import StorePage from './pages/store';
import AssetsPage from './pages/assets';
import AccountPage from './pages/account';

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



          <HashRouter>
            
            <Space>
              <Link to='login'>登录</Link>
              <Link to='stores'>门店</Link>
              <Link to='assets'>库存</Link>
              <Link to='Accounts'>账户</Link>
            </Space>

          <Divider/>
            <Routes>

              <Route path='login' element={<LoginPage/>}></Route>
              <Route path='stores' element={<StorePage/>}></Route>
              <Route path='assets' element={<AssetsPage/>}></Route>
              <Route path='accounts' element={<AccountPage/>}></Route>
              <Route path='*' element={<NotFoundPage />}></Route>
            </Routes>
          </HashRouter>
        </AntApp>
      </ConfigProvider>
      
    </div>
  );
}

export default App;
