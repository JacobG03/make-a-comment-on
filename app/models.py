from app import db
import datetime


class Video(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  videoID = db.Column(db.String(64), unique=True, nullable=False)
  query_amount = db.Column(db.Integer, default=0)
  comments = db.relationship('Comment', backref='video', lazy=True)

  def __repr__(self):
    return f'id: {self.id}'


class Comment(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(64), nullable=False)
  body = db.Column(db.String(10000), nullable=False)
  date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  video_id = db.Column(db.Integer, db.ForeignKey('video.id'))

  def __repr__(self):
    return f'id: {self.id}'