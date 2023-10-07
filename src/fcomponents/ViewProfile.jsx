import React from 'react'

const ViewProfile = () => {
  return (
    <>

<button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
  View
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Message</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Please <a href="/login">Login</a> OR <a href="/signup">Create your account</a> to view details of the Vendor
      </div>
    </div>
  </div>
</div>
    
    
    
    
    </>
  )
}

export default ViewProfile