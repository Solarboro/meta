import { Divider } from "antd";
import { useEffect } from "react"



const AccountPage = () =>{


    useEffect(
        ()=>{

            console.log(window)
            console.log(navigator)
        },[]
    );

    return (
        <div>
            
            {JSON.stringify(navigator.userAgent)}
            <Divider/>
            {window?.AndroidWebView?.getIMEI()||"unkown by android"}
            <Divider/>
            {window?.webkit?.messageHandlers?.getIMEI?.postMessage(null)||"unkown by IOS"}
        </div>
    )
}

export default AccountPage