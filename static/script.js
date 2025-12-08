// Operation symbol mapping
const operationSymbols = {
    'add': '+',
    'subtract': '-',
    'multiply': '*',
    'divide': '/'
};

// Function to load and display history
function loadHistory() {
    fetch('/history')
    .then(response => response.json())
    .then(history => {
        const historyDiv = document.getElementById('history');
        historyDiv.innerHTML = '';

        // Display most recent first
        const reversedHistory = history.slice().reverse();

        reversedHistory.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'history-entry';
            entryDiv.textContent = `${entry.num1} ${operationSymbols[entry.operation]} ${entry.num2} = ${entry.result}`;
            historyDiv.appendChild(entryDiv);
        });
    })
    .catch(error => {
        console.error('Error loading history:', error);
    });
}

document.getElementById('calculate-btn').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    const resultDiv = document.getElementById('result');

    if (isNaN(num1) || isNaN(num2)) {
        resultDiv.textContent = 'Please enter valid numbers';
        resultDiv.style.color = 'red';
        return;
    }

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            num1: num1,
            num2: num2,
            operation: operation
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            resultDiv.textContent = 'Error: ' + data.error;
            resultDiv.style.color = 'red';
        } else {
            resultDiv.textContent = 'Result: ' + data.result;
            resultDiv.style.color = 'green';
            // Refresh history after successful calculation
            loadHistory();
        }
    })
    .catch(error => {
        resultDiv.textContent = 'An error occurred';
        resultDiv.style.color = 'red';
        console.error('Error:', error);
    });
});

// Load history on page load
loadHistory();
