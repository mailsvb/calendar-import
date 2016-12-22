var fs = require('fs');
var readline = require('readline');

var rd = readline.createInterface({
	input: fs.createReadStream('Geburtstage.csv'),
	output: process.stdout,
	terminal: false
});

var output = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\n';

rd.on('line', function(line) {
	var currentLine = line.toString('utf8').replace(/\054+$/, "").split(",");
	
	if (currentLine instanceof Array && currentLine.length == 3) {
		
		output += 'BEGIN:VEVENT\r\n';
		output += 'DTSTART;VALUE=DATE:2015' + currentLine[0] + currentLine[1] + '\r\n';
		output += 'RRULE:FREQ=YEARLY;WKST=MO\r\n';
		output += 'SUMMARY:Geburtstag ' + currentLine[2] + '\r\n';
		output += 'TRANSP:TRANSPARENT\r\nEND:VEVENT\r\n';
	}
});

rd.on('close', function(line) {
	output += 'END:VCALENDAR\r\n';
	fs.writeFileSync('Geburtstage.ics', output);
});
