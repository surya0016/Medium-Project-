import { useState } from "react";
import Button from "../components/Button";
import HaveAccount from "../components/HaveAccount";
import InputBox from "../components/InputBox";
import Quote from "../components/Quote";
import Title from "../components/Title";
import { SigninInput } from "@beastsurya47/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Signin() {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email:"",
        password:""
    })
    const sendRequest = async () => {
        try {
          const response  = await axios({
            method:"POST",
            url:`${BACKEND_URL}/api/v1/user/signin`,
            data:{
                email:postInputs.email,
                password:postInputs.password,
            }
          })
          console.log(response);
          const jwt = response.data.token;
          localStorage.setItem("token", jwt);
          jwt ? navigate("/blog") : null
        } catch (error) {
          console.log(error);
        }
        
      }
  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex justify-center items-center h-screen ">
                <div className="w-80">
                    <Title title={"Sign In"}/>
                    <InputBox label={"Email"} placeholder={"johndoe@example.com"} type={"email"} onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        email:e.target.value
                    })
                    }}/>

                    <InputBox label={"Password"} type={"password"} onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        password:e.target.value
                    })
                    }}/>

                    <Button name={"Login"} onClick={()=>{sendRequest(); console.log(postInputs)}}/>
                    <HaveAccount routename="/signup" content="Don't have an account? " to="Sign Up"/>
                </div>
            </div>
            <div className="invisible md:visible">
                <Quote title={"CEO, Acme Inc"} author={"Jules Winnfield"} quote={"The customer service I received was exceptional. The suppot team went above and beyond to address my concerns."}/>
            </div>
        </div>
    </div>
  )
}
