//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  	boards: [
  		{key: 'in_theaters'},
  		{key: 'coming_soon'},
  		{key: 'new_movies'},
  		{key: 'top250'}
  	]
  },
  onLoad() {
  	this._ajaxData();
  },
  culScore(n) {
    const s=[];
    let score = Math.round(n);
    let init = score / 2 | 0;
    for(let i=0; i<5; i++) {
      if(i<init) {
        s.push('star_on');
      }
      else if(i==init) {
        if(score % 2) {
          s.push('star_on_half')
        }
        else{
          s.push('star')
        }
      }
      else {
        s.push('star')
      }
    }
    return s;

  },
  goMovieDetail(e) {
    const movie= e.currentTarget.dataset.movie;
    const title = e.currentTarget.dataset.movie.title;
    wx.navigateTo({
      url: `../movie/movie?id=${movie.id}&title=${title}`
    })
  },
  allMovies(e) {
    const key = e.currentTarget.dataset.movie.key;
    const title = e.currentTarget.dataset.movie.title;
    wx.navigateTo({
      url: `../list/list?key=${key}&title=${title}`
    })
  },
  _ajaxData() {
  	wx.showLoading({
  		title:"拼命加载中"
  	})
  	const tasks=this.data.boards.map(board => {
  		return app.douban.find(board.key, 1, 8).then(res => {
  			 board.title = res.title;
  			 board.movies = res.subjects;
         board.scores = board.movies.map(item => {
          return this.culScore(item.rating.average)
         })
  			 return board
  		})
  	})
  	Promise.all(tasks).then(boards => {
  		this.setData({
  			boards
  		})
  		console.log(this.data.boards, "1234")
  		wx.hideLoading()
  	})
  }
})
