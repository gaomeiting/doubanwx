export default class Movie {
	constructor({id, rating, durations, pubdates, genres, title, casts, directors} ) {
		this.id=id;
		this.rating=rating;
		this.durations=durations;
		this.pubdates=pubdates;
		this.genres=genres;
		this.title=title;
		this.casts=casts;
		this.directors=directors;
	}
}
