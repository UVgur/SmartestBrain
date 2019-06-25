import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Portal from './components/Portal/Portal.js';
import Profile from './components/Profile/Profile.js';
import './App.css';

// server is running on port 3001
// app is running on port 3000

const particlesOptions = {
  particles: {
    number: {
      value: 33,
      density: {
        enable: true ,
        value_area: 555
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isProfileOpen: false,
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: 0,
    pet: ''
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState
}

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      pet: data.pet,
      age: data.age
    }})
}

calculateFaceLocations = (data) => {
  return data.outputs[0].data.regions.map(face=> {
    const clarifaiFace = face.region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  });
}


displayFaceBoxes = (boxes) => {
  this.setState({boxes:boxes});
}

onInputChange = (event) => {
  this.setState({input: event.target.value});
}



onRouteChange = (route) => {
  if (route === 'signout') {
    return this.setState(initialState)
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

togglePortal = () => {
  this.setState(prevState => ({
    ...prevState,
    isProfileOpen: !prevState.isProfileOpen
  }))
}



onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input })
        fetch('https://smartbrain-apis.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
        .then(response => response.json())
        .then(response => {
          if (response) {
           fetch('https://smartbrain-apis.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
             id:this.state.user.id
              })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, { entries: count }))
      })
      .catch(console.log)
    }
    console.log(response);
    this.displayFaceBoxes(this.calculateFaceLocations(response))
  })
  .catch(err => console.log(err));
}


  render() {
    const { isSignedIn , imageUrl , route , boxes , isProfileOpen , user } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
         params={particlesOptions}
          />
         <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}
          togglePortal={this.togglePortal} />
         { isProfileOpen &&
            <Portal>
              <Profile
                isProfileOpen={isProfileOpen}
                togglePortal={this.togglePortal}
                user={user}
                loadUser={this.loadUser} />
            </Portal>}
        {route === 'home'
         ? <div>
             <Logo />
             <Rank
               name={this.state.user.name}
               entries={this.state.user.entries}
               />
             <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              />
             <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        :(
          route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      )}
     </div>
    );
  }
}

export default App;
