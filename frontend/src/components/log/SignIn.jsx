import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"
import axios from "axios";

const SignUp =()=>{
    const navigate = useNavigate()

    const [form, setForm] = useState({ email: "", password: ""})
    const [errorMssg, setErrorMssg] = useState({status: "", message:""})
    const [valid, setValid] = useState(false)

    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log(form);

        axios.post("http://localhost:4001/signin", form) 
        .then(result=>{
            localStorage.setItem('token', JSON.stringify(result.data.message.token))
            localStorage.setItem('userdetails', JSON.stringify(result.data.message.userdetails))
            console.log(result);
            if(result.data.status=="failed"){
                setErrorMssg({...errorMssg, status: result.data.status, message: result.data.message, })
            } else{
                setForm({name: "", email: "", password: "", confirmpassword: ""})
                navigate("/Home")
            }
        }).catch((e)=>{
            setErrorMssg(e?.response?.form)
            console.log(errorMssg);
        })
    }

    return <>

        <div className="sign-in-page">
                <div className="form-div">
                    <h1 className="form">SIGN IN</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Enter Email</label>
                            <input 
                                type="email" 
                                placeholder="Email"
                                id="email" 
                                required
                                name="email" 
                                value={form.email} 
                                onChange={(e)=>setForm({...form, email: e.target.value})} 
                            />
                        </div>
                        <hr></hr>
                        <div>
                            <label htmlFor="password">Enter Password</label>
                            <input 
                                type="password" 
                                placeholder="Password"
                                id="password" 
                                required
                                name="password" 
                                value={form.password} 
                                onChange={(e)=>setForm({...form, password: e.target.value})} 
                            />
                        </div>
                        <hr></hr>
                        <div>
                            <input type="checkbox" name="terms" />
                            <label>Remember me</label>
                        </div>
                        <button>Submit</button>
                    </form>

                    
                {/* ERROR MESSAGE  */}
                <div>
                    <p style={{color:"red"}}>{errorMssg.status}</p>
                    <p style={{color:"red"}}>{errorMssg.message}</p>
                </div>

                    <button className="routeSignup" onClick={()=>navigate("/SignUp")}><a >Click here to sign UP</a></button>
                </div>
                
        </div>

    </>
}

export default SignUp