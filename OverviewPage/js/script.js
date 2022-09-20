function submitResult(params) {
    var post_data = {
        submission_timestamp: Math.round((new Date()).getTime() / 1000),
        submission_page: params.challengeName,
        submission_result: params.result,
        submission_score: params.accuracy,
        submission_record_time: params.timeTaken
    };

    return axios({
        method: 'POST',
        url: 'https://apidevportal.automationanywhere.com/v1/data',
        data: post_data,
        headers: {
            Authorization: 'Bearer ' + getCookie('X-Token')
        }
    });
}

function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [k,v] = el.split('=');
        cookie[k.trim()] = v;
    })
    return cookie[name];
}