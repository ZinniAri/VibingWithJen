# Technical Context

## Project Overview

A learning project to build a simple Python calculator with a web-based UI using Cline. The goal is to demonstrate basic Cline workflows: planning, file creation, code development, and running a local application.

## Environment Details

- **Operating System**: Windows 11
- **IDE**: Visual Studio Code - Insiders
- **Python Version**: 3.12
- **Default Shell**: C:\Windows\System32\cmd.exe
- **Current Working Directory**: c:\MyCode\VibingWithJen

## Tech Stack & Decisions

- **Backend**: Python 3.12 with Flask web framework
  - Flask chosen for simplicity - single lightweight package that enables web serving without complex setup
  - Avoided heavier frameworks to keep learning curve low and dependencies minimal
- **Frontend**: Plain HTML, CSS, JavaScript
  - No build tools or frameworks to focus on core web development concepts
  - Simple, responsive design for calculator interface
- **Dependencies**: Only Flask (installed via pip)
  - No additional packages to maintain simplicity as requested
- **Local Development**: Runs on localhost:5000 using Flask's built-in development server

## Project Structure

```
VibingWithJen/
├── README.md
├── memory-bank/
│   └── tech_context.md
├── app.py (planned)
├── templates/ (planned)
│   └── index.html
└── static/ (planned)
    ├── style.css
    └── script.js
```

## Current State

- Complete calculator application implemented with Flask backend and HTML/CSS/JS frontend
- Supports basic arithmetic operations (add, subtract, multiply, divide)
- Clean web interface with form inputs and result display
- Calculation history feature fully implemented - stores last 15 calculations in memory and displays them in real-time
- Application is fully functional and ready for use

## Calculator App Documentation

### Features

- **Arithmetic Operations**: Addition, subtraction, multiplication, division
- **Input Validation**: Checks for valid numbers, prevents division by zero
- **Real-time Results**: AJAX-powered calculation without page reload
- **Calculation History**: Displays last 15 calculations in reverse chronological order
- **Responsive UI**: Clean, simple interface using plain HTML/CSS/JS

### API Endpoints

- `GET /`: Serves the main calculator page
- `POST /calculate`: Accepts JSON with `num1`, `num2`, `operation`; returns `result` or `error`
- `GET /history`: Returns JSON array of calculation history

### Architecture

- **Backend**: Flask app with in-memory data storage
- **Frontend**: Vanilla JavaScript with fetch API for AJAX requests
- **Data Flow**: User inputs -> JS validation -> POST to /calculate -> Store in history -> Update UI with result and refresh history
- **Error Handling**: Client-side validation for numbers, server-side for operations

### Usage

1. Enter two numbers and select operation
2. Click Calculate to perform operation
3. View result and updated history panel
4. History persists during session (in-memory)

## Learning Objectives

- Master Cline's file manipulation and code generation capabilities
- Understand basic Flask application structure
- Practice iterative development with tool-based workflows
- Learn minimal web app deployment on localhost

## Potential Challenges & Mitigations

- Package installation: Use pip (already available) for Flask
- Windows compatibility: All commands tailored for cmd.exe shell
- UI simplicity: Keep calculator operations basic (add, subtract, multiply, divide)
- Error handling: Implement basic validation for calculator inputs
