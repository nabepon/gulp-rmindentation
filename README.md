## Description

remove indent and CRLF for html strings.

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-rmindentation`

## Description

Htmlのインデントや改行で、不要なスペースができるのを解消します。
行頭の半角スペース、全角スペース、タブ文字、および行末の改行を削除します。

```html
<div>
  <span> </span>
  <span> </span>
</div>
```
↓
```html
<div><span> </span><span> </span></div>
```


## Information

<table>
<tr>
<td>Package</td><td>gulp-rmindent</td>
</tr>
<tr>
<td>Description</td>
<td>remove indent and CRLF for html strings</td>
</tr>
<tr>
</tr>
</table>

## Usage

```js
var rmindentation = require('gulp-rmindentation');

gulp.task('scripts', function() {
  return gulp.src('./src/*.html')
    .pipe(rmindentation())
    .pipe(gulp.dest('./dist/'));
});
```

