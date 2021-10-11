import React, { 
  createContext, 
  useState, 
  useCallback,
  useMemo,
  useEffect,
} from "react";
import postData from "../services/PostData";

const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const [URL, setURL] = useState(null)
  const [videoData, setVideoData] = useState(null)

  // On url change update video data
  useEffect(() => {
    if (URL) {
      postData('api/video', {'url': URL})
      .then(result => {
        if(result.success) {
          setVideoData(result['data'])
        }
      })
    }
  }, [URL])
  
  const changeURL = useCallback(url => {
    setURL(url)
  }, [])

  const addComment = useCallback(comment => {
    if (videoData !== null) {
      postData('api/comment', {
        'videoID': videoData.videoID,
        'comment': comment
      })
      .then(result => {
        if (result.success) {
          postData('api/video', {'url': URL})
          .then(result => {
            if(result.success) {
              setVideoData(result['data'])
            }
          })
        }
      })
    }
  }, [videoData, URL])


  const contextValue = useMemo(() => ({
    URL,
    changeURL,
    videoData,
    addComment
  }), [URL, changeURL, videoData, addComment])

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
};


export { VideoContext, VideoContextProvider };