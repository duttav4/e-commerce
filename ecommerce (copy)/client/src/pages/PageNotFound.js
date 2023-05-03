import React from 'react'
import Layout from '../components/layout/Layout';
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <Layout title={"Page Not Found"}>
      <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
        <h2 className='pnf-heading'>Oops ! Page Not Found</h2>
        <Link to="/" className='pnf-btn'>
          GO BACK
        </Link>
      </div>
    </Layout>
  )
}
