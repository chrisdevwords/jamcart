module.exports = {

    trackUrl: 'https://open.spotify.com/track/3PefhAnxRxxxeimzWetwnT',
    trackUri: 'spotify:track:3PefhAnxRxxxeimzWetwnT',
    trackId: '3PefhAnxRxxxeimzWetwnT',

    invalidId : function () {
        return JSON.stringify({
            error: {
                status: 400,
                message: 'invalid id'
            }
        });
    },

    track : function () {
        return JSON.stringify({
            album : {
                album_type : 'album',
                    available_markets : [ 'MX', 'US' ],
                    external_urls : {
                    spotify : 'https://open.spotify.com/album/20RfdO7fta9qlXEWTFSWuT'
                },
                href : 'https://api.spotify.com/v1/albums/20RfdO7fta9qlXEWTFSWuT',
                id : '20RfdO7fta9qlXEWTFSWuT',
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
                name : 'Grace Under Pressure',
                type : 'album',
                uri : 'spotify:album:20RfdO7fta9qlXEWTFSWuT'
            },
            artists : [   ,,,,
                {
                    external_urls : {
                        'spotify' : 'https://open.spotify.com/artist/2Hkut4rAAyrQxRdof7FVJq'
                    },
                    href : 'https://api.spotify.com/v1/artists/2Hkut4rAAyrQxRdof7FVJq',
                    id : '2Hkut4rAAyrQxRdof7FVJq',
                    name : 'Rush',
                    type : 'artist',
                    uri : 'spotify:artist:2Hkut4rAAyrQxRdof7FVJq'
                }
            ],
            available_markets : [ 'MX', 'US' ],
            disc_number : 1,
            duration_ms : 309146,
            explicit : false,
            external_ids : {
            isrc : 'USMR18430337'
        },
            external_urls : {
            spotify : 'https://open.spotify.com/track/3PefhAnxRxxxeimzWetwnT'
        },
            href : 'https://api.spotify.com/v1/tracks/3PefhAnxRxxxeimzWetwnT',
            id : '3PefhAnxRxxxeimzWetwnT',
            name : 'Red Sector A',
            popularity : 33,
            preview_url : 'https://p.scdn.co/mp3-preview/ac3aeaae0a17d973c6c19cbc63770252fe2b1784',
            track_number : 3,
            type : 'track',
            uri : 'spotify:track:3PefhAnxRxxxeimzWetwnT'
        })
    }

}
