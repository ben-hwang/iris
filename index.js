// setting up node server on localhost 8080
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.listen(port, () => { console.log('Server running 🤙') });


// calling python script from node
const spawn = require('child_process').spawn;

// function to call the script, promise because it takes a long ass time
function startPythonColor() {
    return new Promise(resolve => {
        const pythonColor = spawn('python',['color_ML3.py']);
        pythonColor.stdout.on('data', (data) => {
            // console.log(data.toString());
            resolve(data.toString());
        });
    })
}

// get request
app.get('/', async function (req, res) {
    result = await startPythonColor();
    res.send('The color you are most likely wearing is ' + result);
    console.log('color sent...')
});


// might be unecessary
app.post('/', function (req, res) {
    res.send('Hello World...POST request')
})