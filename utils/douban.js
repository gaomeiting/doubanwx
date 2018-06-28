import { getStorage, setStorage } from "./wechat.js"
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
function getStorage_(key, id) {
		let arr = []
		const task = getStorage(key).then(res => {
			return arr = res.data;
		}).catch(err => {
			setStorage(key, arr)
			return arr
		})
		return Promise.all([task]).then(res => {
			let index = res[0].findIndex( val => {
				return val.id === id
			})
			return {
					index,
					vals: arr
				}
		})
	}
module.exports = {
	find,
	findOne,
	getStorage_
}