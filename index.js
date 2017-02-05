var os = require("os");

function getInfo(callback){

    var initialMeasure = readTimes();

    setTimeout(function() { 

    var lastMeasure = readTimes(); 

    var usagePerCore= [];
    for(var i = 0; i < initialMeasure.length; i++){
        var sumDifference = lastMeasure[i].sum-initialMeasure[i].sum;
        var idleDifference = lastMeasure[i].idle-initialMeasure[i].idle;

        usagePerCore.push((1-(idleDifference/sumDifference))*100);
    }
    callback(usagePerCore);
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