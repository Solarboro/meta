import { Button, Card, Form, Input, Space } from "antd"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import accountStore from "../../stores/accountStore"
import {  observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";



const LoginPage = () =>{

    const [form] = Form.useForm();
    const param = useParams();
    const [params] = useSearchParams();
    

    const login = ()=>{
        form.validateFields()
        .then(accountStore.accountLogin)
        // .then(()=> window.location.href='http://localhost:3000/')
        .catch(console.log);
    }


    useEffect(
        ()=>{
           
        
            console.log("account is: ")
            console.log( accountStore.accountInfo.account)
            console.log("!")

        },
        [accountStore.accountInfo]
    );

    return (
        <div>

            <Card 
                title={'XXX Logo - Login'}
            >
            <Form
                form={form}
                onFinish={login}
                initialValues={{account: accountStore.accountInfo.account}}
            >
                
                <Form.Item
                    name='account'
                    // label='Account'
                    rules={[
                        {
                            required: true,
                            message: "不能为空"
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined/>} placeholder="登录账号" />
                </Form.Item>

                <Form.Item
                    name='pass'
                    // label='Password'
                    rules={[
                        {
                            required: true,
                            message: "不能为空"
                        }
                    ]}
                >
                    <Input type="password" prefix={<LockOutlined />} placeholder="登录密码"/>
                </Form.Item>
                
                <Form.Item
                >

                

                    <Button type="primary" block htmlType="submit">登录</Button>
             
                </Form.Item>


                


            </Form>
            </Card>
        </div>
    )
}

export default observer(LoginPage);