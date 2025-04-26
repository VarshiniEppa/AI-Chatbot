from dotenv import load_dotenv
load_dotenv()
import os
from bot import GeminiBot  # Use GeminiBot instead of OpenAI
chatbot = GeminiBot()
from config import Config
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_user, current_user, logout_user, login_required
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)

# Flask setup
app = Flask(__name__)
app.config.from_object('config.Config')  # Loads config from config.py

# Load OpenAI API Key from .env through config
  # Use the key loaded from environment variables via config.py

# Initialize extensions
from models import db, init_app
from models.user import User
from models.chat import Chat
init_app(app)

# -------------------- Auth Routes --------------------


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('Login unsuccessful. Please check email and password.', 'danger')

    return render_template('login.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        email_exists = User.query.filter_by(email=email).first()
        username_exists = User.query.filter_by(username=username).first()

        if email_exists:
            flash('Email already in use.', 'danger')
        elif username_exists:
            flash('Username already taken.', 'danger')
        else:
            user = User(username=username, email=email)
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
            flash('Account created! You can now log in.', 'success')
            return redirect(url_for('login'))

    return render_template('signup.html')


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))

# -------------------- Main Routes --------------------

@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')


@app.route('/chat-history')
@login_required
def chat_history():
    user_chats = Chat.query.filter_by(user_id=current_user.id).order_by(Chat.timestamp.desc()).all()
    grouped = {}

    for chat in user_chats:
        date_str = chat.timestamp.strftime('%Y-%m-%d')
        if date_str not in grouped:
            grouped[date_str] = []
        grouped[date_str].append({
            'id': chat.id,
            'message': chat.message,
            'response': chat.response,
            'timestamp': chat.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        })

    return jsonify(grouped)



@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html')

# -------------------- Chatbot API --------------------

@app.route('/api/chat', methods=['POST'])
@login_required
def chat():
    data = request.json
    user_message = data.get('message', '').strip()

    if not user_message:
        return jsonify({'response': "Please provide a message."})

    try:
        ai_response = chatbot.get_response(user_message)

        # Save to chat history
        chat = Chat(
            user_id=current_user.id,
            message=user_message,
            response=ai_response
        )
        db.session.add(chat)
        db.session.commit()

        return jsonify({'response': ai_response})
    except Exception as e:
        logging.error(f"Gemini error: {e}")
        return jsonify({'response': "Sorry, I encountered an error. Try again later."}), 500
@app.route('/test-gemini')
def test_gemini():
    try:
        reply = chatbot.get_response("Hello! What can you do?")
        return reply
    except Exception as e:
        return f"Gemini error: {e}"

# -------------------- Main --------------------

if __name__ == '__main__':
    app.run(debug=True,port=5001)
