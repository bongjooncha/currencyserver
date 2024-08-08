from flask import Blueprint, jsonify, request
import speech_recognition as sr

audio_api = Blueprint('audio',__name__)

@audio_api.rout('',methods=['POST'])
def recognize_speech():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    recognizer = sr.Recognizer()
    audio = sr.AudioFile(file)
    
    with audio as source:
        audio_data = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio_data, language='ko-KR')
        return jsonify({'text': text}), 200
    except sr.UnknownValueError:
        return jsonify({'error': 'Could not understand audio'}), 400
    except sr.RequestError:
        return jsonify({'error': 'Could not request results from Google Speech Recognition service'}), 500
