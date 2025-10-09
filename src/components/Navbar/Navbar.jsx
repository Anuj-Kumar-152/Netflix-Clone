import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return; // ✅ Safe check

      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // ✅ Clean up listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src="/netflix_logo.png" alt="NetflixLogo" />
        {/* <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          
        </ul> */}
      </div>

      <div className="navbar-right">
        {/* <img src="/search_icon.png" alt="search_icon" className="icons" />
        <p>Children</p>
        <img src="/bell_icon.png" alt="bell_icon" className='icons' /> */}
        <div className="navbar-profile">
          <img src="/user_profile_icon.jpeg" alt="user_profile_icon" className='profile' />
          <img src="/caret_icon.png" alt="caret_icon" className='profile' />
          <div className="dropdown">
            <p onClick={() => { logout() }}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
