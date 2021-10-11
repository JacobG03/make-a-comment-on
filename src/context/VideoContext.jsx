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
  console.log(videoData)
  
  const changeURL = useCallback(url => {
    setURL(url)
  }, [])

  const contextValue = useMemo(() => ({
    URL,
    changeURL,
    videoData
  }), [URL, changeURL, videoData])

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
};


export { VideoContext, VideoContextProvider };