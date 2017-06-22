# kbox-utils

A tiny utility for working with [Kalabox](https://kalabox.io/), [Pantheon](https://pantheon.io) and [SequelPro](https://www.sequelpro.com/).

Only runs on Mac OS X as relies on the `open` command line tool, sorry.

## Install

You'll need to install the tool globally so you can access it from your dev environemnts:

```
npm install -g git://github.com/mec/kbox-utils 
```

You might need sudo depending on your setup.

## Uninstall

```
npm uninstall -g kbox-utils
```

You might need sudo depending on your setup.

## Use

### open in browser via https

`kbox-util opens`

### open in browser via http

`kbox-util open`

### open database in SequelPro

`kbox connectdb`