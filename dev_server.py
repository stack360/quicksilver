from app import app

# For Debug Only:
if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True, threaded=True)
