const https = require('https');
const fs = require('fs');

// URL for the Cypress .gitignore template (from GitHub)
const gitignoreUrl = 'https://raw.githubusercontent.com/github/gitignore/master/Cypress.gitignore';

// Download and save the .gitignore file
https.get(gitignoreUrl, (res) => {
    const fileStream = fs.createWriteStream('.gitignore');
    res.pipe(fileStream);
    fileStream.on('finish', () => {
        console.log('.gitignore file created successfully!');
    });
}).on('error', (err) => {
    console.log('Error fetching .gitignore:', err.message);
});
