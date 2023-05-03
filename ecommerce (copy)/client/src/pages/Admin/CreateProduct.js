import React, {useState, useEffect} from 'react'
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
const {Option}= Select;

export default function CreateProduct() {

    const [categories, setCategories] = useState('')
    const [photo, setphoto] = useState('')
    const [name, setName] = useState('')
    const [category, setCategory] = useState("")
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('')
    const [quantity, setquantity] = useState('')
    const [shipping, setshipping] = useState('')

    //get all category
    const getAllCategories = async()=>{
        try {
            const {data} = await axios.get('/api/v1/category/getall-categories')
            if(data?.success)
            {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1>
                    Create Product
                    <div className='m-1 w-75'>
                        <Select bordered={false} placeholder="Select a Category" 
                        size='large' showSearch 
                        className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                            {categories?.map(c=>(
                                <Option >{c.name}</Option>
                            ))}
                        </Select>
                    </div>
                </h1>
            </div>
        </div>
    </div>
</Layout>
  )
}
