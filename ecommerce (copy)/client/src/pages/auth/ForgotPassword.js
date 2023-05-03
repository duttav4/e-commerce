import React, { useState } from 'react'
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/AuthStyle.css";

export default function ForgotPassword() {


    const [email, setemail] = useState("")
    const [newpassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate();
   
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
          const res = await axios.post('/api/v1/auth/forgot-password',
            { email,answer, newpassword } 
          );
          if(res && res.data.success)
          {
            toast.success(res.data.message);
          
            navigate("/login");
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
    <Layout title={"Forgot Password"}>
         <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <h4 className='title'>Reset PAssword</h4>
            
             <div className="mb-3">
               <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email'
               value={email} onChange={(e)=>setemail(e.target.value)} required/>
             </div>
             <div className="mb-3">
               <input type="text" className="form-control" id="exampleAnswer" aria-describedby="answerHelp" placeholder='Enter your fav sport'
               value={answer} onChange={(e)=>setAnswer(e.target.value)} required/>
             </div>
             <div className="mb-3">
               <input type="password" className="form-control" id="exampleInputPassword" placeholder='Enter your password' 
               value={newpassword} onChange={(e)=>setNewPassword(e.target.value)} required/>
             </div>

             <button type="submit" className="btn btn-primary">Reset</button>
           </form>
      </div>
    </Layout>
  )
}
