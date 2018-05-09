class Movie {
	constructor({id, rating, durations, pubdates, genres, title, casts, directors, images} ) {
		this.id=id;
		this.rating=rating;
		this.durations=durations;
		this.pubdates=pubdates;
		this.genres=genres;
		this.title=title;
		this.casts=casts;
		this.directors=directors;
		this.images=images;
	}
	//计算评分
	culScore(n,type) {
	    let s = [];
	    if(type === 5) {
	    	s = scoreMaxFive(n)
	    }
	    if(type === 10) {
	    	s = scoreMaxTen(n)
	    }
	    this.scoreClass = s;

	}
}
export function CreateMovie(movie) {
	const { id, rating, durations, pubdates, genres, title, casts, directors, images } = movie;
	return new Movie({id, rating, durations, pubdates, genres, title, casts, directors, images})
}
export function CulScore(n, type) {
    let s = [];
    if(type === 5) {
    	s = scoreMaxFive(n)
    }
    if(type === 10) {
    	s = scoreMaxTen(n)
    }
    return s;
}
function scoreMaxFive(n) {
	let s = []
	for(let i=0; i<5; i++) {
		if(i<n) {
			s.push('star_on')
		}
		else {
			s.push('star')
		}
	}
	return s;
}
function scoreMaxTen(n) {
	let s=[];
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
