from flask import Flask, request, send_file, render_template
import yt_dlp
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download():
    url = request.json.get('url')
    
    if not url:
        return {'error': 'No URL provided'}, 400

    try:
        
        ydl_opts = {
            'format': 'bestvideo+bestaudio/best',  
            'outtmpl': 'video.mp4',  
            'quiet': True  
        }

        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])  

        
        return send_file('video.mp4', as_attachment=True)

    except Exception as e:
        
        print(f"Error occurred: {e}")
        return {'error': f'Failed to download video: {str(e)}'}, 400

if __name__ == '__main__':
    app.run(debug=True)
