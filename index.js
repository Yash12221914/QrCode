/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import express from 'express'
import fs from 'fs';
import qr from 'qr-image';

const app = express();
const port = 3000;


inquirer
  .prompt([
    {message:"Type in your Url",name:"URL",},
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("mahi.png"));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

app.listen(port,() => {
  console.log( `listening on port ${port}`);
})


