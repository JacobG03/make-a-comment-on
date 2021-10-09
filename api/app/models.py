from app import db


class Video(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  videoID = db.Column(db.String(64), unique=True, nullable=False)
  query_amount = db.Column(db.Integer, default=0)


  def __repr__(self):
    return f'id: {self.id}'