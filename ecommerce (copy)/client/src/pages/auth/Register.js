import React,{useState} from 'react'
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/AuthStyle.css";

export default function Register() {

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [phone, setphone] = useState("")
  const [address, setaddress] = useState("")
  const [answer, setAnswer] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/register',
        {name, email, password, phone, address, answer } 
      );
      if(res && res.data.success)
      {
        toast.success(res && res.data.message);
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
    <Layout title={"Register - Ecommerce App"}>
      <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <h4 className='title'>Registration Foam</h4>
            <div className="mb-3">
               <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder='Enter Your Name'
               onChange={(e)=>setname(e.target.value)} value={name} required/>
               <div id="nameHelp" className="form-text"></div>
             </div>
             <div className="mb-3">
               <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter youe email'
               value={email} onChange={(e)=>setemail(e.target.value)} required/>
             </div>
             <div className="mb-3">
               <input type="password" className="form-control" id="exampleInputPassword" placeholder='Enter youe password' 
               value={password} onChange={(e)=>setpassword(e.target.value)} required/>
             </div>
            
             <div className="mb-3">
               <input type="text" className="form-control" id="exampleInputPhone" aria-describedby="phoneHelp" placeholder='Enter youe phone'
               value={phone} onChange={(e)=>setphone(e.target.value)} required/>
               <div id="phoneHelp" className="form-text"></div>
             </div>
             <div className="mb-3">
               <input type="text" className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" placeholder='Enter youe address'
               value={address} onChange={(e)=>setaddress(e.target.value)} required/>
               <div id="addressHelp" className="form-text"></div>
             </div>
             <div className="mb-3">
               <input type="text" className="form-control" id="exampleInputAnswer" aria-describedby="answerHelp" placeholder='what is your fav sport'
               value={answer} onChange={(e)=>setAnswer(e.target.value)} required/>
               <div id="answerHelp" className="form-text"></div>
             </div>
             <button type="submit" className="btn btn-primary">Submit</button>
           </form>
      </div>
    </Layout>
  )
}
