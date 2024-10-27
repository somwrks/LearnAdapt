from flask import Flask, request, jsonify
import openai
from deepface import DeepFace
import cv2
import re

app = Flask(__name__)

openai.api_key = 'YOUR_OPENAI_API_KEY'

@app.route('/api/python/detect_emotion', methods=['POST'])
def detect_emotion():
    try:
        cap = cv2.VideoCapture(0)
        ret, frame = cap.read()
        cap.release()

        result = DeepFace.analyze(frame, actions=['emotion'])
        emotion = result['dominant_emotion']
        
        return jsonify({"emotion": emotion})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/python/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message')
    emotion = data.get('emotion')

    prompt = f"User said: {message}. They seem to be feeling {emotion}."

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=100
    )

    reply = response.choices[0].text.strip()

    # Check for video URL in the response
    video_url_pattern = re.compile(r'(https?://[^\s]+\.mp4)')
    video_url_match = video_url_pattern.search(reply)

    if video_url_match:
        return jsonify({"videoUrl": video_url_match.group(0)})
    else:
        return jsonify({"reply": reply})

if __name__ == '__main__':
    app.run(debug=True)
