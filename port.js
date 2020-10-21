// Check Serial Port

const serialPort = require("serialport");

serialPort.list(async function (err, ports) {
    ports.forEach(function(port) {
        console.log(port.comName);
        console.log(port.pnpId);
    });
});
