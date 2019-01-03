# gulp-starter-kit

If you want to know how to build that kind of startet kit you can watch the YouTube videos I created while working on this starter kit: https://goo.gl/sMFmyN (Note: Videos are in Polish).

## Prerequisites

1. Node.js + npm
2. Gulp installed globally: `npm install gulp --global`
3. __Windows users__: Windows Build Tools: `npm install --global --production windows-build-tools`. Make sure to run this as an administrator.

## Usage

### 1. Clone repo
```
git clone https://github.com/marcinkrzeminski/gulp-starter-kit.git
```

### 2. Go inside cloned repo
```
cd gulp-starter-kit
```

### 3. Install all dependencies (make sure nodejs with npm is installed on your machine)
```
npm install
```

### 4. Run default gulp task (will open browser window with live reload)
```
gulp
```

## Build 

In order to build the production version of your project run __gulp build__ from the root of cloned repo.

## List of npm packages used

- gulp
- browser-sync
- gulp-sass
- gulp-sourcemaps
- gulp-autoprefixer
- gulp-clean-css
- gulp-uglify
- gulp-concat
- gulp-imagemin
- gulp-changed
- gulp-html-replace
- gulp-htlmin
- del
- run-sequence

Big thanks to all the authors of these packages :heart:
