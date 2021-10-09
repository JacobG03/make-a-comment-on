from app import app


# Main route
@app.route('/api', methods=['GET', 'POST'])
def api():
  domain = 'localhost:5000/'
  return {
    'video_data_url': domain + 'api/{url}'
  }


@app.route('/api/{url}')
def video_data(url):
  print(url)
  return {
    'message': 'URL received'
  }, 200