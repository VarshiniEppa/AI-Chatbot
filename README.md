
#  AI Chatbot 🤖

An intelligent AI chatbot providing dynamic and human-like conversations.  
Built with Flask, HTML, CSS, and deployed seamlessly on Render. Ideal for customer support, job assistance, and educational platforms.


Table of Contents
- [Roadmap](#roadmap)
- [Documentation](#documentation)
- [Installation](#installation)
- [Run Locally](#run-locally)
- [Usage / Example](#usage--example)
- [Screenshots](#screenshots)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Color Reference](#color-reference)
- [License](#license)


## -> Badges 🏅
 
![License](https://img.shields.io/github/license/VarshiniEppa/AI-Chatbot)

![Last Commit](https://img.shields.io/github/last-commit/VarshiniEppa/AI-Chatbot)

![Deployment](https://img.shields.io/badge/Deployed-Render-blue)

![Python Version](https://img.shields.io/badge/Python-3.9%2B-blue)

## -> 🛣 Roadmap
 - Build Flask backend for chatbot

- Create login and chat frontend UI

- Set up chat history and session storage

-  Create API endpoints for sending/receiving messages

-    Deploy the chatbot live on Render

 -   Improve UI styling and responsiveness

  -  Add user authentication with password reset

   - Save full chat history in database

- Add user profile pages

 -   Add admin dashboard to view chats

  -  Optimize bot responses with better logic

   - Add mobile device support (Responsive UI)
## -> Documentation 📖
Project Source Code: 

GitHub Repo https://github.com/VarshiniEppa/AI-Chatbot

-Tech Stack:

-Backend: Flask

-Frontend: HTML5, CSS3, JavaScript

-Deployment: Render

-Features:

-User Authentication (Login/Signup)

-Chatbot API

-RESTful backend

-Responsive UI

For detailed module-level documentation, check the /docs folder (if available) or inside the README.md of individual modules.

## ->Installation 📦
1.Clone the project:


git clone https://github.com/VarshiniEppa/AI-Chatbot.git

2.Navigate to the project directory:



    cd AI-Chatbot

3.Create and activate a virtual environment:



    python -m venv venv
# Windows
    venv\Scripts\activate
# Mac/Linux
    source venv/bin/activate

4.Install dependencies:


    pip install -r requirements.txt

5.Run the app:



    python app.py

Visit:



http://localhost:5000
## -> Run Locally 🖥
Follow the installation steps above, then open your browser to start chatting with the bot!
## -> Usage / Example 📚
- Open http://localhost:5000/login

- Send a message via the chat interface

- Receive instant responses from the AI bot

- Integrate via the exposed /api/chat endpoint for your own frontends or apps

- Example conversation:

        User: "Find jobs for me."

        Bot: "Here are some current job openings: Software Engineer, UX Designer, Data Analyst..."


## ->Screenshots 📸

### Login Page
![Login Screenshot](https://i.imgur.com/5PW9lim.png)

### Chat Interface
![Chatbot Dashboard](https://i.imgur.com/YbBPEME.png)
##  -> API Reference 🔗

### Chatbot Interaction

#### Send a Message

*POST* /api/chat

| Parameter | Type   | Description                 |
| :-------- | :----- | :-------------------------- |
| message | string | The user's message input     |

*Request Example*:

    ```json
    {
    "message": "Hello!"
    }
    Response Example:

    {
    "response": "Hi there! How can I help you today?"
    }
## ->Environment Variables 🌎
To run this project, you will need to set the following environment variables:


Variable Name | Description

| variables name | Description  |
| :------------- | :-------------------------- |
| SECRET_KEY | Your Flask app secret key     |
| DATABASE_URL (optional)|Database URL if using production database|

.env file:

    SECRET_KEY=your_secret_key_here

    DATABASE_URL=sqlite:///db.sqlite3
## -> Deployment 🚀
The project is deployed on Render.

🔗 Live Link: AI Chatbot on Render  
https://ai-chatbot-3-jaoi.onrender.com/login

Steps to deploy yourself:

    Push the project to GitHub

    Connect your repository to Render

Set build and start commands:

    Build: pip install -r requirements.txt

    Start: python app.py
## -> Color Reference 🎨

| Color             | Hex Code |
| ----------------- | -------- |
| Primary Background | #ffffff  |
| Primary Button     | #4F46E5  |
| Button Hover       | #4338CA  |
| Text Color         | #000000  |
| Secondary Text     | #6B7280  |

## -> License 📜
This project is licensed under the MIT License.

