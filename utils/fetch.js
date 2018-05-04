module.exports = function fetch(baseUrl,path,params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}/${path}`,
      data: params,
      header: {'Content-type' : 'json'},
      success: resolve,
      fail: reject
    })
  })
}

