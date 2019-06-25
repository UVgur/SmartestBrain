import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain2 from './brain2.png';

const Logo = () => {
return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 200, width: 200 }} >
      <div className="Tilt-inner pa3">
        <img style={{ paddingTop: '5px' }} alt='logo' src={brain2}/>
      </div>
      </Tilt>
    </div>
  );
}


export default Logo;
