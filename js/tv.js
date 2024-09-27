var bounds = new google.maps.LatLngBounds();
var infowindow = null;
var map;
var borderColor = "Red";
var captionColor = "White";
var titleName = " ";
var polyCoordinates = [];
var polyPath;
var offset = {};
var myLatlng = new google.maps.LatLng(40.769,-73.976);

var icon = new google.maps.MarkerImage('http://88d7ba627ed950559363-30e28468b1509b2df5dcc8eb3b617e7c.r8.cf2.rackcdn.com/pins/pin_tv2.png',
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

	var myLatlng = new google.maps.LatLng(data.latitude, data.longitude);
	
	bounds.extend(myLatlng);
	
	//var icon = getMarker(data.pin);
	var caption = data.title + ' @ ' + data.location;
	var marker = new google.maps.Marker({
			position : myLatlng,
			map : map,
			icon : icon,
			title : caption
		});	
		

	google.maps.event.addListener(marker, 'click', function () {
		hookBalloon(map, marker, data);
	});
	return marker;
}

function toOrdinal (value) {
    var s = String(value),
      len = s.length,
      end  = s.substr(len - 1, 1),
      teen = len > 1 && s.substr(len - 2, 1) === "1",
      ord = "th";
    if (end === "1" && !teen) {
      ord = "st";
    } else if (end === "2" && !teen) {
      ord = "nd";
    } else if (end === "3" && !teen) {
      ord = "rd";
    }
    return value + '' + ord;
 }

function hookBalloon(map, marker, jData) {

	if (infowindow != null)
		infowindow.close();

	var background = "none";
	var bgColor = "#ffffff";
	
	var borderColor = "#0978A5";
	var captionColor = "#000000";
	var stndrdth = "th";
	var height = calculateHeight(jData,150);
	var image = jData.image;
	
	if (image == 'http://farm4.staticflickr.com/3538/3525724500_319398ff7b_o.jpg')
		image = 'http://88d7ba627ed950559363-30e28468b1509b2df5dcc8eb3b617e7c.r8.cf2.rackcdn.com/photos/carolines_1024.jpg';
	
	contentString = '<div style="background-color: white; border: 0px solid red;  width: 250px; padding: 10px; padding-bottom: 5px; text-align:left;" >' +
				'<div style="color: #0978A5; font-size: 12pt; line-height: 13pt; text-align:left; padding-bottom: 0px;">' + jData.title + '</div>' +
				'<a onclick="fakeLightbox(\'' + jData.id + '\'); return false;" href="#"><img border="0" style="float: right; padding: 5px 5px 5px 5px;" src="' + image + '" width="150" height="' +  height + '" align="right" /></a>' + 
				'<div style="font-size:11pt; font-weight: bold; color: black;  line-height: 12pt;"><i>' + jData.location + '</i></div>' +
				'<div style="padding: 3px 0 8px 0 ; color: black; font-size: 10pt; line-height: 10pt !important; font-weight: normal; text-align:left; width: 230px;">' + 
				jData.trivia + '</div>' +
				'<a target="_blank" href="' + jData.image + '" style="font-size: 8pt; font-weight: normal; font-style: italic; color: #c1c1c1 !important;">Click for photo source</a>' +
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
	var disablePoi = [
	   {
		 featureType: "poi",
		 stylers: [
		  { visibility: "off" }
		 ]   
		}
	];
	
	var myOptions = {
		zoom : 13,
		center : myLatlng,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		mapTypeControl : false,
		panControl: false,
		zoomControl: false,
		scaleControl: false,
		streetViewControl: false,
		styles: disablePoi
	}

	if (isAndroid) {
		$("#app-link").attr("href","https://play.google.com/store/apps/details?id=com.maphook.welcome");
	}
	else if (isiPhone) {
		$("#download").hide();
		//$("#app-link").attr("href","https://itunes.apple.com/app/maphook/id379312750?mt=8");		
	}
	else {
		//$("#download").hide();
	}
	
	if (isAndroid || isiPhone) {
		myOptions = {
			zoom : 12,
			center : myLatlng,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			streetViewControl : false,
			mapTypeControl : false
		}
	}
	$(".fb").fancybox();
	
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	doResize();
	google.maps.event.addListener(map, "click", function (e) {
		closePopup();
	});


	for (var i = 0, length = jsonData.length; i < length; i++) {
		
		addPin(jsonData[i]);
		//generateLink(jsonData[i].id,jsonData[i].image);
		//showImageSize(jsonData[i].image);
		
	}

	/*for (var i = 0, length = newImages.length; i < length; i++) {
		
		showImageSize(newImages[i].image);
		
	}*/

}

function closeDownloadBox() {
	$("#download").hide();
	doResize();
}

function generateLink(id,url) {
	$("#info").append('&lt;a id="' + id + '" class="fb" href="' + url + '"></a><br />');
}

function showImageSize(url) {
	var img = new Image();
	img.src = url;
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

function calculateHeight(data, width) {
	return (data.height * width / data.width);
}


function doResize() {
	var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1;
	
	var dimensions = getSize();
	
	var poweredL = dimensions.width - 135;
	var poweredT = dimensions.height - 50;
	var newHeight = dimensions.height;
	var newWidth = dimensions.width;
	newWidth = newWidth - 20;
	if (isAndroid && $("#download").is(':visible')) { // || isiPhone) {
		var bottomText = $("#download").height();
		newHeight = newHeight - bottomText - 4;
		poweredT = poweredT - bottomText - 4;
	}
	if (isiPhone) {
		// because iPhone has that extra popup at top 
		// but if the user closes it and it never opens back up??
		// then what?
		//newHeight = newHeight + 50;
		//poweredT = poweredT + 50;
	}
	
	//alert('full screen: ' + dimensions.width + ', setting width: ' + newWidth);
	//$("#map_canvas").width(newWidth + 'px');
	// don't change the height for this version - this is going to be controlled by CSS
	//$("#map_canvas").height(newHeight + 'px');
	//$("#powered-by1").css('left',poweredL + 'px');
	//$("#powered-by1").css('top',poweredT + 'px');
	
	map.setCenter(myLatlng);
    map.setZoom(13);
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

function recenter() {
        map.setCenter(myLatlng);
        map.setZoom(13);
        if (infowindow != null)
               infowindow.close();
}

$(document).ready(function () {
	initialize();
});

var jsonData = [{"title":"24","id":"img_24_3","location":"Brooklyn Bridge Park ","address":"34 Furman St, Brooklyn, NY 11201","trivia":"Kevin calls Dana from below the Brooklyn Bridge, visitors might be shocked to learn it was all done with digital imaging. That being said, the real one is absolutely worth the trip. ","latitude":40.69428,"longitude":-73.99917,"image":"http://upload.wikimedia.org/wikipedia/commons/2/22/USA-NYC-Brooklyn_Bridge_Park.jpg","height":282,"width":500},
{"title":"24","id":"img_24_2","location":"The Chelsea Hotel","address":"222 W 23rd St New York, NY 10011","trivia":"Most of the 24 scenes taking place in NYC were filmed in LA, but places like The Chelsea Hotel were still used to establish certain scenes","latitude":40.74437,"longitude":-73.99689,"image":"http://upload.wikimedia.org/wikipedia/commons/7/72/NY_chelsea_hotel.jpg","height":346,"width":460},
{"title":"24","id":"img_24_1","location":"UN Building","address":"405 E 42nd Street, New York, NY 10017","trivia":"May you have better luck than Meredith Reed. ","latitude":40.75858,"longitude":-73.99297,"image":"http://upload.wikimedia.org/wikipedia/commons/f/f2/UN_Members_Flags2.JPG","height":375,"width":500},
{"title":"30 Rock","id":"img_30rock_3","location":"Margon","address":"136 W 46th St, New York, NY 10036","trivia":"No, Kenneth's place of worship cannot be found in the basement… as far as we know. ","latitude":40.75791,"longitude":-73.98396,"image":"http://25.media.tumblr.com/tumblr_lmgvhjgGxX1qzyj4po1_500.gif","height":3000,"width":4000},
{"title":"30 Rock","id":"img_30rock_4","location":"Heartland Brewery","address":"127 W 43rd St, New York, NY 10036","trivia":"If you're ex wants to meet here he is probably about to tell you he's marrying that blonde yoga instructur. Liz could always do better than Floyd and we knew it. ","latitude":40.75612,"longitude":-73.98476,"image":"http://ic.pics.livejournal.com/bestandcrazy/21327470/163631/163631_original.gif","height":282,"width":500},
{"title":"30 Rock","id":"img_30rock_5","location":"Benihana","address":"47 W 56th St, New York, NY 10019","trivia":"An ideal location for celebrating leap day. Maybe you will even see Leap Day Williams!","latitude":40.76334,"longitude":-73.97659,"image":"http://upload.wikimedia.org/wikipedia/commons/6/6b/Jim_Carrey_Cannes_2009_(cropped).jpg","height":375,"width":560},
{"title":"30 Rock","id":"img_30rock_2","location":"Leopard at des Artistes","address":"1 W 67th St, New York, NY 10023","trivia":"That one where Jack sets Liz up on a date… with a woman. ","latitude":40.77351,"longitude":-73.97884,"image":"http://upload.wikimedia.org/wikipedia/commons/e/e1/Hotel_des_Artistes_jeh.JPG","height":300,"width":400},
{"title":"30 Rock","id":"img_30rock_1","location":"GE Building","address":"30 Rockefeller Plaza, New York, NY 10111","trivia":"Get your Liz Lemon on at 30 Rock!","latitude":40.759,"longitude":-73.979,"image":"http://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Rockefeller_Plaza_(7175078738).jpg/320px-Rockefeller_Plaza_(7175078738).jpg","height":388,"width":573},
{"title":"Boardwalk Empire","id":"img_boardwalk_1","location":"The Montauk Club","address":"25 8th Ave, Brooklyn, NY 11217","trivia":"One look at the Montauk Club would convince anyone it was the perfect background for our favorite prohibition era gangsters and their shenanigans. ","latitude":40.67472,"longitude":-73.97209,"image":"http://projectc1.projectcasting.netdna-cdn.com/wp-content/uploads/2013/08/boardwalk-empire-4.jpg","height":1065,"width":1600},
{"title":"Boardwalk Empire","id":"img_boardwalk_5","location":"Sylvan Terrace","address":"Sylvan Terrace New York, NY 10032","trivia":"Check out some real NYC turn of the century homes used in Season 1 before Mrs. Schroeder became Mrs. Thompson. ","latitude":40.83456,"longitude":-73.93898,"image":"http://upload.wikimedia.org/wikipedia/commons/5/51/Jumel_Terrace_Historic_District_3-19_Sylvan_Terrace_from_west.jpg","height":768,"width":1024},
{"title":"Boardwalk Empire","id":"img_boardwalk_8","location":"The National Arts Club","address":"15 Gramercy Park S, New York, NY 10003","trivia":"The gorgeous National Arts Club has served as the backdrop to many scenes featuring James Cromwell's  Secretary of the Treasury Andrew Mellon.","latitude":40.73769,"longitude":-73.9867,"image":"http://upload.wikimedia.org/wikipedia/commons/7/7f/National-arts-club.jpg","height":562,"width":750},
{"title":"Boardwalk Empire","id":"img_boardwalk_7","location":"The Poppen-husen Institute","address":"114-4 14th Rd, College Point, NY 11356","trivia":"The site of Nucky's speech to the Women’s Temperance League in Season 1. ","latitude":40.78421,"longitude":-73.85275,"image":"http://upload.wikimedia.org/wikipedia/commons/b/b4/Poppenhusen_Institute_jeh.JPG","height":3091,"width":2318},
{"title":"Boardwalk Empire","id":"img_boardwalk_6","location":"Park Avenue Armory","address":"643 Park Ave, New York, NY 10065","trivia":"Also known as home of the Grand Commodore Louis Kaestner. ","latitude":40.76738,"longitude":-73.96589,"image":"http://upload.wikimedia.org/wikipedia/commons/e/e2/Park_Avenue_Armory_jeh.JPG","height":3456,"width":5184},
{"title":"Boardwalk Empire","id":"img_boardwalk_3","location":"Hollander and Lexar","address":"369 Atlantic Ave, New York, NY 11217","trivia":"This high end men's clothing outlet was turned into a speakeasy frequented by Nucky and his pals. ","latitude":40.68759,"longitude":-73.98588,"image":"http://wac.450f.edgecastcdn.net/80450F/screencrush.com/files/2013/12/Boardwalk-Empire-Wikia_Season-4_Promo-Poster_001.jpg","height":1024,"width":683},
{"title":"Boardwalk Empire","id":"img_boardwalk_2","location":"Ditmas Park","address":"Ditmas Ave & Rugby Rd Brooklyn, NY 11230","trivia":"Stroll down Ditmas Park and pretend you are strolling down this street that inspired many scenes for the show. ","latitude":40.63665,"longitude":-73.96804,"image":"http://www.iwatchstuff.com/assets_c/2009/07/boardwalk-empire-thumb-450x337.jpg","height":1944,"width":2592},
{"title":"Boardwalk Empire","id":"img_boardwalk_4","location":"Johns of 12th Street","address":"302 E 12th St, New York, NY 10003","trivia":"This Italian eatery played it's part in realy life during prohibition  by converting its top floors into a speakeasy frequented by some of the real life counterparts to Boardwalk's characters. ","latitude":40.73061,"longitude":-73.98553,"image":"https://res.cloudinary.com/roadtrippers/image/upload/c_fill,h_316,w_520/v1373906980/johns-of-12th-street-4f6d10c946d09d558f0001e7.jpg","height":1864,"width":2816},
{"title":"Broad City","id":"img_broad_3","location":"Times Square","address":"7th Ave & W 42nd St New York, NY 10036","trivia":"New Yorkers will tell you they avoid this area like the plague as evidenced by the angry walker who encounters Abby mourning the loss of her phone. ","latitude":40.756045,"longitude":-73.986959,"image":"http://upload.wikimedia.org/wikipedia/commons/c/c0/1_times_square_night_2013.jpg","height":2364,"width":3195},
{"title":"Broad City","id":"img_broad_1","location":"Jane's Sandwich Shop","address":"28 Jane St, New York, NY 10014","trivia":"Also known as Grounded Coffee in the show, pop in to see where Abby's first \"art show\" took place. ","latitude":40.73798,"longitude":-74.00343,"image":"http://upload.wikimedia.org/wikipedia/commons/c/c7/Broad_City_Logo_2014-02-07_20-26.gif","height":2000,"width":3000},
{"title":"Broad City","id":"img_broad_2","location":"Central Park","address":"5th Ave & E 59th St New York, NY 10022","trivia":"On their journey to find Abby's phone, the girls try to catch the attention of the would be criminal by taking their tops off. Unfortunately, this is not the most scandalous act to hit New York and off they go. ","latitude":40.764299,"longitude":-73.973012,"image":"http://upload.wikimedia.org/wikipedia/commons/d/d6/Apr%C3%ADl_2004_004.jpg","height":3000,"width":4000},
{"title":"Daredevil","id":"img_daredevil_1","location":"42nd St and 6th Ave","address":"Avenue of the Americas & W 42nd St New York, NY 10036","trivia":"New Yorkers have reported seeing the cast of Daredevil filming around 42nd St and 6th Ave in NYC. Looks like we can expect some action around Bryant Park in its premiere season this Spring!","latitude":40.75864,"longitude":-73.98135,"image":"http://upload.wikimedia.org/wikipedia/commons/a/a6/New-York_-_Bryant_Park.jpg","height":2731,"width":4096},
{"title":"Daredevil","id":"img_daredevil_2","location":"115th and Adam Clayton Powell Blvd","address":"Adam Clayton Powell Jr Blvd & W 115th St New York, NY 10026","trivia":"The first photos and videos of \"Daredevil\" shooting in NYC are of the pivotal scene where our eventual hero loses his sight. ","latitude":40.802638,"longitude":-73.953099,"image":"http://www.comicbookresources.com/imgsrv/imglib/300/0/1/daredevilsetphoto1-cc7af.jpg","height":168,"width":300},
{"title":"Elementary","id":"img_elementary_1","location":"The Brownstone Rooftop","address":"10-10 44th Ave Long Island City, NY 11101 ","trivia":"Sherlock might be based in Brooklyn, but the outside shots of his beautiful brownstone are actually shot in Harlem and that view is from this rooftop in Long Island City!","latitude":40.75005,"longitude":-73.95042,"image":"http://upload.wikimedia.org/wikipedia/commons/9/96/MidtownManhattanFromGantryPlaza.jpg","height":2233,"width":1974},
{"title":"Elementary","id":"img_elementary_2","location":"Washington Square Park","address":"5 Ave, Waverly Pl., W. 4 St. and Macdougal St.\nManhattan","trivia":"Abby and Illana over at Broad City aren't the only ones getting into trouble at WSP, let's hope those two never bump into Sherlock and Watson, can you imagine?","latitude":40.729974,"longitude":-74.000524,"image":"http://upload.wikimedia.org/wikipedia/commons/4/4a/1_new_york_city_union_square_2010.JPG","height":562,"width":750},
{"title":"Flight of the Conchords","id":"img_conchords_2","location":"Dave’s Pawn Shop","address":"10 Montgomery Street, New York, NY 10002 ","trivia":"Learn how to deal with American culture over at Dave's pawn shop!","latitude":40.71413,"longitude":-73.98542,"image":"http://images.nymag.com/images/2/daily/entertainment/07/07/16_flightoftheconchords_lg.jpg","height":964,"width":1600},
{"title":"Flight of the Conchords","id":"img_conchords_1","location":"Bret and Jemaine's apartment","address":"28 Henry St New York, NY 10002","trivia":"Struggling New Zealanders can find comfort standing outside Bret and Jermain's apartmenr. ","latitude":40.71263,"longitude":-73.99643,"image":"http://img2-1.timeinc.net/ew/dynamic/imgs/080528/flight-of-the-conchords_l.jpg","height":525,"width":1200},
{"title":"Forever","id":"img_forever_1","location":"Grand Central Station ","address":"89 E 42nd St, New York, NY 10017","trivia":"In the pilot episode of this upcoming Fall 2014 show, Dr. Henry Morgan recognizes the iconic zodiac symbols on the ceiling of Grand Central Station as the team races to save the day.","latitude":40.75273,"longitude":-73.97723,"image":"http://upload.wikimedia.org/wikipedia/commons/4/4c/Grand_Central_Station_Inside.JPG","height":750,"width":563},
{"title":"Forever","id":"img_forever_2","location":"The Antiques Shop","address":"90 Orchard St, New York, NY 10002","trivia":"Forever transformed this building in Chinatown to the antiques shop where Henry and the one man who knows his secret like to hang out. ","latitude":40.71818,"longitude":-73.99005,"image":"http://upload.wikimedia.org/wikipedia/commons/c/c8/97_orchard_street.JPG","height":2304,"width":2368},
{"title":"Friends","id":"img_friends_2","location":"The Apartment","address":"90 Bedford St New York, NY 10014","trivia":"Home to popular Mediterranean restaurant The Little Owl, this building is best recognized by Friends fans as the exterior to Rachel, Monica, Chandler and Joey's apartment!","latitude":40.73222,"longitude":-74.00521,"image":"http://upload.wikimedia.org/wikipedia/commons/9/9e/90_Bedford_Street.jpg","height":549,"width":750},
{"title":"Friends","id":"img_friends_1","location":"Central Perk Pop Up Coffee Shop","address":"99 Lafayette St, New York, NY 10013","trivia":"Scenes at the iconic Central Perk coffee shop were infamously shot in a back lot at Wenerer Brothers. However, 10 years after Friends left the air New Yorkers are finally getting a taste their very own Central Perk from September 17th to October 18th. ","latitude":40.71767,"longitude":-74.00104,"image":"http://upload.wikimedia.org/wikipedia/commons/f/f1/The_Central_Perk_Set_from_Friends_(7823245486).jpg","height":4000,"width":6000},
{"title":"Girls","id":"img_glee_5","location":"Café Grumpy","address":"193 Meserole Avenue, Brooklyn, NY, 11222","trivia":"After hanging out at Café Grumpy, you too just might quit your job, move to Brooklyn and see if you can get a job behind the counter just like Hannah.","latitude":40.72863,"longitude":-73.94874,"image":"http://tungnam.com.hk/blog/wp-content/uploads/2014/08/Cafe-Grumpy1.jpg","height":768,"width":1024},
{"title":"Girls","id":"img_glee_6","location":"Warwick New York Hotel","address":"65 W 54th St, New York, NY 10019","trivia":"A favorite among parents looking to cut financial ties with their children, this is where we see Hannah and her parents akward discussion in the pilot episode. ","latitude":40.7623,"longitude":-73.97824,"image":"http://upload.wikimedia.org/wikipedia/commons/f/ff/Warwick_Hotel.JPG","height":3333,"width":3114},
{"title":"Girls","id":"img_glee_7","location":"The Foundry","address":"42-38 9th St, Long Island City, NY 11101","trivia":"Elisabeth Moss got married here, Kanye had a record release party here and Girls' Jessa threw her surprise wedding here!","latitude":40.75309,"longitude":-73.94948,"image":"http://www.betcheslovethis.com/files/uploads/images/girls102.jpg","height":4912,"width":7360},
{"title":"Girls","id":"img_girls_5","location":"The Jane Hotel","address":"113 Jane St, New York, NY 10014","trivia":"Maybe your college nemesis is having a book party here too?","latitude":40.738258,"longitude":-74.009451,"image":"http://i.huffpost.com/gen/1673819/thumbs/o-THE-JANE-facebook.jpg","height":317,"width":575},
{"title":"Girls","id":"img_girls_4","location":"BabyCakes NYC","address":"248 Broome St, New York, NY 10002","trivia":"Shoshanna ran into her old camp friend here and who knows, maybe you will too. ","latitude":40.718132,"longitude":-73.989604,"image":"http://www.glamour.com/entertainment/blogs/obsessed/2012/05/14/0514_shoshanna-girls_ob.jpg","height":1280,"width":960},
{"title":"Glee","id":"img_glee_4","location":"Tiffany & Co.","address":"727 5th Ave, New York, NY 10022","trivia":"Channel your inner Kurty and Rachel channeling their inner Audrey and have breakfast at Tifffany's. ","latitude":40.76264,"longitude":-73.97388,"image":"http://upload.wikimedia.org/wikipedia/commons/a/aa/Tiffany-fifth-ave-2007.jpg","height":3744,"width":5616},
{"title":"Glee","id":"img_glee_2","location":"The Inter-Continental","address":"300 W 44th St, New York City, NY 10036","trivia":"Here for Nationals? Try the Inter-Continental same as New Directions!","latitude":40.75857,"longitude":-73.98972,"image":"http://upload.wikimedia.org/wikipedia/commons/a/ab/NYC_-_Time_Square_-_From_upperstairs.jpg","height":4000,"width":6000},
{"title":"Glee","id":"img_glee_3","location":"New York Public Library","address":"5th Ave at 42nd St, New York, NY 10018","trivia":"Lonely on Thanksgiving? Head to the NYPL!","latitude":40.75318,"longitude":-73.98225,"image":"http://upload.wikimedia.org/wikipedia/commons/e/e7/New_York_Public_Library_060622.JPG","height":1365,"width":2158},
{"title":"Glee","id":"img_glee_1","location":"Sardi's","address":"234 W 44th St, New York, NY 10036","trivia":"Finn and Rachel ran into the one and only Patti LuPone at Sardi's and chances are you'll find a celebrity sighting of your own here, if not only on the caricature-adorned walls. ","latitude":40.757805,"longitude":-73.987629,"image":"http://upload.wikimedia.org/wikipedia/commons/e/ec/Sardi's_restaurant_(Manhattan,_New_York)_001.jpg","height":1200,"width":1600},
{"title":"Gossip Girl","id":"img_gossip_2","location":"Metropolitan Museum of Art","address":"1000 Fifth Avenue (at 82nd Street) New York, NY 10028","trivia":"Eat lunch on the steps and judge those closest to you, just like Blair!","latitude":40.77944,"longitude":-73.96324,"image":"http://upload.wikimedia.org/wikipedia/commons/5/5b/Metropolitan_Museum_of_Art.jpg","height":2960,"width":2135},
{"title":"Gossip Girl","id":"img_gossip_1","location":"Grand Central Station ","address":"89 E 42nd St, New York, NY 10017","trivia":"The first Serena sighting happens here!","latitude":40.75273,"longitude":-73.97723,"image":"https://c2.staticflickr.com/4/3033/3044827068_bd42328aa9_z.jpg?zz=1","height":1883,"width":2945},
{"title":"Gossip Girl","id":"img_gossip_3","location":"New York Palace Hotel ","address":"455 Madison Ave, New York, NY 10022","trivia":"The iconic Van der Woodson home. ","latitude":40.757985,"longitude":-73.974754,"image":"http://upload.wikimedia.org/wikipedia/commons/4/48/Hotel_Palace_NYC_-_Gossip_Girl.jpg","height":2020,"width":2680},
{"title":"Gotham ","id":"img_gotham_2","location":"Madison and 71st St","address":"Madison Ave & E 71st St New York, NY 10021","trivia":"The cast was spotted filming here as 8/21!","latitude":42.65495,"longitude":-73.77209,"image":"http://upload.wikimedia.org/wikipedia/commons/0/05/Gotham-logo.png","height":1200,"width":1500},
{"title":"Gotham ","id":"img_gotham_1","location":"Coffey St & Ferris St ","address":"Coffey St & Ferris St Brooklyn, NY 11231","trivia":"This new series explored the origins of Commissioner Gortdon in the Batman universe. You'll always be dreamy Ryan Atwood to us Ben McKenzie, but this looks pretty cool too. ","latitude":40.678121,"longitude":-74.016927,"image":"http://upload.wikimedia.org/wikipedia/commons/c/cf/Ben_McKenzie.jpg","height":3000,"width":4000},
{"title":"How I Met Your Mother","id":"img_howi_2","location":"Empire State Building","address":"350 5th Ave, New York, NY 10118","trivia":"When Robin’s younger sister arrives for a weekend visit, they take her to the Empire State Building where they reminsce about one of  life's many \"firsts.\"","latitude":40.74844,"longitude":-73.98566,"image":"http://upload.wikimedia.org/wikipedia/commons/2/20/Empire_State_Building_by_David_Shankbone.jpg","height":1433,"width":1518},
{"title":"How I Met Your Mother","id":"img_howi_4","location":"Columbia Universtiy","address":"116th St & Broadway, New York, NY 10027","trivia":"Ted takes a job as an architecture job at Columbia University where he  unknowingly encounters the mother for the first time. ","latitude":40.808002,"longitude":-73.963811,"image":"http://upload.wikimedia.org/wikipedia/commons/a/af/Low_Memorial_Library_Columbia_University_NYC.jpg","height":566,"width":851},
{"title":"How I Met Your Mother","id":"img_howi_3","location":"Natural History Museum","address":"Central Park W & 79th St, New York, NY 10024","trivia":"Barney claims to have knocked over the famous blue whale as a kid!","latitude":40.781271,"longitude":-73.973055,"image":"https://c1.staticflickr.com/1/111/288967289_f023ef82ac_b.jpg","height":929,"width":1280},
{"title":"How I Met Your Mother","id":"img_howi_1","location":"McGee's Pub","address":"240 W 55th St New York, NY 10019","trivia":"Creators Carter Bays and Craig Thomas used to frequent McGee's Pub when they were staff on The Letterman Show. It eventually became the inspiration behind the characters beloved McLarens pub. McGee's is packed with HIMYM memorabilia and even hosts a trivia night dedicated to the show.","latitude":40.76489,"longitude":-73.98305,"image":"https://c1.staticflickr.com/5/4149/5092698947_0d625b7cac_z.jpg","height":1232,"width":1840},
{"title":"How I Met Your Mother","id":"img_howi_6","location":"Corner Bistro","address":"331 W 4th St, New York, NY 10014","trivia":"The Best Burger in the World! Maybe… Marshall never could really remember. ","latitude":40.738012,"longitude":-74.003782,"image":"http://media.tumblr.com/tumblr_m1if3rWViA1qhxkvk.jpg","height":2288,"width":1712},
{"title":"How I Met Your Mother","id":"img_howi_5","location":"Gray's Papaya","address":"2090 Broadway, New York, NY 10023","trivia":"Between New Year's Eve parties the gang makes a pit stop at famous Gray's Papya also made famous in films like \"You've Got Mail\" and \"Nick and Norha's Excellent Adventures\" and other TV shows like \"Sex & The City\" and \"Glee.\"","latitude":40.778291,"longitude":-73.981829,"image":"http://www.hiddenboston.com/images/GraysPapaya.jpg","height":240,"width":320},
{"title":"Law & Order: SVU","id":"img_law_2","location":"General Theological Sminary","address":"440 W 21st St, New York, NY 10011","trivia":"Also known as Hudson University! We're glad this is just a fictitious unversity as its crime rate seems frighteningly high.","latitude":40.74574,"longitude":-74.00386,"image":"http://upload.wikimedia.org/wikipedia/commons/d/d1/General_Theological_Seminary_Desmond_Tutu_Center.jpg","height":420,"width":630},
{"title":"Law & Order: SVU","id":"img_law_1","location":"Chelsea Piers","address":"62 Chelsea Piers Roadway, New York, NY 1001","trivia":"A favorite filming location for the SVU crew (where many of the sets are), definitely stop by to check out if your favorite detectives are hanging around. ","latitude":40.74825,"longitude":-74.00847,"image":"http://upload.wikimedia.org/wikipedia/commons/f/f2/Chelsea_Piers.jpg","height":275,"width":448},
{"title":"Louie","id":"img_louie_1","location":"Ben's Pizzeria","address":"123 Macdougal St, New York, NY 10012","trivia":"Grab a slice in the West Village straight out of the shows opening credits. ","latitude":40.73038,"longitude":-74.00032,"image":"http://d3ny4pswk2x1ig.cloudfront.net/160e83ea5f8a975accd04be483c41c5573c58726e120238de6f5348d.jpg","height":300,"width":168},
{"title":"Louie","id":"img_louie_2","location":"Caroline's on Broadway","address":"1626 Broadway, New York, NY 10019","trivia":"Many famous comedians have stood here before Louis including Jerry Seinfeld and Dave Chapelle. ","latitude":40.76106,"longitude":-73.98401,"image":"http://farm4.staticflickr.com/3538/3525724500_319398ff7b_o.jpg","height":4000,"width":3000},
{"title":"Madame Secretary","id":"img_madame_1","location":"Café Edna","address":"195 Nassau Ave, Brooklyn, NY 11222","trivia":"CBS' Madame Secretary took over Greenpoint's Café Edna at the end of August, be sure to tune in this Fall to see what state secrets migth have been revealed there.","latitude":40.72571,"longitude":-73.94514,"image":"http://newimages.bwwstatic.com/upload10/752896/1.jpg","height":685,"width":1024},
{"title":"MadMen","id":"img_madman_1","location":"P.J. Clarkes","address":"205 E 55th St, New York, NY 10022","trivia":"Stop in for a drink at P.J. Clarkes, open since 1884 it's a favorite among MadMen's Madison Avenue crew!","latitude":40.75886,"longitude":-73.967912,"image":"http://upload.wikimedia.org/wikipedia/commons/7/7d/P.J._Clarke's.jpg","height":427,"width":640},
{"title":"Manhattan Love Story","id":"img_manhattan_2","location":"Bowery NYC","address":"335 Bowery, New York, NY 10003","trivia":"The cast was spotted filming along Bowery for at least a full day. Take a stroll and pop into The Bowery Hotel for a breather to discuss your love life. ","latitude":40.72596,"longitude":-73.99157,"image":"http://upload.wikimedia.org/wikipedia/commons/a/a8/Bowery_BMT_jeh.JPG","height":480,"width":640},
{"title":"Manhattan Love Story","id":"img_manhattan_1","location":"W 14th St and 8th Ave in NYC.","address":"8th Ave & W 14th St New York, NY 10011","trivia":"The cast has been seen filming here as recently as 8/20!","latitude":40.739766,"longitude":-74.002527,"image":"http://upload.wikimedia.org/wikipedia/commons/e/e1/NYC_14th_Street_looking_west_12_2005.jpg","height":640,"width":480},
{"title":"Mysteries of Laura","id":"img_myslaura_1","location":"43rd St and 6th Ave","address":"Avenue of the Americas & W 43rd St New York, NY 10036","trivia":"Look out for Laura in Midtown during the upcoming series ","latitude":40.755515,"longitude":-73.983623,"image":"http://upload.wikimedia.org/wikipedia/commons/4/4d/DebraMessing.jpg","height":427,"width":640},
{"title":"Orange is the New Black","id":"img_orange_1","location":"Rosario's Deli","address":"2255 31st St, Queens, NY 11105","trivia":"Rosario’s Deli  was converted into Dmitri’s Russian Market, which Red and her husband Dmitri own.","latitude":40.77446,"longitude":-73.91268,"image":"http://upload.wikimedia.org/wikipedia/commons/9/9c/Orange_is_the_new_Black.png","height":316,"width":520},
{"title":"Orange is the New Black","id":"img_orange_1","location":"Hell's Gate - Astoria Park ","address":"19 St. bet. Astoria Park S. and Ditmars Blvd.\nQueens","trivia":"That scene, where Red infamously stabs a mob wife was filmed in the actually rather scenic Astoria Park. ","latitude":40.779501,"longitude":-73.921446,"image":"http://upload.wikimedia.org/wikipedia/commons/a/a7/Hell_Gate_Bridge_cricket.jpg","height":1768,"width":3072},
{"title":"Person of Interest ","id":"img_poi_1","location":"The Local Precinct","address":"570 Washington St, New York, NY","trivia":"From the series original pilot episode, the building that serves as the precinct that Reese exits via a back entrance is actually the prouction facility for Person of Interest, St. John's Center Studios.","latitude":40.729142,"longitude":-74.009435,"image":"http://img1.wikia.nocookie.net/__cb20120726145839/pediaofinterest/images/thumb/6/68/1x01_8th_precinct.jpg/200px-1x01_8th_precinct.jpg","height":328,"width":500},
{"title":"Person of Interest ","id":"img_poi_2","location":"49th and 6th Ave Security Camera","address":"49th St and 6th Ave, New York, NY","trivia":"Reese stares into a security camera at the southwest corner of this intersection in both the series pilot and in the season one finale as the final scene.","latitude":40.75927,"longitude":-73.980886,"image":"http://img1.wikia.nocookie.net/__cb20130503021641/pediaofinterest/images/c/c4/1x23_camera.jpg","height":1000,"width":2000},
{"title":"Seinfeld","id":"img_seinfeld_1","location":"The Soup Nazi","address":"259 W 55th St New York, NY 10019","trivia":"Al Yeganeh served as the inspiration for the \"Soup Nazi\" and now runs a franchise called The Original Soup Man all over the city. ","latitude":40.76545,"longitude":-73.98335,"image":"http://upload.wikimedia.org/wikipedia/commons/f/f0/Soup-kitchen1.jpg","height":124,"width":200},
{"title":"Seinfeld","id":"img_seinfeld_2","location":"H&H Bagels","address":"1551Â2nd Avenue, New York, NY","trivia":"Revel in the glory of the bagel shop which formerly employed the one and only Kramer.","latitude":40.774493,"longitude":-73.954598,"image":"http://farm4.static.flickr.com/3258/2856818556_4e5ec9ecb1.jpg","height":612,"width":612},
{"title":"Seinfeld","id":"img_seinfeld_3","location":"Tom's Restaurant","address":" 2880 Broadway, New York, NY 10025","trivia":"Head uptown to 112th and Broadway to take a photo outside Tom's Restaurant; it served as the exterior for Jerry, George, Kramer and Elaine's beloved diner. ","latitude":40.805478,"longitude":-73.965225,"image":"http://upload.wikimedia.org/wikipedia/commons/1/1e/Tom's_Restaurant,_NYC.jpg","height":475,"width":845},
{"title":"Sex and the City","id":"img_sex_4","location":"Trapeze School","address":"353 West St, New York, NY 10014","trivia":"Take a flying leap, just like Carrie did for her assignment. Major life realizations to follow we hear. ","latitude":40.72952,"longitude":-74.01156,"image":"http://farm4.staticflickr.com/3074/2825307987_f5b019f44d.jpg","height":667,"width":1000},
{"title":"Sex and the City","id":"img_sex_3","location":"New York Public Library","address":"5th Ave at 42nd St, New York, NY 10018","trivia":"Carrie;s favorite, of course. It was the site of her non-wedding to Big. ","latitude":40.75318,"longitude":-73.98225,"image":"http://upload.wikimedia.org/wikipedia/commons/5/5b/New_York_Public_Library_May_2011.JPG","height":363,"width":484},
{"title":"Sex and the City","id":"img_sex_1","location":"Manolo Blahnik","address":"31 West 54th Street, New York, NY 10019","trivia":"The flagship story is located on 5th Avenue of course! There was a reason Carrie just wanted a really big closet.","latitude":40.76203,"longitude":-73.97712,"image":"https://c1.staticflickr.com/1/142/386412496_d5b4bac8fc_z.jpg","height":334,"width":560},
{"title":"Sex and the City","id":"img_sex_2","location":"Carries' Apartment","address":"66 Perry Street, New York, NY ","trivia":"On the show Carrie's address is listed as 245 E. 73rd Street, but those famous steps are really over on Perry Street. ","latitude":40.7353,"longitude":-74.00387,"image":"https://c2.staticflickr.com/2/1212/1149739647_c6478bd953_z.jpg?zz=1","height":2592,"width":3888},
{"title":"Sex and the City","id":"img_sex_7","location":"Il Cantinori","address":"32 E 10th St, New York, NY 10003","trivia":"Hopefully your 35th birtdhay was or will be better than Carrie's when none of her friends showed up to Il Cantori and she had to walk home alone from her own party. ","latitude":40.732177,"longitude":-73.993205,"image":"http://edanafashion.files.wordpress.com/2013/07/carriebradshawdress.jpg","height":272,"width":185},
{"title":"Sex and the City","id":"img_sex_6","location":"Pastis","address":"9 9th Avenue, New York, NY 10014","trivia":"Carrie and \"The Russian\" hung out here before he whisked her away to Paris. ","latitude":40.739833,"longitude":-74.0065,"image":"http://upload.wikimedia.org/wikipedia/commons/1/18/Pastis_NYC_4006685324_111cc1bf54.jpg","height":1024,"width":683},
{"title":"Sex and the City","id":"img_sex_5","location":"Magnolia Bakery","address":"401 Bleecker Street, New York, NY 10014","trivia":"Sex and the City was way ahead of the cupcake craze! If you're looking to give up smoking just like Carrie, definitely try cupcakes instead. ","latitude":40.735881,"longitude":-74.004967,"image":"http://upload.wikimedia.org/wikipedia/commons/3/37/Magnolia_Bakery.jpg","height":960,"width":1280},
{"title":"SMASH","id":"img_smash_3","location":"Bond 45","address":"154 W 45th St, New York, NY","trivia":"A local bar for the thespian cast, Marilyn producer Eileen Rand throws her drink at her ex-husband's face at table 28.","latitude":40.75753,"longitude":-73.984553,"image":"http://midmodmapretroroadmap.files.wordpress.com/2009/05/image1.jpg","height":524,"width":615},
{"title":"SMASH","id":"img_smash_1","location":"Café Orlin","address":"41 St Marks Pl, New York, NY 10003","trivia":"Marilyn hopeful Karen Cartwright works here as a waitress by day and is an aspiring Broadway star by night.","latitude":40.738594,"longitude":-74.080607,"image":"http://www.boastusa.com/wp-content/uploads/2013/08/Cafe-Orlin-on-St-Marks-between-1st-and-2nd-Aves.-Still-in-business.-Back-then-they-happily-served-minors-screwdrivers..jpg","height":1536,"width":2048},
{"title":"SMASH","id":"img_smash_2","location":"Hill Country BBQ","address":"30 W 26th St, New York, NY","trivia":"The BBQ joint in Iowa Karen visits with her family is actually none other than Hill Country BBQ in Midtown, where the meat comes in piles and the margaritas in pitchers.","latitude":40.744083,"longitude":-73.99048,"image":"http://www.glenwoodnyc.com/manhattan-living/wp-content/uploads/resource/hc-hill-country-bbq-nyc.jpg","height":2848,"width":4288},
{"title":"Suits","id":"img_suits_1","location":"Lexington Ave and 54th St","address":"Lexington Ave and E 54th St","trivia":"While mostly shot in Toronto, Suits collects exterior shots from New York City's streets, with the intersection of Lexington and 54th being one of the latest.","latitude":40.759006,"longitude":-73.970537,"image":"http://upload.wikimedia.org/wikipedia/commons/d/d4/Lex_Ave_Street_Sign.JPG","height":375,"width":500},
{"title":"The Cosby Show","id":"img_cosby_1","location":"The Huxtable's House","address":"10 Leroy St New York, NY 10014","trivia":"The Cosby Show was set in the Flatbush area of Brooklyn, but the actualy exterior of the home is located in Greenwich Village. ","latitude":40.73077,"longitude":-74.0032,"image":"http://upload.wikimedia.org/wikipedia/commons/2/2e/BillCosbyApartment.jpg","height":1004,"width":1500},
{"title":"The Good Wife","id":"img_good_1","location":"46th and 10th Ave in NYC","address":"10th Ave & W 46th St New York, NY 10036","trivia":"The cast of \"The Good Wife\" has been seen filming the upcoming season at 46th and 10th Ave in NYC.","latitude":40.762195,"longitude":-73.99364,"image":"http://upload.wikimedia.org/wikipedia/commons/3/39/Manhattan-plaza.jpg","height":2616,"width":3488},
{"title":"The Good Wife","id":"img_good_2","location":"Brooklyn Botanic Gardens","address":"990 Washington Ave, Brooklyn, NY 11225","trivia":"Early on the show, many New Yorker's spotted The Good Wife filming at the Brooklyn Botanic Gardens","latitude":40.66604,"longitude":-73.96209,"image":"http://upload.wikimedia.org/wikipedia/commons/c/cd/Brooklyn_Botanic_Garden.JPG","height":745,"width":640},
{"title":"The Knick","id":"img_knick_1","location":"Boys High School","address":"832 Marcy Ave, Brooklyn, NY ","trivia":"This historic Brooklyn monument, which has notable alumni such as Isaac Asimov and Abraham Maslow, serve as the Knickerbocker Hospital in The Knick.","latitude":40.684736,"longitude":-73.948022,"image":"http://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Boys_HS_Putnam_Av_jeh.jpg/640px-Boys_HS_Putnam_Av_jeh.jpg","height":380,"width":438},
{"title":"The Sopranos","id":"img_sopranos_1","location":"Holsten's","address":"1063 Broad St, Bloomfield, NJ 07003","trivia":"The restaurant with the booth Tony sits in during the final scenes of the entire industry-shaping series.","latitude":40.828315,"longitude":-74.186752,"image":"http://upload.wikimedia.org/wikipedia/commons/4/40/Holstens.jpg","height":300,"width":448},
{"title":"The Sopranos","id":"img_sopranos_2","location":"The Bada Bing","address":"230 New Jersey 17, Lodi, NJ 07644","trivia":"The actual go-go club which served as the show's iconic Bada Bing, Tony's local gang hideout.","latitude":40.882135,"longitude":-74.066902,"image":"http://upload.wikimedia.org/wikipedia/en/d/d3/Sopr_Bada_Bing1.jpg","height":320,"width":240},
{"title":"The Sopranos","id":"img_sopranos_3","location":"Barone Sanitation","address":"275 Broadway, Jersey City, NJ","trivia":"The sanitation business that was Tony's legimitate alibi for his gangster undertakings.","latitude":40.738594,"longitude":-74.080607,"image":"https://c2.staticflickr.com/4/3414/5783171986_eca05b648b_z.jpg","height":400,"width":600},
{"title":"White Collar","id":"img_wcollar_2","location":"June Ellington's House","address":"351 Riverside Drive, New York, NY","trivia":"The exterior shot for June Ellington's house.","latitude":40.802989,"longitude":-73.969206,"image":"http://img3.wikia.nocookie.net/__cb20100630174102/whitecollar/images/a/a2/351_Riverside_Dr.jpg","height":528,"width":700},
{"title":"White Collar","id":"img_wcollar_1","location":"Peter Burke's House","address":"106 Cambridge Place, Brooklyn, NY","trivia":"The exterior shot for Peter Burke's home—not quite on DeKalb avenue, but close!","latitude":40.683881,"longitude":-73.963209,"image":"http://img4.wikia.nocookie.net/__cb20121002205356/whitecollar/images/thumb/0/0d/P1000959.jpg/1000px-P1000959.jpg","height":426,"width":640}];
