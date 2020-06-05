/**
 * original code grabbed from:
 * https://github.com/TheBeastLT/torrentio-scraper/blob/master/scraper/scrapers/thepiratebay/thepiratebay_api.js
*/
const axios = require('axios');

const tpb = axios.create({
    baseURL: 'https://apibay.org'
})

// const timeout = 5000;

const Categories = {
    AUDIO: {
        ALL: 100,
        MUSIC: 101,
        AUDIO_BOOKS: 102,
        SOUND_CLIPS: 103,
        FLAC: 104,
        OTHER: 199
    },
    VIDEO: {
        ALL: 200,
        MOVIES: 201,
        MOVIES_DVDR: 202,
        MUSIC_VIDEOS: 203,
        MOVIE_CLIPS: 204,
        TV_SHOWS: 205,
        HANDHELD: 206,
        MOVIES_HD: 207,
        TV_SHOWS_HD: 208,
        MOVIES_3D: 209,
        OTHER: 299
    },
    APPS: {
        ALL: 300,
        WINDOWS: 301,
        MAC: 302,
        UNIX: 303,
        HANDHELD: 304,
        IOS: 305,
        ANDROID: 306,
        OTHER_OS: 399
    },
    GAMES: {
        ALL: 400,
        PC: 401,
        MAC: 402,
        PSx: 403,
        XBOX360: 404,
        Wii: 405,
        HANDHELD: 406,
        IOS: 407,
        ANDROID: 408,
        OTHER: 499
    },
    PORN: {
        ALL: 500,
        MOVIES: 501,
        MOVIES_DVDR: 502,
        PICTURES: 503,
        GAMES: 504,
        MOVIES_HD: 505,
        MOVIE_CLIPS: 506,
        OTHER: 599
    },
    OTHER: {
        ALL: 600,
        E_BOOKS: 601,
        COMICS: 602,
        PICTURES: 603,
        COVERS: 604,
        PHYSIBLES: 605,
        OTHER: 699
    }
};

async function info(torrentId) {
    // TODO: fix the info method
    if (!torrentId) {
        return Promise.reject(new Error('No valid torrentId provided'));
    }

    const response = await tpb.get('/t.php', {
        params: {
            id: torrentId
        }
    });

    let searchResults = response.data;
    var searchResultsToReturn = [];


    for (let singleTorrent of searchResults) {
        searchResultsToReturn.push(toTorrent(singleTorrent));
    }

    return searchResultsToReturn;
}

/**
 * Searches for torrents in all categories using a given keyword
 * 
 * @param {string} keyword
 */
async function search(keyword/*, config = {}*/) {
    if (!keyword) {
        return Promise.reject(new Error('No valid keyword provided'));
    }

    if (typeof keyword !== 'string') {
        return Promise.reject(new Error('keyword must be a string'));
    }

    const q = keyword;
    // const cat = config.category || Categories.VIDEO.ALL;

    const response = await tpb.get('/q.php', {
        params: {
            q
        }
    });

    let searchResults = response.data;
    var searchResultsToReturn = [];


    for (let singleTorrent of searchResults) {
        searchResultsToReturn.push(toTorrent(singleTorrent));
    }

    return searchResultsToReturn;
}

function toTorrent(result) {
    return {
        torrentId: result.id,
        name: result.name,
        infoHash: result.info_hash.toLowerCase(),
        size: parseInt(result.size),
        seeders: parseInt(result.seeders),
        leechers: parseInt(result.leechers),
        subcategory: parseInt(result.category),
        uploadDate: new Date(result.added * 1000),
        imdbId: result.imdb || null,
        filesCount: result.num_files && parseInt(result.num_files) || null
    };
}

module.exports = { /*info,*/ search, Categories };