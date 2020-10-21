//https://serialport.io/docs/guide-about
//http://robotjs.io/docs/

//Communication with microbit through USB
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;

//Library to simulate key-presses when recieve event from microbit
var robot = require("robotjs");

//Define port
const port = new SerialPort('/dev/cu.usbmodem14102', {
 baudRate: 115200,
 autoOpen: false
});


const parser = new Readline();
port.pipe(parser);

port.open(function (err){
  if(err){
    return console.log('Error opening port: ', err.message);
  }
  port.write('main screen turn on');
});

port.on('open',() => {
    console.log("Connection to port successful");
    parser.on('data', (data) => {
      let checkedData = data.toString().replace(/\s+/g, "");
      console.log('Received Data: ' + checkedData);
      processData(checkedData);
    });
});

let toggleMic='OFF';
let toggleVideo='OFF';

function processData(checkedData) {
  console.log(toggleMic + toggleVideo);
    switch (checkedData) {
      case 'MICROPHONE':
        robot.keyTap("a", ["command", "shift"]);
        if (toggleMic === 'OFF'){
          toggleMic="ON";
          //port.write('ONAIR')
        } else {
          toggleMic="OFF";
          //port.write('OFFAIR')
        }
        console.log(checkedData + toggleMic);
        break;
      case 'VIDEO':
        robot.keyTap("v", ["command", "shift"]);
        if (toggleVideo === 'OFF'){
          toggleVideo="ON";
        } else {
          toggleVideo="OFF";
        }
        console.log(checkedData + toggleVideo);
        break;
    }
}
