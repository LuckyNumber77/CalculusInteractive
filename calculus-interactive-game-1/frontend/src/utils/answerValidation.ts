/**
 * Answer validation utilities for calculus problems.
 * Provides flexible matching for mathematical expressions.
 */

/**
 * Normalizes a mathematical answer string for comparison.
 * - Converts to lowercase
 * - Removes extra whitespace
 * - Normalizes common mathematical notations
 * 
 * NOTE: This is a simple normalization suitable for the current problem set.
 * For more complex expressions requiring algebraic simplification (e.g., '2*3*x' → '6x'),
 * consider using a computer algebra system library like math.js or algebrite.
 * 
 * @param answer - The answer string to normalize
 * @returns Normalized answer string
 */
export function normalizeAnswer(answer: string): string {
    return answer
        .toLowerCase()
        .trim()
        // Remove all spaces
        .replace(/\s+/g, '')
        // Normalize multiplication: * → (nothing), × → (nothing)
        // Note: This works for expressions like '2*x' → '2x' but won't simplify '2*3*x'
        .replace(/[*×]/g, '')
        // Normalize division: ÷ → /
        .replace(/÷/g, '/')
        // Normalize exponentiation: ** → ^
        .replace(/\*\*/g, '^')
        // Normalize parentheses spacing
        .replace(/\(\s+/g, '(')
        .replace(/\s+\)/g, ')')
        // Normalize plus/minus spacing
        .replace(/\s*\+\s*/g, '+')
        .replace(/\s*-\s*/g, '-');
}

/**
 * Checks if two mathematical answers are equivalent.
 * Uses normalization to allow for different formatting.
 * 
 * @param userAnswer - The user's submitted answer
 * @param correctAnswer - The expected correct answer
 * @returns true if answers match, false otherwise
 */
export function isAnswerCorrect(userAnswer: string, correctAnswer: string): boolean {
    // Basic normalization
    const normalizedUser = normalizeAnswer(userAnswer);
    const normalizedCorrect = normalizeAnswer(correctAnswer);
    
    // Direct match after normalization
    if (normalizedUser === normalizedCorrect) {
        return true;
    }
    
    // Check for common alternative representations
    const alternatives = generateAlternatives(normalizedCorrect);
    return alternatives.some(alt => normalizedUser === alt);
}

/**
 * Generates common alternative representations of a mathematical expression.
 * For example, "2x" can also be written as "x2", "2*x", etc.
 * 
 * NOTE: This handles simple cases. For complex expressions with multiple operations,
 * a proper mathematical expression parser would be needed.
 * 
 * @param answer - The normalized answer
 * @returns Array of alternative representations
 */
function generateAlternatives(answer: string): string[] {
    const alternatives: string[] = [answer];
    
    // Handle fraction alternatives: x^2/2 vs (x^2)/2 vs x^2/2
    // Note: This is a simple pattern match and may not handle all cases correctly
    if (answer.includes('/')) {
        // Add version with parentheses around numerator
        const withParens = answer.replace(/([^/]+)\//, '($1)/');
        if (withParens !== answer) {
            alternatives.push(withParens);
        }
    }
    
    // Handle constant ordering: +c vs +C
    if (answer.includes('+c')) {
        alternatives.push(answer.replace('+c', '+C'));
    }
    if (answer.includes('+C')) {
        alternatives.push(answer.replace('+C', '+c'));
    }
    
    // Handle coefficient-variable order: 2x vs x*2 (after normalization both are 2x)
    // Already handled by normalization
    
    // Handle exponent notation: x^2 vs x**2 (already normalized to x^2)
    
    return alternatives;
}

/**
 * Provides feedback on why an answer might be wrong.
 * Useful for helping students understand their mistakes.
 * 
 * @param userAnswer - The user's submitted answer
 * @param correctAnswer - The expected correct answer
 * @returns Feedback message or null if no specific feedback
 */
export function getAnswerFeedback(userAnswer: string, correctAnswer: string): string | null {
    const normalizedUser = normalizeAnswer(userAnswer);
    const normalizedCorrect = normalizeAnswer(correctAnswer);
    
    // Close but missing constant of integration
    if (normalizedCorrect.includes('+c') && !normalizedUser.includes('+c')) {
        return "Don't forget to add the constant of integration (+C) for indefinite integrals!";
    }
    
    // Has the structure but different coefficients
    const userNums = normalizedUser.match(/\d+/g) || [];
    const correctNums = normalizedCorrect.match(/\d+/g) || [];
    
    if (userNums.length === correctNums.length && userNums.length > 0) {
        const hasWrongCoefficient = userNums.some((num, i) => num !== correctNums[i]);
        if (hasWrongCoefficient) {
            return "Your structure looks right, but check your coefficients carefully.";
        }
    }
    
    // Check for sign errors
    const userHasMinus = (normalizedUser.match(/-/g) || []).length;
    const correctHasMinus = (normalizedCorrect.match(/-/g) || []).length;
    
    if (userHasMinus !== correctHasMinus) {
        return "Check your signs - you may have a sign error.";
    }
    
    return null;
}

/**
 * Validates if a string looks like a reasonable mathematical expression.
 * Prevents empty or obviously invalid submissions.
 * 
 * @param answer - The answer to validate
 * @returns true if answer appears valid, false otherwise
 */
export function isValidMathExpression(answer: string): boolean {
    const trimmed = answer.trim();
    
    // Must not be empty
    if (!trimmed) {
        return false;
    }
    
    // Must contain at least one alphanumeric character or mathematical symbol
    if (!/[a-zA-Z0-9+\-*/^()]/.test(trimmed)) {
        return false;
    }
    
    // Check for balanced parentheses
    let parenCount = 0;
    for (const char of trimmed) {
        if (char === '(') parenCount++;
        if (char === ')') parenCount--;
        if (parenCount < 0) return false;
    }
    
    return parenCount === 0;
}
