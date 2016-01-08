/**
 * https://github.com/oskarjakiela/gulp-gulp
 */

(function () {
    'use strict';

    var gutil = require('gulp-util'),
        map = require('map-stream'),
        path = require('path'),
        spawn = require('child_process').spawn;

    var plugin = {
        name: 'gulp-spawn-gulp'
    };

    module.exports = function (options) {
        options = typeof options === 'undefined' ? {} : options;

        var gulpPath = path.join(__dirname, 'node_modules', '.bin');

        var tasks = 'tasks' in options ? options.tasks : [];
        var tasksArgv = process.argv.indexOf('--tasks');

        if (tasksArgv > -1) {
            tasks = process.argv.slice(tasksArgv + 1, process.argv.length);
        }

        tasks = tasks.filter(function(task) {
            return !!task;
        });

        process.env.PATH += ':' + gulpPath;

        return map(function (file, cb) {
            var command = 'gulp',
                opts = {
                    env: process.env,
                    stdio: 'inherit'
                },
                args = [
                    '--gulpfile=' + file.path,
                ].concat(tasks),
                gulpSpawn;

            gulpSpawn = spawn(command, args, opts);

            gulpSpawn.on('close', function (code) {
                var error;

                if (code && 65 !== code) {
                    error = new gutil.PluginError(plugin.name, plugin.name + ': returned ' + code);
                }

                cb(error, file);
            });
        });
    };
}());