/**
 * Utility for converting ASCII-like math notation to LaTeX format.
 * This is a conservative converter that only transforms known patterns.
 * 
 * NOTE: This utility requires the KaTeX library to render LaTeX math.
 * Install it with: npm install katex @types/katex
 * Import the CSS in your app entry point (index.tsx or App.tsx):
 *   import 'katex/dist/katex.min.css';
 */

import katex from 'katex';

/**
 * Converts common ASCII math patterns into LaTeX-friendly strings.
 * Handles patterns commonly used in calculus hints and questions:
 * - d/dx notation
 * - Exponents (x^n)
 * - Multiplication (asterisks to \cdot)
 * - Arrows (=> to \Rightarrow)
 * - Integration constant (+ C)
 * - Parentheses in exponents
 * 
 * @param input - ASCII-like math string
 * @returns LaTeX-formatted string wrapped in inline math delimiters
 */
export function toLatex(input: string): string {
    if (!input || typeof input !== 'string') {
        return input;
    }

    let result = input;

    // Convert d/dx notation to LaTeX
    result = result.replace(/d\/dx/g, '\\frac{d}{dx}');
    
    // Convert integral notation
    result = result.replace(/∫/g, '\\int');
    
    // Convert exponents: x^2 -> x^{2}, x^(n-1) -> x^{(n-1)}
    // Handle parentheses in exponents first
    result = result.replace(/\^(\([^)]+\))/g, '^{$1}');
    // Handle simple numeric or single-variable exponents
    result = result.replace(/\^([0-9]+)/g, '^{$1}');
    result = result.replace(/\^([a-zA-Z])/g, '^{$1}');
    
    // Convert multiplication asterisks to cdot (but be careful not to convert in other contexts)
    // Only convert * when it's between alphanumeric characters or parentheses
    result = result.replace(/([0-9a-zA-Z)])\s*\*\s*([0-9a-zA-Z(])/g, '$1 \\cdot $2');
    
    // Convert arrows
    result = result.replace(/=>/g, '\\Rightarrow');
    result = result.replace(/->/g, '\\rightarrow');
    
    // Handle division with parentheses for fractions
    // Simple pattern: (a)/(b) -> \frac{a}{b}
    result = result.replace(/\(([^)]+)\)\/\(([^)]+)\)/g, '\\frac{$1}{$2}');
    
    // Don't wrap if already wrapped in math delimiters
    if (result.includes('$')) {
        return result;
    }
    
    // Wrap in inline math delimiters for KaTeX
    return `$${result}$`;
}

/**
 * Attempts to render LaTeX using KaTeX if available.
 * Falls back to the original text if KaTeX is not available or rendering fails.
 * 
 * @param text - Text that may contain LaTeX notation
 * @returns Rendered HTML string or original text
 */
export function renderMathToHTML(text: string): string {
    try {
        // Check if the text contains LaTeX math delimiters
        if (!text.includes('$')) {
            return text;
        }
        
        // Render with KaTeX
        // Extract the content between $ delimiters
        const match = text.match(/\$(.+?)\$/);
        if (match) {
            const latexContent = match[1];
            const rendered = katex.renderToString(latexContent, {
                throwOnError: false,
                displayMode: false,
            });
            // Replace the $...$ with rendered HTML
            return text.replace(/\$(.+?)\$/, rendered);
        }
        
        return text;
    } catch (error) {
        // Fallback to original text if rendering fails
        console.warn('Failed to render math:', error);
        return text;
    }
}
