import { Button, Card, Divider, Input, List, Space } from "antd"
import Icon, { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import assetsStore from "../../stores/assetsStore"
import { observer } from "mobx-react-lite";
import { useState } from "react";
import dayjs from "dayjs";


const StorePage = () =>{

    const [newAsset, setNewAsset] = useState();
    const [outAsset, setOutAsset] = useState();
    const [inAsset, setInAsset] = useState();

    const iconCLose = <CloseOutlined style={{color:'red'}} />;

    const localGet = () => {
        assetsStore.init();
    }
    return (
        <div>
            StorePage here


            <Space style={{display:'flex', flexDirection:'column'}}>

            <Button type="primary" onClick={localGet}>获取列表</Button>
            

            <Space.Compact style={{ width: '100%' }}>
                <Input value={newAsset} onChange={e => setNewAsset(e.target.value)} placeholder="新增物品" />
                <Button onClick={()=> assetsStore.newAsset({
                                "name": newAsset,
                                "measurement": "瓶"
                            })} type="primary">Submit</Button>
            </Space.Compact>
            </Space>

            <Divider>展示区</Divider>

            {
                assetsStore.assetsEntities.map(
                    item=>
                    <div key={item.key}>
                    
                    <List 
                        header={
                            <Space>
                            
                            {`${item.name} ${item.count}`}
                            <Button onClick={()=>assetsStore.delAsset(item.id)} icon={iconCLose}></Button>
                            </Space>
                        }
                        footer={
                            <Space>
                                <Space.Compact style={{ width: '50%' }}>
                                    <Input value={outAsset} onChange={e => setOutAsset(e.target.value)} placeholder="出库数量" />
                                    <Button onClick={()=> assetsStore.newTransaction({
                                                    "id": item.id,
                                                    "entity":{
                                                        "count": outAsset * -1,
                                                        "enabled": true,
                                                        "comments": "备注这 半包"
                                                   }
                                                })} type="primary">出库</Button>
                                </Space.Compact>
                                <Space.Compact style={{ width: '50%' }}>
                                    <Input value={inAsset} onChange={e => setInAsset(e.target.value)} placeholder="入库数量" />
                                    <Button onClick={()=> assetsStore.newTransaction({
                                                    "id": item.id,
                                                    "entity":{
                                                        "count": inAsset,
                                                        "enabled": true,
                                                        "comments": "备注这 半包"
                                                   }
                                                })} type="primary">入库</Button>
                                </Space.Compact>
                            </Space>
                        }
                        dataSource={item.assetsTransactionEntities}
                   
                        renderItem={
                            tran => 
                            <List.Item
                            
                                extra={
                                    <Space>
                                        <Button  type={tran.enabled?'dashed':'primary'}
                                            onClick={()=> assetsStore.updateTransaction({
                                                "id": item.id,
                                                "entity": {...tran, enabled: !tran.enabled},
                                               "tranId": tran.id
                                            })}
                                        
                                        >{tran.enabled ? '作废':'恢复'}</Button>
                                    </Space>
                                }
                            >
                                <Space>
                                    {tran.enabled ? <CheckOutlined  style={{color:'green'}}/>:iconCLose}
                                    {tran.username} {tran.count} {tran.measurement} {dayjs(tran.mdate).format("YYYY.MM.DD:HH:mm:ss")} 
                                </Space>
                            </List.Item>
                        }
                    />
                    </div>
                )
            }
        </div>
    )
}

export default  observer(StorePage)