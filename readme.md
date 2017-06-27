# kbox-utils

A tiny utility for working with [Kalabox](https://kalabox.io/), [Pantheon](https://pantheon.io) and [SequelPro](https://www.sequelpro.com/).

Only runs on Mac OS X as relies on the `open` command line tool, sorry.

## Install

You'll need to install the tool globally so you can access it from your dev environments:

```
npm install -g https://github.com/mec/kbox-utils
```

You might need sudo depending on your setup.

## Uninstall

```
npm uninstall -g kbox-utils
```

You might need sudo depending on your setup.

## Use

The idea is to stop you having to copy and paste the various bits of config info out of the kbox services response, you can:

### open in browser via https

`kbox-utils opens`

### open in browser via http

`kbox-utils open`

### open database in SequelPro

`kbox-utils opendb`
