# javascript-starter

It's a starter "theme" for writing Javascript for your project,
it's partially written in ES6 (use babel to compile into ES5)
Please use grunt to compile, minimize and uglify.

(Scroll Controller uses the Observer pattern)


Grunt snippets:

var jsVendorList = [
    'assets/js/vendor/jquery/jquery.min.js'
];

// IMPORTANT this is the structor of includes, that will be compiled to the script file
// if you don't wanna use grunt, you can still use this structure and just concat and minify
var jsFileList = [
    'assets/js/custom-plugins/_*.js',
    'assets/js/modules/*.js',
    'assets/js/apps/*.js',
    'assets/js/_*.js',
];



concat: {
    options: {
        separator: ';'
    },
    dist: {
        src: [jsVendorList, jsFileList],
        dest: 'assets/js/scripts.js'
    },
},
uglify: {
    options: {
        compress: {
            drop_console: true
        }
    },
    my_target: {
        files: {
            'assets/js/scripts.min.js': ['assets/js/scripts.js']
        }
    }
},


babel: {
    options: {
        compact : true
    },
    dist: {
        files: {
            'assets/js/scripts_es5.js' : 'assets/js/scripts.js'
        }
    }
},
