#! /usr/bin/env node

'use strict'
const exec = require('child_process').exec

const fs = require('fs')

// get the argument
let userArgs = process.argv.slice(2)
let action = userArgs[0]

if (!action) {
  console.error('kbox-util requires either open, opens or connectdb argument.')
  process.exit(1)
}

exec('kbox services', {
  cwd: process.cwd()
}, function (error, stdout, stderr) {
  if (error) {
    console.error('Something went wrong with kbox, are you in a Kalabox app environment?')
    process.exit(1)
  } else {
    // create array from JSON
    try {
      let services = JSON.parse(stdout)
      parseServices(services)
    } catch (e) {
      console.log('json error', e)
    }
  }
})

function parseServices (services) {
  if (services !== 'App is not running.') {
    // create some variables to holding our stuff
    let connection
    let webAddress
    let dbConnection
    // loop over the servies array and locate the db and web items
    services.forEach(function (item, index, services) {
      if (item.name === 'db') { dbConnection = services[index] }
      if (item.name === 'web') { webAddress = services[index] }
    })
    // create object with our data
    connection = {
      'web': {
        'secure': webAddress.url[1],
        'insecure': webAddress.url[0]
      },
      'db': dbConnection.external_connection_info
    }
    switch (action) {
      case 'opens':
        openInBrowser(connection, true)
        break
      case 'open':
        openInBrowser(connection, false)
        break
      case 'connectdb':
        createSequelProDoc(connection)
        break
      default:
        console.error("Sorry, I don't know how to '" + action + "''")
    }
  } else {
    console.error('Could not read kbox services, are you in a running Kalabox app environment?')
    process.exit(1)
  }
}

function openInBrowser (connection, secure) {
  if (!connection.web) {
    console.error('Could not find web settings, check kbox services?')
    process.exit(1)
  } else {
    if (secure) {
      exec('open ' + connection.web.secure)
    } else {
      exec('open ' + connection.web.insecure)
    }
  }
}

function createSequelProDoc (connection) {
  if (!connection.db) {
    console.error('Could not find database settings, check kbox services?')
    process.exit(1)
  } else {
    const sequelProDoc = `
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
      <key>ContentFilters</key>
      <dict/>
      <key>auto_connect</key>
      <true/>
      <key>data</key>
      <dict>
          <key>connection</key>
          <dict>
              <key>database</key>
              <string>${connection.db.database}</string>
              <key>host</key>
              <string>${connection.db.host}</string>
              <key>password</key>
              <string>${connection.db.password}</string>
              <key>port</key>
              <integer>${connection.db.port}</integer>
              <key>rdbms_type</key>
              <string>mysql</string>
              <key>sslCACertFileLocation</key>
              <string></string>
              <key>sslCACertFileLocationEnabled</key>
              <integer>0</integer>
              <key>sslCertificateFileLocation</key>
              <string></string>
              <key>sslCertificateFileLocationEnabled</key>
              <integer>0</integer>
              <key>sslKeyFileLocation</key>
              <string></string>
              <key>sslKeyFileLocationEnabled</key>
              <integer>0</integer>
              <key>type</key>
              <string>SPTCPIPConnection</string>
              <key>useSSL</key>
              <integer>0</integer>
              <key>user</key>
              <string>${connection.db.user}</string>
          </dict>
      </dict>
      <key>encrypted</key>
      <false/>
      <key>format</key>
      <string>connection</string>
      <key>queryFavorites</key>
      <array/>
      <key>queryHistory</key>
      <array/>
      <key>rdbms_type</key>
      <string>mysql</string>
      <key>rdbms_version</key>
      <string>5.5.44</string>
      <key>version</key>
      <integer>1</integer>
    </dict>
    </plist>
    `
    fs.writeFile('/tmp/connect.spf', sequelProDoc, function (err) {
      if (err) return console.error(err)
      else {
        exec('open /tmp/connect.spf')
      }
    })
  }
}
