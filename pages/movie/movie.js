//index.js
//获取应用实例
const app = getApp()
import {CulScore, CreateMovie} from "../../utils/movie"
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
		this._ajaxMovie(url);
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
	switchLove() {
		let flag = !this.data.flag
		this.setData({
			flag
		})
		const id = this.data.movie.id;
		app.douban.getStorage_("loves", id).then(res => {
			let {index, vals} = res
			if(this.data.flag) {
				vals.unshift(CreateMovie(this.data.movie))
			}
			else {
				vals.splice(index, 1)
			};
			app.wechat.setStorage("loves", vals)
		})
		
	},
	priviewImage(e) {
		let index = e.currentTarget.dataset.index;
		let casts = e.currentTarget.dataset.casts;
		let arr = [];
		casts.forEach(cast => {
			arr.push(cast.avatars.large)
		})
		app.wechat.previewImage(arr[index], arr).then(res => {
			console.log(res)
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
			app.douban.getStorage_("loves", res.id).then(res => {
				this.setData({
					flag: res.index === -1 ? false : true
				})
				
			})
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
