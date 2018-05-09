//index.js
//获取应用实例
const app = getApp()
import {CulScore} from "../../utils/movie"
Page({
	data: {
		movie: null,
		ellipsis: 'ellipsis'
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
	showall() {
		const ellipsis = !this.data.ellipsis ? 'ellipsis' : '';
		this.setData({
			ellipsis
		})
	},
	_ajaxMovie(url) {
		wx.showLoading({
			title: "拼命加载中..."
		})
		app.douban.findOne(url).then(res => {
			let reviews = res.popular_reviews
			let comments = res.popular_comments
			const score = CulScore(res.rating.average, res.rating.max)
			const popularReviewsScores=reviews.map(item => {
				return CulScore(item.rating.value, item.rating.max)
			})
			const popularCommentsScores=comments.map(item => {
				return CulScore(item.rating.value, item.rating.max)
			})
			const casts = res.directors.concat(res.casts)
			this.setData({
				movie: res,
				score,
				reviewsScores: popularReviewsScores,
				commentsScores: popularCommentsScores,
				casts
			})
			wx.hideLoading()
		})
	}
})
