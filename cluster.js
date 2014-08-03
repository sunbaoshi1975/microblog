/**
 * Created by sunboss on 2014/7/31.
 */
var cluster = require('cluster');
var os = require('os');

// 获取CPU数量
var numCPUs = os.cpus().length;

// 每个CPU一个工作进程
var workers = {};
if (cluster.isMaster) {
    // 主进程分支
    cluster.on('death', function(worker) {
        // 当一个进程结束时，重启工作进程，以保持进程数量不变
        delete workers[worker.pid];
        worker = cluster.fork();
        workers[worker.pid] = worker;
    });

    // 初始开启与CPU数量相同的工作进程
    console.log('There are %d CPU(s) in this server.', numCPUs);
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        workers[worker.pid] = worker;
    }
} else {
    // 工作进程分支
    var app = require('./app');
    app.listen(app.get('port'));
    console.log('Express server process id %d listening on port %d', process.pid, app.get('port'));
}

// 当主进程被终止时，关闭所有工作进程
process.on('SIGTERM', function() {
    for (var pid in workers) {
        process.kill(pid);
    }
    process.exit(0);
});