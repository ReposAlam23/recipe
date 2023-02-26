import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"
import axios from "axios"


const SignUp =()=>{
    const navigate = useNavigate()

    const [form, setForm] = useState({name: "", email: "", password: "", confirmpassword: ""})
    const [errorMssg, setErrorMssg] = useState({message: "", status: ""})
    

    const handleSubmit = async(e)=>{
        e.preventDefault()
        // console.log(form);

        axios.post("http://localhost:4001/signup", form) 
        .then(result=>{    
            if(result.data.status=="failed"){
                console.log(result.data.status)
                setErrorMssg({...errorMssg, status: result.data.status, message: result.data.message, })
            } else{
                console.log(result);
                setForm({name: "", email: "", password: "", confirmpassword: ""})
                navigate("/")
            }
        }).catch((e)=>{
            setErrorMssg(e?.response?.form)
            // console.log(errorMssg);
        })
    }
    
    return <>
        <div className="sign-up-page">
            <div className="form-div">
                <h1 className="form">SIGN UP</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div>   
                        <input 
                            placeholder="Name"
                            type="text" 
                            id="name" 
                            name="name" 
                            required
                            value={form.name} 
                            onChange={(e)=>setForm({...form, name: e.target.value})} 
                        />
                    </div>
                    <hr></hr>
                    <div>
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
                        <input 
                            type="text" 
                            placeholder="Repeat Password"
                            id="confirmpassword" 
                            name="confirmpassword" 
                            value={form.confirmpassword} 
                            onChange={(e)=>setForm({...form, confirmpassword: e.target.value})} 
                        />
                    </div>
                    <div>
                        <input type="checkbox" name="terms" />
                        <label>I agree with <span >Terms & Conditions</span></label>
                    </div>
                    <button>Submit</button>
                </form>

                {/* ERROR MESSAGE  */}
                <div>
                    <p style={{color:"red"}}>{errorMssg.status}</p>
                    <p style={{color:"red"}}>{errorMssg.message}</p>
                </div>
            </div>


        </div>    
    </>
}

export default SignUp