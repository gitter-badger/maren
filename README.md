# Maren

Theme based markdown renderer.

## Installation

```
npm i -g maren
```

## CLI

```
# Commands
maren init
maren watch [--once]
maren serve [--port]

# Commands provided by maren-s3
maren upload <bucket>
  [--themes]
  [--images]
  [--html]
  [--dryrun]
```

## Folder structure

```
# Created by maren watch
/_build

/documents
/draft
/images
/themes

maren.json
package-lock.json
package.json
```

## Documents, Draft

```
/documents
  /article-a/index.md
  /article-b/index.md
  /article-c/index.md
  index.md
  404.md

/draft
  /not-ready-article-a/index.md
  /not-ready-article-b/index.md
  /not-ready-article-c/index.md
```

## Themes

```
/themes
  /default
    # Required
    template.js

    # Optional
    options.js
    styles.min.css
    scripts.min.js
    scripts.min.js.map

    # Optional other
    package-lock.json
    package.json
```

## Build

```
/_build
  /article-a/index.html
  /article-b/index.html
  /article-c/index.html
  index.html
  404.html

  /images
  /themes
    /default
      styles-MD5SUM.css
      scripts-MD5SUM.js
```

# maren.json

```json
{
  "theme": "my-theme",
  "plugins": [
    "maren-s3"
  ]
}
```

If `theme` not specified, `default` is used.

# Code

```js
const maren = require('maren');

console.log(maren);

/*
{
  themes: [Function],
  render: [AsyncFunction]
}
*/
```
