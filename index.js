const os = require("os");

let systemUsage= {
        cpu: [],
        memory: {
            free: 0,
            total: 0
        },
        uptime: 0
    }

function read(callback){

    // CPU
    let initialMeasure = readTimes();

    setTimeout(function() { 

    let lastMeasure = readTimes(); 

    for(let i = 0; i < initialMeasure.length; i++){
        let sumDifference = lastMeasure[i].sum-initialMeasure[i].sum;
        let idleDifference = lastMeasure[i].idle-initialMeasure[i].idle;

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
    let cpus = os.cpus();
    let timePerCore = [];

    cpus.forEach(function(cpu){
        let sum = 0;
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

read(function(result){
    var cpu = result.cpu;
    var freeMemory = result.memory.free;
    var totalMemory = result.memory.total;
    var uptime = result.uptime;
console.log(result);
})

module.exports = read;