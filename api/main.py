from app import app, db
from app.models import Video, Comment


@app.shell_context_processor
def make_shell_context():
  return {'db': db, 'Video': Video, 'Comment': Comment}


if __name__ == "__main__":
   app.run()