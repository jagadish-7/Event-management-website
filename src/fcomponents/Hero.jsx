import React from 'react'

const Hero = () => {
    const user = localStorage.getItem('token')
    return (
        <>

            <section id="hero">

                <div class="hero-content" data-aos="fade-up">
                    <h2 style={{fontSize:"45px"}}>Organize <span>your next event </span><br />With us...</h2>
                    <div>
                        {!user?
                        <a href="/signup" class="btn-get-started scrollto">Register Today</a>:
                        <a href="/services" class="btn-get-started scrollto">Find Organizers</a>
                        }
                        
                    </div>
                </div>

                <div class="hero-slider swiper">
                    <div class="swiper-wrapper">
                    </div>
                </div>

            </section>

        </>
    )
}

export default Hero