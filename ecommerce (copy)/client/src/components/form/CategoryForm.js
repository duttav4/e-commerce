import React from 'react'

export default function CategoryForm({handleSubmit, value, setValue}) {
  
  return (
    <> 
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input type="text" className="form-control" aria-describedby="emailHelp" 
        placeholder='Enter new Category' value={value} onChange={(e)=>setValue(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </>
  )
}
