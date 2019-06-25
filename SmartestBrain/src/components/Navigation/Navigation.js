import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({ onRouteChange , isSignedIn , togglePortal }) => {
  if (isSignedIn){
    return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
      <ProfileIcon onRouteChange={onRouteChange} togglePortal={togglePortal}/>
    </nav>
  );
  } else {
    return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick={() => onRouteChange('signin')} className='t3 link dim black underline pa3 pointer'> Sign in </p>
      <p onClick={() => onRouteChange('register')} className='t3 link dim black underline pa3 pointer'> Register </p>
    </nav>
  );
  }
}

export default Navigation;
