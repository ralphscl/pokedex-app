export function romanToInteger(romanNumeral) {
    const romanToIntMap = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000
    };
  
    let result = 0;
    let prevValue = 0;
  
    for (let i = romanNumeral.length - 1; i >= 0; i--) {
      const currentChar = romanNumeral[i];
      const currentValue = romanToIntMap[currentChar];
  
      if (currentValue >= prevValue) {
        result += currentValue;
      } else {
        result -= currentValue;
      }
  
      prevValue = currentValue;
    }
  
    return result;
  }

  export function calculatePercentage(value, total) {
    return Math.round((value / total) * 100);
  };