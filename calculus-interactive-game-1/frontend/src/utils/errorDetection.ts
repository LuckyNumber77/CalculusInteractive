// Common error detection for calculus problems

export interface ErrorAnalysis {
  errorType: string;
  explanation: string;
  suggestion: string;
}

/**
 * Analyzes a student's incorrect answer to provide specific feedback
 * about what common error they may have made
 */
export function analyzeIncorrectAnswer(
  userAnswer: string,
  correctAnswer: string,
  questionText: string
): ErrorAnalysis | null {
  const normalized = (str: string) => str.trim().toLowerCase().replace(/\s+/g, ' ');
  const user = normalized(userAnswer);
  const correct = normalized(correctAnswer);

  // Sign errors
  if (user.replace(/-/g, '') === correct.replace(/-/g, '')) {
    return {
      errorType: 'sign_error',
      explanation: 'Your answer is close, but there\'s a sign error.',
      suggestion: 'Check the signs (+ or -) in your answer. Did you forget a negative sign, or add one where it shouldn\'t be?'
    };
  }

  // Missing constant of integration (for integrals)
  if (questionText.toLowerCase().includes('integral') && 
      correct.includes('+ c') && 
      !user.includes('c') &&
      user === correct.replace(/\s*\+\s*c/gi, '')) {
    return {
      errorType: 'missing_constant',
      explanation: 'You\'re missing the constant of integration!',
      suggestion: 'For indefinite integrals, always add "+ C" to represent the family of antiderivatives.'
    };
  }

  // Power rule mistakes (common off-by-one errors)
  const powerRulePatterns = [
    { user: /(\d*)x\^(\d+)/, correct: /(\d*)x\^(\d+)/ }
  ];

  // Check for derivative power rule mistakes (forgot to reduce exponent or multiply by coefficient)
  if (questionText.toLowerCase().includes('derivative') && 
      questionText.includes('x^')) {
    const userHasX = user.includes('x');
    const correctHasX = correct.includes('x');
    
    if (userHasX !== correctHasX) {
      return {
        errorType: 'power_rule_incomplete',
        explanation: 'This looks like an incomplete application of the power rule.',
        suggestion: 'Remember: d/dx[x^n] = n·x^(n-1). Bring down the exponent as a coefficient AND reduce the exponent by 1.'
      };
    }
  }

  // Trigonometric derivative sign errors
  const trigPairs = [
    { func: 'sin', deriv: 'cos', sign: '' },
    { func: 'cos', deriv: 'sin', sign: '-' }
  ];

  for (const { func, deriv, sign } of trigPairs) {
    if (questionText.toLowerCase().includes(`derivative of ${func}`) &&
        correct.includes(`${sign}${deriv}`) &&
        user.includes(deriv) &&
        !user.includes(sign)) {
      return {
        errorType: 'trig_derivative_sign',
        explanation: `The derivative of ${func}(x) needs a negative sign.`,
        suggestion: `Remember: d/dx[${func}(x)] = ${sign}${deriv}(x). The negative sign is important!`
      };
    }
  }

  // Chain rule issues
  if (questionText.toLowerCase().includes('chain rule') ||
      (questionText.includes('(') && questionText.includes(')'))) {
    if (!user.includes('*') && correct.includes('*')) {
      return {
        errorType: 'chain_rule_missing',
        explanation: 'Did you forget to apply the chain rule?',
        suggestion: 'For composite functions, use the chain rule: multiply by the derivative of the inner function.'
      };
    }
  }

  // Product rule issues
  if (questionText.toLowerCase().includes('product rule') ||
      (questionText.includes('*') || questionText.includes('·'))) {
    return {
      errorType: 'product_rule_error',
      explanation: 'Check your product rule application.',
      suggestion: 'Remember: (fg)\' = f\'g + fg\'. You need BOTH terms: derivative of first times second, PLUS first times derivative of second.'
    };
  }

  // Quotient rule issues  
  if (questionText.toLowerCase().includes('quotient rule') ||
      questionText.includes('/')) {
    return {
      errorType: 'quotient_rule_error',
      explanation: 'Check your quotient rule application.',
      suggestion: 'Remember: (f/g)\' = (f\'g - fg\')/g². Low d-high minus high d-low, all over low squared.'
    };
  }

  // Generic feedback
  return {
    errorType: 'general_mistake',
    explanation: 'That\'s not the correct answer.',
    suggestion: 'Review the relevant concept and try again, or view a hint for guidance.'
  };
}
