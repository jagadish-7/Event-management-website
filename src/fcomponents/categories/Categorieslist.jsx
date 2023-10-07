import React from 'react'
import { Link } from 'react-router-dom'

const Categorieslist = () => {
  return (
    <>
    
    <div className="container">
        <div className="filter-organizers">
          <ul className='categories-list'>
            <li className="items"> <Link to="/services">All Organizers</Link></li>
            <li className="items"> <Link to="/photographers">Photographers</Link></li>
            <li className="items"><Link to="/function-halls">Function Halls</Link></li>
            <li className="items"><Link to="/caterers">Caterers</Link></li>
            <li className="items"><Link to="/sound-system">Sound System</Link></li>
            <li className="items"><Link to="/mehandi">Mehandi</Link></li>
            <li className="items"><Link to="/wedding">Wedding Planners</Link></li>


          </ul>
        </div>
      </div>

    
    
    </>
  )
}

export default Categorieslist