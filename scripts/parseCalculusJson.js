#!/usr/bin/env node

/**
 * parseCalculusJson.js
 * 
 * Parses the Whitman Calculus text (calculus.json) and extracts question/answer pairs
 * into backend/data/problems.json for use by the CalculusInteractive game.
 * 
 * Usage: node scripts/parseCalculusJson.js
 * 
 * The script uses simple heuristics to identify exercises:
 * - Looks for "Exercises X.Y." headers
 * - Extracts numbered items that follow
 * - Treats the full problem text as the question
 * - Uses "⇒" marker to indicate an answer exists (though actual answers may not be in the text)
 */

const fs = require('fs');
const path = require('path');

// Paths
const INPUT_FILE = path.join(__dirname, '../calculus.json');
const OUTPUT_FILE = path.join(__dirname, '../calculus-interactive-game-1/backend/data/problems.json');

console.log('Starting Calculus JSON parser...');
console.log(`Input: ${INPUT_FILE}`);
console.log(`Output: ${OUTPUT_FILE}`);

// Read the calculus.json file
let content;
try {
    content = fs.readFileSync(INPUT_FILE, 'utf8');
    console.log(`✓ Read ${content.split('\n').length} lines from calculus.json`);
} catch (error) {
    console.error(`✗ Error reading ${INPUT_FILE}:`, error.message);
    process.exit(1);
}

const lines = content.split('\n');
const problems = [];
let currentChapter = '';
let currentSection = '';
let inExercises = false;
let currentProblem = null;

// Regular expressions
const exercisesPattern = /^Exercises\s+(\d+\.\d+)\.?\s*$/;
const numberedProblemPattern = /^(\d+)\.\s+(.+)$/;
const chapterPattern = /^(\d+)\s*$/;
const sectionPattern = /^(\d+\.\d+)\s+(.+)$/;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for chapter header (single number line)
    const chapterMatch = line.match(chapterPattern);
    if (chapterMatch && lines[i + 1] && lines[i + 1].trim().length > 0) {
        const nextLine = lines[i + 1].trim();
        if (nextLine && !nextLine.match(/^\d/)) {
            currentChapter = chapterMatch[1];
            continue;
        }
    }
    
    // Check for section header
    const sectionMatch = line.match(sectionPattern);
    if (sectionMatch) {
        currentSection = sectionMatch[1];
        continue;
    }
    
    // Check for exercises section
    const exercisesMatch = line.match(exercisesPattern);
    if (exercisesMatch) {
        inExercises = true;
        currentSection = exercisesMatch[1];
        console.log(`  Found exercises section: ${currentSection}`);
        continue;
    }
    
    // If we're in an exercises section, look for numbered problems
    if (inExercises) {
        const problemMatch = line.match(numberedProblemPattern);
        
        if (problemMatch) {
            // Save previous problem if exists
            if (currentProblem && currentProblem.question.length > 10) {
                problems.push(currentProblem);
            }
            
            // Start new problem
            const problemNumber = problemMatch[1];
            const problemText = problemMatch[2];
            const hasAnswer = problemText.includes('⇒');
            
            currentProblem = {
                id: `ch${currentChapter}_sec${currentSection}_prob${problemNumber}`,
                question: problemText.replace(/⇒\s*$/, '').trim(),
                answer: hasAnswer ? 'See solution in text' : 'No answer provided',
                topic: `Chapter ${currentChapter}, Section ${currentSection}`,
                lessonUrl: `https://www.whitman.edu/mathematics/multivariable/`,
                difficulty: 'medium',
                hasExplicitAnswer: hasAnswer
            };
        } else if (currentProblem && line.length > 0) {
            // Continue the current problem text (multi-line problem)
            const hasAnswer = line.includes('⇒');
            currentProblem.question += ' ' + line.replace(/⇒\s*$/, '').trim();
            if (hasAnswer) {
                currentProblem.hasExplicitAnswer = true;
            }
        } else if (line.length === 0 || line.match(/^[A-Z]/)) {
            // Empty line or new section - stop collecting exercises
            if (currentProblem && currentProblem.question.length > 10) {
                problems.push(currentProblem);
                currentProblem = null;
            }
            inExercises = false;
        }
    }
}

// Save last problem if exists
if (currentProblem && currentProblem.question.length > 10) {
    problems.push(currentProblem);
}

console.log(`\n✓ Extracted ${problems.length} problems from the text`);

// Filter problems to keep only those with reasonable length
const filteredProblems = problems.filter(p => 
    p.question.length > 20 && 
    p.question.length < 1000 &&
    !p.question.includes('Figure ') &&
    !p.question.includes('Schedule ')
);

console.log(`✓ Filtered to ${filteredProblems.length} suitable problems`);

// Prepare output
const output = {
    metadata: {
        source: 'Whitman Calculus Text',
        generatedAt: new Date().toISOString(),
        totalProblems: filteredProblems.length,
        license: 'Creative Commons Attribution-NonCommercial-ShareAlike License',
        url: 'https://www.whitman.edu/mathematics/multivariable/'
    },
    problems: filteredProblems
};

// Write to output file
try {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');
    console.log(`\n✓ Successfully wrote ${filteredProblems.length} problems to ${OUTPUT_FILE}`);
    console.log('\nSample problems:');
    for (let i = 0; i < Math.min(3, filteredProblems.length); i++) {
        console.log(`  ${i + 1}. ${filteredProblems[i].question.substring(0, 80)}...`);
    }
    console.log('\n⚠ Note: The parser extracts exercise questions but actual solutions may not be');
    console.log('   present in the text. Manual review and enhancement of backend/data/problems.json');
    console.log('   is recommended for production use.');
} catch (error) {
    console.error(`✗ Error writing ${OUTPUT_FILE}:`, error.message);
    process.exit(1);
}

console.log('\n✓ Done!');
