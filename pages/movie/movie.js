//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		movie: null
	},
	onLoad(options) {
		const id = options.id;
		this.setData({
			options: options
		})
		const url = `subject/${id}`
		this._ajaxMovie(url)
	},
	onReady() {
		const _this=this
		wx.setNavigationBarTitle({
			title: _this.data.options.title
		})
	},
	_ajaxMovie(url) {
		wx.showLoading({
			title: "拼命加载中..."
		})
		app.douban.findOne(url).then(res => {
			this.setData({
				movie: res
			})
			wx.hideLoading()
		})
	}
})
