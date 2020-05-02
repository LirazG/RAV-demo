//dependencies
import React from 'react'
//images
import Gift from '../../../Assets/Images/gift.png'

const Banner = () => {
    return (
        <aside className="banner">
            <section className="banner__content">
                <figure className="banner__content__figure">
                    <img src={Gift} alt="welcome-gift"/>
                </figure>
                <div className="banner__content__text">
                    <p>Say Hi to your welcome gift!</p>
                    <p>Enjoy a 14-day FREE trial of our <span>Camera Protection tool</span></p>
                </div>
            </section>

            <button>Get Now</button>
            <figure>FREE TRIAL</figure>
        </aside>
    )
}

export default Banner