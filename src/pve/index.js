import { Button, Card, Descriptions, Divider, Progress, Space, Tag, Select, Alert, Radio} from "antd";
import { PoweroffOutlined, RedoOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import http from "../utils/http";
import { useEffect, useState } from "react";

function PvePanel() {

    //
    const [pveError,setPveError] = useState(false)
    const [myInter, setMyInter] = useState();
    const [selectOptionDefault, setSelectOptionDefault] = useState(localStorage.getItem('selectOptionDefault'));
    const [pveEntity, setPveEntity] = useState();
    const selectOptions = [
        {
            label: '罗湖',
            value: '1',
            data: {
                host: '',
                node: '',
                token: ''
            }
        },
        {
            label: '福田',
            value: '2',
            data: {
                host: '192.168.0.40:1180',
                node: 'pve',
                token: 'PVEAPIToken=root@pam!webApp=69eefd75-ac8f-45d8-b36d-8e91ffca33bf'
            }
        },
        {
            label: '戴斯勒',
            value: '3',
            data: {
                host: '',
                node: '',
                token: ''
            }
        },
    ]
    // data
    const [rep, setRep] = useState();


    // start 
    const vmAction = (optionEntity, vmid, action) => {

        // /api2/json/nodes/{node}/qemu/{vmid}/status/reboot
        switch (action) {
            case "reboot":
            case "shutdown":
            case "start":
                http.post(`http://${optionEntity.host}/pve/api2/json/nodes/${optionEntity.node}/qemu/${vmid}/status/${action}`, null,{headers:{Authorization: optionEntity.token}})
                .then(console.info).catch(console.error)
            break;
        
            default:
                break;
        }
    }

    const getData = (optionEntity) => {
        http.get(`http://${optionEntity.host}/pve/api2/json/nodes/${optionEntity.node}/qemu`, {headers:{Authorization: optionEntity.token}})
        .then(res=>{
            setPveError(false)
            setRep(res.data);
        }).catch(erorr => setPveError(true));
    }


    useEffect(
        ()=> {

           if(selectOptionDefault){
            setMyInter(setInterval(()=>getData(selectOptions.filter(entity=> entity.value === selectOptionDefault)[0].data), 2000))
           }
            
        },
        []
    )

    const startInter = () => {
        setMyInter(setInterval(()=>getData(pveEntity), 2000))
     
    }

    const stopInter = () =>{
        clearInterval(myInter)

        
    }


    const raidoChange = e => {

        
        setSelectOptionDefault(e.target.value);
        localStorage.setItem("selectOptionDefault", e.target.value)
        let data = selectOptions.filter(entity=> entity.value === e.target.value)[0].data;
        setPveEntity(data);
        clearInterval(myInter); 
        setMyInter(setInterval(()=>getData(data), 2000))


        console.info(e.target.value)
        console.info(data)
        
    }
    return (

        <>



        <Space direction='vertical' style={{display:'flex', padding:'1em'}}>
        
       

            <Divider>概要</Divider>

            {pveError && <Alert message={`链接失败 服务找不到`} type="error" />}      
            
            <Space style={{display:'flex', flexDirection: 'row-reverse'}}>



                
                <Radio.Group defaultValue={selectOptionDefault} value={selectOptionDefault} onChange={raidoChange} buttonStyle="solid">
                    <Radio.Button value='1'>罗湖</Radio.Button>
                    <Radio.Button value='2'>福田</Radio.Button>
                    <Radio.Button value='3'>翠亨</Radio.Button>
                </Radio.Group>
        
            </Space>


        {
            rep?.data.sort((a,b)=>a.vmid - b.vmid).map(
                item => (


                    <Card 
                    
                        key={item.vmid}
                        title={item.name}

                  
                        extra={
                            <>
                            <Space>

                            {item.status === 'running' && <Button onClick={()=>vmAction(pveEntity, item.vmid, "shutdown")} type="primary" danger icon={<PoweroffOutlined />}>关机</Button>}
                            {item.status === 'running' && <Button onClick={()=>vmAction(pveEntity, item.vmid, "reboot")} icon={<RedoOutlined />}>重启</Button>}
                            {item.status !== 'running' && <Button onClick={()=>vmAction(pveEntity, item.vmid, "start")} type="primary" icon={<PoweroffOutlined />} >开机</Button>}
                            </Space>
                            
                            </>
                        }
                    >

                        <Descriptions column={1}>
                            <Descriptions.Item label='开机时间'>{dayjs((item.uptime-(8*60*60))*1000).format('HH 时 mm 分 ss 秒')}</Descriptions.Item>
                            <Descriptions.Item label={item.cpus + 'C CPU'}>
                            <Progress percent={Math.round(item.cpu * 10000) / 100}  size="small" strokeColor={{from: '#108ee9',to: '#87d068'}}/>
                            </Descriptions.Item>
                            {/* <Descriptions.Item label='status'>{item.status}</Descriptions.Item> */}
                            <Descriptions.Item label={item.maxmem / 1073741824 + 'G MEM'}>
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