const Calculator = () => {
  const [display, setDisplay] = React.useState('0');
  const [prevValue, setPrevValue] = React.useState(null);
  const [operator, setOperator] = React.useState(null);
  const [waitingForOperand, setWaitingForOperand] = React.useState(false);
  const [negativeNext, setNegativeNext] = React.useState(false);
  const [lastCalculation, setLastCalculation] = React.useState(null);

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setNegativeNext(false);
    setLastCalculation(null);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(negativeNext ? `-${digit}` : String(digit));
      setWaitingForOperand(false);
      setNegativeNext(false);
    } else {
      setDisplay(display === '0' || display === '-0' ? 
                (negativeNext ? `-${digit}` : String(digit)) : 
                display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay(negativeNext ? '-0.' : '0.');
      setWaitingForOperand(false);
      setNegativeNext(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleNegative = () => {
    if (waitingForOperand) {
      setNegativeNext(!negativeNext);
    } else {
      setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
    }
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (operator && waitingForOperand) {
      if (nextOperator !== '-') {
        // Replace the previous operator if another operator is pressed (except minus)
        setOperator(nextOperator);
        setNegativeNext(false);
        return;
      } else {
        // Special case for negative numbers after operator
        setNegativeNext(true);
        return;
      }
    }

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      let newValue;
      
      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '/':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setPrevValue(newValue);
      setDisplay(String(newValue));
      setLastCalculation(newValue);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (!operator) {
      // If no operation was set, use the last calculation result
      if (lastCalculation !== null) {
        setDisplay(String(lastCalculation));
      }
      return;
    }
    
    performOperation(null);
    setOperator(null);
  };

  return (
    <div id="calculator" style={{
      width: '320px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <div id="display" style={{
        textAlign: 'right',
        padding: '10px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        fontSize: '24px',
        minHeight: '30px',
        overflow: 'hidden'
      }}>
        {display}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px'
      }}>
        <button id="clear" onClick={clearAll} style={{
          gridColumn: 'span 2',
          backgroundColor: '#ff4444',
          color: 'white'
        }}>
          AC
        </button>
        <button onClick={handleNegative} style={{
          backgroundColor: '#f0f0f0'
        }}>
          +/-
        </button>
        <button id="divide" onClick={() => performOperation('/')} style={{
          backgroundColor: '#f0f0f0'
        }}>
          /
        </button>
        <button id="multiply" onClick={() => performOperation('*')} style={{
          backgroundColor: '#f0f0f0'
        }}>
          ×
        </button>

        <button id="seven" onClick={() => inputDigit(7)}>7</button>
        <button id="eight" onClick={() => inputDigit(8)}>8</button>
        <button id="nine" onClick={() => inputDigit(9)}>9</button>
        <button id="subtract" onClick={() => performOperation('-')} style={{
          backgroundColor: '#f0f0f0'
        }}>
          -
        </button>

        <button id="four" onClick={() => inputDigit(4)}>4</button>
        <button id="five" onClick={() => inputDigit(5)}>5</button>
        <button id="six" onClick={() => inputDigit(6)}>6</button>
        <button id="add" onClick={() => performOperation('+')} style={{
          backgroundColor: '#f0f0f0'
        }}>
          +
        </button>

        <button id="one" onClick={() => inputDigit(1)}>1</button>
        <button id="two" onClick={() => inputDigit(2)}>2</button>
        <button id="three" onClick={() => inputDigit(3)}>3</button>
        <button id="equals" onClick={handleEquals} style={{
          gridRow: 'span 2',
          backgroundColor: '#4CAF50',
          color: 'white'
        }}>
          =
        </button>

        <button id="zero" onClick={() => inputDigit(0)} style={{
          gridColumn: 'span 2'
        }}>
          0
        </button>
        <button id="decimal" onClick={inputDecimal}>.</button>
      </div>
    </div>
  );
};

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
