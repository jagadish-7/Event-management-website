import React from 'react'
import { Link } from 'react-router-dom'

const VendorCategorieslist = () => {
  return (
    <>
    
    <div className="container">
        <div className="filter-organizers">
          <ul className='categories-list'>
            <li className="items"> <Link to="/vendorservices">All Organizers</Link></li>
            <li className="items"> <Link to="/vendor-photographers">Photographers</Link></li>
            <li className="items"><Link to="/vendor-function-halls">Function Halls</Link></li>
            <li className="items"><Link to="/vendor-caterers">Caterers</Link></li>
            <li className="items"><Link to="/vendor-sound-system">Sound System</Link></li>
            <li className="items"><Link to="/vendor-mehandi">Mehandi</Link></li>
            <li className="items"><Link to="/vendor-wedding">Wedding Planners</Link></li>


          </ul>
        </div>
      </div>

    
    
    </>
  )
}

export default VendorCategorieslist