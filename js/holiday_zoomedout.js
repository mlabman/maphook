var bounds = new google.maps.LatLngBounds();
var infowindow = null;
var map;
var borderColor = "Red";
var captionColor = "White";
var titleName = " ";
var polyCoordinates = [];
var bundle = [];
var polyPath;
var offset = {};
var myLatlng = new google.maps.LatLng(29.7628, -95.3831);		// middle of US: 29.7628, -95.3831   ||||| lake erie: 42.178507, -81.238224
var mobileLatlng = new google.maps.LatLng(37.893855, -82.313040);
var lastValidCenter = myLatlng;
var initialZoom = 6;
var mobileZoom = 4;
var baseCDN = 'http://88d7ba627ed950559363-30e28468b1509b2df5dcc8eb3b617e7c.r8.cf2.rackcdn.com/culture/';
var isiPhone = navigator.userAgent.match(/iPhone/i) != "";
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;

var restrictPanning = false;
var allowedBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(55.314654603034136, -59.447622000000024),
	 new google.maps.LatLng(18.079879178960944, -129.76012200000002)
     
);




var icon = new google.maps.MarkerImage('http://88d7ba627ed950559363-30e28468b1509b2df5dcc8eb3b617e7c.r8.cf2.rackcdn.com/pins/HM-pin-C.png',
		new google.maps.Size(26, 40),
		new google.maps.Point(0, 0),
		new google.maps.Point(13, 40));
		

function getMarker(url) {
	return new google.maps.MarkerImage('http://88d7ba627ed950559363-30e28468b1509b2df5dcc8eb3b617e7c.r8.cf2.rackcdn.com/pins/' + url,
		new google.maps.Size(31, 47),
		new google.maps.Point(0, 0),
		new google.maps.Point(16, 47)
		);
}

function addPin(data) {

	var position = new google.maps.LatLng(data.Latitude, data.Longitude);
	
	bounds.extend(position);
	
	//var icon = getMarker(data.pin);
	var caption = data.FILM + ' @ ' + data.Location;
	//alert('adding ' +caption);
	var marker = new google.maps.Marker({
			position : position,
			map : map,
			icon: icon,
			title : caption
		});	
		

	google.maps.event.addListener(marker, 'click', function () {
		hookBalloon(map, marker, data);
	});
	
	bundle.push(marker);
	
	return marker;
}

function hookBalloon(map, marker, jData) {

	if (infowindow != null)
		infowindow.close();

	var background = "none";
	var bgColor = "#ffffff";
	
	var borderColor = "#B43048";
	var captionColor = "#000000";
	var stndrdth = "th";
	var image = baseCDN + 'holidayphotos/' + jData.Photo;
	
	//var dimensions = ' width="150" ';
	//if (jData.Orientation == 'portrait')
	//	dimensions = ' height="150" ';
	var dimensions = ' width: 150px; height: ' + calculateNewHeight(jData,150) + 'px';
		
	
	contentString = '<div style="background-color: white; border: 0px solid red;  width: 270px; padding: 10px; padding-bottom: 5px; text-align:left;" >' +
				'<div style="color: #B43048; font-weight: bold; line-height: 24px;  vertical-align: middle; font-size: 12pt; text-align:left; padding-bottom: 0px;">' + jData.FILM + '</div>' +
				'<a onclick="fakeLightbox(\'' + jData.id + '\'); return false;" href="#">' +
				'<img border="0" style="float: right; padding: 5px 5px 15px 5px; ' + dimensions + '" src="' + image + '" align="right" />' +
				'</a>' + 
				'<div style="font-size:11pt; font-weight: bold; color: black; font-style: italic;">' + jData.Location + '</div>' +
				'<div style="padding: 3px 0 8px 0 ; color: black; font-size: 10pt; font-weight: normal; text-align:left; width: 250px;">' + 
				jData.Trivia + '</div>' +
				'<a target="_blank" href="' + jData.PhotoSource + '" style="font-size: 8pt; font-weight: normal; font-style: italic; color: #c1c1c1 !important;">Click for photo source</a>' +
				'</div>';

	infowindow = new InfoBubble({
			map : map,
			content : contentString,
			shadowStyle : 1,
			padding : 0,
			backgroundColor : bgColor,
			borderRadius : 10,
			arrowSize : 10,
			borderWidth : 2,
			borderColor : borderColor,
			disableAutoPan : false,
			hideCloseButton : false,
			arrowPosition : 50,
			backgroundClassName : background,
			arrowStyle : 0
		});

	infowindow.open(map, marker);
}

function fakeLightbox(id) {
	
	$("#" + id).click();
}


function closePopup() {
	if (infowindow != null)
		infowindow.close();
}

function initialize() {
	

	var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1;
	if (isMobile()) {
		initialZoom = mobileZoom;
		myLatlng = mobileLatlng;
	}
	
	
	var disablePoi = [
	   {
		 featureType: "poi",
		 stylers: [
		  { visibility: "off" }
		 ]   
		}
	];
	var grayscale = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"off"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
	var mutedBrown = [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#999999"},{"gamma":0.34},{"saturation":-80}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#0000cc"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0000cc"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}];
	
	var myOptions = {
		zoom : initialZoom,
		center : myLatlng,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		mapTypeControl : false,
		panControl: false,
		zoomControl: false,
		scaleControl: false,
		streetViewControl: false,
		styles: grayscale
	}

	if (isAndroid || isiPhone) {
		myOptions = {
			zoom : initialZoom,
			center : myLatlng,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			streetViewControl : false,
			panControl: false,
			mapTypeControl : false,
			zoomControl: false,
			scaleControl: false,
			styles: grayscale
		}
	}
	$(".fb").fancybox();
	
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	doResize();
	google.maps.event.addListener(map, "click", function (e) {
		closePopup();
	});

	
	for (var i = 0, length = jsonData.length; i < length; i++) {
		//generateSQL(jsonData[i]);
		addPin(jsonData[i]);
		//generateLink(jsonData[i].id,jsonData[i].Photo);
		//showImageSize(jsonData[i].Photo);
		
	}

	//buildCluster();
	//fitBounds();
	//map.setZoom(map.getZoom() + 1);
	
	/*for (var i = 0, length = newImages.length; i < length; i++) {
		
		showImageSize(newImages[i].image);
		
	}*/
	/*
	google.maps.event.addListenerOnce(map,'idle',function() {
		var mapBounds = map.getBounds();
		var postext = 'MAP BOUNDS: <br />' + mapBounds.getNorthEast().toString() + '<br />' + mapBounds.getSouthWest().toString() + '<br />';
		$("#position").html(postext);
		}
		);
	*/
	// THIS RUNS AS SOON AS EVERYTHING HAS LOADED
	//  DO NOT FIT BOUNDS, JUST CENTER THE MAP PER ALLIE/MATT @ 11/18/2014
	// Official one doesn't fit bounds - this is just for testing
	if (!isMobile()) {
		google.maps.event.addListenerOnce(map,'idle',function() {
			fitBounds();
		});
	}
	
	//recenter();
	
	// once the map is idle, add these events
	google.maps.event.addListenerOnce(map,'idle',function() {
		google.maps.event.addListener(map,'zoom_changed',function() { 
			$('#showup').hide();
		});
	
		google.maps.event.addListener(map,'center_changed',function() { 
			$('#showup').hide();
		});
		
		google.maps.event.addListener(map,'click',function() { 
			$('#showup').hide();
			closePopup();
		});
	});
	
	
	
	if (restrictPanning) {
	
		google.maps.event.addListener(map, 'center_changed', function() {
			var mapBounds = map.getBounds();
			if (allowedBounds.contains(mapBounds.getNorthEast()) && allowedBounds.contains(mapBounds.getSouthWest())) {
				var postext = 'valid: <br />' + mapBounds.getNorthEast().toString() + '<br />' +mapBounds.getSouthWest().toString() + '<br />';
				$("#position").html(postext);
				lastValidCenter = map.getCenter();
				return; 
			}
			var postext = 'NOT VALID: <br />' + mapBounds.getNorthEast().toString() + '<br />' + mapBounds.getSouthWest().toString() + '<br />';
			$("#position").html(postext);
			map.setCenter(lastValidCenter);
		});
	}

}

function buildCluster() {
	var styles = [{
					url: 'http://www.maphook.com/web/images/clusterpin-holiday.png',
					width: 59,
					height: 60,
					anchor: [0, 0],
					textColor: '#ffffff',
					textSize: 13
				  }
		  ];
	
	
	markerCluster = new MarkerClusterer(map, bundle, {
				averageCenter: true,
				minimumClusterSize: 3,
				gridSize : 40,
				styles: styles,
				maxZoom: 18

	});
}

function addSlashes( str ) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function closeDownloadBox() {
	$("#download").hide();
	doResize();
}
function generateSQL(data) {
	var sql = 'INSERT INTO `maphook`.`holiday` (`title`, `id`, `location`, `address`, `trivia`, `latitude`, `longitude`,`image`) VALUES (' +
		'\'' + addSlashes(data.FILM) + '\',\'' + data.id + '\',\'' + addSlashes(data.Location) + '\',\'' + addSlashes(data.Address) + 
		'\',\'' + addSlashes(data.Trivia) + '\',' + data.Latitude + ',' + data.Longitude + ',\'' + data.PhotoSource + '\');';
	$("#info").append(sql + '<br />');
}
function generateLink(id,url) {
	$("#info").append('&lt;a id="' + id + '" class="fb" href="' + baseCDN + 'holidayphotos/' + url + '"></a><br />');
}

function showImageSize(url) {
	var img = new Image();
	img.src = baseCDN + 'holidayphotos/' + url;
	img.onload = function() {
	  $("#info").append('{image: "' + url + '", height: ' + img.height + ', width: ' + img.width + '},<br />');
	};
}

window.onresize = function (event) {
    doResize();
}

function isPortrait(image) {
	for (var i = 0, length = imageSizes.length; i < length; i++) {
		
		if (imageSizes[i].image == image)
				return (imageSizes[i].width < imageSizes[i].height);
		
		
	}
	return false;
}

function calculateNewHeight(data,newWidth) {
	for (var i = 0; i < imageSizes.length; i++) {
		if (imageSizes[i].image == data.Photo) {
			return calculateHeight(imageSizes[i].height, imageSizes[i].width, newWidth);
		}
	}
	return (9 * newWidth / 16);
}

function calculateHeight(actualHeight, actualWidth, newWidth) {
	return (actualHeight * newWidth / actualWidth);
}

function isMobile() {
	var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1;
	
	return isiPhone || isAndroid;
}

function doResize() {
	var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1;
	
	var dimensions = getSize();
	
	var poweredL = dimensions.width - 105;
	var poweredT = dimensions.height - 50;
	var newHeight = dimensions.height;
	var newWidth = dimensions.width;
	if (isiPhone) {
		$(".embed").height('400px');
	}
	/*
	
		if (dimensions.height > dimensions.width) 
			newWidth = 283;
		else 
			newWidth = 480;
			
		poweredL = newWidth - 105;
		if (newHeight > 360) newHeight = 360;
		poweredT = newHeight - 50;
		$("#map_canvas").css('padding-left','5px');
		// because iPhone has that extra popup at top 
		// but if the user closes it and it never opens back up??
		// then what?
		//newHeight = newHeight + 50;
		//poweredT = poweredT + 50;
	}*/
	// DO NOT RESIZE THE MAP - THE DIV WILL AUTOMATICALLY BE RESIZED
	//$("#map_canvas").width(newWidth + 'px');
	//$("#map_canvas").height(newHeight + 'px');
	//$("#powered-by1").css('left',poweredL + 'px');
	//$("#powered-by1").css('top',poweredT + 'px');
	
	//fitBounds();
	recenter();
	
}


function getSize() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  //window.alert( 'Width = ' + myWidth );
  
  if (myWidth == 0) myWidth = 620;
  if (myHeight == 0) myHeight = 500;
  return {height: myHeight, width: myWidth};
  //window.alert( 'Height = ' + myHeight );
}

function fitBounds() {
	if (map != null) {
		map.fitBounds(bounds);
		var currentZoom = map.getZoom();
		//var newZoom = 
		if (isMobile()) {
			
			currentZoom += 1;
			
		}
		map.setZoom(currentZoom);
			
	}
}

function recenter() {
	
	map.setCenter(myLatlng);
	//map.setZoom(initialZoom);
	//map.setZoom(4);
	//map.fitBounds(bounds);
	if (!isMobile())
		fitBounds();
	else
		map.setZoom(initialZoom);

	//alert(map.getZoom());
	if (infowindow != null)
		   infowindow.close();
}

$(document).ready(function () {
	initialize();
});

var jsonData = [{"id":"film_1","FILM":"200 Cigarettes","Location":"Ace Bar","Latitude":40.72442,"Longitude":-73.982847,"Address":"531 East 5th Street, New York, NY","Trivia":"Follow the cast of 200 Cigarettes' example and stop by Ace for your next New Year's celebration. You may get lucky.","Photo":"200cigarettes04.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/200cigarettes/200cigarettes04.jpg"},
{"id":"film_2","FILM":"A Christmas Story","Location":"Ralphie's family's house","Latitude":41.468719,"Longitude":-81.687437,"Address":"3159 W 11th St, Cleveland, OH","Trivia":"This 19th-century Victorian was used to film the external scene's of Ralphie Parker's house. From the right angle, you can even see the famous, scantily clad Leg Lamp in the windowsill.  ","Photo":"homepagehouse.jpg","Orientation":"landscape","PhotoSource":"http://www.achristmasstoryhouse.com/images/homepagehouse.jpg"},
{"id":"film_3","FILM":"A Christmas Story","Location":"Higbee's Department Store","Latitude":41.498506,"Longitude":-81.692953,"Address":"100 Public Square, Cleveland, OH","Trivia":"Higbee's Department Store, where Ralphie first eyes the Red Ryder BB Gun, is now a casino. Oh the times they are a-changin'.","Photo":"higbees.jpg","Orientation":"landscape","PhotoSource":"http://www.achristmasstoryhouse.com/images/higbees.jpg"},
{"id":"film_4","FILM":"A Christmas Story","Location":"Victoria School","Latitude":41.595593,"Longitude":-87.451569,"Address":"3211 165th Street, Hammond, Indiana","Trivia":"Ralphie's school is, well, a real school! It's the Warren G. Harding school and still operational today.","Photo":"victoria25.jpg","Orientation":"landscape","PhotoSource":"http://www.achristmasstoryhouse.com/images/Victoria/victoria25.jpg"},
{"id":"film_5","FILM":"Adam Sandler's Eight Crazy Nights","Location":"Dukesberry, New Hampshire","Latitude":43.193852,"Longitude":-71.572395,"Address":"Fictional town—anywhere in NH","Trivia":"Staged in the fictional town of Dukesberry, this animated film is a Christmas standard for Adam Sandler fans.","Photo":"MV5BMTk1NTU4NjE5OV5BMl5BanBnXkFtZTYwMTQ3OTY2._V1_SX640_SY720_.jpg","Orientation":"portrait","PhotoSource":"http://ia.media-imdb.com/images/M/MV5BMTk1NTU4NjE5OV5BMl5BanBnXkFtZTYwMTQ3OTY2._V1_SX640_SY720_.jpg"},
{"id":"film_6","FILM":"Bad Santa","Location":"Long Beach, California","Latitude":33.77005,"Longitude":-118.193739,"Address":"Long Beach, CA","Trivia":"The scenes from Bad Santa set at Miami Beach are actually none other than California's own Long Beach! Festive!","Photo":"bad-santa_billy_bob_thornton.jpg","Orientation":"landscape","PhotoSource":"http://oyster.ignimgs.com/wordpress/stg.ign.com/2014/02/bad-santa_billy_bob_thornton.jpg"},
{"id":"film_7","FILM":"Bad Santa","Location":"Footsies Bar","Latitude":34.084584,"Longitude":-118.221145,"Address":"2640 North Figueroa St, Los Angeles, CA","Trivia":"Straight from Bad Santa's opening scenes, pour yourself a cold one.","Photo":"ScreenShot805_thumb.jpg","Orientation":"landscape","PhotoSource":"http://www.iamnotastalker.com/wp-content/uploads/2013/12/ScreenShot805_thumb.jpg"},
{"id":"film_8","FILM":"Bad Santa","Location":"Heist Boutique","Latitude":33.991644,"Longitude":-118.470538,"Address":"1100 Abbot Kinney Boulevard, Venice, CA","Trivia":"Heist serves as the exterior from Bad Santa's O'Hara's Pub. The neon sign is missing, but not its Christmas charm!","Photo":"ScreenShot239_thumb.jpg","Orientation":"landscape","PhotoSource":"http://www.iamnotastalker.com/wp-content/uploads/2013/12/ScreenShot239_thumb.jpg"},
{"id":"film_9","FILM":"Christmas in Connecticut","Location":"Warner Brothers Burbank Studios","Latitude":34.149898,"Longitude":-118.341017,"Address":"4000 Warner Boulevard, Burbank, CA","Trivia":"Fooled ya! Christmas in Connecticut, the 1945 classic, was entirely filmed in a studio—as far away as possible from the Nutmeg state.","Photo":"christmas-in-connecticut1.jpg","Orientation":"landscape","PhotoSource":"http://4.bp.blogspot.com/_jEnt88QHqAA/SxRHIEnJVjI/AAAAAAAABxE/joVVEfNwyqA/s1600/christmas-in-connecticut1.jpg"},
{"id":"film_10","FILM":"Christmas Vacation ","Location":"Griswold Family Home","Latitude":34.157799,"Longitude":-118.342457,"Address":"411 North Hollywood Way, Burbank, CA","Trivia":"The former Columbia Ranch, now dubbed the Warner Bros. Ranch, serves the exterior for the Griswold's home. Bring your sunglasses for the Christmas lights.","Photo":"Griswold-House-700px.jpg","Orientation":"landscape","PhotoSource":"http://rvamag.com/sites/default/files/articles/inline/Griswold-House-700px.jpg"},
{"id":"film_11","FILM":"Die Hard","Location":"The Nakatomi Tower","Latitude":34.055223,"Longitude":-118.413264,"Address":"Fox Plaza, 2121 Avenue of the Stars, Los Angeles, CA","Trivia":"The Nakatomi Tower in Die Hard is LA's own Fox Plaza, where John McClane saves Christmas, the tower, capitalism, and his marriage from terrorists. Yippee ki-yay. ","Photo":"Fox_Plaza_HD.jpg","Orientation":"portrait","PhotoSource":"http://upload.wikimedia.org/wikipedia/commons/c/ca/Fox_Plaza_HD.jpg"},
{"id":"film_12","FILM":"Die Hard 2","Location":"Kincheloe Air Force Base","Latitude":46.258657,"Longitude":-84.470411,"Address":"5315 W Airport Dr, Kincheloe, MI","Trivia":"Now the Chippewa County International Airport, Die Hard 2 was predominately filmed here on location.","Photo":"Die_Hard_2.jpg","Orientation":"portrait","PhotoSource":"http://upload.wikimedia.org/wikipedia/en/2/2c/Die_Hard_2.jpg"},
{"id":"film_13","FILM":"Die Hard 2","Location":"Alpena Airport","Latitude":45.070491,"Longitude":-83.568615,"Address":"1617 Airport Rd, Alpena, MI","Trivia":"The other airport used in Die Hard 2, originally chosen because producers expected there to be snow in Alpena during production. There was, however, no snow, so artificial snow had to be used!","Photo":"harder04.jpg","Orientation":"landscape","PhotoSource":"http://www.filminamerica.com/Movies/DieHard2DieHarder/harder04.jpg"},
{"id":"film_14","FILM":"Dutch","Location":"Berry College","Latitude":34.290361,"Longitude":-85.189199,"Address":"2277 Martha Berry Hwy, Rome, Georgia","Trivia":"Dutch (Ed O'Neill) goes down to Berry College, portrayed as the McLaren School in the film, to pick-up the estranged Doyle and bring him home for the holidays—all in the name of love.","Photo":"Mary_Hall_at_Berry_College.jpg","Orientation":"landscape","PhotoSource":"http://upload.wikimedia.org/wikipedia/commons/2/2d/Mary_Hall_at_Berry_College.jpg"},
{"id":"film_15","FILM":"Dutch","Location":"Big Daddy Fireworks","Latitude":35.042478,"Longitude":-85.688902,"Address":"124 Highway 72, South Pittsburg, TN","Trivia":"Give thanks and buy some fireworks at Big Daddy's, a la Dutch.","Photo":"6120954804_bde31a0b45_z.jpg","Orientation":"landscape","PhotoSource":"https://c1.staticflickr.com/7/6184/6120954804_bde31a0b45_z.jpg"},
{"id":"film_16","FILM":"Dutch","Location":"Rome Foodmart","Latitude":34.168814,"Longitude":-85.342239,"Address":"3264 Fosters Mill Rd, Rome, Georgia","Trivia":"Next time you're in Tennessee dragging a child across the country for Thanksgiving, stop here for a refill on snacks and gas—just like Dutch!","Photo":"GA+Gas+2.jpg","Orientation":"landscape","PhotoSource":"http://4.bp.blogspot.com/-9Fxwu90E4Ew/UY3XjB6TMuI/AAAAAAAAeo0/oIfLIufHUAE/s400/GA+Gas+2.jpg"},
{"id":"film_17","FILM":"Elf","Location":"Empire State Building","Latitude":40.748433,"Longitude":-73.984537,"Address":"350 5th Avenue & West 34th St, New York, NY","Trivia":"The esteemed Empire State Building is featured in Elf, fully decorated for the season!","Photo":"elf04.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/elf/elf04.jpg"},
{"id":"film_18","FILM":"Elf","Location":"Gimbel's Department Store","Latitude":40.745906,"Longitude":-73.986389,"Address":"295 5th Avenue & East 30th Street, New York, NY","Trivia":"The Gimbel store from Elf, place of employment of love interest Jovie, is in fact your regular corner building with a CGI make-over, adding Christmas decorations and Gimbel's traditional signage.","Photo":"elf05.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/elf/elf05.jpg"},
{"id":"film_19","FILM":"Elf","Location":"The Revolving Door","Latitude":40.747766,"Longitude":-73.985046,"Address":"10 West 33rd Street & 5th Avenue, New York, NY","Trivia":"Lose yourself in the Christmas Spirit with this building's revolving doors—just like Buddy in Elf.","Photo":"elf41.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/elf/elf41.jpg"},
{"id":"film_20","FILM":"Four Christmases","Location":"Paula's House","Latitude":34.107854,"Longitude":-118.592349,"Address":"1290 Oakwood Dr, Topanga, CA ","Trivia":"Brad's mother's house in Four Christmases—safeguard your men before entering and avoid the mistletoe.","Photo":"ScreenShot6738_thumb.jpg","Orientation":"landscape","PhotoSource":"http://www.iamnotastalker.com/wp-content/uploads/2012/12/ScreenShot6738_thumb.jpg"},
{"id":"film_21","FILM":"Four Christmases","Location":"Marilyn's House","Latitude":34.111599,"Longitude":-118.144519,"Address":"1217 Milan Avenue, S Pasadena, CA","Trivia":"Kate's mother's house in Four Christmases, conveniently located in South Pasadena!","Photo":"ScreenShot6663_thumb.jpg","Orientation":"landscape","PhotoSource":"http://www.iamnotastalker.com/wp-content/uploads/2012/12/ScreenShot6663_thumb.jpg"},
{"id":"film_22","FILM":"Fred Claus","Location":"Corner of N. Michigan Ave & E. Chicago Ave","Latitude":41.896711,"Longitude":-87.624308,"Address":"Corner of N. Michigan Ave & E. Chicago Ave","Trivia":"Avoid Fred Claus's example here and refrain from posing as a bell ringer to con people out of their money!","Photo":"Bell+1.jpg","Orientation":"landscape","PhotoSource":"http://4.bp.blogspot.com/-joRSaJyD8Ng/Uqa30f7p9QI/AAAAAAAAi-A/MkKqYYJ1GOQ/s400/Bell+1.jpg"},
{"id":"film_23","FILM":"Gremlins","Location":"Universal Studios Backlot","Latitude":32.857732,"Longitude":-117.205429,"Address":"3800 Barham Boulevard, University City, CA","Trivia":"If the set of Gremlins looks familiar, that's because it's the exact same set from Back To The Future! Same universe, maybe?","Photo":"gremlins-town-square.jpg","Orientation":"landscape","PhotoSource":"http://cdn3.whatculture.com/wp-content/uploads/2013/02/gremlins-town-square.jpg"},
{"id":"film_24","FILM":"Grumpy Old Men","Location":"Max Goldman's House","Latitude":44.980269,"Longitude":-93.052401,"Address":"1137 Hyacinth Avenue East, Saint Paul, MN","Trivia":"Holds one grumpy old man.","Photo":"gom_house_1137.jpg","Orientation":"landscape","PhotoSource":"http://johnweeks.com/tour/gom/pics/gom_house_1137.jpg"},
{"id":"film_25","FILM":"Grumpy Old Men","Location":"John Gustafson's House","Latitude":44.980423,"Longitude":-93.052503,"Address":"1133 Hyacinth Avenue East, Saint Paul, MN","Trivia":"Holds one grumpy old man.","Photo":"gom_house_1133.jpg","Orientation":"landscape","PhotoSource":"http://johnweeks.com/cgi-bin/phototour.cgi?path=gom&photo=gom_house_1133"},
{"id":"film_26","FILM":"Grumpy Old Men","Location":"Ariel Truax's House","Latitude":44.979955,"Longitude":-93.052829,"Address":"1122 Hyacinth Avenue East, Saint Paul, MN","Trivia":"Holds one object of affection of two grumpy old men.","Photo":"gom_house_1122.jpg","Orientation":"landscape","PhotoSource":"http://johnweeks.com/tour/gom/pics/gom_house_1122.jpg"},
{"id":"film_27","FILM":"Hannah and Her Sisters","Location":"Hannah's West Side Apartment","Latitude":40.777332,"Longitude":-73.975521,"Address":"Langham, 135 Central Park West, New York, NY","Trivia":"Hannah's apartment, which is also the actual apartment of Mia Farrow!","Photo":"hannahandhersisters17.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/hannahandhersisters/hannahandhersisters17.jpg"},
{"id":"film_28","FILM":"Holiday Inn","Location":"The Village Inn & Restaurant","Latitude":38.467347,"Longitude":-123.007252,"Address":"20822 River Boulevard, Monte Rio, CA","Trivia":"Holiday Inn, Irving Berlin's classic musical that brought the world ","Photo":"Holiday-Inn-movie-house-cover.jpg","Orientation":"landscape","PhotoSource":"http://hookedonhouses.net/wp-content/uploads/2012/12/Holiday-Inn-movie-house-cover.jpg"},
{"id":"film_29","FILM":"Home Alone","Location":"The McCallister Home","Latitude":42.109774,"Longitude":-87.733559,"Address":"671 Lincoln Avenue, Winnetka, IL","Trivia":"The McCallister home from Home Alone. Our advice? Don't rob this one.","Photo":"Home-Alone-movie-house-Christmas-lights.jpg","Orientation":"landscape","PhotoSource":"http://hookedonhouses.net/wp-content/uploads/2009/11/Home-Alone-movie-house-Christmas-lights.jpg"},
{"id":"film_30","FILM":"Home Alone","Location":"O'Hare International Airport","Latitude":41.974163,"Longitude":-87.907321,"Address":"10000 W O'Hare Ave, Chicago, IL","Trivia":"Check for your kids before boarding, folks.","Photo":"Airport.JPG","Orientation":"landscape","PhotoSource":"http://3.bp.blogspot.com/-ZHS6zUxTAlM/TvQdho6XzjI/AAAAAAAALVM/NRXcVeiMTWk/s1600/Airport.JPG"},
{"id":"film_31","FILM":"Home Alone","Location":"Trinity United Methodist Church","Latitude":42.079281,"Longitude":-87.705096,"Address":"1024 Lake Avenue, Wilmette, IL","Trivia":"The church where Kevin (Macaulay Culkin) hides during the Nativity scene and begins a most fruitful relationship with his estranged neighbor.","Photo":"Church.JPG","Orientation":"landscape","PhotoSource":"http://1.bp.blogspot.com/-ALncoIOY-60/TvQdpwsJcCI/AAAAAAAALVw/SYDgKXyFc78/s400/Church.JPG"},
{"id":"film_32","FILM":"Home Alone","Location":"Grand Food Center","Latitude":42.107955,"Longitude":-87.735721,"Address":"606 Green Bay Rd, Winnetka, IL","Trivia":"Even eight-year-old stowaways need to keep stock of their groceries.","Photo":"Grocery+2.JPG","Orientation":"landscape","PhotoSource":"http://3.bp.blogspot.com/-piYyUmA1KOo/TvQdx9GeujI/AAAAAAAALWE/NKh5klMpoiQ/s400/Grocery+2.JPG"},
{"id":"film_33","FILM":"Home for the Holidays","Location":"Warner Brothers Studios","Latitude":34.09729,"Longitude":-118.316922,"Address":"5800 Sunset Boulevard, Hollywood, Los Angeles, CA","Trivia":"In Home for the Holidays, Thanksgiving took place inside a Hollywood studio. Home is where you make it, folks.","Photo":"Home_for_the_Holidays_film.jpg","Orientation":"portrait","PhotoSource":"http://upload.wikimedia.org/wikipedia/en/c/ce/Home_for_the_Holidays_film.jpg"},
{"id":"film_34","FILM":"It's a Wonderful Life","Location":"RKO Radio Pictures Studio","Latitude":34.024232,"Longitude":-118.392507,"Address":"Culver City, CA","Trivia":"Classics such as It's a Wonderful Life were typically filmed in a Hollywood studio. Kinda like the moon landing (except not really).","Photo":"its-a-wonderful-life-sequel.jpg","Orientation":"landscape","PhotoSource":"http://pmcvariety.files.wordpress.com/2013/11/its-a-wonderful-life-sequel.jpg?w=670&h=377&crop=1"},
{"id":"film_35","FILM":"Jingle All the Way","Location":"Mall of America","Latitude":44.854792,"Longitude":-93.241675,"Address":"60 E Broadway, Bloomington, MN","Trivia":"Follow Howard's (Arnold Schwarzenegger) footsteps and race to find the last Turbo Man action figure so that your child will love you.","Photo":"Screen+Shot+2013-12-22+at+12.49.21+PM.jpg","Orientation":"landscape","PhotoSource":"http://3.bp.blogspot.com/-FFRzWLLmXxM/UrdvGEWdIVI/AAAAAAAAQFg/aKRUiXtHP_M/s1600/Screen+Shot+2013-12-22+at+12.49.21+PM.jpg"},
{"id":"film_36","FILM":"Jingle All the Way","Location":"Mickey's Diner","Latitude":44.947411,"Longitude":-93.098143,"Address":"36 W 9th Stm St. Paul, MN","Trivia":"Stop by Mickey's for a cup of joe to refill your Christmas spirit. If you're lucky, Arnold and Sinbad may be present.","Photo":"mick5.jpg","Orientation":"landscape","PhotoSource":"http://2.bp.blogspot.com/-Qqzkt-GlgUg/Uk7kVL5cT6I/AAAAAAAACns/-EBpvdRFRTc/s1600/mick5.jpg"},
{"id":"film_37","FILM":"Kiss Kiss Bang Bang","Location":"The Standard","Latitude":34.050152,"Longitude":-118.256986,"Address":"550 S. Flower St, Los Angeles, CA","Trivia":"The hotel where Harry (Robert Downey Jr.) stays, and finds a dead body planted in his room, is The Standard! Merry Christmas!","Photo":"Standard-lobby.jpg","Orientation":"landscape","PhotoSource":"http://www.seeing-stars.com/Locations/KissKissBangBang/Standard-lobby.jpg"},
{"id":"film_38","FILM":"Kiss Kiss Bang Bang","Location":"Hollywood Christmas Party","Latitude":34.247075,"Longitude":-118.6246,"Address":"22824 Trigger St, Chatsworth, CA","Trivia":"The Christmas party in Kiss Kiss Bang Bang is surprisingly located in Val Kilmer's hometown of Chatsworth, CA.","Photo":"PartyHouse.jpg","Orientation":"landscape","PhotoSource":"http://www.seeing-stars.com/Locations/KissKissBangBang/PartyHouse.jpg"},
{"id":"film_39","FILM":"Kiss Kiss Bang Bang","Location":"MacArthur Park","Latitude":34.060447,"Longitude":-118.277207,"Address":"2230 West 6th St, Los Angeles, CA","Trivia":"Harmony (Michelle Monaghan) runs off at night as a scantily-clad Santa to warn Perry about an impending ambush at MacArthur Park!","Photo":"kiss-kiss-bang-bang-michelle-monaghan.jpg","Orientation":"landscape","PhotoSource":"http://twscritic.files.wordpress.com/2012/06/kiss-kiss-bang-bang-michelle-monaghan.jpg"},
{"id":"film_40","FILM":"Lethal Weapon","Location":"Emser Tile","Latitude":34.090922,"Longitude":-118.373802,"Address":"8431 Santa Monica Boulevard, Los Angeles, CA","Trivia":"Do you really wanna jump? Do you wanna? Well, that's fine with me. Let's do it, asshole. Come on, I wanna do it, I wanna do it.","Photo":"emser-tile-los-angeles-ca.jpg","Orientation":"landscape","PhotoSource":"http://media.yellowbot.com/r/650x500/photos/5-23W5yN_x--/emser-tile-los-angeles-ca.jpg"},
{"id":"film_41","FILM":"Lethal Weapon","Location":"International Tower","Latitude":33.765741,"Longitude":-118.184199,"Address":"700 E Ocean Blvd, Long Beach, CA","Trivia":"The murder that starts it all, when Amanda Hunsaker jumps to her death after a lethal dosage of drugs.","Photo":"Los+Angeles+2011+689.jpg","Orientation":"landscape","PhotoSource":"http://2.bp.blogspot.com/-1Oobo_mAUbc/TmWlxj3ILGI/AAAAAAAAFwk/uocdftypRCI/s400/Los+Angeles+2011+689.jpg"},
{"id":"film_42","FILM":"Lethal Weapon","Location":"Sgt. Riggs' Camper","Latitude":33.922817,"Longitude":-118.432019,"Address":"Dockweiler State Beach, west end of Grand Ave, El Segundo","Trivia":"The luxurious lifestyle for a not luxurious cop.","Photo":"Beach.jpg","Orientation":"landscape","PhotoSource":"http://3.bp.blogspot.com/-shAZJZCFL40/TxJbzMRZoBI/AAAAAAAANAI/Zqp9IXmmcAY/s400/Beach.jpg"},
{"id":"film_43","FILM":"Lethal Weapon","Location":"Drug Bust","Latitude":34.186975,"Longitude":-118.403956,"Address":"12425 Victory Blvd, North Hollywood, CA","Trivia":"Pick yourself up a Christmas tree and watch the drug busts from a comfortable distance in this scene, staged at a used car lot.","Photo":"Cocaine+1.JPG","Orientation":"landscape","PhotoSource":"http://1.bp.blogspot.com/-TtVKl_bMFdQ/TmWfWLs0z9I/AAAAAAAAFu0/q81zZ956hcA/s400/Cocaine+1.JPG"},
{"id":"film_44","FILM":"Meet Me in St. Louis","Location":"Kensington Avenue","Latitude":38.617389,"Longitude":-90.213915,"Address":"5135 Kensington Ave, Lafayette Square, St. Louis, MO","Trivia":"Unfortunately, the great, majestic Victorian featured in Meet Me in St. Louis is now an empty lot—but you can still cherish the memories.","Photo":"Summer-exterior-512x384.jpg","Orientation":"landscape","PhotoSource":"http://hookedonhouses.net/wp-content/uploads/2009/11/Summer-exterior-512x384.jpg"},
{"id":"film_45","FILM":"Miracle on 34th Street","Location":"Macy's","Latitude":40.750793,"Longitude":-73.989536,"Address":"151 W 34th St, Manhattan, NY","Trivia":"May the Santa Claus at this particular Macy's be perpetually intoxicated, drunk on Christmas spirit.","Photo":"97-190.jpg","Orientation":"landscape","PhotoSource":"http://www.movielocationsguide.com/images/locations/97-190.jpg"},
{"id":"film_46","FILM":"Miracle on 34th Street","Location":"New York Supreme Court Building","Latitude":40.714275,"Longitude":-74.001493,"Address":"60 Centre St, Manhattan, NY","Trivia":"Relive Kris Kringle's trial at the New York Supreme Court Building this holiday season.","Photo":"97-137.jpg","Orientation":"landscape","PhotoSource":"http://www.movielocationsguide.com/images/locations/97-137.jpg"},
{"id":"film_47","FILM":"Mixed Nuts","Location":"Kaufman Astoria Studios","Latitude":40.756529,"Longitude":-73.924624,"Address":"3412 36th St, Astoria, Queens, NY","Trivia":"Studio magic, as Mixed Nuts was largely filmed at Kaufman Astoria Studios in Queens, NY.","Photo":"51PR4CJZZ1L.jpg","Orientation":"portrait","PhotoSource":"http://ecx.images-amazon.com/images/I/51PR4CJZZ1L.jpg"},
{"id":"film_48","FILM":"Money Train","Location":"Courthouse","Latitude":40.712931,"Longitude":-74.003748,"Address":"1 Centre St, Manhattan, NY","Trivia":"Follow John (Wesley Snipes) and Charlie's (Woody Harrelson) and hatch your Christmas money making schemes at New York's pristine judicial institutions. ","Photo":"moneytrain02.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/moneytrain/moneytrain02.jpg"},
{"id":"film_49","FILM":"Money Train","Location":"McHale's Steak Restaurant","Latitude":40.759791,"Longitude":-73.987927,"Address":"750 8th Ave and West 46th St, Manhattan, NY","Trivia":"McHale's is actually no longer around, as it was demolished and replaced by an office block. ","Photo":"moneytrain11.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/moneytrain/moneytrain11.jpg"},
{"id":"film_50","FILM":"New Year's Eve","Location":"Times Square","Latitude":40.756034,"Longitude":-73.986945,"Address":"West 42nd Street and 7th Ave, Manhattan NY","Trivia":"There's nothing like Time's Square on New Year's Eve. ","Photo":"burst-600x379.png","Orientation":"landscape","PhotoSource":"http://timessquareball.net/wp-content/uploads/2010/11/burst-600x379.png"},
{"id":"film_51","FILM":"New Year's Eve","Location":"Elise's Apartment","Latitude":40.726611,"Longitude":-73.994131,"Address":"20 Bond Street and Lafayette Street, Manhattan NY","Trivia":"If we had to spend New Year's Even trapped on an elevator that would be fine as long as Ashton was there. ","Photo":"ashton-kutcher-as-randy-in-new-year-s-eve.jpg","Orientation":"landscape","PhotoSource":"http://media.theiapolis.com/d8/h35S/iFX1/qW/s7/t4/wLO/y04/ashton-kutcher-as-randy-in-new-year-s-eve.jpg?cdn=1415656062"},
{"id":"film_52","FILM":"New Year's Eve","Location":"Queen's Museum of Art","Latitude":40.74567,"Longitude":-73.84649,"Address":"New York City Building, Flushing Meadows Corona Park, Queens, NY","Trivia":"Walk all five boroughs in one day","Photo":"04_museum_of_art.jpg","Orientation":"landscape","PhotoSource":"http://www.nycgovparks.org/pagefiles/27/04_museum_of_art.jpg"},
{"id":"film_53","FILM":"Nobody's Fool","Location":"Beacon, New York","Latitude":41.504816,"Longitude":-73.969583,"Address":"Beacon, New York","Trivia":"Nobody's Fool is a classic use of Thanksgiving as a medium to examine family drama and was largely filmed in the Beacon, NY area.","Photo":"220px-Nobodysfool.jpg","Orientation":"portrait","PhotoSource":"http://upload.wikimedia.org/wikipedia/en/thumb/3/39/Nobodysfool.jpg/220px-Nobodysfool.jpg"},
{"id":"film_54","FILM":"Pieces of April","Location":"April's Apartment","Latitude":40.719686,"Longitude":-73.982833,"Address":"141 Ridge St and Stanton St, Manhattan, NY","Trivia":"Bring your family for a Thanksgiving dinner, Lower East Side style, just try to be a bit more functional than April's.","Photo":"piecesofapril11.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/piecesofapril/piecesofapril11.jpg"},
{"id":"film_55","FILM":"Planes, Trains and Automobiles","Location":"E 5th St & Park Ave","Latitude":40.742685,"Longitude":-74.032188,"Address":"E 5th St & Park Ave, Manhattan, NY","Trivia":"Neal (Steve Martin) and Del (John Candy) first cross paths here, where Del steals Neal's taxi. The first round of trouble happens for the original Due Date duo starts here, folks.","Photo":"NY+2.jpg","Orientation":"landscape","PhotoSource":"http://4.bp.blogspot.com/-B7FBHe8OV5U/UX4eJITgwrI/AAAAAAAAeZ4/TciiiJA8jGE/s400/NY+2.jpg"},
{"id":"film_56","FILM":"Planes, Trains and Automobiles","Location":"Sun Motel","Latitude":41.263714,"Longitude":-88.243811,"Address":"140 South Hickory St, Braidwood, IL","Trivia":"They're not pillows!","Photo":"Planes_Trains_Automobiles_Braidwood.jpg","Orientation":"landscape","PhotoSource":"http://www.movie-locations.com/movies/p/Planes_Trains_Automobiles_Braidwood.jpg"},
{"id":"film_57","FILM":"Planes, Trains and Automobiles","Location":"South Dayton Train Station","Latitude":42.417917,"Longitude":-78.975299,"Address":"112 E. Railroad Street, South Dayton, Buffalo, NY","Trivia":"The town, dubbed Stubbsville, is actually none other than South Dayton at Buffalo, NY, arriving at the South Dayton Train Station! ","Photo":"Train+Depot+2.jpg","Orientation":"landscape","PhotoSource":"http://3.bp.blogspot.com/-_ttQAG1pkfY/UX4eQqJZTHI/AAAAAAAAebA/PHlfrEAuDGY/s1600/Train+Depot+2.jpg"},
{"id":"film_58","FILM":"Planes, Trains and Automobiles","Location":"St Louis Lambert International Airport","Latitude":38.740921,"Longitude":-90.364467,"Address":"10701 Lambert International Blvd, St Louis, MO","Trivia":"The airport where Neal breaks down into a F-bomb fit is the Lambert International Airport, albeit most scenes were filmed on set as to avoid delays for travelers.","Photo":"Airport+2.jpg","Orientation":"landscape","PhotoSource":"http://4.bp.blogspot.com/-okoB3GOMgBU/UX4deQmrbvI/AAAAAAAAeYg/F5JQPaNT-mY/s1600/Airport+2.jpg"},
{"id":"film_59","FILM":"Planes, Trains and Automobiles","Location":"El Rancho Motel","Latitude":42.392908,"Longitude":-87.926432,"Address":"36355 North Highway 41, Gurnee, IL","Trivia":"Both Neal (Steve Martin) and Del (John Candy) seek refuge at this motel after their rental car bursts in flames.","Photo":"el-rancho-motel-5294bfc77ecf17e58d00014c.jpg","Orientation":"landscape","PhotoSource":"https://res.cloudinary.com/roadtrippers/image/upload/c_fill,h_316,w_520/v1385480136/el-rancho-motel-5294bfc77ecf17e58d00014c.jpg"},
{"id":"film_60","FILM":"Planes, Trains and Automobiles","Location":"Page Residence","Latitude":42.087251,"Longitude":-87.707934,"Address":"230 Oxford Rd, Kenilworth, IL","Trivia":"Stop by for a Thanksgiving meal with the Page family—although not really, because that would be weird and real people live here.","Photo":"House+1.jpg","Orientation":"landscape","PhotoSource":"http://4.bp.blogspot.com/-PSmRKtMqo7E/UX4dheIgelI/AAAAAAAAeZQ/fO1Drpdv4KY/s400/House+1.jpg"},
{"id":"film_61","FILM":"Scent of a Woman","Location":"Waldorf-Astoria Hotel","Latitude":40.756571,"Longitude":-73.973642,"Address":"301 Park Ave, Manhattan, NY","Trivia":"Nothing but the classiest for Lt. Col. Frank Slade (Al Pacino) and Charlie Simms (Chris O'Donnell) during their New York ventures in this Thanksgiving classic.","Photo":"scentofawoman30.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/scentofawoman/scentofawoman30.jpg"},
{"id":"film_62","FILM":"Scent of a Woman","Location":"The Oak Room at the Plaza Hotel","Latitude":40.764303,"Longitude":-73.973004,"Address":"5th Ave and 59th St, Manhattan, NY","Trivia":"When in Rome, do as the Romans—Lt. Col. Frank Slade (Al Pacino) and Charlie Simms (Chris O'Donnell) follow suit by dining at the Oak Room.","Photo":"scentofawoman36.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/scentofawoman/scentofawoman36.jpg"},
{"id":"film_63","FILM":"Scent of a Woman","Location":"Pierre Hotel","Latitude":40.765518,"Longitude":-73.972096,"Address":"5th Ave and E 61st St, Manhattan, NY","Trivia":"Do you tango? Lt. Col. Frank Slade (Al Pacino) does at the Pierre Hotel's ballroom.","Photo":"scentofawoman42.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/scentofawoman/scentofawoman42.jpg"},
{"id":"film_64","FILM":"Scent of a Woman","Location":"East River Front","Latitude":40.703693,"Longitude":-73.984629,"Address":"Plymouth St, Brooklyn, NY","Trivia":"Apparently blindness isn't enough of an impairment to stop Lt. Col. Frank Slade (Al Pacino) from driving a Ferrari along Brooklyn's East River Front.","Photo":"scentofawoman48.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/scentofawoman/scentofawoman48.jpg"},
{"id":"film_65","FILM":"Scent of a Woman","Location":"Emma Willard School","Latitude":42.71337,"Longitude":-73.661896,"Address":"285 Pawlings Avenue, Troy, NY","Trivia":"Charlie Simms' (Chris O'Donnell) uppity preparatory school is actually the Emma Willard School, a boarding school for young women.","Photo":"image.jpg","Orientation":"landscape","PhotoSource":"http://www.ctvnews.ca/polopoly_fs/1.1668375!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg"},
{"id":"film_66","FILM":"Scrooged","Location":"IBC","Latitude":40.758526,"Longitude":-73.971786,"Address":"375 Park Avenue, Manhattan, NY","Trivia":"The Seagram Building stands in as IBC ","Photo":"NewYorkSeagram_04.30.2008.JPG","Orientation":"portrait","PhotoSource":"http://upload.wikimedia.org/wikipedia/commons/f/f1/NewYorkSeagram_04.30.2008.JPG"},
{"id":"film_67","FILM":"Scrooged","Location":"O'Neals","Latitude":40.771951,"Longitude":-73.981587,"Address":"West 64th Street and Broadway, Manhattan","Trivia":"Beware the ghost of Christmas past","Photo":"scrooged_l.jpg","Orientation":"landscape","PhotoSource":"http://padresteve.files.wordpress.com/2009/12/scrooged_l.jpg"},
{"id":"film_68","FILM":"Sleepless in Seattle","Location":"O'Hare International Airport","Latitude":41.974163,"Longitude":-87.907321,"Address":"10000 W O'Hare Ave, Chicago, IL","Trivia":"Love has to start somewhere—in this V-Day classic, widower Sam Baldwin (Tom Hanks) leaves Chicago, and the heartbreak, behind at O'Hare International Airport.","Photo":"IMG_2547.jpg","Orientation":"landscape","PhotoSource":"http://2.bp.blogspot.com/-IlBnHwCaTUw/TvFFya7WjdI/AAAAAAAABM0/2ZyVlJnMOp8/s1600/IMG_2547.jpg"},
{"id":"film_69","FILM":"Sleepless in Seattle","Location":"Sam's Houseboat","Latitude":47.64382,"Longitude":-122.344648,"Address":"2640 Westlake Avenue North, Seattle, WA","Trivia":"Sam Baldwin (Tom Hanks) and his son Jonah (Ross Malinger) settle down in this cozy houseboat after departing from Chicago.","Photo":"sleepless14.jpg","Orientation":"landscape","PhotoSource":"http://www.filminamerica.com/Movies/SleeplessInSeattle/sleepless14.jpg"},
{"id":"film_70","FILM":"Sleepless in Seattle","Location":"Annie's Apartment","Latitude":39.281497,"Longitude":-76.593295,"Address":"904 South Broadway, Baltimore, MD","Trivia":"Annie's (Meg Ryan) lovely Baltimore apartment is actually located in Baltimore!  ","Photo":"sleeplessinseattle04A.jpg","Orientation":"landscape","PhotoSource":"http://www.themoviedistrict.com/wp-content/uploads/2014/06/sleeplessinseattle04A.jpg"},
{"id":"film_71","FILM":"Sleepless in Seattle","Location":"The Baltimore Sun","Latitude":39.295233,"Longitude":-76.611922,"Address":"501 North Calvert St, Baltimore, MD","Trivia":"Stop the presses, the Baltimore Sun's actual office building is feature in Valentine's Day favorite Sleepless in Seattle.","Photo":"baltimore-sun-building-1200xx1000-563-0-50.jpg","Orientation":"landscape","PhotoSource":"http://media.bizj.us/view/img/22841/baltimore-sun-building*1200xx1000-563-0-50.jpg"},
{"id":"film_72","FILM":"Sleepless in Seattle","Location":"The Capitol Diner","Latitude":39.292723,"Longitude":-76.610018,"Address":"400 East Saratoga St, Baltimore, MD","Trivia":"The diner Annie (Meg Ryan) stops at in DC is actually none other than Baltimore's own Hollywood Diner— unfortunately it's closed now!","Photo":"diner.jpg","Orientation":"landscape","PhotoSource":"http://www.onlocationvacations.com/wp-content/uploads/2007/07/diner.jpg"},
{"id":"film_73","FILM":"Sleepless in Seattle","Location":"The Empire State Building","Latitude":40.748183,"Longitude":-73.985064,"Address":"350 5th Ave, New York, NY","Trivia":"The climatic Valentine's day meet-up, inspired by An Affair to Remember, happens at the Empire State Building's Observation Deck. ","Photo":"sleepless-in-seattle.jpg","Orientation":"landscape","PhotoSource":"http://o5.com/wp-content/uploads/2013/09/sleepless-in-seattle.jpg"},
{"id":"film_74","FILM":"Son in Law","Location":"Visalia, CA","Latitude":36.330228,"Longitude":-119.292058,"Address":"Visalia, CA","Trivia":"Thanksgiving will never be the same again, as city slicker Crawl (Pauly Shore) adjusts to country life in agricultural town of Visalia.","Photo":"soninlaw-wild-ride-wednesday.jpg","Orientation":"landscape","PhotoSource":"http://4.bp.blogspot.com/_amPffjs8DYE/TFCQuzQWXyI/AAAAAAAAAJ4/GEAQUCOvGYM/s1600/soninlaw-wild-ride-wednesday.jpg"},
{"id":"film_75","FILM":"ThanksKilling","Location":"Granville, OH","Latitude":40.068119,"Longitude":-82.519604,"Address":"Granville, OH","Trivia":"A murderous turkey runs loose hacking college students on Thanksgiving. Give thanks and pray.","Photo":"MV5BMTk2Mjk1MjQ4OF5BMl5BanBnXkFtZTcwMjg3MTE2OA@@._V1_SY317_CR3,0,214,317_AL_.jpg","Orientation":"portrait","PhotoSource":"http://ia.media-imdb.com/images/M/MV5BMTk2Mjk1MjQ4OF5BMl5BanBnXkFtZTcwMjg3MTE2OA@@._V1_SY317_CR3,0,214,317_AL_.jpg"},
{"id":"film_76","FILM":"The Apartment","Location":"Baxter's Apartment","Latitude":40.775366,"Longitude":-73.979346,"Address":"55 West 69th St, Manhattan, NY","Trivia":"Baxter's (Jack Lemmon) Upper West Side apartment, the scene of the film's raucous Christmas party, is here and not at the film's provided 51 W 67th St!","Photo":"theapartment13.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/theapartment/theapartment13.jpg"},
{"id":"film_77","FILM":"The Bishop's Wife","Location":"Minneapolis, Minnesota","Latitude":44.983334,"Longitude":-93.26667,"Address":"Minneapolis, Minnesota","Trivia":"This Christmas film, which is not religious, is apparently set in New York City, although filmed at Minneapolis!","Photo":"Annex_-_Grant_Cary_Bishops_Wife_The_NRFPT_01.jpg","Orientation":"landscape","PhotoSource":"http://www.diablomag.com/D-blog/Petes-Popcorn-Picks/December-2012/Win-tickets-to-see-THE-BISHOPS-WIFE-at-the-Orinda-Theatre/Annex_-_Grant_Cary_Bishops_Wife_The_NRFPT_01.jpg"},
{"id":"film_78","FILM":"The Bishop's Wife","Location":"Loring Park","Latitude":44.968286,"Longitude":-93.283806,"Address":"Loring Greenway, Minneapolis, MN 55403, USA","Trivia":"Snowball fight!","Photo":"bishopswifegrantgrimes(1).jpg","Orientation":"landscape","PhotoSource":"https://knoji.com/images/user/bishopswifegrantgrimes(1).jpg"},
{"id":"film_79","FILM":"The Family Man","Location":"Teaneck, NJ","Latitude":40.893247,"Longitude":-74.011654,"Address":"Teaneck, NJ","Trivia":"Welcome to suburbia! Teaneck is the town that Jack Campbell (Nicolas Cage) mysteriously wakes up with his humble wife and kids on Christmas Day.","Photo":"key095723800s13832151930d7LYaTr6NeqngO2cvcsBX6mBVP.jpg","Orientation":"landscape","PhotoSource":"http://www.teledunet.com/PICTURE//key095723800s13832151930d7LYaTr6NeqngO2cvcsBX6mBVP.jpg"},
{"id":"film_80","FILM":"The Family Man","Location":"Magical Convenience Store","Latitude":40.759851,"Longitude":-73.971491,"Address":"407 Park Ave, Manhattan, NY","Trivia":"Step in here on Christmas eve and you may just end up in an alternate universe with a mini-man, wife, and two and a half kids.","Photo":"familyman13.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/thefamilyman/familyman13.jpg"},
{"id":"film_81","FILM":"The Family Stone","Location":"The Bus Stop","Latitude":40.762738,"Longitude":-74.421633,"Address":"Drew University, Madison, New Jersey","Trivia":"The bus stop Julie is at when Everett comes to stop her from leaving is actually part of Drew University's campus. ","Photo":"Drew.jpg","Orientation":"landscape","PhotoSource":"http://www.campustravel.com/university/drew/images/Drew.jpg"},
{"id":"film_82","FILM":"The Family Stone","Location":"Stone HQ","Latitude":41.029361,"Longitude":-73.589393,"Address":"144 Riverside Ave, Riverside, CT 06878","Trivia":"The Family Stone was filmed in Riverdale, CT.","Photo":"The-Family-Stone-movie-white-house-in-snow.jpg","Orientation":"landscape","PhotoSource":"http://hookedonhouses.net/wp-content/uploads/2008/12/The-Family-Stone-movie-white-house-in-snow.jpg"},
{"id":"film_83","FILM":"The Holiday","Location":"Amanda's House","Latitude":34.133264,"Longitude":-118.111752,"Address":"1883 Orlando Road, San Marino, CA","Trivia":"Get away from the holidays at this beautiful Santa Fe style mansion—except not really. Someone probably lives here. That would be weird.","Photo":"amandas_house.jpg","Orientation":"landscape","PhotoSource":"http://static.squarespace.com/static/5266b2bde4b08e763cc132d2/t/5312bc1ae4b0bc05fe2899c4/1393736731390/amandas_house.jpg?format=1000w"},
{"id":"film_84","FILM":"The Holiday","Location":"Miles's House","Latitude":36.778261,"Longitude":-119.417932,"Address":"2210 Neutra Place, Neutra Colony, CA","Trivia":"Miles's house is actually the Ohara House, designed by modern architect Richard Neutra in 1961.","Photo":"miles1.jpg","Orientation":"landscape","PhotoSource":"http://static.squarespace.com/static/5266b2bde4b08e763cc132d2/t/5312c6a7e4b019c52e33184f/1393739431380/miles1.jpg?format=1000w"},
{"id":"film_85","FILM":"The Holiday","Location":"The Grill on the Alley","Latitude":34.067361,"Longitude":-118.401894,"Address":"9560 Dayton Way, Beverly Hills, CA","Trivia":"The restaurant Iris and Arthur stop at for a bite to eat.","Photo":"thegrill.jpg","Orientation":"landscape","PhotoSource":"http://static.squarespace.com/static/5266b2bde4b08e763cc132d2/t/5312c767e4b0e36de297026f/1393739623817/thegrill.jpg?format=1000w"},
{"id":"film_86","FILM":"The Hudsucker Proxy","Location":"The Hudsucker Building","Latitude":41.88837,"Longitude":-87.635364,"Address":"222 W Merchandise Mart Plaza, Chicago, IL","Trivia":"The Hudsucker Building, in all its CGI-enhanced glory, is the Merchandise Mart building in Chicago, which serves as the central plot location in the holiday-central Hollywood flop from the Coen Brothers.","Photo":"MerchandiseMartTop_HudsuckerProxy.jpg","Orientation":"landscape","PhotoSource":"http://2.bp.blogspot.com/-XhBzDpcFL4I/UN3vs1D_h1I/AAAAAAAAEgk/i8Z3sbiKA14/s1600/MerchandiseMartTop_HudsuckerProxy.jpg"},
{"id":"film_87","FILM":"The Ice Storm","Location":"George and Janey's House","Latitude":41.180833,"Longitude":-73.490302,"Address":"Laurel Rd, New Canaan, CT","Trivia":"Treat yourself to one of the most craziest Thanksgiving films ever created with The Ice Storm. New Canaan sure is a strange place with morally twisted individuals.","Photo":"theicestorm06.jpg","Orientation":"landscape","PhotoSource":"http://themoviedistrict.com/wp-content/uploads/2013/10/theicestorm06.jpg"},
{"id":"film_88","FILM":"The Ice Storm","Location":"Ben and Elena's House","Latitude":41.151118,"Longitude":-73.52098,"Address":"Chichester Rd, New Canaan, CT","Trivia":"Only in New Canaan will you find holiday swinger parties.","Photo":"theicestorm07.jpg","Orientation":"landscape","PhotoSource":"http://themoviedistrict.com/wp-content/uploads/2013/10/theicestorm07.jpg"},
{"id":"film_89","FILM":"The Preacher's Wife","Location":"Bigg's New York City Church","Latitude":40.7226,"Longitude":-74.204366,"Address":"581 Clinton Ave, Newark, NJ","Trivia":"Whitney Houston just wanted to feel the heat of somebody in this Christmas reboot (but probably not at church).","Photo":"220px-ThePreachersWife-movie.jpg","Orientation":"portrait","PhotoSource":"http://upload.wikimedia.org/wikipedia/en/thumb/c/c5/ThePreachersWife-movie.jpg/220px-ThePreachersWife-movie.jpg"},
{"id":"film_90","FILM":"Valentines Day","Location":"Reed's Flower Shop","Latitude":34.169575,"Longitude":-118.340948,"Address":"3100 W Magnolia Boulevard, Los Angeles, CA","Trivia":"What's a Valentine's Day movie without Ashton Kutcher styled as a florist?","Photo":"ScreenShot5627.jpg","Orientation":"landscape","PhotoSource":"http://www.iamnotastalker.com/wp-content/uploads/2010/09/ScreenShot5627.jpg"},
{"id":"film_91","FILM":"Valentines Day","Location":"The Bistro Garden","Latitude":34.144996,"Longitude":-118.41523,"Address":"12950 Ventura Boulevard, Los Angeles, CA","Trivia":"No stranger to films and TV, the Bistro Garden is where Julia Fitzpatrick (Jennifer Garner) confronts her two-timing boyfriend Dr. Harrison (Patrick Dempsey).","Photo":"ScreenShot5029.jpg","Orientation":"landscape","PhotoSource":"http://www.iamnotastalker.com/wp-content/uploads/2010/07/ScreenShot5029.jpg"},
{"id":"film_92","FILM":"Valentines Day","Location":"The Flower Market","Latitude":34.040473,"Longitude":-118.24961,"Address":"754 Wall St, Los Angeles, CA","Trivia":"Look at all these flowers! It's like Valentine's Day or something!","Photo":"ScreenShot4569.jpg","Orientation":"landscape","PhotoSource":"http://www.iamnotastalker.com/wp-content/uploads/2010/05/ScreenShot4569.jpg"},
{"id":"film_93","FILM":"When Harry Met Sally","Location":"Washington Square Park","Latitude":40.731456,"Longitude":-73.997121,"Address":"Washington Square Park, Manhattan, NY","Trivia":"What's a homecoming without Washington Square Park?","Photo":"Whenharrymetsally17.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/whenharrymetsally/Whenharrymetsally17.jpg"},
{"id":"film_94","FILM":"When Harry Met Sally","Location":"Loeb Boathouse","Latitude":40.772452,"Longitude":-73.967038,"Address":"East 72nd Street and 5th Avenue, New York, NY 10021","Trivia":"Evidently the Loeb Boathouse is a great location for gossip alongside high-fare dinner.","Photo":"whenharrymetsally13.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/whenharrymetsally/whenharrymetsally13.jpg"},
{"id":"film_95","FILM":"When Harry Met Sally","Location":"Katz's Delicatessen","Latitude":40.722505,"Longitude":-73.987083,"Address":"205 East Houston Street and Ludlow Street, Manhattan, NY","Trivia":"We all know what happens here—Sally enjoys quite the sandwich.","Photo":"whenharrymetsally08.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/whenharrymetsally/whenharrymetsally08.jpg"},
{"id":"film_96","FILM":"When Harry Met Sally","Location":"Shakespeare & Co. Booksellers","Latitude":40.76815,"Longitude":-73.963436,"Address":"Broadway and 79th St, Manhattan, NY","Trivia":"Surprise! The bookstore closed once a Barnes & Noble opened nearby.","Photo":"zz+harry+in+book+store+WhenHarry-073010-0004.jpg","Orientation":"landscape","PhotoSource":"http://2.bp.blogspot.com/-Cc34OwV8cUc/TxnRStGwE-I/AAAAAAAADEQ/eQnXutEPnbw/s1600/zz+harry+in+book+store+WhenHarry-073010-0004.jpg"},
{"id":"film_97","FILM":"When Harry Met Sally","Location":"Metropolitan Museum of Art","Latitude":40.778942,"Longitude":-73.962303,"Address":"1000 5th Avenue and East 82nd Street, Manhattan, NY","Trivia":"Tough words are exchanged at the MoMA.","Photo":"Whenharrymetsally28.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/whenharrymetsally/Whenharrymetsally28.jpg"},
{"id":"film_98","FILM":"When Harry Met Sally","Location":"Café Luxembourg","Latitude":40.777313,"Longitude":-73.982603,"Address":"200 West 70th Street and Amsterdam Avenue, Manhattan, NY","Trivia":"Happy New Year's! Usher in the new year a la When Harry Met Sally at Café Luxembourg!","Photo":"Whenharrymetsally51.jpg","Orientation":"landscape","PhotoSource":"http://onthesetofnewyork.com/locations/whenharrymetsally/Whenharrymetsally51.jpg"},
{"id":"film_99","FILM":"While You Were Sleeping","Location":"Emmanuel Episcopal Church","Latitude":41.810225,"Longitude":-87.873802,"Address":"203 S. Kensington Avenue, La Grange","Trivia":"Romance tends to start in a church—and here is the church where Lucy's parents were married.","Photo":"Church.JPG","Orientation":"landscape","PhotoSource":"http://4.bp.blogspot.com/-NLDZr9Dh4XU/TvlXtrcx9bI/AAAAAAAALlQ/pj4Bn9lFjhQ/s400/Church.JPG"},
{"id":"film_100","FILM":"While You Were Sleeping","Location":"Randolph/Wabash Station","Latitude":41.884595,"Longitude":-87.626205,"Address":"151 N. Wabash Avenue, Chicago","Trivia":"It all starts here—the train station Lucy (Sandra Bullock) works at and where Peter Callaghan (Peter Gallagher) has his little coma-inducing accident.","Photo":"El+4.JPG","Orientation":"landscape","PhotoSource":"http://3.bp.blogspot.com/-DKymydK7yWw/TvlX1rjskoI/AAAAAAAALl0/cxAa_5AXGkk/s400/El+4.JPG"},
{"id":"film_101","FILM":"While You Were Sleeping","Location":"Lucy's Apartment Building","Latitude":41.928115,"Longitude":-87.703263,"Address":"3017 W. Logan Blvd, Chicago","Trivia":"Lucy's (Sandra Bullock) apartment isn't spectacular, but nonetheless interesting in its Christmas décor!","Photo":"Apartment+2.JPG","Orientation":"landscape","PhotoSource":"http://3.bp.blogspot.com/-s9P2zS4XExY/TvlXWgXxEVI/AAAAAAAALkY/3Sa6xMJyvrc/s400/Apartment+2.JPG"},
{"id":"film_102","FILM":"While You Were Sleeping","Location":"Northwestern Memorial Hospital","Latitude":41.89464,"Longitude":-87.621127,"Address":"251 E. Huron Street, Chicago","Trivia":"The hospital that hatches the movie's plot is Northwestern Memorial Hospital (multiple entrances are featured, but we find this one to be most prominent).","Photo":"Hospital+1.JPG","Orientation":"landscape","PhotoSource":"http://4.bp.blogspot.com/-e0vmcjQlULE/TvlYSrr3gEI/AAAAAAAALmk/IyFv1lovFZU/s400/Hospital+1.JPG"},
{"id":"film_103","FILM":"While You Were Sleeping","Location":"The Callaghan Family House","Latitude":41.810518,"Longitude":-87.865085,"Address":"203 8th Avenue, La Grange","Trivia":"Suburban living done at it's finest at the Callaghan family house, happily situated in La Grange.","Photo":"Family+Home+1.JPG","Orientation":"landscape","PhotoSource":"http://1.bp.blogspot.com/-Q4_09j99lJw/TvlYAkTtXXI/AAAAAAAALmI/Rn_LeswABDQ/s400/Family+Home+1.JPG"},
{"id":"film_104","FILM":"While You Were Sleeping","Location":"Peter Callaghan's Building","Latitude":41.891603,"Longitude":-87.612301,"Address":"505 N. Lake Shore Drive, Chicago","Trivia":"Peter's (Peter Gallagher) apartment is at the wonderful Lake Point Tower.","Photo":"Building+3.JPG","Orientation":"landscape","PhotoSource":"http://3.bp.blogspot.com/-7orLAChqB1w/TvlXlfzf-_I/AAAAAAAALlE/csn5sQlVEcE/s400/Building+3.JPG"},
{"id":"film_105","FILM":"White Christmas","Location":"Columbia Inn","Latitude":34.084449,"Longitude":-118.319196,"Address":"5555 Melrose Avenue, Hollywood, Los Angeles, CA","Trivia":"White Christmas' Columbia Inn of Pine Tree, Vermont is, unfortunately, a studio fabrication of Paramount. Merry Christmas!","Photo":"White-Christmas-Columbia-Inn-Pine-Tree-Vermont.jpg","Orientation":"landscape","PhotoSource":"http://hookedonhouses.net/wp-content/uploads/2010/12/White-Christmas-Columbia-Inn-Pine-Tree-Vermont.jpg"}];

var imageSizes = [{image: "GA+Gas+2.jpg", height: 224, width: 400},
{image: "Screen+Shot+2013-12-22+at+12.49.21+PM.jpg", height: 309, width: 554},
{image: "Holiday-Inn-movie-house-cover.jpg", height: 470, width: 643},
{image: "Summer-exterior-512x384.jpg", height: 384, width: 512},
{image: "sleeplessinseattle04A.jpg", height: 384, width: 683},
{image: "200cigarettes04.jpg", height: 314, width: 565},
{image: "sleepless14.jpg", height: 300, width: 600},
{image: "homepagehouse.jpg", height: 338, width: 500},
{image: "MV5BMTk1NTU4NjE5OV5BMl5BanBnXkFtZTYwMTQ3OTY2._V1_SX640_SY720_.jpg", height: 718, width: 485},
{image: "higbees.jpg", height: 345, width: 500},
{image: "victoria25.jpg", height: 333, width: 500},
{image: "ScreenShot805_thumb.jpg", height: 372, width: 640},
{image: "bad-santa_billy_bob_thornton.jpg", height: 458, width: 610},
{image: "Die_Hard_2.jpg", height: 416, width: 281},
{image: "ScreenShot239_thumb.jpg", height: 445, width: 640},
{image: "harder04.jpg", height: 300, width: 600},
{image: "christmas-in-connecticut1.jpg", height: 549, width: 720},
{image: "Griswold-House-700px.jpg", height: 468, width: 700},
{image: "elf04.jpg", height: 305, width: 565},
{image: "elf05.jpg", height: 305, width: 565},
{image: "6120954804_bde31a0b45_z.jpg", height: 480, width: 640},
{image: "elf41.jpg", height: 305, width: 565},
{image: "ScreenShot6738_thumb.jpg", height: 487, width: 644},
{image: "ScreenShot6663_thumb.jpg", height: 487, width: 644},
{image: "Bell+1.jpg", height: 166, width: 400},
{image: "gremlins-town-square.jpg", height: 334, width: 600},
{image: "gom_house_1137.jpg", height: 500, width: 750},
{image: "gom_house_1122.jpg", height: 500, width: 750},
{image: "Mary_Hall_at_Berry_College.jpg", height: 1524, width: 2032},
{image: "Fox_Plaza_HD.jpg", height: 2240, width: 1704},
{image: "gom_house_1133.jpg", height: 500, width: 750},
{image: "hannahandhersisters17.jpg", height: 325, width: 565},
{image: "Home-Alone-movie-house-Christmas-lights.jpg", height: 338, width: 600},
{image: "Airport.JPG", height: 399, width: 704},
{image: "Church.JPG", height: 210, width: 400},
{image: "Church.JPG", height: 210, width: 400},
{image: "Grocery+2.JPG", height: 227, width: 400},
{image: "Home_for_the_Holidays_film.jpg", height: 382, width: 285},
{image: "mick5.jpg", height: 600, width: 1109},
{image: "Standard-lobby.jpg", height: 233, width: 550},
{image: "its-a-wonderful-life-sequel.jpg", height: 377, width: 670},
{image: "PartyHouse.jpg", height: 232, width: 550},
{image: "kiss-kiss-bang-bang-michelle-monaghan.jpg", height: 407, width: 570},
{image: "Beach.jpg", height: 300, width: 400},
{image: "97-190.jpg", height: 128, width: 220},
{image: "Cocaine+1.JPG", height: 227, width: 400},
{image: "Los+Angeles+2011+689.jpg", height: 300, width: 400},
{image: "emser-tile-los-angeles-ca.jpg", height: 487, width: 650},
{image: "moneytrain02.jpg", height: 234, width: 565},
{image: "51PR4CJZZ1L.jpg", height: 475, width: 329},
{image: "moneytrain11.jpg", height: 234, width: 565},
{image: "97-137.jpg", height: 128, width: 220},
{image: "ashton-kutcher-as-randy-in-new-year-s-eve.jpg", height: 550, width: 700},
{image: "04_museum_of_art.jpg", height: 225, width: 300},
{image: "220px-Nobodysfool.jpg", height: 328, width: 220},
{image: "burst-600x379.png", height: 379, width: 600},
{image: "piecesofapril11.jpg", height: 298, width: 565},
{image: "Train+Depot+2.jpg", height: 586, width: 1138},
{image: "Airport+2.jpg", height: 573, width: 1140},
{image: "NY+2.jpg", height: 209, width: 400},
{image: "Planes_Trains_Automobiles_Braidwood.jpg", height: 200, width: 300},
{image: "el-rancho-motel-5294bfc77ecf17e58d00014c.jpg", height: 316, width: 520},
{image: "House+1.jpg", height: 199, width: 400},
{image: "scentofawoman36.jpg", height: 297, width: 565},
{image: "scentofawoman42.jpg", height: 297, width: 565},
{image: "scentofawoman48.jpg", height: 297, width: 565},
{image: "scentofawoman30.jpg", height: 297, width: 565},
{image: "image.jpg", height: 334, width: 594},
{image: "scrooged_l.jpg", height: 240, width: 320},
{image: "diner.jpg", height: 205, width: 400},
{image: "baltimore-sun-building-1200xx1000-563-0-50.jpg", height: 563, width: 1000},
{image: "soninlaw-wild-ride-wednesday.jpg", height: 259, width: 450},
{image: "sleepless-in-seattle.jpg", height: 1000, width: 1602},
{image: "IMG_2547.jpg", height: 1200, width: 1600},
{image: "MV5BMTk2Mjk1MjQ4OF5BMl5BanBnXkFtZTcwMjg3MTE2OA@@._V1_SY317_CR3,0,214,317_AL_.jpg", height: 317, width: 214},
{image: "theapartment13.jpg", height: 233, width: 565},
{image: "bishopswifegrantgrimes(1).jpg", height: 225, width: 400},
{image: "familyman13.jpg", height: 247, width: 565},
{image: "Drew.jpg", height: 200, width: 300},
{image: "key095723800s13832151930d7LYaTr6NeqngO2cvcsBX6mBVP.jpg", height: 1080, width: 1920},
{image: "Annex_-_Grant_Cary_Bishops_Wife_The_NRFPT_01.jpg", height: 1200, width: 1600},
{image: "The-Family-Stone-movie-white-house-in-snow.jpg", height: 404, width: 500},
{image: "amandas_house.jpg", height: 422, width: 660},
{image: "miles1.jpg", height: 465, width: 654},
{image: "theicestorm06.jpg", height: 360, width: 655},
{image: "MerchandiseMartTop_HudsuckerProxy.jpg", height: 412, width: 720},
{image: "thegrill.jpg", height: 467, width: 655},
{image: "220px-ThePreachersWife-movie.jpg", height: 340, width: 220},
{image: "ScreenShot5627.jpg", height: 600, width: 796},
{image: "Whenharrymetsally17.jpg", height: 301, width: 565},
{image: "ScreenShot5029.jpg", height: 600, width: 797},
{image: "ScreenShot4569.jpg", height: 600, width: 767},
{image: "whenharrymetsally13.jpg", height: 302, width: 565},
{image: "whenharrymetsally08.jpg", height: 300, width: 565},
{image: "Whenharrymetsally28.jpg", height: 303, width: 565},
{image: "theicestorm07.jpg", height: 360, width: 655},
{image: "zz+harry+in+book+store+WhenHarry-073010-0004.jpg", height: 317, width: 470},
{image: "El+4.JPG", height: 208, width: 400},
{image: "Hospital+1.JPG", height: 208, width: 400},
{image: "Apartment+2.JPG", height: 210, width: 400},
{image: "Whenharrymetsally51.jpg", height: 304, width: 565},
{image: "Family+Home+1.JPG", height: 210, width: 400},
{image: "Building+3.JPG", height: 206, width: 400},
{image: "White-Christmas-Columbia-Inn-Pine-Tree-Vermont.jpg", height: 338, width: 600},
{image: "NewYorkSeagram_04.30.2008.JPG", height: 4206, width: 2736}];
