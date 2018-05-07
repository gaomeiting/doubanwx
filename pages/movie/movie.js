//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		movie: null
	},
	onLoad(options) {
		const id = options.id || 26683723;
		this.setData({
			options: options
		})
		const url = `subject/${id}`
		this._ajaxMovie(url)
	},
	onReady() {
		const _this=this
		wx.setNavigationBarTitle({
			title: _this.data.options.title || "后来的我们"
		})
	},
	culScore(n) {
		const s=[]
		for(let i=0; i<5; i++) {
			if(i<n) {
				s.push('star_on')
			}
			else {
				s.push('star')
			}
		}
		return s;
	},
	_ajaxMovie(url) {
		wx.showLoading({
			title: "拼命加载中..."
		})
		app.douban.findOne(url).then(res => {
			const scores = app.douban.culScore(res.rating.average)
			const popularReviewsScores=res.popular_reviews.map(item => {
				return this.culScore(item.rating.value)
			})
			const popularCommentsScores=res.popular_comments.map(item => {
				return this.culScore(item.rating.value)
			})
			this.setData({
				movie: res,
				scores,
				reviewsScores: popularReviewsScores,
				commentsScores: popularCommentsScores,
			})
			wx.hideLoading()
		})
	}
})
