import React, { 
  createContext, 
  useState, 
  useCallback,
  useMemo,
  useEffect,
} from "react";


const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const [URL, setURL] = useState(null)
  const [videoData, setVideoData] = useState(null)
  const [comments, setComments] = useState(null)
  console.log('1. URL:')
  console.log(URL)

  console.log('2. Video Data:')
  console.log(videoData)
  
  console.log('3. Comments:')
  console.log(comments)

  // On url change update video data
  useEffect(() => {
    
  }, [URL])

  const changeURL = useCallback(url => {
    setURL(url)
  }, [])

  const contextValue = useMemo(() => ({
    URL,
    changeURL,
  }), [URL, changeURL])

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
};


export { VideoContext, VideoContextProvider };