from app import app, db
from flask import request, send_from_directory
import re
from app.other import getVideoId
from app.models import Comment, Video
import os


@app.route('/', methods=['GET'])
def home():
    return send_from_directory(os.path.abspath('../build'), 'index.html')


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(os.path.abspath('../build'), 'index.html')


# Main route
@app.route('/api', methods=['GET', 'POST'])
def api():
  domain = 'https://make-a-comment-on.herokuapp.com/'
  return {
    'video_data_url': domain + 'api/video',
    'comments_url': domain + 'api/comments'
  }


@app.post('/api/video')
def video_data():
  # receive url value
  try:
    url = request.get_json()['url']
  except KeyError:
    return {
      'success': False,
      'message': 'url key is missing'
    }, 200
  
  # validate url
  url_valid = re.search('^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+', url)
  if not url_valid:
    return {
      'success': False,
      'message': 'Invalid URL'
    }, 200

  # validate ID
  videoID = getVideoId(url)
  if videoID == None:
    return {
      'success': False,
      'message': 'Link does not contain video id'
    }, 200
  
  
  video = Video.query.filter_by(videoID=videoID).first()
  
  if not video:
    video = Video(videoID=videoID)
    video.query_amount = 0
  
  video.query_amount += 1
  db.session.add(video)
  db.session.commit()
  
  comments = []

  for comment in video.comments:
    comments.append({
      'id': comment.id,
      'username': comment.username,
      'body': comment.body,
      'date': comment.date
    })

  # valid response
  return {
    'success': True,
    'data': {
      'videoID': video.videoID,
      'query_amount': video.query_amount,
      'comments': comments
    }
  }, 200


@app.post('/api/comment')
def comment():
  try:
    data = request.get_json()
    videoID = data['videoID']
    comment_data = data['comment']
    print(videoID)
  except KeyError:
    return {
      'success': False,
      'message': 'Missing keys: videoID, comment'
    }
  
  comment = Comment(
    username=comment_data['username'],
    body=comment_data['body'],
    video_id=Video.query.filter_by(videoID=videoID).first().id
  )

  db.session.add(comment)
  db.session.commit()

  return {
    'success': True
  }