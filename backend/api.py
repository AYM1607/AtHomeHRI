import time
import base64
import uuid

import flask
import eventlet
import cv2

from flask import request, jsonify
from flask_socketio import SocketIO, send
from flask_cors import CORS

eventlet.monkey_patch()

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config["SCHEDULER_API_ENABLED"] = True
CORS(app)

cam = cv2.VideoCapture(0)

# Sockets
socketio = SocketIO(app, cors_allowed_origins="*")

def message_sender():
    while True:
        _, img = cam.read()
        _, img_buffer = cv2.imencode(".jpg", img)
        img_text = base64.b64encode(img_buffer)
        socketio.emit("CameraFeed", img_text.decode("ascii"))
        socketio.emit(
            "Comm", f"The robot has informed that its current time is {time.time()}"
        )
        socketio.sleep(0.05)


def chat_sender():
    while True:
        robotMessage = {
            "text": "Hello there, this is a test message.",
            "id": str(uuid.uuid4()),
            "sender": {
              "name": "Robot",
              "uid": "robot",
              "avatar": "https://cdn.iconscout.com/icon/premium/png-256-thumb/robot-2459178-2139023.png"
            }
        }
        socketio.emit("RobotMessage", robotMessage)
        socketio.sleep(30)



@socketio.on("connect")
def connect_handler():
    print("A user has connected to the server.")


@socketio.on("disconnect")
def disconnect_handler():
    print("A user has disconnected from the server.")


@socketio.on("message")
def handle_message(message):
    print(f"Received message {message}")
    send(message)


@app.errorhandler(404)
def not_found(_):
    return jsonify({"message": "The result was not found"}), 404


@app.route("/", methods=["GET"])
def root():
    socketio.emit("Comm", "Just some message")
    return jsonify({"message": "Welcome to the HOME API"})


if __name__ == "__main__":
    socketio.start_background_task(message_sender)
    # socketio.start_background_task(chat_sender)
    socketio.run(app)
