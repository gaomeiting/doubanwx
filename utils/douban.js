const baseURL="https://douban.uieee.com/v2/movie"
const fetch=require('./fetch.js')

function fetchAPI(url, params) {
  return fetch(baseURL, url, params)
}

//抓取列表数据

function find(url, page=1, count=20, search="") {
	const params={
		start: (page-1) * count,
		count,
		city: getApp().data.currentCity
	}
	return fetchAPI(url, search ? Object.assign(params, { q:search }):params)
	.then(res=> res.data )
}
function findOne(url, id) {
	return fetchAPI(url, id).then(res => {
		return res.data;
	})
}
//计算评分
function culScore(n) {
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

}
module.exports = {
	find,
	findOne,
	culScore
}