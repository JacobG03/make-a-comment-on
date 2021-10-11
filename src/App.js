import './App.css';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'
import Youtube from 'react-youtube'
import { VideoContext } from './context/VideoContext';


// https://www.youtube.com/watch?v=fHy7K4xIO-g

function App() {
  const videoContext = useContext(VideoContext);

  return (
    <div className='app'>
      <div className='wrapper'>
        <div className='top'>
          <h1>Make a comment on</h1>
        </div>
        <div className='content'>
          <LinkInput changeURL={videoContext.changeURL}/>
          <VideoPlayer videoData={videoContext.videoData} />
          <CommentSection videoData={videoContext.videoData} />
        </div>
      </div>
    </div>
  );
}


function CommentSection(props) {
  const videoData = props.videoData

  if (videoData === null) {
    return null
  }
  return (
    <div>
      <MakeComment />
      <Comments comments={videoData.comments}/>
    </div>
  )
}


function MakeComment(props) {
  return (
    <div>
      Make a comment here
    </div>
  )
}


function Comments(props) {
  const comments = props.comments
  console.log(comments)
  return (
    <div>
      {comments.map(comment => <Comment comment={comment} key={comment.id}/>)}
    </div>
  )
}


function Comment(props) {
  const comment = props.comment
  return (
    <div style={{backgroundColor: 'black'}}>
      <p>{comment.username}</p>
      <p>{comment.body}</p>
      <p>{comment.date}</p>
    </div>
  )
}


function LinkInput(props) {
  const {register, handleSubmit } = useForm();
  const onSubmit = data => props.changeURL(data.link);

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
  const videoID = props.videoData === null ? null: props.videoData.videoID
  return (
    <div className='video'>
      {videoID ? <Youtube videoId={videoID} />: null}
    </div>
  )
}

export default App;
