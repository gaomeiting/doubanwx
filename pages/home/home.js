//index.js
//获取应用实例
const app = getApp()
import Movie from "../../utils/movie"
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
         this._normalize(res.subjects);
         board.scores = board.movies.map(item => {
          return app.douban.culScore(item.rating.average)
         })
  			 return board
  		})
  	})
  	Promise.all(tasks).then(boards => {
  		this.setData({
  			boards
  		})
  		wx.hideLoading()
  	})
  },
  _normalize(list) {
    let arr=[]
    list.forEach(item => {
      let { id, rating, durations, pubdates, genres, title, casts, directors } = item;
      let movie = new Movie({ id, rating, durations, pubdates, genres, title, casts, directors })
      arr.push(movie)
    })
    return arr;
  }
})
