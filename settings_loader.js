var ini = require("ini");
var fs = require("fs");

function getConfig() {
    var path_local = '';
    var path_default = '';
    if(process.platform == 'win32'){
        path_local = process.env['USERPROFILE'] + "\\Documents\\My Games\\OpenMW";
        path_default = '..\\tes3mp-client-default.cfg';
    }
    else {
        path_local = process.env['HOME'] + '/.config/openmw/tes3mp-client.cfg';
        path_default = '/etc/openmw/tes3mp-client-default.cfg';
    }

    try {
        fs.accessSync(path_local, fs.F_OK);
        return path_local;
    }
    catch (err){
        fs.accessSync(path_default, fs.F_OK);
        return path_default;
    }
}

var file = fs.readFileSync(getConfig(), 'utf-8');

var config = ini.parse(file);

var settings = {};

settings.getMasterAddr = function() {
    return config.Master.address;
};

exports.settings = settings;