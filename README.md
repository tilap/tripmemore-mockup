# Gulppage

**Gulppage** serve static files (html, css, js) based on compiled sources. It is built over gulp and provides a quick 
and easy environment for building static pages from scratch.

It provides a large features and options to make page dev quick: less  compilation, javascript browerification, vendor 
management, fontello integration and much more. An effort has been done on log too, in order to provide quick debug if 
needed.

It also comes with an export command. So once your dev is ok, you can export the result easily in a tarball and put it 
on a server.

For any bug or feature query, please report to the [github project](https://github.com/tilap/gulppage/issues)

## Features

- **html**:
    - linter: [htmlhint](https://www.npmjs.org/package/gulp-htmlhint), with your own custom options (see 
    [options](https://github.com/yaniswang/HTMLHint/wiki/Rules) for more details).
    - compilation:
        - [usemin](https://github.com/zont/gulp-usemin) allow you concat and easily embed vendor javascript, css or 
        external html;
        - minification with [htmlmin](https://github.com/bezoerb/gulp-htmlhint), with your own cutom options (see 
        [options](https://github.com/kangax/html-minifier) for more details);
        - [file include](https://github.com/coderhaoxin/gulp-file-include) to get basic html includes or templating.
- **js**:
    - linter: [jsHint](https://github.com/spenceralger/gulp-jshint) based on the .jshintrc project file and/or custom 
    options.
    - compilation:
        - [browserify](https://github.com/deepak1556/gulp-browserify), the magic javascript include way;
        - [uglify](https://github.com/terinjokes/gulp-uglify) to make it lighter;
- **less**:
    - linter: [recess](https://github.com/sindresorhus/gulp-recess)
    - compilation:
        - [less compilation](https://github.com/plus3network/gulp-less);
- **assets**:
    - [optimization of your images](https://github.com/sindresorhus/gulp-imagemin)
- **icons**
    - command line to open and select your [fontello](https://github.com/fontello/fontello) icon set, and once done, to 
    import and save it locally.
- **livereload**:
    All the task for Javascript, Css, Html or assets comes with livereload option, so you can dev fast
- **project reseting**:
    - a gulp task allow you to clean up all the generated files fast;
- **gulpfile**:
    - autorestart server when changed

## Install

To install in a "mylanding" folder, use shell command and run:

```
git clone https://github.com/tilap/gulppage.git mylanding
cd mylanding
make install
```

## Running

All the common run task comes with ```make``` and package the gulp task in order.

_note_: Take care to avoid folder with the same name as main args, ie "install", "update", "reset", "watch", "export", 
"fontgettoken", "fontopenmac", "fontopenlinux", "fontsave"

### Make update

Update the packages dependancies, both bower and npm. Clean the old ones and install the new ones (prune).

### Make reset

Delete the compiled files and the installed bower/npm packages. You can then rerun ```make install``` to restart a new
project.

### Make watch

Build the initial sources and start watching all the source for livereloading.

### Make export

Rebuild clean output and make a tarball.

### Fonticon management

```make fonopenmac```  and ```make fonopenlinux``` open the fonticon set in your browser. You can thus edit all you need
and save the session directly on your browser. THen run ```make fontsave```in your term, and the new font package will 
be importer. If you host your own fontelle server, edit the makefile option.

## Sample / Demo

If you wanna see a basic usage sample, run the project by with src-sample (remove src folder and rename src-sample to src, or edit the config.js file). You'll have a really basic example with less working (bootstrap integration), browserify, a stupid image asset and an icon. You can sse the result on [this page](http://tilap.github.io/gulppage/).

## Tip's

- By using usemin plugin over your css/js compiled files, you automatically have file revision, so no fucking browser 
cache problem;
- With fontello, you can use your own fonticon / svg by importing them and keep track easily;
- take care of keeping fonticon css file (or any file using css import) out of usemin to avoid import breakings;
- If you work on email templating, modify the gulpfile to use [gulp inline css](https://github.com/jonkemp/gulp-inline-css) plugin. I'll maybe do a branch or another repo for that
kind of work.

## LICENCE

Project released under [MIT licence](https://raw.githubusercontent.com/tilap/gulppage/master/LICENCE).
