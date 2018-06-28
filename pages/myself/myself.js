const app = getApp();
Page({
	data: {
		userInfo: null,
		icons: [
			{name: "收藏"},
			{name: "浏览记录"},
			{name: "摇一摇"},
			{name: "相册"},
			{name: "设置"}
		]
	},
	onLoad() {
		const _this=this;
		wx.getSetting({
			success(res) {
				if(!res.authSetting['scope.userInfo']) {
					wx.authorize({
						scope: 'scope.userInfo',
						success(res) {
							_this._getUserInfo()
						},
						fail() {
							wx.openSetting({
								success(res) {
									res.authSetting = {
										"scope.userInfo" : true
									}
								}
							})
						}
					})
				}
				else {
					_this._getUserInfo()
				}
				
			}
		})
	},
	switchNav(e) {
		let index = e.currentTarget.dataset.index;
		switch(index) {
			case 0:
				wx.navigateTo({
					url: "../loves/loves"
				})
			break;
			case 1:
			break;
			case 2:
			break;
			case 3:
				wx.navigateTo({
					url: "../pictures/pictures"
				})
			break;
			case 4:
			break;
		}
	},
	_getUserInfo() {
		app.wechat.getUserInfo().then(res => {
			const userInfo = JSON.parse(res.rawData)
			this.setData({
				userInfo
			})
		}).catch(err => {
			console.log(err)
		})
	}
})