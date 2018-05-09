const app=getApp()
Page({
	data: {},
	onLoad(options) {
		//const url = `celebrity/${options.id}`
		const url = `celebrity/1274297`
		console.log(url)
		this._ajaxCast(url)
	},
	_ajaxCast(url) {
		wx.showLoading({
			title:"正在加载中..."
		})
		app.douban.findOne(url).then(res => {
			this.setData({
				cast: res
			})
			wx.hideLoading()
			console.log(res)
		})
	}
})