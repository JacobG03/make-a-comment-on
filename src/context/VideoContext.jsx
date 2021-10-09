import React, { 
  createContext, 
  useState, 
  useCallback,
  useMemo,
  useEffect,
} from "react";


const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const [URL, setURL] = useState();
  console.log('1. URL: ' + URL)

  useEffect(() => {

  }, [])

  const changeURL = useCallback(url => {
    setURL(url)
  }, [])

  const contextValue = useMemo(() => ({
    URL,
    changeURL
  }), [URL, changeURL])

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
};


export { VideoContext, VideoContextProvider };