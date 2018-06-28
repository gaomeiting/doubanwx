
const app = getApp()
Page({
	data: {
		movies: null
	},
	onLoad() {
		app.douban.getStorage_('loves').then(res => {
			this.setData({
				movies: res.vals
			})
		})
	}
})