


var artistA = {
    external_urls : {
        'spotify' : 'https://open.spotify.com/artist/2Hkut4rAAyrQxRdof7FVJq'
    },
    href : 'https://api.spotify.com/v1/artists/2Hkut4rAAyrQxRdof7FVJq',
    id : '2Hkut4rAAyrQxRdof7FVJq',
    name : 'Rush',
    type : 'artist',
    uri : 'spotify:artist:2Hkut4rAAyrQxRdof7FVJq'
};

var artistB = {
    external_urls: {
        spotify: 'https://open.spotify.com/artist/3UpIbyXfGzmHG6TMH4dJEk'
    },
    href: 'https://api.spotify.com/v1/artists/3UpIbyXfGzmHG6TMH4dJEk',
    id: '3UpIbyXfGzmHG6TMH4dJEk',
    name: 'Aimee Mann',
    type: 'artist',
    uri: 'spotify:artist:3UpIbyXfGzmHG6TMH4dJEk'

};

module.exports = {

    trackUrl: 'https://open.spotify.com/track/3PefhAnxRxxxeimzWetwnT',
    trackUri: 'spotify:track:3PefhAnxRxxxeimzWetwnT',
    trackId: '3PefhAnxRxxxeimzWetwnT',
    trackName: 'Red Sector A',
    trackDuration: 309146,
    trackPopularity: 33,
    albumId: '20RfdO7fta9qlXEWTFSWuT',
    albumUri: 'spotify:album:20RfdO7fta9qlXEWTFSWuT',
    albumUrl: 'https://api.spotify.com/v1/albums/20RfdO7fta9qlXEWTFSWuT',
    albumName: 'Grace Under Pressure',
    artistName : artistA.name,
    artistA: artistA,
    artistB: artistB,

    invalidId : function () {
        return JSON.stringify({
            error: {
                status: 400,
                message: 'invalid id'
            }
        });
    },

    track : function (params) {
        params = params || {};
        return JSON.stringify({
            album : {
                album_type : 'album',
                    available_markets : [ 'MX', 'US' ],
                    external_urls : {
                    spotify : 'https://open.spotify.com/album/' + params.albumId || this.albumId
                },
                href : 'https://api.spotify.com/v1/albums/' + params.albumId || this.albumId,
                id : params.albumId || this.albumId,
                images : [
                    {
                        height : 640,
                        url : 'https://i.scdn.co/image/cec9665b6dec64d5ef6c409789f75a55a569e4f7',
                        width : 640
                    },
                    {
                        height : 300,
                        url : 'https://i.scdn.co/image/79c0263367d406ec3c1606a83d70483d44a25687',
                        width : 300
                    },
                    {
                        height : 64,
                        url : 'https://i.scdn.co/image/940c39c26832c1b712804cd7820e8ed2ddb0c7a0',
                        width : 64
                    }
                ],
                name : params.albumName || this.albumName,
                type : 'album',
                uri : params.albumUri || this.albumUri
            },
            artists : params.artists || [artistA],
            available_markets : [ 'MX', 'US' ],
            disc_number : 1,
            duration_ms : params.trackDuration || this.trackDuration,
            explicit : false,
            external_ids : {
                isrc : 'USMR18430337'
            },
            external_urls : {
                spotify : 'https://open.spotify.com/track/' + params.trackId || this.trackId
            },
            href : 'https://api.spotify.com/v1/tracks/' + params.trackId || this.trackId,
            id : params.trackId || this.trackId,
            name : params.trackName || this.trackName,
            popularity : params.trackPopularity || this.trackPopularity,
            preview_url : 'https://p.scdn.co/mp3-preview/ac3aeaae0a17d973c6c19cbc63770252fe2b1784',
            track_number : 3,
            type : 'track',
            uri : 'spotify:track:' + this.trackId
        });
    }

};

