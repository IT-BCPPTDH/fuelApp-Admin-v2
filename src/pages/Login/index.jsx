import React from "react";
import './login.css'
import { EuiCard, EuiFieldText, EuiButton ,EuiImage, EuiIcon} from "@elastic/eui";
import Logo from "../../images/DH-Logo-300.png"

const LoginUser = () =>{
    return(
        <>
            <div className="login-container">
                <EuiCard>
                    <EuiImage src={Logo} />
                    <div style={{marginTop:"20px"}}>
                    <EuiFieldText
                        placeholder="Input Unit"
                        // prepend={<EuiIcon type="user"/>}
                    />
                    </div>
                    <div style={{marginTop:"5px"}}>
                    <EuiFieldText
                        placeholder="Password"
                        type="password"
                    />
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <EuiButton style={{background:"#73A33F", color:"white"}} fullWidth >Sign In</EuiButton>

                    </div>
                </EuiCard>
             
            </div>
        </>
    )
}

export default LoginUser