const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";



function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: `${searchTerm} in:name`,
      per_page: 5,
      key: "AIzaSyC2JXdLq7p6SP9dhauUBZFUrevYiz5cvfU",
      part: 'snippet'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}




function renderResult(result) {
  console.log(result);
  return `
    <div>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank" data-toggle="lightbox"><img class="js-thumbnail" src="${result.snippet.thumbnails.medium.url}" alt="thumbnail of youtube video" class="js-result-thumbnail"></a>
      <p>Name: <span class="js-name">${result.snippet.title}</span></p>
      <p>Channel Title: <a href="https://www.youtube.com/channel/${result.snippet.channelID}"><span class="js-channel-title">${result.snippet.channelTitle}</span></a></p>
      <p>Description: <span class="js-description">${result.snippet.description}</span></p>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  console.log(data);
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
  $('#pageTokenPrev').val(result.prevPageToken);
  $('#pageTokenNext').val(result.nextPageToken);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);

