/*
 * fis3-postprocessor-html
 * fisker Cheung<lionkay@gmail.com>
 */

'use strict';

var jsbeautifier = require('js-beautify').html;


module.exports = function(options, modified, total, next) {
    modified.forEach(function(file) {
        if (file.isText() || typeof(file.getContent()) === 'string') {
            if(file.url.indexOf('.html')==-1)return;

            var content = file.getContent();

            var result = content;

            result = result
                .replace(/<!--\s([\s\S]*?)\s-->/g, '') //去掉页面注释
                .replace(/[^\S\r\n]+/g,' ')
                .replace(/([\s]*[\n][\s]*)+/g,'\n');
            result = jsbeautifier(result, options);

            file.setContent(result);
            if (result !== content) {
                console.log('formatter file [%s]', file);
            }
        }
    });
    next();
};
