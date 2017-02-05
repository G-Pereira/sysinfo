#SysInfo

## Installation

Simply:
```bash
 npm install --save sysinfo
```
## Usage

```js
var sysinfo = require("sysinfo");

sysinfo.getInfo(function(result){
    var cpu = result.cpu;
    var freeMemory = result.memory.free;
    var totalMemory = result.memory.total;
    var uptime = result.uptime;
})
```

## Features

 * CPU load on each core independently
 * Free and total RAM available 
 * Uptime

## Measurements precision

 * CPU - Percentage with 16 decimal places
 * RAM - Bytes
 * Uptime - Seconds