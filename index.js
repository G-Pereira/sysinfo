var os = require("os");

var systemUsage= {
        cpu: [],
        memory: {
            free: 0,
            total: 0
        },
        uptime: 0
    }

function getInfo(callback){

    // CPU
    var initialMeasure = readTimes();

    setTimeout(function() { 

    var lastMeasure = readTimes(); 

    for(var i = 0; i < initialMeasure.length; i++){
        var sumDifference = lastMeasure[i].sum-initialMeasure[i].sum;
        var idleDifference = lastMeasure[i].idle-initialMeasure[i].idle;

        systemUsage.cpu.push((1-(idleDifference/sumDifference))*100);
    }

    // RAM
    systemUsage.memory.free = os.freemem();
    systemUsage.memory.total = os.totalmem();

    // UPTIME
    systemUsage.uptime = os.uptime();

    callback(systemUsage);
    }, 1000);
}

function readTimes(){
    var cpus = os.cpus();
    var timePerCore = [];

    cpus.forEach(function(cpu){
        var sum = 0;
        for(type in cpu.times) {
            sum += cpu.times[type];
        }
        
        timePerCore.push({
            idle: cpu.times.idle,
            sum: sum
        });
    });
    return timePerCore;
}

getInfo(function(result){
    console.log(result)
})