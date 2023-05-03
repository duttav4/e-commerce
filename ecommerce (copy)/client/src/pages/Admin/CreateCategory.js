import React, {useEffect, useState} from 'react'
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from '../../components/form/CategoryForm';
import { Modal } from "antd";

export default function CreateCategory() {

    const [category,setCategory] = useState([])
    const [name, setName] = useState("")
    const [visible,setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")

    //handle form
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/v1/category/create-category', {name})
            if(data?.success){
                toast.success(`${name} is created`)
                getAllCategories();
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }

    const getAllCategories = async()=>{
        try {
            const {data} = await axios.get('/api/v1/category/getall-categories')
            if(data.success)
            {
                setCategory(data.category)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }

    useEffect(() => {
        getAllCategories(); 
    }, []);

    // handleupdate

    const handleupdate = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.put(`/api/v1/category/update-category/${selected}`, {name:updatedName})
            if(data?.success)
            {
                toast.success(`${updatedName} is updated`)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCategories()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }
    // handledelete

    const handledelete = async(id)=>{
        try {
            const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`)
            if(data?.success)
            {
                toast.success(`category is updated`)
                getAllCategories()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }

  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>    
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1>
                    Manage Category
                </h1>
                <div className='p-3 w-50'>
                    <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                </div>
                <div className='w-75'>
               <table className="table">
                  <thead>
                    <tr>
                  
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category?.map((c)=>(
                        <>
                            <tr>
                                <td key={c._id}>{c.name}</td>
                                <td>
                                    <button className='btn btn-primary ms-2' 
                                        onClick={ ()=> { 
                                            setVisible(true) ; 
                                            setUpdatedName(c.name) ;
                                            setSelected(c._id)
                                        }  
                                    }>
                                        Edit 
                                    </button>
                                    <button className='btn btn-danger ms-2' 
                                    onClick={()=>{
                                        handledelete(c._id);
                                        }
                                    }>Delete</button>
                                </td>
                            </tr>
                        </>
                    ))}
                  
                  </tbody>
                </table>

                </div>
                <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
                    <CategoryForm value={updatedName} setValue={setUpdatedName}
                        handleSubmit={handleupdate}/>
                </Modal>
            </div>
        </div>
    </div>
    </Layout>
  )
}
