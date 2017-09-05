import originJSONP from 'jsonp'
// jsonp的封装
export default function jsonp(url, data, option) {
  // 这是技巧性的东东，可以记下来
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((rsolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 这个方法的主要作用是将封装 jsonp函数的url和data拼接在一起
**/
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}