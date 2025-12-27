from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory storage for calculation history
calculation_history = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        num1 = float(data['num1'])
        num2 = float(data['num2'])
        operation = data['operation']

        if operation == 'add':
            result = num1 + num2
        elif operation == 'subtract':
            result = num1 - num2
        elif operation == 'multiply':
            result = num1 * num2
        elif operation == 'divide':
            if num2 == 0:
                return jsonify({'error': 'Division by zero'})
            result = num1 / num2
        else:
            return jsonify({'error': 'Invalid operation'})

        # Store calculation in history
        calculation_history.append({
            'num1': num1,
            'operation': operation,
            'num2': num2,
            'result': result
        })
        # Keep only the last 15 calculations
        if len(calculation_history) > 15:
            calculation_history.pop(0)

        return jsonify({'result': result})
    except (ValueError, KeyError):
        return jsonify({'error': 'Invalid input'})

@app.route('/history')
def history():
    return jsonify(calculation_history)

if __name__ == '__main__':
    app.run()
