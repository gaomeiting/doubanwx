const app=getApp();
Page({
	data: {
		currentPage: 1,
		more: false,
		movies: []
	},
	onLoad(options) {
		this.setData({
			url: options.key,
			title: options.title
		})
		this.search();
	},
	onReady() {
		const _this=this
		wx.setNavigationBarTitle({
			title: _this.data.title
		})
	},
	onReachBottom() {
		this.pullUp();
	},
	goMovieDetail(e) {
	    const movie= e.currentTarget.dataset.movie;
	    wx.navigateTo({
	      url: `../movie/movie?id=${movie.id}&title=${movie.title}`
	    })
	},
	search(e) {
		this.setData({
			currentPage: 1,
			more: true
		})
		app.douban.find(this.data.url, this.currentPage, 10).then(res => {
			const movies=this.data.movies.concat(res.subjects)
			this.setData({
				movies
			})
			this._hasMore(res.start, res.count, res.total)
		})
	},
	pullUp() {
		if(!this.data.more) return;
		const currentPage=this.data.currentPage+1;
		this.setData({
			currentPage
		})
		const value = this.data.inputValue;
		app.douban.find(this.data.url, this.data.currentPage, 10).then(res => {
			const movies=this.data.movies.concat(res.subjects)
			this.setData({
				movies
			})
			this._hasMore(res.start, res.count, res.total)
		})
	},
	_hasMore(start, count, total) {
		console.log(start+count<total, this.data.more)
		if(start+count < total) {
			this.setData({
				more: true
			})
		}
		else {
			this.setData({
				more: false
			})
		}
	}


})