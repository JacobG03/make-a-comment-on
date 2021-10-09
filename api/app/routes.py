from app import app
from flask import request
import re
from app.other import getVideoId


# Main route
@app.route('/api', methods=['GET', 'POST'])
def api():
  domain = 'localhost:5000/'
  return {
    'video_data_url': domain + 'api/video-data'
  }


@app.post('/api/video-data')
def video_data():
  # receive url value
  try:
    url = request.get_json()['url']
  except KeyError:
    return {
      'message': 'url key is missing'
    }, 400
  
  # validate url
  url_valid = re.search('^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+', url)
  if not url_valid:
    return {
      'message': 'Invalid URL'
    }, 400

  # validate ID
  videoID = getVideoId(url)
  if videoID == None:
    return {
      'message': 'Link does not contain video id'
    }, 400
  
  #! query database and return valid data
  

  # valid response
  return {
    'videoId': videoID
  }, 200
