import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import TitileCards from '../../components/TitileCards/TitileCards'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src="/hero_banner.jpg" alt="hero_banner" className='banner-img' />
        <div className="hero-caption">
            <img src="/hero_title.png" alt="hero_title" className='caption-img' />
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur id harum suscipit magnam <br/> saepe corrupti quae totam repudiandae ipsa quas!
            </p>
            <div className="hero-btns">
                <button className='btn'><img src="/play_icon.png" alt="play_icon" />Play</button>
                <button className='btn dark-btn'><img src="/info_icon.png" alt="info_icon" />More Info</button>
            </div>
            <TitileCards/>
        </div>
      </div>  
      <div className="more-cards">
        <TitileCards titile={"Blockbuster Movies"} keyword="batman" />
        <TitileCards titile={"Only on Netflix"} keyword="avengers" />
        <TitileCards titile={"Upcoming"} keyword="spider" />
        <TitileCards titile={"Top picks for you"} keyword="king" />
      </div>
      <Footer/>
    </div>
  )
}

export default Home
