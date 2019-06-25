import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
return (
  <div>
    <p className='f3'>
      { 'This Magic-Brain will detect faces in your pictures, Try it now (!)' }
    </p>
    <div className='center'>
      <div className='form center pa4 br3 shadow-5'>
        <input className='f4 pa2 w-75 center' type='tex' onChange={onInputChange} />
        <button className='w-25 grow f4 link ph3 pv2 dib white bg-light-purple'
        onClick={onButtonSubmit}
        >Detect</button>
      </div>
    </div>
    <p className='f4'>
    {' enter a JPG URL only! '}
    </p>
  </div>

  );
}


export default ImageLinkForm;
