import './App.css';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'
import Youtube from 'react-youtube'
import { VideoContext } from './context/VideoContext';
import useWindowDimensions from './hooks/windowDimensions'

// https://www.youtube.com/watch?v=fHy7K4xIO-g

function App() {
  const videoContext = useContext(VideoContext);

  return (
    <div className='wrapper'>
      <div className='header'>
        <h1>Make a comment on</h1>
        <span>YouTube videos with blocked comments</span>
      </div>
      <div className='content'>
        <div className='top'>
          <LinkInput changeURL={videoContext.changeURL}/>
          <VideoPlayer videoData={videoContext.videoData} />
        </div>
        <CommentSection videoContext={videoContext} />
      </div>
    </div>
  );
}


function CommentSection(props) {
  const videoData = props.videoContext.videoData
  const addComment = props.videoContext.addComment

  if (videoData === null) {
    return null
  }
  return (
    <div className='comments-section'>
      <MakeComment addComment={addComment}/>
      <Comments comments={videoData.comments}/>
    </div>
  )
}


function MakeComment(props) {
  const {register, handleSubmit } = useForm();
  const onSubmit = data => props.addComment(data);

  return (
    <form
      className='form2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <span>Username:</span>
      <input  
        className='input-field'
        {...register('username', { required: true, maxLength: 64 })} 
      />
      <span>Comment:</span>
      <textarea
        className='input-area'
        {...register('body', { required: true, maxLength: 10000 })} 
      />
      <input 
        type='submit'
        className='submit-btn'
      />
    </form>
  )
}


function Comments(props) {
  const comments = props.comments
  // Sorts by id descending
  comments.sort((a, b) => b.id - a.id);
  return (
    <div className='comments'>
      {comments.map(comment => <Comment comment={comment} key={comment.id}/>)}
    </div>
  )
}


function Comment(props) {
  const comment = props.comment
  return (
    <div className='comment'>
      <div className='comment-top'>
        <span className='username'>{comment.username}</span>
        <span>{comment.date}</span>
      </div>
      <div className='comment-body'>
        <span>{comment.body}</span>
      </div>
    </div>
  )
}


function LinkInput(props) {
  const {register, handleSubmit } = useForm();
  const onSubmit = data => props.changeURL(data.link);

  return (
    <form
      className='form1'
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
  const { width } = useWindowDimensions();

  let opts = {}

  if (width < 520) {
    opts = {
      width: '320',
      height: '240'
    };
  } else {
    opts = {
      width: '480',
      height: '320'
    };
  }

  return (
    <div className='video'>
      {videoID ? <Youtube videoId={videoID} opts={opts} />: null}
    </div>
  )
}

export default App;
