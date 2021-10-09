from furl import furl

def getVideoId(url):
  # normal url (youtube.com/watch?v=videoID)
  if url.split('youtu')[1][0] != '.':
    try:
      videoID = furl(url).args['v']
      return videoID
    except KeyError:
      return None
  # shortened url (youtu.be/videoID)
  else:
    videoID = url.split('/')[-1]
    return videoID.split('?')[0]
