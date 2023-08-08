import { Button, Card, Descriptions, Divider, Progress, Space, Tag } from "antd";

import node from "./data/node.json";
import dayjs from 'dayjs';
import http from "../utils/http";
import { useEffect, useState } from "react";

function PvePanel() {

    const [rep, setRep] = useState();
    let interval = null;

    const getData = () => {
        http.get("http://localhost:8080/pve?auth=PVEAPIToken=root@pam!webApp=69eefd75-ac8f-45d8-b36d-8e91ffca33bf&node=pve&host=192.168.0.179:8006")
        .then(res=>{
            
            setRep(res.data)
        }).catch(erorr => console.log)
    }


    useEffect(
        ()=>{
            interval =  setInterval(()=> getData(), 3000);

            return(()=> {
                clearInterval(interval);
            })
        },[]
    );

    return (

        <>

        
        <Space direction='vertical'>


        <Button onClick={()=> {clearInterval(interval);interval =  setInterval(()=> getData(), 1000); } }>Call</Button>
        
        <Divider>Pve 在线管理</Divider>
        {
            rep?.data.sort((a,b)=>a.vmid - b.vmid).map(
                item => (


                    <Card 
                    
                        key={item.vmid}
                        title={item.name}

                        style={{maxWidth:"90vw"}}
                        extra={
                            <>
                            {item.status === 'running' && <Button>关机</Button>}
                            {item.status === 'running' && <Button>重启</Button>}
                            {item.status !== 'running' && <Button>开机</Button>}
                            
                            </>
                        }
                    >

                        <Descriptions column={1}>
                            <Descriptions.Item label='status'>
                                {item.status}</Descriptions.Item>
                            <Descriptions.Item label='cpu'>
                                
                            <Progress percent={Math.round(item.cpu * 10000) / 100}  size="small" strokeColor={{from: '#108ee9',to: '#87d068'}}/>
                            
                            </Descriptions.Item>
                            <Descriptions.Item label='uptime'>{dayjs((item.uptime-(8*60*60))*1000).format('HH:mm:ss')}</Descriptions.Item>
                            <Descriptions.Item label='mem'>
                                <Progress percent={Math.round( item.mem/item.maxmem*100*100)/100}  size="small" strokeColor={{from: '#108ee9',to: '#87d068'}}/>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                  
                )
            )
        }
        </Space>
        </>
    );

}

export default PvePanel;