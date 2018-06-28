
const app = getApp()
Page({
	data: {
		tempFilePaths: []
	},
	onLoad() {
	},
	update() {
		app.wechat.chooseImage().then(res => {
			let arr = [...this.data.tempFilePaths, ...res.tempFilePaths]
			this.setData({
				tempFilePaths: arr
			})
		}).catch(err => {
			console.log(err)
		})
	}
})