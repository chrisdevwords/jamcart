
module.exports = {
    help : function (slug) {
        return '<b>How to run your JamCart...</b>' +
            '<p>' +
                '<pre>' + slug + ' spotify:track:0lmUsjKgLFY2emmJWwolUs</pre>' +
                '&nbsp;- plays a spotify track by uri.<br/>' +
                '&nbsp;- adds to the queue if a requested track is already playing.' +
            '</p>' +
            '<p>' +
                '<pre>' + slug + ' pause' + '</pre>' +
                '&nbsp;- pauses the spotify player.' +
            '</p>' +
            '<p>' +
                '<pre>' + slug + ' resume' + '</pre>' +
                '&nbsp;- resumes the spotify player' +
            '</p>';
    }
}