const app=getApp();
Page({
	data: {
		inputValue: "",
		currentPage: 1,
		more: false,
		movies: []
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
		const value = e.detail.value;
		this.setData({
			currentPage: 1,
			more: true,
			inputValue: value
		})
		app.douban.find("search", this.currentPage, 10, value).then(res => {
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
		console.log(currentPage)
		this.setData({
			currentPage
		})
		const value = this.data.inputValue;
		app.douban.find("search", this.data.currentPage, 10, value).then(res => {
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