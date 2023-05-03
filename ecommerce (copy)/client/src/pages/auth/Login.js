import React, { useState } from 'react'
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../style/AuthStyle.css";
import { useAuth } from "../../Context/authContext";

export default function Login() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
   
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
          const res = await axios.post('/api/v1/auth/login',
            { email, password} 
          );
          if(res && res.data.success)
          {
            toast.success(res.data.message);
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token
            })
            localStorage.setItem('auth', JSON.stringify(res.data))
            navigate( location.state || "/" );
          }
          else{
            toast.error(res.data.message);
          }
    
        } catch (error) {
          console.log(error); 
          toast.error("Something went wrong");
        }
      }

  return (
    <Layout title={"Login - Ecommerce App"}>
      <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <h4 className='title'>Login Foam</h4>
            
             <div className="mb-3">
               <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter youe email'
               value={email} onChange={(e)=>setemail(e.target.value)} required/>
             </div>
             <div className="mb-3">
               <input type="password" className="form-control" id="exampleInputPassword" placeholder='Enter youe password' 
               value={password} onChange={(e)=>setpassword(e.target.value)} required/>
             </div>

              <div className='mb-3'>
                <button type="button" className="btn btn-primary" onClick={()=>navigate("/forgot-password")}>Forgot Password</button>
              </div>

             <button type="submit" className="btn btn-primary">Login</button>
           </form>
      </div>
    </Layout>
  )
}
