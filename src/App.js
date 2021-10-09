import './App.css';
import Youtube from 'react-youtube'
import { useForm } from 'react-hook-form'
import { useState } from 'react';

// https://www.youtube.com/watch?v=fHy7K4xIO-g

function App() {
  const [link, setLink] = useState();
  console.log(link)

  return (
    <div className='app'>
      <div className='wrapper'>
        <div className='top'>
          <h1>Make a comment on</h1>
        </div>
        <div className='content'>
          <LinkInput setLink={setLink} />
          <VideoPlayer link={link} />
        </div>
      </div>
    </div>
  );
}


function LinkInput(props) {
  const {register, handleSubmit } = useForm();
  const onSubmit = data => props.setLink(data.link);

  return (
    <form
      className='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <input  
        className='input-field'
        {...register('link')} 
      />
      <input 
        type='submit'
        className='submit-btn'
      />
    </form>
  )
}


function VideoPlayer(props) {
  return (
    <div className='video'>
      <Youtube videoId='fHy7K4xIO-g' />
    </div>
  )
}

export default App;
