/**
* 用于书写url后面跟的query值，一般很多值是固定的，所以可以写一个config.js用于存放固定的通用参数
**/

export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

/**
* 这个是定义返回值返回的固定参数
**/

export const options = {
  param: 'jsonpCallback'
}

/**
*
**/

export const ERR_OK = 0