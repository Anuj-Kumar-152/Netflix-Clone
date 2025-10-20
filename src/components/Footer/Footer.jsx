import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src="/twitter_icon.png" alt="twitter" />
        <img src="/youtube_icon.png" alt="youtube" />
        <img src="/instagram_icon.png" alt="instagram" />
        <img src="/facebook_icon.png" alt="facebook" />
      </div>
      <ul>
        <li>Audio Descreption</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investors Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact US</li>
      </ul>
      <p className="copyright-text">&#169; 1997-2025 Netflix, Inc.</p>
    </div>
  )
}

export default Footer
