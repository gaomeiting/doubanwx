const app = getApp();
Page({
	data: {
		userInfo: null
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