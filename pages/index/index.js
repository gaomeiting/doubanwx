//index.js
//获取应用实例
const app = getApp()
Page({
	data: {
		subjects: [],
		loading: true
	},
	onLoad() {
		const url = "coming_soon";
		app.douban.find(url,1,3).then(res=>{
			this.setData({
				subjects: res.subjects,
				loading: false
			})
		})

	},
	redirectHome() {
		wx.switchTab({
		  url: '../home/home'
		})
	}
})
