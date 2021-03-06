#!/usr/bin/env node

const colors = require('colors')
const jsome = require('jsome')
const jsonic = require('jsonic')
const os = require('os')
const qs = require('qs')
const readline = require('readline')
const rlv = require('readline-vim')
const request = require('syncrequest')
const storage = require('node-persist')
const sync = require('sync')
const url = require('url')
const util = require('util')

setTerminalTitle('httpcli')

// Init persistent data
storage.initSync({
  dir: os.homedir() + '/.httpcli'
})

// Configuration
const useVi = true
const defaultURI = 'http://localhost/'

jsome.colors = {
  num: 'white',
  str: 'magenta',
  bool: 'cyan',
  regex: 'cyan',
  undef: 'grey',
  null: 'grey',
  attr: 'cyan',
  quot: 'magenta',
  punc: 'white',
  brack: 'white'
}

// Create the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: completer
})

// Use Vi if enabled
if (useVi) {
  rlv(rl)
}

const methods = [
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS'
]

let uri = (() => {
  const argument = process.argv[process.execArgv.length + 2]
  const storedURI = storage.getItemSync('uri')

  if (argument) {
    return url.resolve(defaultURI, argument || '')
  }
  else if (storedURI) {
    return storedURI
  }
  else {
    return defaultURI
  }
})()

const jar = request.jar()
let persistentCookies = {}
let persistentData = {}
let persistentQuery = {}
let persistentHeaders = {}
let alwaysPrintRequest = false

setPrompt()

/*
 * Main loop, handle user input
 */
rl.on('line', (input) => {
  rl.pause()

  let args = input.split(' ') // parse(input)
  let headerOnly = false
  let bodyOnly = false
  let data = ''
  let headers = {}
  let query = ''
  let contentType = 'application/json'
  let requestMethod
  let requestURI = uri
  let printRequest = alwaysPrintRequest
  let requestCookies = []

  // Check if the first argument is a request method
  if (args[0]) {
    if (methods.indexOf(args[0].toUpperCase()) != -1) {
      requestMethod = args[0].toUpperCase()
      args = args.slice(1)
    }
  }

  // Determine there is a URI or options to handle
  if (args[0]) {

    // Handle options
    let index = 0 // index of the value, not the name
    let setPersistentCookies = false
    let setPersistentData = false
    let setPersistentQuery = false
    let setPersistentHeaders = false

    args.forEach((arg) => {
      index++

      // parse argument value
      const pieces = []
      for (let subIndex = index; subIndex < args.length; subIndex++) {
        if (args[subIndex].indexOf('-') == 0) {
          break
        }
        pieces.push(args[subIndex])
      }
      const value = pieces.join(' ')
      const combinedObject = {}

      switch (arg) {
        case '--rm-stored':
        case '-r':
          persistentCookies = {}
          persistentData = {}
          persistentQuery = {}
          persistentHeaders = {}
          alwaysPrintRequest = false
          break

        case '--store-cookie':
        case '-C':
          setPersistentCookies = true

        case '-c':
        case '-cookie':
          requestCookies = jason(value)
          if (setPersistentCookies) {
            persistentCookies = requestCookies
          }
          break

        case '--store-data':
        case '-D':
          setPersistentData = true

        case '--data':
        case '-d':
          const inputData = jason(value)
          Object.assign(combinedObject, persistentData, inputData)
          data = JSON.stringify(combinedObject)
          if (setPersistentData) {
            persistentData = combinedObject
          }
          break

        case '--store-query':
        case '-Q':
          setPersistentQuery = true

        case '--query':
        case '-q':
          const inputQuery = jason(value)
          Object.assign(combinedObject, persistentQuery, inputQuery)
          query = '?' + qs.stringify(combinedObject)
          if (setPersistentQuery) {
            persistentQuery = combinedObject
          }
          break

        case '--store-header':
        case '-H':
          setPersistentHeaders = true

        case '--header':
        case '-h':
          const inputHeaders = jason(value)
          Object.assign(headers, persistentHeaders, inputHeaders)
          if (setPersistentHeaders) {
            persistentHeaders = headers
          }
          break

        case '--body-only':
        case '-b':
          bodyOnly = true
          break

        case '--no-body':
        case '-B':
          headerOnly = true
          break

        case '--always-verbose':
        case '-V':
          alwaysPrintRequest = true

        case '--verbose':
        case '-v':
          printRequest = true
          break
      }
    })

    // Set the URI if the first parameter (after the request method) is not an option
    if (args[0][0] != '-') {
      requestURI = url.resolve(uri + (uri[uri.length - 1] == '/' ? '' : '/'), args[0])
      if (!requestMethod) {
        uri = url.format(requestURI.substring(0, requestURI[requestURI.length - 1] == '/' ? requestURI.length - 1 : requestURI.length))
      }
    }
  }

  // Execute a request
  if (requestMethod) {

    const requestHeaders = Object.assign({
      'Content-Type': contentType,
      'Cookie': jar.getCookieString(requestURI)
    }, headers)

    if (persistentCookies) {
      Object.assign(requestCookies, persistentCookies)
    }

    if (requestCookies) {
      const requestCookieString = Object.keys(requestCookies)
                                  .map(key => key + '=' + requestCookies[key])
                                  .join('; ')

      if (requestHeaders.Cookie) {
        requestHeaders.Cookie += '; '
        requestHeaders.Cookie += requestCookieString
      }
      else {
        requestHeaders.Cookie = requestCookieString
      }
    }

    if (printRequest) {
      console.log(
        colors.cyan(requestMethod) + ' ' + colors.white(requestURI + query)
      )

      const longest = Object.keys(requestHeaders).sort((a, b) => { return b.length - a.length })[0].length

      for (field in requestHeaders) {
        const words = field.split('-')
        const newWords = []

        // Capitalize field names
        words.forEach((word) => {
          newWords.push(word[0].toUpperCase() + word.substr(1))
        })

        const prettyName = newWords.join('-')

        console.log(
          colors.cyan(prettyName) +
          colors.white(': ') +
          ' '.repeat(longest - prettyName.length) + // Align values
          requestHeaders[field]
        )
      }

      console.log()
    }

    // Sync request
    const response = request.sync({
      method: requestMethod,
      uri: requestURI + query,
      jar: jar,
      headers: requestHeaders,
      body: data
    })

    if (!response.error) {

      // Store cookies in the jar
      if (response.response.headers['set-cookie']) {
        response.response.headers['set-cookie'].forEach((cookie) => {
          jar.setCookie(request.cookie(cookie), uri)
        })
      }

      // Output response headers
      const headers = response.response.headers
      const longest = Object.keys(headers).sort((a, b) => { return b.length - a.length })[0].length

      if (!bodyOnly || headerOnly) {

        // Output status line
        const success = String(response.response.statusCode)[0] == '2'

        console.log(colors.cyan('HTTP')
                    + '/'
                    + colors.cyan(response.response.httpVersion)
                    + ' '
                    + (success ? colors.green : colors.red)(
                        response.response.statusCode + ' ' +
                        response.response.statusMessage))

        for (const field in headers) {
          const words = field.split('-')
          const newWords = []

          // Capitalize field names
          words.forEach((word) => {
            newWords.push(word[0].toUpperCase() + word.substr(1))
          })

          const prettyName = newWords.join('-')

          console.log(
            colors.cyan(prettyName) +
            ': ' +
            ' '.repeat(longest - prettyName.length) + // Align values
            headers[field]
          )
        }

        console.log() // Newline after headers
      }

      // Output response body
      if ((bodyOnly || !headerOnly) && response.body) {
        const body = response.body.replace(/^\s+|\s+$/g, '')

        try {
          JSON.parse(body)
          formatJSON(body)
        } catch(e) {
          console.log(body)
        }

        console.log() // Newline after body
      }
    }
  }

  setPrompt()
})

/*
 * Save information and exit
 */
rl.on('SIGINT', () => {
  console.log() // Print newline before exiting
  storage.setItemSync('uri', uri)
  process.exit()
})

/*
 * Sets the readline prompt
 */
function setPrompt() {
  rl.setPrompt(
    colors.white(uri) + ' '
  )

  rl.prompt()
}

/*
 * Prints a formatted JSON object
 */
function formatJSON(input) {
  jsome.parse(input)
}

/*
 * Completion function for the readline interface
 */
function completer(line) {
  const arg = line.split(' ').pop()

  let completions

  if (arg == line) {
    if (!line) {
      completions = methods
    }
    else {
      completions = methods.concat(methods.join('|').toLowerCase().split('|'))
    }
  }
  else {
    completions = [
      '--cookie', '-c',
      '--data', '-d',
      '--header', '-h',
      '--query', '-q',
      '--store-cookie', '-C',
      '--store-data', '-D',
      '--store-header', '-H',
      '--store-query', '-Q',
      '--body-only',
      '--header-only',
      '--print-request', '-p',
      '--always-print-request', '-P',
      '--rm-persistent', '-r',
    ]
  }

  const hits = completions.filter((c) => {
    if (c.indexOf(arg) == 0) {
      return c
    }
  })

  if (hits.length == 1 && arg == hits[0]) {
    return []
  }

  return [hits, arg]
}

function setTerminalTitle(title) {
  process.stdout.write(
    String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
  );
}

/*
 * Converts a loosely formatted input string into a JSON object.
 */
function jason(input) {
  let output = '{'
  let singleQuotes = false
  let doubleQuotes = false

  input.split('').forEach((char, pos) => {
    char = char == '=' && !singleQuotes && !doubleQuotes ? ':' : char // replace = with :

    // add commas
    if (!singleQuotes && !doubleQuotes && char == ' ' && input[pos - 1] != ',') {
      if (output[output.length - 1] != ',') {
        char = ','
      }
    }

    // handle single/double quotes escaping
    if (singleQuotes && char == '\\' && input[pos + 1] == "'") {
      char = ''
    }

    if (singleQuotes && char == '"') {
      output += '\\'
    }

    if (char == '"' && input[pos - 1] != '\\' && !singleQuotes) {
      doubleQuotes = !doubleQuotes
    }

    if (char == "'" && input[pos - 1] != '\\' && !doubleQuotes) {
      singleQuotes = !singleQuotes
      char = '"'
    }

    output += char
  })

  return jsonic(output + '}')
}
