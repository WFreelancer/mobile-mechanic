const API_KEY_MOVIE = process.env.NEXT_PUBLIC_KEY;

const currentInfo = (path) => `https://api.themoviedb.org/3/movie/${path}?api_key=${API_KEY_MOVIE}&language=en-US`;


export {
	currentInfo
}