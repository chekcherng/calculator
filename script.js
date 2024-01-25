document.addEventListener('DOMContentLoaded', function () {
    var display = document.getElementById('display');
    var buttons = document.getElementById('buttons');
    var operators = ['+', '-', '*', '/'];
    var decimalAdded = false;

    display.value = '0';

    buttons.addEventListener('click', function (e) {
        var button = e.target;

        if (button.tagName === 'SPAN') {
            var operator = button.textContent;
            var displayValue = display.value;

            if (operator === 'AC') {
                display.value = '0';
                decimalAdded = false;
            } else if (operator === 'C') { 
                display.value = displayValue.slice(0, -1);
            } else if (operators.indexOf(operator) > -1) {
                if (displayValue.endsWith('.')) {
                    display.value = displayValue.slice(0, -1) + operator;
                    decimalAdded = false;
                } else if (operators.indexOf(displayValue[displayValue.length - 1]) > -1) {
                    display.value = displayValue.slice(0, -1) + operator;
                } else {
                    display.value += operator;
                    decimalAdded = false;
                }
            } else if (operator === '.') {
                if (operators.indexOf(displayValue[displayValue.length - 1]) > -1) {
                    display.value += '0.';
                    decimalAdded = true;
                } else if (!decimalAdded) {
                    display.value += operator;
                    decimalAdded = true;
                }
            } else if (operator === '=') {
                try {
                    var result = eval(displayValue);
                    display.value = result;
                    decimalAdded = false;
                } catch (e) {
                    display.value = 'Error';
                }
            } else {
                if (displayValue === '0' || displayValue === 'Error') {
                    display.value = operator;
                } else {
                    display.value += operator;
                }
            }
        }
    });
});
