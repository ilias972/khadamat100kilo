const fs = require('fs');
const path = require('path');

function updateUrlsInDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            updateUrlsInDirectory(fullPath);
        } else if (file.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const updatedContent = content.replace(/localhost:3001/g, 'localhost:3002');
            if (updatedContent !== content) {
                fs.writeFileSync(fullPath, updatedContent);
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

updateUrlsInDirectory('./tests');
console.log('URL update complete!');