var bookCheck = false;
var authorCheck = false;
var bandCheck = false;
var showCheck = false;
var movieCheck = false;
var gameCheck = false;
var bookList = [];
var authorList = [];
var bandList = [];
var showList = [];
var movieList = [];
var gameList = [];
function buildObject(name, type, description, wURL, yURL){
	var resultObj = {};
	resultObj.name = name;
	resultObj.type = type;
	resultObj.description = description;
	resultObj.wURL = wURL;
	resultObj.yURL = yURL;
	return resultObj;
} 
function showObject(obj){
	var item = $('.templates .search-result').clone(); 
	var itemName = item.find('.name');
	itemName.text(obj.name);
	var itemType = item.find('.type');
	itemType.text(obj.type);
	var itemDesc = item.find('.description');
	itemDesc.text(obj.description);
	var itemURL = item.find('.url a');
	itemURL.attr('href', obj.wURL);
	itemURL.text('Wikipedia');
	var itemYT = item.find('.youtube');
	if(obj.yURL !== 'N/A'){
		itemYT.html('<a href="' + obj.yURL + '" target="_blank">Youtube</a>');
	} else {
		itemYT.text(obj.yURL);
	}
	console.log(item);
	return item;
}
function updateLists(){
	$.each(bookList, function(i, item) {
		var resultItem = showObject(item);
		$('#book-tab').append(resultItem);
	});
	$.each(authorList, function(i, item) {
		var resultItem = showObject(item);
		$('#author-tab').append(resultItem);
	});
	$.each(bandList, function(i, item) {
		var resultItem = showObject(item);
		$('#band-tab').append(resultItem);
	});
	$.each(showList, function(i, item) {
		var resultItem = showObject(item);
		$('#show-tab').append(resultItem);
	});
	$.each(movieList, function(i, item) {
		var resultItem = showObject(item);
		$('#movie-tab').append(resultItem);
	});
	$.each(gameList, function(i, item) {
		var resultItem = showObject(item);
		$('#game-tab').append(resultItem);
	});
}
function buildQuery(){
	var queryString = '';
		if(bookCheck){
			queryString = 'book:' + queryString + $('#item-search').val() + ', ';
		}
		if(authorCheck){
			queryString = 'author:' + queryString + $('#item-search').val() + ', ';
		}
		if(bandCheck){
			queryString = 'band:' + queryString + $('#item-search').val() + ', ';
		}
		if(showCheck){
			queryString = 'show:' + queryString + $('#item-search').val() + ', ';
		}
		if(movieCheck){
			queryString = 'movie:' + queryString + $('#item-search').val() + ', ';
		}
		if(gameCheck){
			queryString = 'game:' + queryString + $('#item-search').val() + ', ';
		}

		if(bookCheck || authorCheck || bandCheck || showCheck || movieCheck || gameCheck){
			queryString = queryString.slice(0,-2);
		}
		return queryString;
}
function populateData(resultArray){
	$.each(resultArray, function(index, value) {
		var name = value.Name;
		var type = value.Type;
		var description = value.wTeaser;
		var wURL = value.wUrl;
		var yURL;
		if(value.yUrl !== null){
			yURL = value.yUrl;
		} else {
			yURL = 'N/A';
		}
		var finalObj = buildObject(name, type, description, wURL, yURL);

		switch(finalObj.type){
			case 'book':
				bookList.push(finalObj);
				break;
			case 'movie':
				movieList.push(finalObj);
				break;
			case 'band':
				bandList.push(finalObj);
				break;
			case 'show':
				showList.push(finalObj);
				break;
			case 'author':
				authorList.push(finalObj);
				break;
			case 'game':
				gameList.push(finalObj);
				break;
		}
	});
}
function getData(queryString){
	var queryURL = 'https://www.tastekid.com/api/similar?q=';
	var queryKey = '&k=167190-test-M06U2FBN';

	var finalURL = queryURL + queryString + queryKey + '&info=1';

	var result = $.ajax({
		url: finalURL,
		dataType: 'jsonp',
		type: 'GET'
	})
	.done(function(result){
		var finalResults = result.Similar.Results;
		populateData(finalResults);
		updateLists();
	});
}
$(document).ready(function() {
	//submit query
	$('#search-options').submit(function(e) {
		e.preventDefault();
		$('.tab').html('');

		var queryStr = buildQuery();

		getData(queryStr);
	});
	//checkbox query
	$('#book').change(function () {
		if($(this).is(':checked')){
			bookCheck = true;
		}else{
			bookCheck = false;
		}
	});
	$('#author').change(function () {
		if($(this).is(':checked')){
			authorCheck = true;
		}else{
			authorCheck = false;
		}
	});
	$('#band').change(function () {
		if($(this).is(':checked')){
			bandCheck = true;
		}else{
			bandCheck = false;
		}
	});
	$('#show').change(function () {
		if($(this).is(':checked')){
			showCheck = true;
		}else{
			showCheck = false;
		}
	});
	$('#movie').change(function () {
		if($(this).is(':checked')){
			movieCheck = true;
		}else{
			movieCheck = false;
		}
	});
	$('#game').change(function () {
		if($(this).is(':checked')){
			gameCheck = true;
		}else{
			gameCheck = false;
		}
	});

});