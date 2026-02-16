const fs = require('fs');

// Read the file
const content = fs.readFileSync('src/color_scheme.js', 'utf8');

// Extract the colorScheme object
const match = content.match(/const colorScheme = ({[\s\S]*?});/);
if (!match) {
    console.error('Could not find colorScheme object');
    process.exit(1);
}

const colorSchemeStr = match[1];
const colorScheme = eval('(' + colorSchemeStr + ')');

// Hex to HSL conversion function
function hexToHsl(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse RGB values
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;
    
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    // Convert to percentage and degrees
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return `hsl(${h}, ${s}%, ${l}%)`;
}

// Convert all colors
const convertedScheme = {};
for (const theme in colorScheme) {
    convertedScheme[theme] = {};
    for (const color in colorScheme[theme]) {
        convertedScheme[theme][color] = hexToHsl(colorScheme[theme][color]);
    }
}

// Output the result
console.log('const colorScheme = ' + JSON.stringify(convertedScheme, null, 4) + ';');
