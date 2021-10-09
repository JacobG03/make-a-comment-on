from app import app, db
from flask import request
import re
from app.other import getVideoId
from app.models import Video


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
  
  
  video = Video.query.filter_by(videoID=videoID).first()
  
  if not video:
    video = Video(videoID=videoID)
    video.query_amount = 0
  
  video.query_amount += 1
  db.session.add(video)
  db.session.commit()

  # valid response
  return {
    'videoId': video.videoID,
    'query_amount': video.query_amount
  }, 200
