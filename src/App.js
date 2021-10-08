import './App.css';
import YouTube from 'react-youtube'
import { useForm } from 'react-hook-form'

// https://www.youtube.com/watch?v=fHy7K4xIO-g

function App() {
  const {register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data)
  return (
    <div className='app'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            className='input-field'
            {...register('query')} 
          />
          <input 
            type='submit'
            className='submit-btn'
          />
        </form>
      </div>
    </div>
  );
}

export default App;
