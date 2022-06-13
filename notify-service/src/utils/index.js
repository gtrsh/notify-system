import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const unwrap = (arr) => arr[0]

function urlDirname (url) {
  return dirname(fileURLToPath(url))
}

function urlJoin (url, ...str) {
  return join(urlDirname(url), ...str)
}

export default urlDirname

export {
  unwrap,
  fileURLToPath as filename,
  urlJoin as join,
  urlDirname as dirname
}
