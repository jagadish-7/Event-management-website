import React from 'react'
import photo from './img/photo.jpg'
import catering from './img/catering.jpg'
import mehandi from './img/mehandi.jpg'
import wedding from './img/wedding.jpg'
import sound from './img/sound.jpg'
import hall from './img/hall.jpg'



const Organizers = () => {
  return (
    <>

      <div className="text-center container mt-5">
        <h1><b>Categories</b></h1>
      </div>


      <div className="container my-5 text-center">
        <div className="row">

          <div className="col">
            <div class="card">
            <a href="/photographers" target='__blank'><img src={photo} class="card-img-top" alt="..." /></a>

              
              <div class="card-body">
                <h5 class="card-title"  style={{fontWeight:"700"}}>Photographers</h5>
              </div>
            </div>
          </div>



          <div className="col">
            <div class="card" >
              <a href="/caterers"  target='__blank'><img src={catering} class="card-img-top" alt="..." /></a>
              
              <div class="card-body">
                <h5 class="card-title"  style={{fontWeight:"700"}}>Food & Caterers</h5>
              </div>
            </div>
          </div>



          <div className="col">
            <div class="card" >
            <a href="/mehandi"  target='__blank'> <img src={mehandi} style={{height:"475px"}} class="card-img-top" alt="..." /></a>

             
              <div class="card-body">
                <h5 class="card-title" style={{fontWeight:"700"}}>Mehandi</h5>
              </div>
            </div>
          </div>




        </div>

        <div className="row mt-5">

<div className="col">
  <div class="card">
  <a href="/sound-system" target='__blank'><img src={sound} class="card-img-top" alt="..." />
</a>
    
    <div class="card-body">
      <h5 class="card-title"  style={{fontWeight:"700"}}>Sound System</h5>
    </div>
  </div>
</div>



<div className="col">
  <div class="card" >
  <a href="/function-halls" target='__blank'><img src={hall} class="card-img-top" alt="..." /></a>

    
    <div class="card-body">
      <h5 class="card-title"  style={{fontWeight:"700"}}>Function Halls/Venues</h5>
    </div>
  </div>
</div>



<div className="col">
  <div class="card" >
  <a href="/wedding" target='__blank'><img src={wedding} class="card-img-top" alt="..." /></a>

    
    <div class="card-body">
      <h5 class="card-title"  style={{fontWeight:"700"}}>Wedding Planners</h5>
    </div>
  </div>
</div>




</div>

      </div>



    </>
  )
}

export default Organizers