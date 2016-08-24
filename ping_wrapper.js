var ping_wrapper = {};

var create_process = require("child_process");
var os = require("os");

ping_wrapper.avg = function(addr, count, callback) {
    var avg = -1;
    var child;

    if(typeof count != "number")
        throw "count should be a number";

    if(os.platform() != "win32") {
        child = create_process.exec("ping -c" + count.toString() + " " + addr, function (error, stdout, stderr) {
            if(error != null)
                callback(avg);
            var strs = stdout.split("\n");
            avg = strs[strs.length - 2].substr(strs[strs.length - 2].search('= ') + 2);
            avg = Number(avg.substr(0, avg.length - 3).split('/')[1]);
            callback(avg);
        });
    }
    else
    {
        child = create_process.exec("ping -n" + count.toString() + " " + addr, function (error, stdout, stderr) {
            if(error != null)
                callback(avg);
            var strs = stdout.split("\r\n");
            avg = strs[strs.length - 2].substr(strs[strs.length -2]).split(" = ");
            avg = avg[avg.length - 1];
            avg = Number(avg.substr(0, avg.length - 2));
            callback(avg);
        });
    }
};

module.exports = ping_wrapper;