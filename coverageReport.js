const fs = require('fs');
const path = require('path');

// 1. Locate the latest generated testcase file
const targetFile = process.argv[2] || 'nisa_testcases_copilot7.json';
const filePath = path.join(__dirname, 'generated-outputs', targetFile);

if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File not found at ${filePath}`);
    process.exit(1);
}

// Read the raw file buffer
let rawData = fs.readFileSync(filePath, 'utf-8');

// 🔥 CREDIT-SHIELD CLEANER: Remove invisible Byte Order Marks (BOM) and non-breaking space noise
rawData = rawData.trim().replace(/^\uFEFF/, '').replace(/\u00A0/g, ' ');

let data;
try {
    data = JSON.parse(rawData);
} catch (e) {
    console.error("❌ JSON Parse Error: The generated file contains invalid JSON syntax structures.");
    console.error(e.message);
    process.exit(1);
}

const cases = data.test_cases || [];

if (cases.length === 0) {
    console.log("⚠️ No test cases found in the file.");
    process.exit(0);
}

// 2. Dynamically extract the parameter space from InputData strings
const uniqueDimensions = {};

cases.forEach(item => {
    if (!item.InputData) return;
    
    const pairs = item.InputData.split(';');
    pairs.forEach(pair => {
        const [key, value] = pair.split(':').map(s => s.trim());
        if (key && value) {
            if (!uniqueDimensions[key]) {
                uniqueDimensions[key] = new Set();
            }
            uniqueDimensions[key].add(value);
        }
    });
});

// 3. Compute the true combinatorial math space dynamically
let theoreticalCombinations = 1;
console.log("\n=========================================");
console.log("📊 DYNAMIC QA MATRIX COVERAGE REPORT     ");
console.log("=========================================");
console.log("Detected Variable Permutation Axes:");

Object.keys(uniqueDimensions).forEach(axis => {
    const optionsCount = uniqueDimensions[axis].size;
    const optionsList = Array.from(uniqueDimensions[axis]).join(', ');
    console.log(` - ${axis} (${optionsCount} options): [${optionsList}]`);
    theoreticalCombinations *= optionsCount;
});

const totalGenerated = cases.length;
const coveragePercentage = ((totalGenerated / theoreticalCombinations) * 100).toFixed(2);

console.log("-----------------------------------------");
console.log(`Total Test Cases Generated : ${totalGenerated}`);
console.log(`Theoretical Max Grid Bounds: ${theoreticalCombinations}`);
console.log(`Calculated Matrix Coverage : ${coveragePercentage}%`);
console.log("=========================================\n");