
// ADDS "exist" function to Jquery
;;(function($){$.exist||($.extend({exist:function(){var a,c,d;if(arguments.length)for(x in arguments)switch(typeof arguments[x]){case "function":"undefined"==typeof c?c=arguments[x]:d=arguments[x];break;case "object":if(arguments[x]instanceof jQuery)a=arguments[x];else{var b=arguments[x];for(y in b)"function"==typeof b[y]&&("undefined"==typeof c?c=b[y]:d=b[y]),"object"==typeof b[y]&&b[y]instanceof jQuery&&(a=b[y]),"string"==typeof b[y]&&(a=$(b[y]))}break;case "string":a=$(arguments[x])}if("function"==typeof c){var e=0<a.length?!0:!1;if(e)return a.each(function(b){c.apply(this,[e,a,b])});if("function"==typeof d)return d.apply(a,[e,a]),a}return 1>=a.length?0<a.length?!0:!1:a.length}}),$.fn.extend({exist:function(){var a=[$(this)];if(arguments.length)for(x in arguments)a.push(arguments[x]);return $.exist.apply($,a)}}))})(jQuery);

// ADDS "escape" to RegExp
RegExp.escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// ADDS "replaceAll" to Strings
String.prototype.replaceAll = function(search, replace) {
    return this.replace(new RegExp(RegExp.escape(search),'g'), replace);
};

    function loadPins(response) {

	eval(response);
 }
 var gmarkers = [];

 var bounds = new google.maps.LatLngBounds();
 var infowindow = null;

  function startNewPins() {
      //alert('will add pins...');
      bounds = new google.maps.LatLngBounds();
  }

  function finishNewPins() {
      // commented out - this page will not fit to bounds
      if (!bounds.isEmpty()) {
      	//map.fitBounds(bounds);
      	//map.setZoom(7);
      }
	  
	  var styles = [{
	  				        url: 'images/red-cluster-65.png',
	  				        width: 65,
	  				        height: 65,
	  				        anchor: [0, 0],
	  				        textColor: '#ffffff',
	  				        textSize: 12
	  				      }
		          ];

		         //var tempMarkers =  subArray(gmarkers,'Gallery');
				 var tempMarkers =  gmarkers;


	 /*markerCluster = new MarkerClusterer(map, tempMarkers, {
	 					averageCenter: true,
	 					minimumClusterSize: 20,
	 					gridSize : 50,
	 					styles: styles

		});*/

  }

  function doLoad(url)
  {
  	window.open(url,'_blank');
  	window.focus();
  }

/*
  function viewExternal(url, title)
  {
	externalWindow = dhtmlwindow.open("externalc", "iframe", url, title, "width=970px,height=550px,resize=1,scrolling=1,center=1");
  }
  */


  function getGoogleLetterPin() {
      return new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|CE2A37',
      // This marker is 25 pixels wide by 38 pixels tall.
          new google.maps.Size(21, 34),
      // The origin for this image is 0,0.
          new google.maps.Point(0, 0),
      // The anchor for this image
          new google.maps.Point(11, 34));
  }
  
  function getDefaultPin() {	
	return new google.maps.MarkerImage('images/purple-pin-18x27.png',
      // This marker is 25 pixels wide by 38 pixels tall.
          new google.maps.Size(18, 27),
      // The origin for this image is 0,0.
          new google.maps.Point(0, 0),
      // The anchor for this image
          new google.maps.Point(9, 27));
  }
  
  function getFeaturedPin() {
      return new google.maps.MarkerImage('images/red-pin-28x42.png',
      // This marker is 25 pixels wide by 38 pixels tall.
          new google.maps.Size(28, 42),
      // The origin for this image is 0,0.
          new google.maps.Point(0, 0),
      // The anchor for this image
          new google.maps.Point(14, 42));
  }
  

function show(category) {
	        for (var i=0; i<gmarkers.length; i++) {
				//alert(gmarkers[i].mycategory);
	          if (gmarkers[i].mycategory == category) {
				
	            gmarkers[i].setVisible(true);
	          }
	        }
	        // == check the checkbox ==
	        //document.getElementById(category+"box").checked = true;
	      }

	// == hides all markers of a particular category, and ensures the checkbox is cleared ==
	function hide(category) {
		for (var i=0; i<gmarkers.length; i++) {
		  if (gmarkers[i].mycategory == category) {
		    gmarkers[i].setVisible(false);
		  }
		}
		// == clear the checkbox ==
		//document.getElementById(category+"box").checked = false;
		// == close the info window, in case its open on a marker that we just hid
		if (infowindow)
			infowindow.close();
	}

	function divclick(box,category,name)
	{	
		//alert(category);
		//alert(box.checked);
		if (box.checked)
			$("#" + name).css("opacity",".6");
		else
			$("#" + name).css("opacity","1");

		box.checked = !box.checked;
		boxclick(box,category);
	}

	// == a checkbox has been clicked ==
	  function boxclick(box,category) {
		if (box.checked) {
		  show(category);
		} else {
		  hide(category);
		}
		// == rebuild the side bar
		//makeSidebar();
	  }

	

	var useBalloons = true;

function getMoviePhoto(title)
{
	for (var i = 0; i < moviePhotos.length; i++)
	{
		if (moviePhotos[i].movie == title)
			return moviePhotos[i].photo;
	}
	return null;
}
	
function addPin(lat, lng, caption, location, actors, thumb,video,width,height) {
	
	if (thumb == null)
	{
		thumb = getMoviePhoto(caption);
	}

	var link = null;
	
	if (thumb == null)
		icon = getDefaultPin();
	else
		icon = getFeaturedPin();
		
      var myLatlng = new google.maps.LatLng(lat, lng);
         //alert('adding pin ' + caption);
      bounds.extend(myLatlng);

      var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
		  icon: icon,
          title: caption.replace('<br />',' ')
      });
	  
	  
	  

		//marker.mycategory = type;

      google.maps.event.addListener(marker, 'click', function () {

          hookBalloon(map, marker, thumb, link, caption, location, actors,video,width,height);
      });

	gmarkers.push(marker);

      return marker;

  }

  String.prototype.trunc =
     function(n,useWordBoundary){
         var toLong = this.length>n,
             s_ = toLong ? this.substr(0,n-1) : this;
         s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
         return  toLong ? s_ + '&hellip;' : s_;
      };
  

 function hookBalloon(map, marker, thumb, link, caption, location, actors, video,width,height) {
 	if (infowindow != null) infowindow.close();

	var extraBR = '';
	
	borderColor = "#B43048";
	if (thumb == null) borderColor = "#6D2CA2";
	
	
 	contentString = '<div class=\"popcontainer\"><div class=\"poptext\">';

	
	//if (link != null && link != '')
	//	contentString += '<a onclick=\"javascript:doLoad(\'' + link + '\');\" class=\"poptitledark\" style=\"color: ' + borderColor + ' !important; width: 280px; white-space: nowrap; overflow: ellipsis; \"><nobr>' + caption + '</nobr></a>';
	//else
	//	contentString += '<span class=\"poptitledark\">' + caption + '</span>';
		
	
	
	var thumbString = '';
	var photoUsage = '<div style="padding-bottom: 0px;">&nbsp;</div>';
	
	if (thumb != null && thumb != '') {
		
		var displayWidth = 150;
		var displayHeight = 80;
		var widthString = 'width: ' + displayWidth + 'px;';
		var heightString = '';
		
		if (width != null) widthString = 'width: ' + width + 'px; ';
		if (height != null) heightString = 'height: ' + height + 'px; ';
		
		/*
			var checkImg = new Image();
		checkImg.src = thumb;
		var actualWidth = checkImg.width;
		var actualHeight = checkImg.height;
		
		displayHeight = actualHeight * displayWidth / actualWidth;
			// height: ' + displayHeight + '
			*/
		extraBR  = '<!--br /-->';
		// '<a href="' + link + '" target="_blank">' +
		// 
		thumbString = '<img class=\"popimg\" src=\"' + thumb + '\" align="left" style=\"' + widthString + heightString + '\" vspace=\"0\" border=\"0\" hspace=\"0\" />';
		
		// LOAD THE PHOTO INTO THE HIDDEN LIGHTBOX LINK
		//$("#light_target").attr("href",thumb);
		
		var fancyOpts = { 	autoSize: false,
				autoResize: false,
				autoCenter: true,
				fitToView: true,
				maxHeight: 900,
			};
		var fancyTest =  {  fitToView: 'true' };
		
		//$("#light_target").fancybox();
		
		
		if (video != null && video != '') {
			thumbString = '<a target="_blank" href="' + video + '">' + thumbString + '</a>';
			photoUsage = '<br /><i style="font-size:8pt;">Video Source: <br /><div style="width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-bottom: 0px;"><a  target="_blank" href="' + video + '">' + video + '</a></div></i>'
		}
		else {
			var movieTitleID = caption.replace('<br />','').replaceAll(' ','').replace('.','').replace(':','').toLowerCase();
		
			/*thumbString = '<a class="lightbox" href="' + thumb + '">' + thumbString + '</a>';*/
			thumbString = '<a onclick="fakeLightbox(\'' + movieTitleID + '\')">' + thumbString + '</a>';
			photoUsage = '<br /><i style="font-size:8pt;">Photo Source: <br /><div style="width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-bottom: 0px;"><a  target="_blank" href="' + thumb + '">' + thumb + '</a></div></i>'
		}
		
	}
	contentString += '<span class=\"poptitledark\" style=\"color: ' + borderColor + ' !important; width: 280px; overflow:hidden; ' +
				  'margin-bottom: 0px; white-space: nowrap; text-overflow: ellipsis; \">' + thumbString + caption + '</span><br />';
	contentString += '<span class=\"popdetail top-pad\"><b>' + location + '</b></span><br /><br />';

	if (actors != null && actors != '')
		contentString += '<span class=\"popdetail\"> ' + actors + '</span>';
		
		//'<!--br />' +
		contentString += 
		'<br />' + 
		extraBR +
		photoUsage + 
		'<!--a style="color:#000000" target="_blank" href="' + link + '">View Full Details on MapHook</a-->' +
		'</div>';

	infowindow = new InfoBubble({
		   map: map,
		   content: contentString,

		   shadowStyle: 1,
		   padding: 15,
		   backgroundColor: 'rgb(255,255,255)',
		   borderRadius: 12,
		   arrowSize: 10,
		   borderWidth: 4,
		   borderColor: borderColor,
		   disableAutoPan: false,
		   hideCloseButton: false,
		   arrowPosition: 50,
		   backgroundClassName: 'popbubble',
		   arrowStyle: 0
		 });

	 infowindow.open(map,marker);  
	 
	
 }

	function fakeLightbox(movie) {
		
		$("#" + movie).click();
	}
 
	function lightIt() {
		$("#light_source").lightbox_me({ centered: true });
	}
 
	function divclickold(box,category,obj)
	{
		//alert(category);
		//var realcheckbox = '#check_' + box.id;
		if (box.checked) {
			$("#" + obj).css("color","#313131");
			//$(realcheckbox).attr("src","images/unchecked.png");
		}
		else {
			$("#" + obj).css("color","black");
			//$(realcheckbox).attr("src","images/checked.png");
		}
		box.checked = !box.checked;
		boxclick(box,category);
	}


	function boxclickold(box,category) {
		closePopup();
		if (box.checked) {
		  show(category);
		} else {
		  hide(category);
		}

	}
 
function closePopup()
{
	if (infowindow != null) infowindow.close();
}

 function showQuery(text) {
	alert(text);
 }

  function ajax(url, vars, callbackFunction) {
	//alert('sending...');
    var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0");


    request.open("GET", url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function AjaxOnReadyStateChangeHandler() {
        if (request.readyState == 4 && request.status == 200) {
            if (request.responseText) {

                callbackFunction(request.responseText);
            }
        }
        else {
        	//alert(request.status);
        }
    };
    request.send(null);
  }

  var map;

  function initialize() {
    var myLatlng = new google.maps.LatLng(37.785,-122.427);			
    var myOptions = {
      zoom: 14,														// was 2, zoomed in further based on where pins are 6/10/13
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP					// mapTypeId: google.maps.MapTypeId.SATELLITE
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    //alert(windowWidth());

	google.maps.event.addListener(map, "click", function (e) {
		closePopup();
	});
	$(".lightbox").fancybox(
		
	);
	AddToMap();
	finishNewPins();
    //ajax('/site/mhweb/api/get_manchester.jsp','',loadPins);
	//ajax('/site/mhweb/api/emerge.txt','',loadPins);
	

	//addPin('','49E29B0C-3CE5-8222-F7D3-ED617B6D1D37','38.90116','-76.98592','(e)merge Art Fair Headquarters','','emerge','1/10/2013 10:04 AM','jNA','Washington, DC','Artist');
}

window.onresize = function (event) {
    reSize();
}



function windowWidth() {
    var docElemProp = window.document.documentElement.clientWidth,
        body = window.document.body;
    return window.document.compatMode === "CSS1Compat" && docElemProp || body && body.clientWidth || docElemProp;
}

function windowWidth() {
    var viewPortWidth;

    /*if ($(window).browser.msie) {*/
        viewPortWidth = $(window).width();
        if (viewPortWidth == 0)
            viewPortWidth = window.innerWidth;
        if (viewPortWidth == 0)
            viewPortWidth = document.documentElement.clientWidth;

    /*} else {
        viewPortWidth = $(window).width();

    }*/
    return viewPortWidth;
}


	function changeMap()
	{

		var saveCenter = map.getCenter();
		//$("#map_canvas").css('width',$(window).width() + 'px');

		//document.getElementById('map_canvas').style.width = windowWidth();
		map.setCenter(saveCenter);
}


function reSize() {
    //alert($(window).width());
	return false;
    var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
	// bypass the mobile check
	isMobile = false;
    if (isMobile) {
        /*$("#legend_panel").css('left', '40px');*/
        $("#legend_panel").attr('class','mobile_legend');
        $("#map_canvas").css('width', '300px');
    }
    else {
    	// for some reason IE messes up the $(window).width() sometimes
    	var w = $(window).width();
    	if (w == 0) w = 830;
        $("#map_canvas").css('width', w + 'px');
    }
}


$(document).ready(function () {
    $(window).bind('resize', reSize());
    $(window).trigger('resize');
	initialize();

  //var ri = responsiveIframe();
  //ri.allowResponsiveEmbedding();




});


var moviePhotos = [];
/*
	{movie: "Vertigo", photo: "http://farm3.staticflickr.com/2783/4304215435_22860238b6_o.jpg"},
	{movie: "Mrs. Doubtfire", photo: "http://farm9.staticflickr.com/8333/8075802100_26716702f6_o.jpg"},
	{movie: "American Graffiti", photo: "http://feminema.files.wordpress.com/2012/01/american-graffiti.jpg"},
	{movie: "The Graduate", photo: "http://4.bp.blogspot.com/-U30Tb1sKL_k/TxxKhtIkJ-I/AAAAAAAAB4U/foPLLo0bDYY/s200/200px-Graduate.jpg", video: "https://www.youtube.com/watch?v=gbGW6jE1tG0"},
	{movie: "Star Trek IV", photo: "http://farm4.staticflickr.com/3038/2580285033_fb5390103d_o.jpg"},
	{movie: "Blue Jasmine", photo: "https://www.youtube.com/watch?v=XoC9alun3VQ"},
	{movie: "Forrest Gump", photo: "http://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Fine_Arts_SF_CA.jpg"},
	{movie: "Godzilla", photo: "http://upload.wikimedia.org/wikipedia/commons/3/3f/Ferry_Building_--_Port_of_San_Francisco.jpg"},
	{movie: "Princess Diaries", photo: "http://www.waymarking.com/gallery/image.aspx?f=1&guid=36158025-0c66-4369-92bc-3f153a5eff33"},
	{movie: "A View to Kill", photo: "http://upload.wikimedia.org/wikipedia/commons/1/12/Fishermans_Wharf_aerial_view.jpg"},
	{movie: "Milk", photo: "http://4.bp.blogspot.com/__o-BRiUTSsc/TVIZT3prEEI/AAAAAAAABTM/TZRu3wI3gh4/s1600/lower+haight.jpg"},
	{movie: "The Internship", photo: "http://www.worldatlas.com/webimage/countrys/namerica/usstates/californiaphotos/sanfrancisco/pier39.jpg"},
	{movie: "Dawn of the Planet of the Apes", photo: "http://4.bp.blogspot.com/-NNq-DtFjTFE/T8-sfmbLpqI/AAAAAAAABiQ/DqYMC29STrg/s1600/FilbertStreetAndGrantAvenueLookingTowardsCoitTowerAndGarfieldElementarySchool.jpg"},
	{movie: "The Maltese Falcon", photo: "http://farm3.staticflickr.com/2414/1538280079_5b9f29c003_z.jpg?zz=1"},
	{movie: "Basic Instinct", photo: "http://upload.wikimedia.org/wikipedia/commons/f/f0/YBCA_Novellus_Theater_main_entrance.JPG"},
];*/

function AddToMap()
{
addPin(37.800240, -122.418387,'Dawn of the<br />Planet of the Apes','Filbert St. from Hyde to Leavenworth','Directed by: Matt Reeves<br />Featuring: Gary Oldman, Keri Russell, Andy Serkis<br />TRIVIA: The movie also earned an A- CinemaScore on the way to $176.8 million in U.S. grosses and $481.8 million worldwide, Box Office Mojo reports. By contrast, X-Men: First Class ended its 2011 theater run with just $353.6 million at the global gate. http://www.fool.com/investing/general/2014/05/11/dawn-of-the-planet-of-the-apes-will-lead-all-summe.aspx','http://4.bp.blogspot.com/-NNq-DtFjTFE/T8-sfmbLpqI/AAAAAAAABiQ/DqYMC29STrg/s1600/FilbertStreetAndGrantAvenueLookingTowardsCoitTowerAndGarfieldElementarySchool.jpg','','160','128');
addPin(37.811145, -122.410445,'The Internship','Players Arcade at Pier 39','Directed by: Shawn Levy<Br />Featuring: Vince Vaughn, Owen Wilson<br />TRIVIA: The film used 100 real Google employees as extras.','http://www.worldatlas.com/webimage/countrys/namerica/usstates/californiaphotos/sanfrancisco/pier39.jpg','','160','114');
addPin(37.799459, -122.397444,'Godzilla','Pier 7 (The Embarcadero)','TRIVIA: A 400-foot model of the Golden Gate Bridge (built at a ratio of 1:0.045) was constructed for the San Francisco sequence.','http://upload.wikimedia.org/wikipedia/commons/3/3f/Ferry_Building_--_Port_of_San_Francisco.jpg');
addPin(37.752960, -122.410772,'Blue Jasmine','2934 24th St','Directed by: Woody Allen<br />Featuring: Cate Blanchett, Alec Baldwin<br />TRIVIA: Casa Lucas Market, on 24th St. between Florida and Alabama--Ginger\'s workplace','http://img.youtube.com/vi/XoC9alun3VQ/3.jpg','https://www.youtube.com/watch?v=XoC9alun3VQ','120','90');
addPin(37.7945,-122.413,'Mrs. Doubtfire','1200 Washington Street at Taylor Street','Directed by Chris Columbus<br />Featuring: Robin Williams,Sally Field,Pierce Brosnan<br />TRIVIA: The address given by Miranda while on the phone with Mrs. Doubtfire is the actual physical address of the Hillard house used for the filming of the movie. 2640 Steiner St.','http://farm9.staticflickr.com/8333/8075802100_26716702f6_o.jpg');
addPin(37.773097, -122.418524,'American Graffiti','Mel\'s Drive-In (Corner of Van Ness & Mission Street, Mission District)','Directed by George Lucas<br />Featuring: Richard Dryfuss<bv />TRIVIA: After Mel\'s Drive-In was demolished after the movie was made, the owner\'s son Steve decided to re-open other Mel\'s restaurants in 1981 as a small chain. There are two in Hollywood CA, themed after the movie, and one in San Francisco where George Lucas is known to eat occasionally.','http://feminema.files.wordpress.com/2012/01/american-graffiti.jpg');
addPin(37.7216,-122.429,'The Princess Diaries','724 Brazil Avenue','Directed by Garry Marshall<br />Featuring: Julie Andrews,Anne Hathway,Hector Elizondo<br />TRIVIA: Mia and her mom live in the former Chemical Engine Company 43 at 724 Brazil Avenue, in San Francisco, California. The two-story frame Mission Revival-style firehouse was built (circa 1911) to provide fire protection to the Excelsior Homestead District. It was one of the first to leave behind the horse-drawn days for the newly fashioned motorized apparatus shipped from the east. The retired firehouse was sold at auction in 1976. The private residence still retains a large hose drying tower in back.','http://img.groundspeak.com/waymarking/caa78ef4-7a22-43ca-afc4-76219876b448.JPG');
addPin(37.7967,-122.408,'The Maltese Falcon','Burritt Alley (Off Bush Street, between Powell and Stockton Streets)','Directed by John Huston<br />Featuring: Humphrey Bogart,Mary Astor<br />TRIVIA: "The stuff that dreams are made of" (a line suggested by Humphrey Bogart) was voted as the #14 movie quote by the American Film Institute. The line is paraphrased from William Shakespeare\'s "The Tempest": "We are such stuff as dream are made on, / And our little life is rounded with a sleep."','http://farm3.staticflickr.com/2414/1538280079_5b9f29c003_z.jpg?zz=1');
addPin(37.8037,-122.4110,'Star Trek IV:<br />The Voyage Home','North Beach','Directed by Leonard Nimoy<br />Featuring: William Shatner,Leonard Nimoy<br />TRIVIA: Scenes filmed on location in San Francisco marked the first time any Star Trek installment had been filmed outside the Los Angeles region.','http://farm4.staticflickr.com/3038/2580285033_fb5390103d_o.jpg');
addPin(37.7884,-122.416,'Vertigo','York Hotel (940 Sutter Street)','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak<br />TRIVIA: The Empire Hotel where James Stewart eventually finds Kim Novak is (as of 2009) the Hotel Vertigo (formerly the York) located at 940 Sutter St. in the heart of San Francisco. Novak\'s character lived in Room 501, which still retains many of its aspects captured in the film.','http://farm3.staticflickr.com/2783/4304215435_22860238b6_o.jpg','','160','240');
addPin(37.7749,-122.419,'Basic Instinct','Yuerba Buena Center for the Arts','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza<br />TRIVIA: Gay rights activists were against the way the gay characters were portrayed that they blocked the set numerous times while in San Francisco. Director Paul Verhoeven had to issue fake call sheets to trick the protesters into blocking unused locations. ','http://upload.wikimedia.org/wikipedia/commons/f/f0/YBCA_Novellus_Theater_main_entrance.JPG');
addPin(37.7353,-122.503,'The Graduate','San Francisco Zoo (2701 Sloat Blvd.)','Directed by Mike Nichols<br />Featuring: Anne Bancroft,Dustin Hoffman<br />TRIVIA: Benjamin follows Elaine to her meeting by the Monkey House in San Francisco Zoo, south of the Sunset district.','http://img.youtube.com/vi/gbGW6jE1tG0/2.jpg','https://www.youtube.com/watch?v=gbGW6jE1tG0','120','90');


addPin(37.7937,-122.4,'Broken-A Modern Love Story ','0-100 block Halleck Street','Directed by Ryan K. Whiting<br />');
addPin(37.7909,-122.4,'The Game','1 Bush Street','Directed by David Fincher<br />Featuring: Michael Douglas,Sean Penn,');
addPin(37.7892,-122.402,'Experiment in Terror','1 Monthgomery Street at Post','Directed by Blake Edwards<br />Featuring: Glenn Ford,Lee Remick,');
addPin(37.7888,-122.403,'I\'s','1 Post Street','Directed by Chris Edgette<br />');
addPin(37.8021,-122.419,'The Love Bug','100 Block of Lombard Street','Directed by Robert Stevenson<br />Featuring: Dean Jones,Michele Lee,<br />Fun Fact: Lombard Street is not actually the crookedest in SF. That honor goes to Potrero Hill\'s Vermont Street between 22nd and 23rd.');
addPin(37.798,-122.435,'Time After Time','100 Block of Union Street (Cow Hollow)','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,');
addPin(37.7934,-122.393,'Mrs. Doubtfire','100 Embarcadero Street','Directed by Chris Columbus<br />Featuring: Robin Williams,Sally Field,Pierce Brosnan');
addPin(37.7942,-122.396,'Interview With The Vampire','100 Market Street at 6th Street','Directed by Neil Jordan<br />Featuring: Brad Pitt,Christian Slater,Tom Cruise');
addPin(37.7576,-122.451,'Experiment in Terror','100 St. Germain Avenue','Directed by Blake Edwards<br />Featuring: Glenn Ford,Lee Remick,');
addPin(37.7826,-122.424,'Vertigo','1007 Gough Street','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,<br />Fun Fact: Tennis courts now sit on the site; in the movie the structure was Carlota Valdes\' home.');
addPin(37.7679,-122.404,'Can\'t Stop the Music','101 Henry Adams Place','Directed by Nancy Walker<br />');
addPin(37.7679,-122.404,'Nine Months','101 Henry Adams Place, 4th Floor','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold');
addPin(37.7764,-122.409,'Boys and Girls','1122 Folsom Street','Directed by Robert Iscove<br />Featuring: Freddie Prinze, Jr.,Alyson Hannigan,');
addPin(37.8006,-122.418,'Edtv','1138 Filbert Street','Directed by Ron Howard<br />Featuring: Matthew McConaughey,Jenna Elfman,Woody Harrelson');
addPin(37.7829,-122.411,'Bullitt','1153-57 Taylor Street','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,<br />Fun Fact: Embarcadero Freeway, which was featured in the film was demolished in 1989 because of structural damage from the 1989 Loma Prieta Earthquake)');
addPin(37.8,-122.418,'Bedazzled','1155 Filbert Street at Hyde','Directed by Harold Ramis<br />Featuring: Brendan Fraser,Elizabeth Hurley,');
addPin(37.8,-122.404,'Basic Instinct','1158-70 Montgomery Street','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza');
addPin(37.7933,-122.413,'Hereafter','1160 Taylor Street','Directed by Clint Eastwood<br />Featuring: Matt Damon,Cecile De France,Bryce Dallas Howard');

addPin(37.8005,-122.405,'The House on Telegraph Hill','1227 Montgomery Street','Directed by Robert Wise<br />Featuring: Richard Basehart');
addPin(37.8005,-122.405,'Invasion of the Body Snatchers','1227 Montgomery Street (Telegraph Hill)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,');
addPin(37.7883,-122.406,'Getting Even with Dad','140 Maiden Lane','Directed by Howard Deutch<br />Featuring: Macaulay Culkin,Ted Danson,');
addPin(37.7627,-122.397,'Burglar','1400 18th Street','Directed by Hugh Wilson<br />Featuring: Whoppi Goldberg,Bobcat Goldwait,');
addPin(37.8005,-122.408,'So I Married an Axe Murderer','1462 Grant Avenue, at Union Street','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,');
addPin(37.7986,-122.406,'Play it Again, Sam','15-17 Fresno Street','Directed by Herbert Ross<br />Featuring: Woody Allen,Diane Keaton,');
addPin(37.7659,-122.445,'When a Man Loves a Woman','1521 Masonic Avenue at Piedmont Street','Directed by Luis Mandoki<br />Featuring: Andy Garcia,Meg Ryan,Ellyn Burstyn');
addPin(37.7697,-122.449,'Burglar','1627 Haight Street','Directed by Hugh Wilson<br />Featuring: Whoppi Goldberg,Bobcat Goldwait,');
addPin(37.7442,-122.414,'Joy Luck Club','180 Manchester Street','Directed by Wayne Wang<br />Featuring: Kieu Chung');
addPin(37.7878,-122.429,'Woman on the Run','1801 Laguna at Bush','Directed by Norman Foster<br />Featuring: Ann Sheridan');
addPin(37.7615,-122.428,'Magnum Force','18th Street Overpass (Potrero Hill)','Directed by Ted Post<br />Featuring: Clint Eastwood');
addPin(37.8007,-122.4,'Edtv','19 Green Street (North Beach)','Directed by Ron Howard<br />Featuring: Matthew McConaughey,Jenna Elfman,Woody Harrelson');
addPin(37.8018,-122.413,'The Dead Pool','1954 Mason Street (North Beach)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.775,-122.423,'Love & Taxes','198 Gough Street','Directed by Jacob Kornbluth<br />Featuring: Jacob Kornbluth');
addPin(37.7562,-122.422,'Love & Taxes','20 Hill Street','Directed by Jacob Kornbluth<br />Featuring: Jacob Kornbluth');
addPin(37.7931,-122.397,'180','200 block Market Street','Directed by Jayendra<br />Featuring: Siddarth,Nithya Menon,Priya Anand');
addPin(37.7923,-122.401,'The Presidio','200 Block of Sansome Street (Financial District)','Directed by Peter Hyams<br />Featuring: Sean Connery,Mark Harmon,Meg Ryan');
addPin(37.7545,-122.4,'On the Road','2017 23rd Street','Directed by Walter Salles<br />Featuring: Garrett Hedlund,Viggo Mortenson,Kirsten Stewart');
addPin(37.7934,-122.429,'The Lineup','2090 Jackson Street','Directed by Don Siegel<br />Featuring: Eli Wallach');
addPin(37.7589,-122.415,'A Jitney Elopement','20th and Folsom Streets','Directed by Charles Chaplin<br />Featuring: Charles Chaplin');
addPin(37.7966,-122.434,'Doctor Doolittle','2100 Green Street','Directed by Betty Thomas<br />Featuring: Eddie Murphy,Ossie Davis,Oliver Platt');
addPin(37.7947,-122.432,'Basic Instinct','2104 Broadway','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza');
addPin(37.7973,-122.434,'Doctor Doolittle','2107 Union Street','Directed by Betty Thomas<br />Featuring: Eddie Murphy,Ossie Davis,Oliver Platt');
addPin(37.7925,-122.429,'Magnum Force','2190 Washington Street (Pacific Heights)','Directed by Ted Post<br />Featuring: Clint Eastwood');
addPin(37.7906,-122.431,'Family Plot','2230 Sacramento Street','Directed by Alfred Hitchcock<br />Featuring: Bruce Dern,Barbara Harris,William Devane<br />Fun Fact: Called "1001 Franklin" in the film.');
addPin(37.7572,-122.4,'Chu Chu and the Philly Flash','22nd and Carolina Streets (Potrero Hill)','Directed by David Lowell Rich<br />Featuring: Alan Arkin,Carol Burnett,Danny Aiello');
addPin(37.7572,-122.401,'The Dead Pool','22nd Bet. Carolina & Rhode Island Streets (Potrero Hill)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.8011,-122.444,'Time After Time','2340 Francisco Street','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,');
addPin(37.7967,-122.426,'Petulia','2417 Franklin Street','Directed by Richard Lester<br />Featuring: Julie Christie,George C. Scott,Richard Chamberlain');
addPin(37.7513,-122.434,'Foul Play','24th and Castro Streets (Noe Valley)','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,');
addPin(37.7585,-122.407,'Crackers','24th Street between Mission Street and Potrero Avenue','Directed by Louis Malle<br />Featuring: Donald Sutherland,Sean Penn,');
addPin(37.753,-122.409,'The Enforcer','24th Street Mini Park (Mission District)','Directed by James Fargo<br />Featuring: Clint Eastwood,Tyne Daly,');
addPin(37.8046,-122.42,'Junior','2552 Hyde Street','Directed by Ivan Reitman<br />Featuring: Arnold Schwarzenegger,Danny DeVito,Emma Thompson');
addPin(37.7947,-122.447,'The Princess Diaries','2601 Lyon Street','Directed by Garry Marshall<br />Featuring: Julie Andrews,Anne Hathway,Hector Elizondo');
addPin(37.8023,-122.421,'Experiment in Terror','2632 Larkin Street at Lombard','Directed by Blake Edwards<br />Featuring: Glenn Ford,Lee Remick,');
addPin(37.7946,-122.442,'Bullitt','2700 Vallejo Street (Pacific Heights)','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,');
addPin(37.7946,-122.442,'Pleasure of His Company','2700 Vallejo Street (Pacific Heights)','Directed by George Seaton<br />Featuring: Fred Astaire,Debbie Reynolds,');
addPin(37.7156,-122.399,'Magnum Force','280 Freeway at Pennsylvania and Mariposa Streets','Directed by Ted Post<br />Featuring: Clint Eastwood');
addPin(37.7957,-122.44,'Sudden Fear','2800 Scott Street','Directed by David Miller<br />Featuring: Joan Crawford,Jack Palance,');
addPin(37.7926,-122.442,'Heart and Souls','2810 Pacific Avenue','Directed by Tomas Gislason<br />Featuring: Jorgen Leth');
addPin(37.7941,-122.445,'The Towering Inferno','2898 Vallejo Street','Directed by John Guillermin<br />Featuring: Steve McQueen,Paul Newman,William Holden');
addPin(37.7942,-122.446,'Basic Instinct','2930 Vallejo Street','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza');
addPin(37.7438,-122.424,'Milk','29th and Delores Street','Directed by Gus Van Sant<br />Featuring: Sean Penn,Emile Hirsch,Josh Brolin');
addPin(37.7895,-122.394,'The Game','301 Howard Street','Directed by David Fincher<br />Featuring: Michael Douglas,Sean Penn,');
addPin(37.7652,-122.461,'So I Married an Axe Murderer','305 Hugo Street','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,');
addPin(37.8019,-122.405,'Petulia','307 Filbert Street','Directed by Richard Lester<br />Featuring: Julie Christie,George C. Scott,Richard Chamberlain');
addPin(37.7722,-122.43,'Woman on Top','312 Fillmore Street','Directed by Fina Torres<br />Featuring: Penelope Cruz');
addPin(37.7649,-122.422,'My Reality','3122 16th Street','Directed by Marcia Kimpton<br />Featuring: Marcia Kimpton');
addPin(37.8026,-122.404,'Invasion of the Body Snatchers','32 Napier Lane','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,');
addPin(37.7812,-122.455,'American Graffiti','3355 Geary Blvd.','Directed by George Lucas<br />Featuring: Richard Dryfuss');

addPin(37.7616,-122.423,'Vegas in Space','3567 18th Street','Directed by Phillip R. Ford<br />');
addPin(37.7481,-122.459,'Joy Luck Club','375 Laguna Honda Blvd.','Directed by Wayne Wang<br />Featuring: Kieu Chung');
addPin(37.7506,-122.424,'Cherish','387 Fair Oaks at 25th Street','Directed by Finn Taylor<br />Featuring: Brad Hunt,Robin Tunney,Liz Phair');
addPin(37.7616,-122.393,'High Crimes','391 Pennsylvania Avnue at 19th Street','Directed by Carl Franklin<br />Featuring: Ashley Judd,Morgan Freeman,');
addPin(37.7931,-122.403,'Fearless','400 Montgomery Street','Directed by Peter Weir<br />Featuring: Jeff Bridges,Isabella Rosellini,Rosie Perez');
addPin(37.7747,-122.426,'Vegas in Space','422 Oak Street at Laguna','Directed by Phillip R. Ford<br />');
addPin(37.7942,-122.401,'Milk','424 Sansome Street','Directed by Gus Van Sant<br />Featuring: Sean Penn,Emile Hirsch,Josh Brolin');
addPin(37.7993,-122.405,'Foul Play','430 Vallejo Street (Telegraph Hill)','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,');
addPin(37.7554,-122.387,'Groove','435 23rd Street at Ilinois','Directed by Greg Harrison<br />Featuring: Chris Ferreira,Elizabeth Sun,');
addPin(37.7554,-122.387,'Groove','435 23rd Street at Ilinois','Directed by Greg Harrison<br />Featuring: Chris Ferreira,Elizabeth Sun,');
addPin(37.7554,-122.387,'Groove','435 23rd Street at Ilinois','Directed by Greg Harrison<br />Featuring: Chris Ferreira,Elizabeth Sun,');
addPin(37.7964,-122.411,'Star Trek IV: The Voyage Home','500 Block of Pacific Avenue (Chinatown)','Directed by Leonard Nimoy<br />Featuring: William Shatner,Leonard Nimoy,');
addPin(37.763,-122.424,'My Reality','500 Club (500 Guerrero)','Directed by Marcia Kimpton<br />Featuring: Marcia Kimpton');
addPin(37.7998,-122.408,'Mrs. Doubtfire','516 Green Street','Directed by Chris Columbus<br />Featuring: Robin Williams,Sally Field,Pierce Brosnan');
addPin(37.7997,-122.408,'Mrs. Doubtfire','520-522A Green Street at Grant Street','Directed by Chris Columbus<br />Featuring: Robin Williams,Sally Field,Pierce Brosnan');
addPin(37.7794,-122.409,'Vegas in Space','544 Natoma (SOMA)','Directed by Phillip R. Ford<br />');
addPin(37.7875,-122.49,'The Dead Pool','550 El Camino Del Mar (Seacliff)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7899,-122.4,'180','555 Market St.','Directed by Jayendra<br />Featuring: Siddarth,Nithya Menon,Priya Anand');
addPin(37.7889,-122.393,'Fearless','5th and Beale Streets','Directed by Peter Weir<br />Featuring: Jeff Bridges,Isabella Rosellini,Rosie Perez');
addPin(37.7925,-122.395,'Nine Months','60 Spear Street','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold');
addPin(37.7619,-122.403,'Joy Luck Club','610 Rhode Island Street (Potrero Hill)','Directed by Wayne Wang<br />Featuring: Kieu Chung');
addPin(37.7692,-122.451,'Boys and Girls','628 Cole Street','Directed by Robert Iscove<br />Featuring: Freddie Prinze, Jr.,Alyson Hannigan,');
addPin(37.7928,-122.443,'Guess Who\'s Coming to Dinner','634 Raycliff Terrace','Directed by Stanley Kramer<br />Featuring: Spencer Tracy,Sidney Poitier,Katherine Hepburn');
addPin(37.7749,-122.419,'Interview With The Vampire','6th Street On-ramp to Highway 280','Directed by Neil Jordan<br />Featuring: Brad Pitt,Christian Slater,Tom Cruise');
addPin(37.7961,-122.407,'The Presidio','700 Block of Jackson Street (Chinatown)','Directed by Peter Hyams<br />Featuring: Sean Connery,Mark Harmon,Meg Ryan');
addPin(37.7761,-122.433,'The Dead Pool','710 Steiner Street (Hayes Valley)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7764,-122.433,'Invasion of the Body Snatchers','720 Steiner Street (Hayes Valley)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,');
addPin(37.7764,-122.433,'Junior','722 Steiner Street','Directed by Ivan Reitman<br />Featuring: Arnold Schwarzenegger,Danny DeVito,Emma Thompson');
addPin(37.7764,-122.433,'Maxie','722 Steiner Street (Postcard Row, Alamo Square, Hayes Valley)','Directed by Paul Aaron<br />Featuring: Glenn Close,Mandy Patinkin,Ruth Gordon<br />Fun Fact: The 6 Victorian homes across from Alamo Square Park are among the few Victorians to survive the Great Fire.');

addPin(37.7936,-122.397,'A Smile Like Yours','75 California Street','Directed by Keith Samples<br />Featuring: Greg Kinnear,Lauren Holly,Joan Cusack');
addPin(37.7985,-122.41,'George of the Jungle','755 Vallejo Street','Directed by Sam Weisman<br />Featuring: Brendan Fraser,Leslie Mann,Thomas Haden Church');
addPin(37.7889,-122.413,'The Assassination of Richard Nixon','766 Sutter Street','Directed by Niels Mueller<br />Featuring: Sean Penn,Naomi Watts,Don Cheadle');
addPin(37.7985,-122.41,'When a Man Loves a Woman','766 Vallejo Street at Stockton Street (North Beach)','Directed by Luis Mandoki<br />Featuring: Andy Garcia,Meg Ryan,Ellyn Burstyn');
addPin(37.794,-122.406,'Woman on the Run','772 Commercial Street at Kearney','Directed by Norman Foster<br />Featuring: Ann Sheridan,,<br />Fun Fact: Called "Man Loh\'s Oriental Roof Garden" in the film.');
addPin(37.7912,-122.411,'Woman on the Run','819 Mason Street at Pine','Directed by Norman Foster<br />Featuring: Ann Sheridan');
addPin(37.8054,-122.44,'Copycat','82 & 67 Rico Way (Marina District)','Directed by Jon Amiel<br />Featuring: Sigourney Weaver,Holly Hunter,Dermot Mulroney');
addPin(37.784,-122.408,'Woman on the Run','835-865 Market Street at 5th Street','Directed by Norman Foster<br />Featuring: Ann Sheridan,,<br />Fun Fact: The Emporiaum, a department store, stood in this location. Bloomingdale\'s is now located here. ');
addPin(37.7967,-122.403,'Fearless','90 Gold Street','Directed by Peter Weir<br />Featuring: Jeff Bridges,Isabella Rosellini,Rosie Perez');
addPin(37.7954,-122.406,'The Presidio','900 Block of Grant Avenue (Chinatown)','Directed by Peter Hyams<br />Featuring: Sean Connery,Mark Harmon,Meg Ryan');
addPin(37.8025,-122.417,'Vertigo','900 Lombard Street','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,<br />Fun Fact: Lombard Street is not actually the crookedest in SF. That honor goes to Potrero Hill\'s Vermont Street between 22nd and 23rd.');
addPin(37.7996,-122.414,'Joy Luck Club','901 Union Street','Directed by Wayne Wang<br />Featuring: Kieu Chung');
addPin(37.8235,-122.371,'Indiana Jones and the Last Crusade','Administration Building (Treasure Island)','Directed by Steven Spielberg<br />Featuring: Harrison Ford,Sean Connery,<br />Fun Fact: An artificial island, Treasure Island was created for the 1939 Golden Gate International Exposition, and is named after the novel by Robert Louis Stevenson, a one-time San Francisco resident.');
addPin(37.8235,-122.371,'The Parent Trap','Administration Building (Treasure Island)','Directed by Nancy Meyers<br />Featuring: Lindsay Lohan,Dennis Quaid,Natasha Richardson<br />Fun Fact: An artificial island, Treasure Island was created for the 1939 Golden Gate International Exposition, and is named after the novel by Robert Louis Stevenson, a one-time San Francisco resident.');
addPin(37.8003,-122.414,'So I Married an Axe Murderer','Aladdin Terrace (off of Taylor Street, Between Filbert and Union)','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,');
addPin(37.7763,-122.435,'Nine Months','Alamo Square','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold');
addPin(37.7763,-122.435,'Murder in the First','Alamo Square','Directed by Marc Rocco<br />Featuring: Christian Slater,Kevin Bacon,Gary Oldman');
addPin(37.7763,-122.435,'The Conversation','Alamo Square (Hayes Valley)','Directed by Francis Ford Coppola<br />Featuring: Gene Hackman');
addPin(37.7852,-122.407,'Nine to Five','Albert S. Samuels Clock (856 Market Street between Powell and Stockton)','Directed by Colin Higgins<br />Featuring: Jane Fonda,Lily Tomlin,Dolly Parton');
addPin(37.827,-122.423,'Murder in the First','Alcatraz Island','Directed by Marc Rocco<br />Featuring: Christian Slater,Kevin Bacon,Gary Oldman<br />Fun Fact: Alcatraz Island was a military fort before it became a prison.');
addPin(37.827,-122.423,'So I Married an Axe Murderer','Alcatraz Island','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,<br />Fun Fact: Alcatraz Island was a military fort before it became a prison.');
addPin(37.827,-122.423,'Point Blank','Alcatraz Island','Directed by John Boorman<br />Featuring: Lee Marvin,Angie Dickinson,<br />Fun Fact: Alcatraz Island was a military fort before it became a prison.');
addPin(37.827,-122.423,'Escape From Alcatraz','Alcatraz Island','Directed by Donald Siegel<br />Featuring: Clint Eastwood,Patrick McGoohan,<br />Fun Fact: Alcatraz Island was a military fort before it became a prison.');
addPin(37.827,-122.423,'Boys and Girls','Alcatraz Island','Directed by Robert Iscove<br />Featuring: Freddie Prinze, Jr.,Alyson Hannigan,<br />Fun Fact: Alcatraz Island was a military fort before it became a prison.');
addPin(37.827,-122.423,'Birdman of Alcatraz','Alcatraz Island','Directed by John Frankenheimer<br />Featuring: Bert Lancaster,Karl Maden,<br />Fun Fact: Alcatraz Island was a military fort before it became a prison.');
addPin(37.827,-122.423,'The Enforcer','Alcatraz Island','Directed by James Fargo<br />Featuring: Clint Eastwood,Tyne Daly,<br />Fun Fact: Alcatraz Island was a military fort before it became a prison.');
addPin(37.827,-122.423,'The Rock','Alcatraz Island','Directed by Michael Bay<br />Featuring: Sean Connery,Nicholas Cage,Ed Harris<br />Fun Fact: Alcatraz Island was a military fort before it became a prison.');
addPin(37.7749,-122.419,'Freebie and the Bean','Alco Plaza','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,');
addPin(37.7953,-122.399,'The Conversation','Alcoa Building (1 Maritime Plaza)','Directed by Francis Ford Coppola<br />Featuring: Gene Hackman,,<br />Fun Fact: A partially-above ground parking structure near the building made it necessary for architects to make the Alcoa Building\'s diagonal bracing visible, instead of placing it inside and drastically reducing the amount usable interior space. ');
addPin(37.7911,-122.438,'Copycat','Alta Plaza Park','Directed by Jon Amiel<br />Featuring: Sigourney Weaver,Holly Hunter,Dermot Mulroney<br />Fun Fact: The park was originally a rock quarry and served as a campground for many survivors of the 1906 earthquake. The site was converted to a park in 1910.');
addPin(37.785,-122.435,'The Conversation','Alta Plaza Park (Steiner Street)','Directed by Francis Ford Coppola<br />Featuring: Gene Hackman,,<br />Fun Fact: The park was originally a rock quarry and served as a campground for many survivors of the 1906 earthquake. The site was converted to a park in 1910.');
addPin(37.7749,-122.419,'What\'s Up Doc?','Alta Plaza Park (Steiner Street)','Directed by Peter Bogdanovich<br />Featuring: Barbara Streisand,Ryan O\'Neal,<br />Fun Fact: The park was originally a rock quarry and served as a campground for many survivors of the 1906 earthquake. The site was converted to a park in 1910.');
addPin(37.7664,-122.404,'The Conversation','American Roofing Co. Building (297 Kansas Street, Potrero Hill)','Directed by Francis Ford Coppola<br />Featuring: Gene Hackman');
addPin(37.8075,-122.421,'Boys and Girls','Aquatic Park (Jefferson Street)','Directed by Robert Iscove<br />Featuring: Freddie Prinze, Jr.,Alyson Hannigan,<br />Fun Fact: Located at one end of Fisherman\'s Wharf, Aquatic Park was built as part of FDR\'s Works Progress Administration Project.');
addPin(37.8057,-122.436,'Play it Again, Sam','Aquatic Park (Jefferson Street)','Directed by Herbert Ross<br />Featuring: Woody Allen,Diane Keaton,<br />Fun Fact: Located at one end of Fisherman\'s Wharf, Aquatic Park was built as part of FDR\'s Works Progress Administration Project.');
addPin(37.8075,-122.421,'Murder in the First','Aquatic Park (Jefferson Street)','Directed by Marc Rocco<br />Featuring: Christian Slater,Kevin Bacon,Gary Oldman<br />Fun Fact: Located at one end of Fisherman\'s Wharf, Aquatic Park was built as part of FDR\'s Works Progress Administration Project.');
addPin(37.7802,-122.416,'Maxie','Asian Art Museum (200 Larkin Street, Civic Center)','Directed by Paul Aaron<br />Featuring: Glenn Close,Mandy Patinkin,Ruth Gordon<br />Fun Fact: The Dalai Lama opened an exhibition on Wisdom and Compassion at the museum in 1991.');
addPin(37.7803,-122.416,'Foul Play','Asian Art Museum (200 Larkin Street, Civic Center)','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,<br />Fun Fact: The Dalai Lama opened an exhibition on Wisdom and Compassion at the museum in 1991.');
addPin(37.7942,-122.483,'Dream for an Insomniac','Baker Beach','Directed by Tiffanie DeBartolo<br />Featuring: Ione Skye,Jennifer Aniston,<br />Fun Fact: From 1986-1990, the north end of Baker Beach was home to the Burning Man festival.');
addPin(37.7942,-122.483,'The Princess Diaries','Baker Beach','Directed by Garry Marshall<br />Featuring: Julie Andrews,Anne Hathway,Hector Elizondo');
addPin(37.7764,-122.481,'Play it Again, Sam','Balboa at 22nd Avenue','Directed by Herbert Ross<br />Featuring: Woody Allen,Diane Keaton,');
addPin(37.7526,-122.412,'The Enforcer','Balmy Street (Mission District)','Directed by James Fargo<br />Featuring: Clint Eastwood,Tyne Daly,');
addPin(37.7993,-122.409,'Take the Money and Run','Bank of America (1455 Stockton Street)','Directed by Woody Allen<br />Featuring: Woody Allen');
addPin(37.7757,-122.498,'Patty Hearst','Bank of America (38th Street at Balboa Street)','Directed by Paul Schrader<br />Featuring: Natasha Richardson,William Forsythe,Ving Rhames<br />Fun Fact: The Bank of America Building was the tallest building on the West Coast from 1969-1972, when it was surpassed by the TransAmerica Pyramid. Today, the Bank of America building is the 5th tallest building on the West Coast.');
addPin(37.7921,-122.404,'High Crimes','Bank of America Building (555 California Street)','Directed by Mel Brooks<br />Featuring: Mel Brooks,Madeline Kahn,Cloris Leachman<br />Fun Fact: The Bank of America Building was the tallest building on the West Coast from 1969-1972, when it was surpassed by the TransAmerica Pyramid. Today, the Bank of America building is the 5th tallest building on the West Coast.');
addPin(37.7921,-122.404,'Dirty Harry','Bank of America Building (555 California Street)','Directed by Don Siegel<br />Featuring: Clint Eastwood,,<br />Fun Fact: The Bank of America Building was the tallest building on the West Coast from 1969-1972, when it was surpassed by the TransAmerica Pyramid. Today, the Bank of America building is the 5th tallest building on the West Coast.');
addPin(37.7921,-122.404,'Fearless','Bank of America Building (555 California Street)','Directed by Peter Weir<br />Featuring: Jeff Bridges,Isabella Rosellini,Rosie Perez<br />Fun Fact: The Bank of America Building was the tallest building on the West Coast from 1969-1972, when it was surpassed by the TransAmerica Pyramid. Today, the Bank of America building is the 5th tallest building on the West Coast.');
addPin(37.7921,-122.404,'The Game','Bank of America Building (555 California Street)','Directed by David Fincher<br />Featuring: Michael Douglas,Sean Penn,<br />Fun Fact: The Bank of America Building was the tallest building on the West Coast from 1969-1972, when it was surpassed by the TransAmerica Pyramid. Today, the Bank of America building is the 5th tallest building on the West Coast.');
addPin(37.7921,-122.404,'The Towering Inferno','Bank of America Building (555 California Street, Financial District)','Directed by John Guillermin<br />Featuring: Steve McQueen,Paul Newman,William Holden<br />Fun Fact: The Bank of America Building was the tallest building on the West Coast from 1969-1972, when it was surpassed by the TransAmerica Pyramid. Today, the Bank of America building is the 5th tallest building on the West Coast.');
addPin(37.7901,-122.391,'Pal Joey','Barbary Coast','Directed by George Sidney<br />Featuring: Rita Hayworth,Frank Sinatra,Kim Novak<br />Fun Fact: The Barbary Coast was a red-light district that was largely destroyed in the 1906 earthquake. Though some of the establishments were rebuilt after the earthquake, an anti-vice campaign put the establisments out of business.');
addPin(37.7968,-122.401,'The Presidio','Battery Street (The Embarcadero)','Directed by Peter Hyams<br />Featuring: Sean Connery,Mark Harmon,Meg Ryan');
addPin(37.804,-122.432,'The Game','Bay Bridge','Directed by David Fincher<br />Featuring: Michael Douglas,Sean Penn,<br />Fun Fact: Before opening in 1936, the bridge was blessed by Cardinal Secretary of State Eugene Cardinal Pacelli, who later became Pope Pius XII. ');
addPin(37.804,-122.432,'The Graduate','Bay Bridge','Directed by Mike Nichols<br />Featuring: Anne Bancroft,Dustin Hoffman,<br />Fun Fact: Before opening in 1936, the bridge was blessed by Cardinal Secretary of State Eugene Cardinal Pacelli, who later became Pope Pius XII. ');
addPin(37.804,-122.432,'On the Road','Bay Bridge','Directed by Walter Salles<br />Featuring: Garrett Hedlund,Viggo Mortenson,Kristen Stewart');
addPin(37.804,-122.432,'Shadow of the Thin Man','Bay Bridge','Directed by W.S. Van Dyke<br />Featuring: William Powell,Myrna Loy,Donna Reed<br />Fun Fact: Before opening in 1936, the bridge was blessed by Cardinal Secretary of State Eugene Cardinal Pacelli, who later became Pope Pius XII. ');
addPin(37.804,-122.432,'George of the Jungle','Bay Bridge','Directed by Sam Weisman<br />Featuring: Brendan Fraser,Leslie Mann,Thomas Haden Church<br />Fun Fact: Before opening in 1936, the bridge was blessed by Cardinal Secretary of State Eugene Cardinal Pacelli, who later became Pope Pius XII. ');
addPin(37.804,-122.432,'Dream with the Fishes','Bay Bridge','Directed by Finn Taylor<br />Featuring: David Arquette,Brad Hunt,Cathy Moriarty<br />Fun Fact: Before opening in 1936, the bridge was blessed by Cardinal Secretary of State Eugene Cardinal Pacelli, who later became Pope Pius XII. ');
addPin(37.804,-122.432,'Bullitt','Bay Bridge','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,<br />Fun Fact: Before opening in 1936, the bridge was blessed by Cardinal Secretary of State Eugene Cardinal Pacelli, who later became Pope Pius XII. ');
addPin(37.7304,-122.384,'Bullitt','Bayshore Blvd near Cesar Chavez (Bayview)','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,');
addPin(37.7884,-122.413,'Nora Prentiss','Belgravia Apartments (795 Sutter Street at Jones)','Directed by Vincent Sherman<br />Featuring: Ann Sheridan,Kent Smith,');
addPin(37.7961,-122.403,'Nine Months','Belli Building (722 Montgomery Street at Washington)','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold');
addPin(37.776,-122.407,'Star Trek IV: The Voyage Home','Bessie Charmichael Elementary School (375 Seventh Street, SOMA)','Directed by Leonard Nimoy<br />Featuring: William Shatner,Leonard Nimoy,');
addPin(37.8038,-122.415,'Invasion of the Body Snatchers','Bimbo\'s 365 Club (1025 Columbus Avenue, North Beach)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,');
addPin(37.7969,-122.403,'Class Action','Bix Restaurant (56 Gold Street)','Directed by Michael Apted<br />Featuring: Gene Hackman,Mary Elizabeth Mastrantonio,Colin Friels');
addPin(37.7969,-122.403,'Final Analysis','Bix Restaurant (56 Gold Street)','Directed by Phil Joanou<br />Featuring: Richard Gere,Kim Basinger,Uma Thurman');
addPin(37.7584,-122.395,'Sweet November','Blooms Saloon (18th Street between Missouri and Texas Streets)','Directed by Pat O\'Connor<br />Featuring: Keanu Reeves,Charlize Theron,');
addPin(37.8065,-122.422,'Sudden Impact','Bowles Franklin Galleries (765 Beach Street, Fisherman\'s Wharf)','Directed by Clint Eastwood<br />Featuring: Clint Eastwood,Sondra Locke,');
addPin(37.7983,-122.405,'A Night Full of Rain','Broadway (North Beach)','Directed by Lina Wertmuller<br />Featuring: Candice Bergen,Giancarlo Gianni,');
addPin(37.7979,-122.407,'Freebie and the Bean','Broadway and Columbus Avenue (North Beach)','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,');
addPin(37.7983,-122.403,'Time After Time','Broadway at Osgood Street (North Beach)','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,');
addPin(37.7966,-122.404,'Swing','Broadway Studios (435 Broadway at Montgomery Street)','Directed by Martin Guigui<br />Featuring: Constance Brenneman');
addPin(37.7749,-122.419,'The Princess Diaries','Broadway Tunnel (Broadway between Powell and Larkin)','Directed by Garry Marshall<br />Featuring: Julie Andrews,Anne Hathway,Hector Elizondo');
addPin(37.7968,-122.415,'Invasion of the Body Snatchers','Broadway Tunnel (Russian Hill)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,');
addPin(37.7968,-122.415,'Magnum Force','Broadway Tunnel (Russian Hill)','Directed by Ted Post<br />Featuring: Clint Eastwood');
addPin(37.7931,-122.411,'Bullitt','Brocklebank Apartments (1000 Mason Street)','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,');
addPin(37.7931,-122.411,'The Woman In Red','Brocklebank Apartments (1000 Mason Street)','Directed by Gene Wilder<br />Featuring: Gene Wilder,Charles Grodin,');
addPin(37.7931,-122.411,'Vertigo','Brocklebank Apartments (1000 Mason Street)','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,');
addPin(37.7931,-122.411,'Sudden Fear','Brocklebank Apartments (1000 Mason Street)','Directed by David Miller<br />Featuring: Joan Crawford,Jack Palance,');
addPin(37.8064,-122.421,'When a Man Loves a Woman','Buena Vista Café (2765 Hyde Street)','Directed by Luis Mandoki<br />Featuring: Andy Garcia,Meg Ryan,Ellyn Burstyn');
addPin(37.7682,-122.439,'Golden Gate','Buena Vista Park (Haight Street at Buena Vista)','Directed by John Madden<br />Featuring: Matt Dillon,Joan Chen,<br />Fun Fact: Established in 1867, Buena Vista Park is the oldest official park in San Francisco.');
addPin(37.8014,-122.456,'Dr. Doolittle 2','Building 924, Presido (Golden Gate National Recreation Area)','Directed by Steve Carr<br />Featuring: Eddie Murphy,Kristen Wilson,Raven-Symone<br />Fun Fact: In 1776, Spain made the Presido a fortified area. The area was then given to Mexico, but then given to the US in 1848. The 1994 demilitarization of the area in 1994 marked the end of its 219 years of military use. ');
addPin(37.7775,-122.391,'A View to a Kill','Burger Island (901 3rd Street, China Basin)','Directed by John Glen<br />Featuring: Roger Moore,Christopher Walken,');

addPin(37.7863,-122.433,'Greed','Bush and Sutter Streets','Directed by Eric von Stroheim <br />Featuring: Zasu Pitts');
addPin(37.7896,-122.414,'Metro','Bush Street at Jones','Directed by Thomas Carter<br />Featuring: Eddie Murphy');
addPin(37.7961,-122.41,'Woman on the Run','Cable Car Signal Box (California Street at Powell Street)','Directed by Norman Foster<br />Featuring: Ann Sheridan,,<br />Fun Fact: SF Cable Cars are the only moving National Historical Landmark.');
addPin(37.7976,-122.433,'Bullitt','Café Cantata (2040 Union Street)','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,');
addPin(37.7649,-122.422,'So I Married an Axe Murderer','Café Picaro 3120 16th Street','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,');
addPin(37.7749,-122.419,'Forty Days and Forty Nights','Café Trieste (609 Vallejo)','Directed by Michael Lehmann<br />Featuring: Josh Hartnett,Shaynnyn Sossamon,<br />Fun Fact: Francis Ford Coppola allegedly wrote large portions of "The Godfather" trilogy in Café Trieste.');
addPin(37.791,-122.417,'Petulia','Cala Foods (California Street and Hyde)','Directed by Richard Lester<br />Featuring: Julie Christie,George C. Scott,Richard Chamberlain');
addPin(37.77,-122.466,'Burglar','California Academy of Sciences (Golden Gate Park)','Directed by Hugh Wilson<br />Featuring: Whoppi Goldberg,Bobcat Goldwait,<br />Fun Fact: Founded in 1853, 3 years after California joined the United States, the Academy was originally named the California Academy of Natural Sciences and was the first institution of its kind in the United States.');
addPin(37.77,-122.466,'Time After Time','California Academy of Sciences (Golden Gate Park)','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,<br />Fun Fact: Founded in 1853, 3 years after California joined the United States, the Academy was originally named the California Academy of Natural Sciences and was the first institution of its kind in the United States.');
addPin(37.77,-122.466,'The Competiton','California Academy of Sciences (Golden Gate Park)','Directed by Joel Oliansky<br />Featuring: Richard Dreyfuss,Lee Remick,<br />Fun Fact: Founded in 1853, 3 years after California joined the United States, the Academy was originally named the California Academy of Natural Sciences and was the first institution of its kind in the United States.');
addPin(37.7852,-122.42,'Dirty Harry','California Hall (625 Polk Street, Van Ness/Civic Center)','Directed by Don Siegel<br />Featuring: Clint Eastwood');
addPin(37.7845,-122.501,'Vertigo','California Palace of the Legion of Honor (34th Avenue & Clement, Lincoln Park)','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,<br />Fun Fact: Built in 1924, the Legion of Honor is a 3/4 replica of the Parisian Palais de la Legion d\'Honneur. ');
addPin(37.7136,-122.386,'Experiment in Terror','Candlestick Park','Directed by Blake Edwards<br />Featuring: Glenn Ford,Lee Remick,<br />Fun Fact: Then Vice President Richard Nixon threw out the first pitch when Candlestick openend in 1960. On August 29, 1966, The Beatles played their last concert for paying fans at Candlestick Park.');
addPin(37.7136,-122.386,'Getting Even with Dad','Candlestick Park (602 Jamestown Ave.)','Directed by Howard Deutch<br />Featuring: Macaulay Culkin,Ted Danson,<br />Fun Fact: Then Vice President Richard Nixon threw out the first pitch when Candlestick openend in 1960. On August 29, 1966, The Beatles played their last concert for paying fans at Candlestick Park.');
addPin(37.7136,-122.386,'Freebie and the Bean','Candlestick Park (602 Jamestown Ave.)','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,<br />Fun Fact: Then Vice President Richard Nixon threw out the first pitch when Candlestick openend in 1960. On August 29, 1966, The Beatles played their last concert for paying fans at Candlestick Park.');
addPin(37.7136,-122.386,'The Pursuit of Happyness','Candlestick Park (602 Jamestown Ave.)','Directed by Steven Conrad<br />Featuring: Will Smith,Jayden C. Smith,Thandie Newton<br />Fun Fact: Then Vice President Richard Nixon threw out the first pitch when Candlestick openend in 1960. On August 29, 1966, The Beatles played their last concert for paying fans at Candlestick Park.');
addPin(37.7136,-122.386,'The Fan','Candlestick Park (602 Jamestown Ave.)','Directed by Tony Scott<br />Featuring: Robert De Niro,Wesley Snipes,Ellen Barkin<br />Fun Fact: Then Vice President Richard Nixon threw out the first pitch when Candlestick openend in 1960. On August 29, 1966, The Beatles played their last concert for paying fans at Candlestick Park.');
addPin(37.8023,-122.45,'Bullitt','Candlestick Park Exit, Highway 101','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,');
addPin(37.7749,-122.419,'Sister Act 2: Back in the Habit','Carnelian Room, Bank of America Building (555 California Street, 53rd Floor)','Directed by Bill Duke<br />Featuring: Whoopi Goldberg,Maggie Smith,Lauryn Hill<br />Fun Fact: The Bank of America Building was the tallest building on the West Coast from 1969-1972, when it was surpassed by the TransAmerica Pyramid. Today, the Bank of America building is the 5th tallest building on the West Coast.');
addPin(37.7653,-122.439,'Vegas in Space','Carona Heights Park','Directed by Phillip R. Ford<br />');
addPin(37.808,-122.418,'Herbie Rides Again','Castagnola\'s Restaurant (Fisherman\'s Wharf)','Directed by Robert Stevenson<br />Featuring: Helen Hayes,Ken Berry,');
addPin(37.762,-122.435,'Edtv','Castro Theatre (429 Castro Street, The Castro)','Directed by Ron Howard<br />Featuring: Matthew McConaughey,Jenna Elfman,Woody Harrelson<br />Fun Fact: The original Castro Theatre was built in 1910, a few doors down from the current theatre. The original theatre was converted into retail space, and the current theatre was built in the 1920s.');
addPin(37.786,-122.422,'The Conversation','Cathedral Hill Hotel (1101 Van Ness Avenue, Civic Center)','Directed by Francis Ford Coppola<br />Featuring: Gene Hackman');
addPin(37.7749,-122.419,'Sister Act 2: Back in the Habit','CCSF Alemany Campus ','Directed by Bill Duke<br />Featuring: Whoopi Goldberg,Maggie Smith,Lauryn Hill');
addPin(35.426,-120.604,'Edtv','Center for the Arts, Yerba Buena Gardens (701 Mission Street)','Directed by Ron Howard<br />Featuring: Matthew McConaughey,Jenna Elfman,Woody Harrelson');
addPin(37.7749,-122.419,'D.O.A','Chambord Apartments (1298 Sacramento Street at Jones)','Directed by Rudolph Mate<br />Featuring: Edmond O\'Brien,Pamela Britton,Luther Adler');
addPin(37.7909,-122.4,'High Crimes','Chase H & Q  (1 Bush Street at Sansome)','Directed by Mel Brooks<br />Featuring: Mel Brooks,Madeline Kahn,Cloris Leachman');
addPin(37.797262, -122.407550,'Invasion of the Body Snatchers','Chinatown','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,<br />Fun Fact: First established in the mid-19th Century, SF\'s Chinatown is the oldest and largest Chinatown in the US.');
addPin(37.796939, -122.406777,'Romeo Must Die','Chinatown','Directed by Andrzej Bartkowiak<br />Featuring: Jet Li,Aaliyah,<br />Fun Fact: First established in the mid-19th Century, SF\'s Chinatown is the oldest and largest Chinatown in the US.');
addPin(37.795252, -122.405694,'Pacific Heights','Chinatown','Directed by John Schlesinger<br />Featuring: Melanie Griffith,Matthew Modine,Michael Keaton<br />Fun Fact: First established in the mid-19th Century, SF\'s Chinatown is the oldest and largest Chinatown in the US.');
addPin(37.796024, -122.406938,'Milk','Chinatown','Directed by Gus Van Sant<br />Featuring: Sean Penn,Emile Hirsch,Josh Brolin<br />Fun Fact: First established in the mid-19th Century, SF\'s Chinatown is the oldest and largest Chinatown in the US.');
addPin(37.7941,-122.408,'Dim Sum: A Little Bit of Heart','Chinatown','Directed by Wayne Wang<br />Featuring: ,,<br />Fun Fact: First established in the mid-19th Century, SF\'s Chinatown is the oldest and largest Chinatown in the US.');
addPin(37.796795, -122.408376,'Flower Drum Song','Chinatown','Directed by Henry Koster<br />Featuring: Nancy Kwan,James Shigeta,<br />Fun Fact: First established in the mid-19th Century, SF\'s Chinatown is the oldest and largest Chinatown in the US.');
addPin(37.795888, -122.407979,'Boys and Girls','Chinatown','Directed by Robert Iscove<br />Featuring: Freddie Prinze, Jr.,Alyson Hannigan,<br />Fun Fact: First established in the mid-19th Century, SF\'s Chinatown is the oldest and largest Chinatown in the US.');
addPin(37.794922, -122.408548,'A View to a Kill','Chinatown','Directed by John Glen<br />Featuring: Roger Moore,Christopher Walken,<br />Fun Fact: First established in the mid-19th Century, SF\'s Chinatown is the oldest and largest Chinatown in the US.');
addPin(37.7942,-122.408,'Basic Instinct','Chinatown','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza<br />Fun Fact: First established in the mid-19th Century, SF\'s Chinatown is the oldest and largest Chinatown in the US.');
addPin(37.794226, -122.406842,'What\'s Up Doc?','Chinatown','Directed by Peter Bogdanovich<br />Featuring: Barbara Streisand,Ryan O\'Neal,<br />Fun Fact: First established in the mid-19th Century, SF\'s Chinatown is the oldest and largest Chinatown in the US.');
addPin(37.7952,-122.408,'Junior','Chinatown Gate','Directed by Ivan Reitman<br />Featuring: Arnold Schwarzenegger,Danny DeVito,Emma Thompson<br />Fun Fact: Designed in 1970, the Chinatown Gate (aka the Dragon Gate) is based on ceremonial gates found in Chinese villages. ');
addPin(37.7918,-122.435,'My Reality','Chouguet\'s (2500 Washington Street)','Directed by Marcia Kimpton<br />Featuring: Marcia Kimpton');
addPin(37.8039,-122.464,'It Came From Beneath the Sea','Chrissy Field','Directed by Robert Gordon<br />Featuring: Kenneth Tobey,,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.8039,-122.464,'Mrs. Doubtfire','Chrissy Field','Directed by Chris Columbus<br />Featuring: Robin Williams,Sally Field,Pierce Brosnan<br />Fun Fact: Chrissy Field was originally an airfield for the Presidio Army Base. ');
addPin(37.8039,-122.464,'Nine Months','Chrissy Field','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold<br />Fun Fact: Chrissy Field was originally an airfield for the Presidio Army Base. ');
addPin(37.8039,-122.464,'Sweet November','Chrissy Field','Directed by Pat O\'Connor<br />Featuring: Keanu Reeves,Charlize Theron,<br />Fun Fact: Chrissy Field was originally an airfield for the Presidio Army Base. ');
addPin(37.7627,-122.397,'Sweet November','Christopher\'s Books (1400 18th Street)','Directed by Pat O\'Connor<br />Featuring: Keanu Reeves,Charlize Theron,');
addPin(37.7942,-122.402,'Sweet November','Citicorp Center (1 Sansome Street at Sutter) ','Directed by Pat O\'Connor<br />Featuring: Keanu Reeves,Charlize Theron,');
addPin(37.7918,-122.401,'The Game','City Club (155 Sansome Street)','Directed by David Fincher<br />Featuring: Michael Douglas,Sean Penn,');
addPin(37.7793,-122.419,'The Enforcer','City Hall','Directed by James Fargo<br />Featuring: Clint Eastwood,Tyne Daly,<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'Tucker: The Man and His Dreams','City Hall','Directed by Francis Ford Coppola<br />Featuring: Jeff Bridges,Joan Allen,Martin Landau<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'The Wedding Planner','City Hall','Directed by Adam Shankman<br />Featuring: Jennifer Lopez,Matthew McConaughey,<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'The Right Stuff','City Hall','Directed by Philip Kaufman<br />Featuring: Sam Shepard,Ed Harris,Dennis Quaid<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'The Rock','City Hall','Directed by Michael Bay<br />Featuring: Sean Connery,Nicholas Cage,Ed Harris<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'San Francisco','City Hall','Directed by W.S. Van Dyke<br />Featuring: Clark Gable,Jeanette MacDonald,Spencer Tracy<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'Milk','City Hall','Directed by Gus Van Sant<br />Featuring: Sean Penn,Emile Hirsch,Josh Brolin<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'Jagged Edge','City Hall','Directed by Richard Marquand<br />Featuring: Maria Mayenzet,,<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'Magnum Force','City Hall','Directed by Ted Post<br />Featuring: Clint Eastwood,,<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'Knife Fight','City Hall','Directed by Bill Guttentag<br />Featuring: Jennifer Morrison,Eric McCormack,Jamie Chung');
addPin(37.7793,-122.419,'Invasion of the Body Snatchers','City Hall','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'Bicentennial Man','City Hall','Directed by Chris Columbus<br />Featuring: Robin Williams,,<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'Bedazzled','City Hall','Directed by Harold Ramis<br />Featuring: Brendan Fraser,Elizabeth Hurley,<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'A View to a Kill','City Hall','Directed by John Glen<br />Featuring: Roger Moore,Christopher Walken,<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'A View to a Kill','City Hall','Directed by John Glen<br />Featuring: Roger Moore,Christopher Walken,<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'180','City Hall','Directed by Jayendra<br />Featuring: Siddarth,Nithya Menon,Priya Anand');
addPin(37.7793,-122.419,'Boys and Girls','City Hall','Directed by Robert Iscove<br />Featuring: Freddie Prinze, Jr.,Alyson Hannigan,<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'Class Action','City Hall','Directed by Michael Apted<br />Featuring: Gene Hackman,Mary Elizabeth Mastrantonio,Colin Friels<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'Final Analysis','City Hall','Directed by Phil Joanou<br />Featuring: Richard Gere,Kim Basinger,Uma Thurman<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7793,-122.419,'Foul Play','City Hall','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,<br />Fun Fact: The dome of SF\'s City Hall is almost a foot taller than that of the US Capitol Building. In 1954, Joe DiMaggio and Marilyn Monroe married at the Beaux Arts-style building.');
addPin(37.7976,-122.407,'So I Married an Axe Murderer','City Light Bookstore (261 Columbus Avenue)','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,');
addPin(37.7749,-122.419,'Heart Beat','City Lights Bookstore (261 Columbus)','Directed by John Byrum<br />Featuring: Nick Nolte,Sissy Spacek,John Heard<br />Fun Fact: One of the country\'s earliest bookstores, City Lights was founded by, and still owned by beat poet Lawrence Ferlinghetti. The bookstore was often frequented by Beat writers like Allen Ginsberg and Jack Kerouac.');
addPin(37.7795,-122.418,'The Presidio','Civic Center Plaza','Directed by Peter Hyams<br />Featuring: Sean Connery,Mark Harmon,Meg Ryan');
addPin(37.7795,-122.418,'Sudden Impact','Civic Center Plaza','Directed by Clint Eastwood<br />Featuring: Clint Eastwood,Sondra Locke,');
addPin(37.7907,-122.405,'Vertigo','Claude Lane at Bush Street','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,');
addPin(37.7749,-122.419,'The Princess Diaries','Cliff House (1090 Point Lobos Avenue)','Directed by Garry Marshall<br />Featuring: Julie Andrews,Anne Hathway,Hector Elizondo<br />Fun Fact: The Musee Mechanique, which Julie Andrews\' character visits in the movie, was at the time housed under the Cliff House.');
addPin(37.7749,-122.419,'Greed','Cliff House (1090 Point Lobos Avenue)','Directed by Eric von Stroheim <br />Featuring: Zasu Pitts,,<br />Fun Fact: In 1887, the Cliff House was severely damaged when the schooner Parallel, abandoned and loaded with dynamite, ran aground on the rocks below.');
addPin(37.7749,-122.419,'Alexander\'s Ragtime Band','Cliff House (1090 Point Lobos Avenue)','Directed by Henry King<br />Featuring: Tyrone Power,Alice Faye,<br />Fun Fact: In 1887, the Cliff House was severely damaged when the schooner Parallel, abandoned and loaded with dynamite, ran aground on the rocks below.');
addPin(37.7749,-122.419,'The Jazz Singer','Coffee Dan\'s (O\'Farrell Street at Powell)','Directed by Alan Crosland<br />Featuring: Al Jolson');
addPin(37.802156, -122.405746,'The Enforcer','Coit Tower','Directed by James Fargo<br />Featuring: Clint Eastwood,Tyne Daly,<br />Fun Fact: The Tower was funded by a gift bequeathed by Lillie Hitchcock Coit, a socialite who reportedly liked to chase fires. Though the tower resembles a firehose nozzle, it was not designed this way.');
addPin(37.802258, -122.405521,'The House on Telegraph Hill','Coit Tower','Directed by Robert Wise<br />Featuring: Richard Basehart,,<br />Fun Fact: The Tower was funded by a gift bequeathed by Lillie Hitchcock Coit, a socialite who reportedly liked to chase fires. Though the tower resembles a firehose nozzle, it was not designed this way.');
addPin(37.802512, -122.405703,'The Presidio','Coit Tower','Directed by Peter Hyams<br />Featuring: Sean Connery,Mark Harmon,Meg Ryan<br />Fun Fact: The Tower was funded by a gift bequeathed by Lillie Hitchcock Coit, a socialite who reportedly liked to chase fires. Though the tower resembles a firehose nozzle, it was not designed this way.');
addPin(37.802538, -122.406025,'The Rock','Coit Tower','Directed by Michael Bay<br />Featuring: Sean Connery,Nicholas Cage,Ed Harris<br />Fun Fact: The Tower was funded by a gift bequeathed by Lillie Hitchcock Coit, a socialite who reportedly liked to chase fires. Though the tower resembles a firehose nozzle, it was not designed this way.');
addPin(37.802495, -122.406057,'After the Thin Man','Coit Tower','Directed by W.S. Van Dyke<br />Featuring: William Powell,Myrna Loy,James Stewart<br />Fun Fact: The Tower was funded by a gift bequeathed by Lillie Hitchcock Coit, a socialite who reportedly liked to chase fires. Though the tower resembles a firehose nozzle, it was not designed this way.');
addPin(37.802385, -122.406154,'Boys and Girls','Coit Tower','Directed by Robert Iscove<br />Featuring: Freddie Prinze, Jr.,Alyson Hannigan,<br />Fun Fact: The Tower was funded by a gift bequeathed by Lillie Hitchcock Coit, a socialite who reportedly liked to chase fires. Though the tower resembles a firehose nozzle, it was not designed this way.');
addPin(37.802283, -122.406100,'Doctor Doolittle','Coit Tower','Directed by Betty Thomas<br />Featuring: Eddie Murphy,Ossie Davis,Oliver Platt<br />Fun Fact: The Tower was funded by a gift bequeathed by Lillie Hitchcock Coit, a socialite who reportedly liked to chase fires. Though the tower resembles a firehose nozzle, it was not designed this way.');
addPin(37.802148, -122.406014,'Sister Act 2: Back in the Habit','Coit Tower','Directed by Bill Duke<br />Featuring: Whoopi Goldberg,Maggie Smith,Lauryn Hill<br />Fun Fact: The Tower was funded by a gift bequeathed by Lillie Hitchcock Coit, a socialite who reportedly liked to chase fires. Though the tower resembles a firehose nozzle, it was not designed this way.');
addPin(37.802122, -122.405746,'Pal Joey','Coit Tower','Directed by George Sidney<br />Featuring: Rita Hayworth,Frank Sinatra,Kim Novak<br />Fun Fact: The Tower was funded by a gift bequeathed by Lillie Hitchcock Coit, a socialite who reportedly liked to chase fires. Though the tower resembles a firehose nozzle, it was not designed this way.');
addPin(37.7995,-122.409,'The Bachelor','Columbus Avenue at Green & Stockton','Directed by Gary Sinyor<br />Featuring: Chris O\'Donnell,Renee Zellweger,Artie Lang');
addPin(37.7983,-122.405,'High Crimes','Condor Club (Columbus and Broadway)','Directed by Mel Brooks<br />Featuring: Mel Brooks,Madeline Kahn,Cloris Leachman');
addPin(37.7727,-122.459,'Heart and Souls','Conservatory of Flowers (Golden Gate Park)','Directed by Tomas Gislason<br />Featuring: Jorgen Leth,,<br />Fun Fact: The Conservatory, unveiled in 1879, is the oldest public conservatory in the Western Hemisphere.');
addPin(37.7727,-122.459,'Harold and Maude','Conservatory of Flowers (Golden Gate Park)','Directed by Hal Ashby<br />Featuring: Ruth Gordon,Bud Cort,<br />Fun Fact: The Conservatory, unveiled in 1879, is the oldest public conservatory in the Western Hemisphere.');
addPin(37.7694,-122.486,'Playing Mona Lisa','Conservatory of Flowers (Golden Gate Park)','Directed by Matthew Huffman<br />Featuring: Alicia Witt,Harvey Fierstein,Marlo Thomas<br />Fun Fact: The Conservatory, unveiled in 1879, is the oldest public conservatory in the Western Hemisphere.');
addPin(37.7727,-122.459,'Vertigo','Conservatory of Flowers (Golden Gate Park)','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,<br />Fun Fact: The Conservatory, unveiled in 1879, is the oldest public conservatory in the Western Hemisphere.');
addPin(37.7727,-122.459,'High Anxiety','Conservatory of Flowers, Golden Gate Park','Directed by Mel Brooks<br />Featuring: Mel Brooks,Madeline Kahn,Cloris Leachman<br />Fun Fact: The Conservatory, unveiled in 1879, is the oldest public conservatory in the Western Hemisphere.');
addPin(37.8058,-122.414,'Magnum Force','Cost Plus World Market (2552 Taylor Street)','Directed by Ted Post<br />Featuring: Clint Eastwood');
addPin(37.8028,-122.45,'The Right Stuff','Cow Palace','Directed by Philip Kaufman<br />Featuring: Sam Shepard,Ed Harris,Dennis Quaid<br />Fun Fact: Suppsedly, the Cow Palace\'s name derives from a newspaper editorial in which the writer wonders whether the soon-to-be-built structure for livestock was a "palace for cows". ');
addPin(37.7868,-122.411,'All About Eve','Curran Theater (445 Geary Street)','Directed by Joseph L. Mankiewicz<br />Featuring: Bette Davis,Anne Baxter,<br />Fun Fact: Called the Shubert Theatre in the film. ');
addPin(37.7897,-122.414,'When a Man Loves a Woman','Cybelle\'s Pizza (1000 Bush Street)','Directed by Luis Mandoki<br />Featuring: Andy Garcia,Meg Ryan,Ellyn Burstyn');
addPin(37.7749,-122.419,'Dirty Harry','Dante Building (1606 Stockton Street at Union)','Directed by Don Siegel<br />Featuring: Clint Eastwood');
addPin(37.7816,-122.416,'By Hook or By Crook','Department of Public Health (101 Grove Street at Polk, Civic Center)','Directed by Harriet Dodge & Silas Howard<br />Featuring: Silas Howard');
addPin(37.7816,-122.416,'Invasion of the Body Snatchers','Department of Public Health (101 Grove Street at Polk, Civic Center)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,');
addPin(37.7694,-122.434,'Milk','Duboce Park','Directed by Gus Van Sant<br />Featuring: Sean Penn,Emile Hirsch,Josh Brolin');
addPin(37.7629,-122.434,'The Dead Pool','Eber Electronics (2355 Market Street, Castro)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7861,-122.419,'So I Married an Axe Murderer','Edinburgh Castle (950 Geary Street)','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,');
addPin(37.7858,-122.496,'Milk','El Camino Del Mar','Directed by Gus Van Sant<br />Featuring: Sean Penn,Emile Hirsch,Josh Brolin');
addPin(37.7625,-122.422,'Dream for an Insomniac','Elbo Room (647 Valencia Street)','Directed by Tiffanie DeBartolo<br />Featuring: Ione Skye,Jennifer Aniston,<br />Fun Fact: This location is called the "Café Blue Eyes" in the film.');
addPin(37.7492,-122.393,'Freebie and the Bean','Embarcadero Freeway','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,');
addPin(37.7492,-122.393,'A View to a Kill','Embarcadero Freeway','Directed by John Glen<br />Featuring: Roger Moore,Christopher Walken,<br />Fun Fact: Embarcadero Freeway, which was featured in the film, was demolished in 1989 because of structural damage from the 1989 Loma Prieta Earthquake)');
addPin(37.7492,-122.393,'A Night Full of Rain','Embarcadero Freeway','Directed by Lina Wertmuller<br />Featuring: Candice Bergen,Giancarlo Gianni,<br />Fun Fact: Embarcadero Freeway, which was featured in the film was demolished in 1989 because of structural damage from the 1989 Loma Prieta Earthquake)');
addPin(37.7492,-122.393,'Magnum Force','Embarcadero Freeway','Directed by Ted Post<br />Featuring: Clint Eastwood,,<br />Fun Fact: demolished');
addPin(37.793,-122.397,'Romeo Must Die','Embarcadero Street','Directed by Andrzej Bartkowiak<br />Featuring: Jet Li,Aaliyah,');
addPin(37.793,-122.397,'Getting Even with Dad','Embarcadero Street Station- BART ','Directed by Howard Deutch<br />Featuring: Macaulay Culkin,Ted Danson,');
addPin(37.7981,-122.406,'Bullitt','Enrico\'s Café (504 Broadway)','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,');
addPin(37.7977,-122.394,'180','Epic Roasthouse (399 Embarcadero)','Directed by Jayendra<br />Featuring: Siddarth,Nithya Menon,Priya Anand');
addPin(37.797,-122.404,'Vertigo','Ernie\'s Restaurant (847 Montgomery Street)','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,<br />Fun Fact: Called the "Essex Club" in the film.');
addPin(37.7923,-122.411,'Vertigo','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'The Rock','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Michael Bay<br />Featuring: Sean Connery,Nicholas Cage,Ed Harris<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'The Towering Inferno','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by John Guillermin<br />Featuring: Steve McQueen,Paul Newman,William Holden<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Sudden Impact','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Clint Eastwood<br />Featuring: Clint Eastwood,Sondra Locke,<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'A Night Full of Rain','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Lina Wertmuller<br />Featuring: Candice Bergen,Giancarlo Gianni,<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Alexander\'s Ragtime Band','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Henry King<br />Featuring: Tyrone Power,Alice Faye,<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Chu Chu and the Philly Flash','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by David Lowell Rich<br />Featuring: Alan Arkin,Carol Burnett,Danny Aiello<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Freebie and the Bean','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Family Plot','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Alfred Hitchcock<br />Featuring: Bruce Dern,Barbara Harris,William Devane<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Petulia','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Richard Lester<br />Featuring: Julie Christie,George C. Scott,Richard Chamberlain<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Shoot the Moon','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Alan Parker<br />Featuring: Albert Finney, Diane Keaton,<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Mother','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Albert Brooks<br />Featuring: Albert Brooks,Debbie Reynolds,John C. McGinley<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Magnum Force','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Ted Post<br />Featuring: Clint Eastwood,,<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Midnight Lace','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by David Miller<br />Featuring: Doris Day,Rex Harrison,<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Jade','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by William Friedkin<br />Featuring: David Caruso,Linda Fiorentino,Chazz Palminteri<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Junior','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Ivan Reitman<br />Featuring: Arnold Schwarzenegger,Danny DeVito,Emma Thompson');
addPin(37.7923,-122.411,'I Remember Mama','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by George Stevens<br />Featuring: Irene Dunne,Barbara Bel Geddes,<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7923,-122.411,'Hard to Hold','Fairmont Hotel (950 Mason Street, Nob Hill)','Directed by Larry Peerce<br />Featuring: Rick Springfield,,<br />Fun Fact: In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel\'s Garden Room.');
addPin(37.7749,-122.419,'Sweet November','Farley\'s Café (1315 18th Street Near Missouri)','Directed by Pat O\'Connor<br />Featuring: Keanu Reeves,Charlize Theron,');
addPin(37.7959,-122.392,'The Maltese Falcon','Ferry Building','Directed by John Huston<br />Featuring: Humphrey Bogart,Mary Astor,<br />Fun Fact: Every hour and half-hour, the clock bell atop the Ferry Building chimes portions of the Westminster Quarters.');
addPin(37.7959,-122.392,'The Presidio','Ferry Building','Directed by Peter Hyams<br />Featuring: Sean Connery,Mark Harmon,Meg Ryan<br />Fun Fact: Every hour and half-hour, the clock bell atop the Ferry Building chimes portions of the Westminster Quarters.');
addPin(37.7959,-122.392,'Interview With The Vampire','Ferry Building','Directed by Neil Jordan<br />Featuring: Brad Pitt,Christian Slater,Tom Cruise<br />Fun Fact: Every hour and half-hour, the clock bell atop the Ferry Building chimes portions of the Westminster Quarters.');
addPin(37.7959,-122.392,'Just One Night','Ferry Building','Directed by Alan Jacobs<br />Featuring: Timothy Hutton,Maria Grazia Cucinotta,<br />Fun Fact: Every hour and half-hour, the clock bell atop the Ferry Building chimes portions of the Westminster Quarters.');
addPin(37.7959,-122.392,'Serial','Ferry Building','Directed by Bill Persky<br />Featuring: Martin Mull,,<br />Fun Fact: Every hour and half-hour, the clock bell atop the Ferry Building chimes portions of the Westminster Quarters.');
addPin(37.7959,-122.392,'Boys and Girls','Ferry Building','Directed by Robert Iscove<br />Featuring: Freddie Prinze, Jr.,Alyson Hannigan,<br />Fun Fact: Every hour and half-hour, the clock bell atop the Ferry Building chimes portions of the Westminster Quarters.');
addPin(37.7958,-122.392,'Sudden Impact','Ferry Plaza','Directed by Clint Eastwood<br />Featuring: Clint Eastwood,Sondra Locke,<br />Fun Fact: Every hour and half-hour, the clock bell atop the Ferry Building chimes portions of the Westminster Quarters.');
addPin(37.7589,-122.417,'Foul Play','Fiesta Laundromat (898 S. Van Ness Ave., Mission)','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,');
addPin(37.7995,-122.424,'Dark Passage','Filbert Steps, Filbert Street','Directed by Delmer Daves<br />Featuring: Humphrey Bogart,Lauren Bacal,');
addPin(37.7946,-122.4,'Pacific Heights','Financial District','Directed by John Schlesinger<br />Featuring: Melanie Griffith,Matthew Modine,Michael Keaton');
addPin(37.7946,-122.4,'The Conversation','Financial District','Directed by Francis Ford Coppola<br />Featuring: Gene Hackman');
addPin(37.7946,-122.4,'The Right Stuff','Financial District','Directed by Philip Kaufman<br />Featuring: Sam Shepard,Ed Harris,Dennis Quaid');
addPin(37.7749,-122.419,'Jade','Fior d\' Italia (601 Union Street at Stockton)','Directed by William Friedkin<br />Featuring: David Caruso,Linda Fiorentino,Chazz Palminteri');
addPin(37.7201,-122.43,'The Princess Diaries','Firestation #3 (Brazil Avenue and Athens Street)','Directed by Garry Marshall<br />Featuring: Julie Andrews,Anne Hathway,Hector Elizondo');
addPin(37.7749,-122.419,'George of the Jungle','First Bank (550 Montgomery Street at Commercial)','Directed by Sam Weisman<br />Featuring: Brendan Fraser,Leslie Mann,Thomas Haden Church<br />Fun Fact: Called "Stanhope Bank" in the film.');
addPin(37.808,-122.418,'Boys and Girls','Fisherman\'s Wharf','Directed by Robert Iscove<br />Featuring: Freddie Prinze, Jr.,Alyson Hannigan,<br />Fun Fact: Supposedly, Mikhail S. Gorbachev has said that his favorite part of visiting America was touring Fisherman\'s Wharf.');
addPin(37.808,-122.418,'The Princess Diaries','Fisherman\'s Wharf','Directed by Garry Marshall<br />Featuring: Julie Andrews,Anne Hathway,Hector Elizondo<br />Fun Fact: Supposedly, Mikhail S. Gorbachev has said that his favorite part of visiting America was touring Fisherman\'s Wharf.');
addPin(37.7849,-122.407,'Foul Play','Flood Building (870 Market Street)','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,');
addPin(37.8035,-122.402,'So I Married an Axe Murderer','Fog City Diner (1300 Battery Street)','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,');
addPin(37.7806,-122.403,'Freebie and the Bean','Folsom Street (SOMA)','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,');
addPin(37.7749,-122.419,'The Lady from Shanghai','Fomer Hall of Justice (750 Kearny Street at Washington)','Directed by Orson Welles<br />Featuring: Rita Hayworth,Orson Welles,');
addPin(37.7749,-122.419,'Woman on the Run','Fomer Hall of Justice (750 Kearny Street at Washington)','Directed by Norman Foster<br />Featuring: Ann Sheridan');
addPin(37.7981,-122.4,'Sweet November','Foote, Cone & Belding (733 Front Street at Pacific)','Directed by Pat O\'Connor<br />Featuring: Keanu Reeves,Charlize Theron,<br />Fun Fact: The building is called "Jabe & Dunne Advertising Agency" in the movie.');
addPin(37.7627,-122.436,'Dirty Harry','Forest Hill Station- MUNI','Directed by Don Siegel<br />Featuring: Clint Eastwood');
addPin(37.8067,-122.431,'Foul Play','Fort Mason (Golden Gate National Recreation Area)','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,<br />Fun Fact: Constructed in 1864 as a coastal defense site, Fort Mason went on to serve as an army post for more than 100 years.');
addPin(37.8105,-122.477,'Dopamine','Fort Point (Presidio, Golden Gate National Recreation Area)','Directed by Mark Decena<br />Featuring: John Livingston,Sabrina Lloyd,Bruno Campos<br />Fun Fact: Built in 1853, Fort Point is the only West Coast fort built by the Union Army. Though the Confederate army planned to attack San Francisco, the commanding Confererate general learned that the war had ended while en route to SF.');
addPin(37.8345,-122.505,'Point Blank','Fort Point (Presidio, Golden Gate National Recreation Area)','Directed by John Boorman<br />Featuring: Lee Marvin,Angie Dickinson,<br />Fun Fact: Built in 1853, Fort Point is the only West Coast fort built by the Union Army. Though the Confederate army planned to attack San Francisco, the commanding Confererate general learned that the war had ended while en route to SF.');
addPin(37.8345,-122.505,'Petulia','Fort Point (Presidio, Golden Gate National Recreation Area)','Directed by Richard Lester<br />Featuring: Julie Christie,George C. Scott,Richard Chamberlain<br />Fun Fact: Built in 1853, Fort Point is the only West Coast fort built by the Union Army. Though the Confederate army planned to attack San Francisco, the commanding Confererate general learned that the war had ended while en route to SF.');
addPin(37.8105,-122.477,'High Anxiety','Fort Point (Presidio, Golden Gate National Recreation Area)','Directed by Mel Brooks<br />Featuring: Mel Brooks,Madeline Kahn,Cloris Leachman<br />Fun Fact: Built in 1853, Fort Point is the only West Coast fort built by the Union Army. Though the Confederate army planned to attack San Francisco, the commanding Confererate general learned that the war had ended while en route to SF.');
addPin(37.8105,-122.477,'The Presidio','Fort Point (Presidio, Golden Gate National Recreation Area)','Directed by Peter Hyams<br />Featuring: Sean Connery,Mark Harmon,Meg Ryan<br />Fun Fact: Built in 1853, Fort Point is the only West Coast fort built by the Union Army. Though the Confederate army planned to attack San Francisco, the commanding Confererate general learned that the war had ended while en route to SF.');
addPin(37.8105,-122.477,'Vertigo','Fort Point (Presidio, Golden Gate National Recreation Area)','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,<br />Fun Fact: Built in 1853, Fort Point is the only West Coast fort built by the Union Army. Though the Confederate army planned to attack San Francisco, the commanding Confererate general learned that the war had ended while en route to SF.');
addPin(37.8105,-122.477,'Foul Play','Fort Point, Presidio','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,<br />Fun Fact: Built in 1853, Fort Point is the only West Coast fort built by the Union Army. Though the Confederate army planned to attack San Francisco, the commanding Confererate general learned that the war had ended while en route to SF.');
addPin(37.804,-122.432,'The Dead Pool','Fremont Street Exit of Bay Bridge','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7959,-122.392,'Doctor Doolittle','Gabbiano\'s Restaurant (Ferry Building)','Directed by Betty Thomas<br />Featuring: Eddie Murphy,Ossie Davis,Oliver Platt<br />Fun Fact: Every hour and half-hour, the clock bell atop the Ferry Building chimes portions of the Westminster Quarters.');
addPin(37.7778,-122.491,'Experiment in Terror','George Washington High School (600 32nd Avenue )','Directed by Blake Edwards<br />Featuring: Glenn Ford,Lee Remick,');
addPin(37.8057,-122.422,'Time After Time','Ghiradelli Square (900 North Point Street, Fisherman\'s Wharf)','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,<br />Fun Fact: In 1893, chocolatier Domingo Ghiradelli bought an entire city block to house the headquarters of Ghiradelli Chocolates.');
addPin(37.7961,-122.404,'Basic Instinct','Gibb Street (Chinatown)','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza');
addPin(37.7749,-122.419,'The Pursuit of Happyness','Glen Park Subway Station','Directed by Steven Conrad<br />Featuring: Will Smith,Jayden C. Smith,Thandie Newton');
addPin(37.7852,-122.411,'The Pursuit of Happyness','Glide Memorial Church (434 Ellis St)','Directed by Steven Conrad<br />Featuring: Will Smith,Jayden C. Smith,Thandie Newton');
addPin(37.7749,-122.419,'Chan is Missing','Golden Dragon Restaurant (816 Washington Street at Grant)','Directed by Wayne Wang<br />');
addPin(37.825153, -122.479122,'Boys and Girls','Golden Gate Bridge','Directed by Robert Iscove<br />Featuring: Freddie Prinze, Jr.,Alyson Hannigan,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.823729, -122.478993,'A View to a Kill','Golden Gate Bridge','Directed by John Glen<br />Featuring: Roger Moore,Christopher Walken,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.822679, -122.478821,'Bicentennial Man','Golden Gate Bridge','Directed by Chris Columbus<br />Featuring: Robin Williams,,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.821679, -122.478821,'Dark Passage','Golden Gate Bridge','Directed by Delmer Daves<br />Featuring: Humphrey Bogart,Lauren Bacal,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.820779, -122.478821,'Flower Drum Song','Golden Gate Bridge','Directed by Henry Koster<br />Featuring: Nancy Kwan,James Shigeta,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.808999, -122.477026,'Golden Gate','Golden Gate Bridge','Directed by John Madden<br />Featuring: Matt Dillon,Joan Chen,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.808694, -122.477112,'Herbie Rides Again','Golden Gate Bridge','Directed by Robert Stevenson<br />Featuring: Helen Hayes,Ken Berry,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.817890, -122.478307,'Innerspace','Golden Gate Bridge','Directed by Joe Dante<br />Featuring: Dennis Quaid,Martin Short,Meg Ryan<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.826179, -122.479294,'Interview With The Vampire','Golden Gate Bridge','Directed by Neil Jordan<br />Featuring: Brad Pitt,Christian Slater,Tom Cruise<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.817229, -122.478307,'Hulk','Golden Gate Bridge','Directed by Ang Lee<br />Featuring: Eric Bana,Jennifer Connelly,Sam Elliot<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.818165, -122.478436,'Jagged Edge','Golden Gate Bridge','Directed by Richard Marquand<br />Featuring: Maria Mayenzet,,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.815178, -122.477985,'It Came From Beneath the Sea','Golden Gate Bridge','Directed by Robert Gordon<br />Featuring: Kenneth Tobey,,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.819602, -122.478457,'Magnum Force','Golden Gate Bridge','Directed by Ted Post<br />Featuring: Clint Eastwood,,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.813499, -122.477771,'Seven Girlfriends','Golden Gate Bridge','Directed by Paul Lazarus<br />Featuring: Laura Leighton,Tim Daly,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.815540, -122.477985,'Star Trek IV: The Voyage Home','Golden Gate Bridge','Directed by Leonard Nimoy<br />Featuring: William Shatner,Leonard Nimoy,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.816338, -122.478028,'Star Trek VI: The Undiscovered County','Golden Gate Bridge','Directed by Nicholas Meyer<br />Featuring: William Shatner,Leonard Nimoy,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.809524, -122.477026,'Mother','Golden Gate Bridge','Directed by Albert Brooks<br />Featuring: Albert Brooks,Debbie Reynolds,John C. McGinley<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.818701, -122.478336,'Milk','Golden Gate Bridge','Directed by Gus Van Sant<br />Featuring: Sean Penn,Emile Hirsch,Josh Brolin<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.818941, -122.478436,'The Presidio','Golden Gate Bridge','Directed by Peter Hyams<br />Featuring: Sean Connery,Mark Harmon,Meg Ryan<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.815381, -122.478050,'Time After Time','Golden Gate Bridge','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.817229, -122.478307,'The Maltese Falcon','Golden Gate Bridge','Directed by John Huston<br />Featuring: Humphrey Bogart,Mary Astor,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.813389, -122.477835,'The Love Bug','Golden Gate Bridge','Directed by Robert Stevenson<br />Featuring: Dean Jones,Michele Lee,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.814152, -122.477878,'Superman','Golden Gate Bridge','Directed by Richard Donner<br />Featuring: Christopher Reeve,Gene Hackman,Marlon Brando<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.814678, -122.477921,'The Core','Golden Gate Bridge','Directed by John Amiel<br />Featuring: Aaron Eckhart,Hilary Swank,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.812067, -122.477534,'The Bridge','Golden Gate Bridge','Directed by Eric Steel<br />Featuring: John Snowden,,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.811067, -122.477662,'The Caine Mutiny','Golden Gate Bridge','Directed by Edward Dmytryk<br />Featuring: Humphrey Bogart,Fred MacMurray,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.8345,-122.505,'What the Bleep Do We Know','Golden Gate National Recreation Area','Directed by William Arntz<br />Featuring: Marlee Matlin,,<br />Fun Fact: The size of the Recreation Area is over two and a half greater than that of the city and county of San Francisco.');
addPin(37.8345,-122.505,'The Sweetest Thing','Golden Gate National Recreation Area','Directed by Roger Kumble<br />Featuring: Cameron Diaz,Christina Applegate,Selma Blair<br />Fun Fact: The size of the Recreation Area is over two and a half greater than that of the city and county of San Francisco.');
addPin(37.7694,-122.486,'Time After Time','Golden Gate Park','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,<br />Fun Fact: Golden Gate Park is similar in shape but 20% larger than New York\'s Central Park.');
addPin(37.7694,-122.486,'Take the Money and Run','Golden Gate Park','Directed by Woody Allen<br />Featuring: Woody Allen');
addPin(37.7694,-122.486,'The Lady from Shanghai','Golden Gate Park','Directed by Orson Welles<br />Featuring: Rita Hayworth,Orson Welles,<br />Fun Fact: The Playland amusement park wehre "Hall of Mirrors" sequence at the end of the movie was filmed has since been destroyed. However, relics from the park are now housed at the nearby Cliff House.');
addPin(37.7694,-122.486,'Star Trek II : The Wrath of Khan','Golden Gate Park','Directed by Nicholas Meyer<br />Featuring: William Shatner,Leonard Nimoy,');
addPin(37.7694,-122.486,'Star Trek IV: The Voyage Home','Golden Gate Park','Directed by Leonard Nimoy<br />Featuring: William Shatner,Leonard Nimoy,');
addPin(37.7694,-122.486,'Harold and Maude','Golden Gate Park','Directed by Hal Ashby<br />Featuring: Ruth Gordon,Bud Cort,');
addPin(37.7694,-122.486,'A Jitney Elopement','Golden Gate Park','Directed by Charles Chaplin<br />Featuring: Charles Chaplin,,<br />Fun Fact: During San Francisco\'s Gold Rush era, the Park was part of an area designated as the "Great Sand Waste". ');
addPin(37.7684,-122.457,'The Pursuit of Happyness','Golden Gate Park Children\'s Playground ','Directed by Steven Conrad<br />Featuring: Will Smith,Jayden C. Smith,Thandie Newton<br />Fun Fact: Golden Gate Park is similar in shape but 20% larger than New York\'s Central Park.');
addPin(37.7921,-122.413,'The Towering Inferno','Grace Cathedral Episcopal Church (1100 California Street)','Directed by John Guillermin<br />Featuring: Steve McQueen,Paul Newman,William Holden<br />Fun Fact: Grace Cathedral Episcopal Church is the West Coast\'s largest Episcopalian cathedral.');
addPin(37.7921,-122.413,'The Wedding Planner','Grace Cathedral Episcopal Church (1100 California Street)','Directed by Adam Shankman<br />Featuring: Jennifer Lopez,Matthew McConaughey,<br />Fun Fact: Grace Cathedral Episcopal Church is the West Coast\'s largest Episcopalian cathedral.');
addPin(37.7921,-122.413,'A Smile Like Yours ','Grace Cathedral Episcopal Church (1100 California Street)','Directed by Keith Samples<br />Featuring: Greg Kinnear,Lauren Holly,Joan Cusack<br />Fun Fact: Grace Cathedral Episcopal Church is the West Coast\'s largest Episcopalian cathedral.');
addPin(37.7921,-122.413,'Bicentennial Man','Grace Cathedral Episcopal Church (1100 California Street)','Directed by Chris Columbus<br />Featuring: Robin Williams,,<br />Fun Fact: Grace Cathedral Episcopal Church is the West Coast\'s largest Episcopalian cathedral.');
addPin(37.7921,-122.413,'Family Plot','Grace Cathedral Episcopal Church (1100 California Street)','Directed by Alfred Hitchcock<br />Featuring: Bruce Dern,Barbara Harris,William Devane<br />Fun Fact: Grace Cathedral Episcopal Church is the West Coast\'s largest Episcopalian cathedral.');
addPin(37.7918,-122.413,'Maxie','Grace Cathedral Episcopal Church (1100 California Street)','Directed by Paul Aaron<br />Featuring: Glenn Close,Mandy Patinkin,Ruth Gordon<br />Fun Fact: Grace Cathedral Episcopal Church is the West Coast\'s largest Episcopalian cathedral.');
addPin(37.7918,-122.413,'Pleasure of His Company','Grace Cathedral Episcopal Church (1100 California Street)','Directed by George Seaton<br />Featuring: Fred Astaire,Debbie Reynolds,<br />Fun Fact: Grace Cathedral Episcopal Church is the West Coast\'s largest Episcopalian cathedral.');
addPin(37.7918,-122.413,'Milk','Grace Cathedral Episcopal Church (1100 California Street)','Directed by Gus Van Sant<br />Featuring: Sean Penn,Emile Hirsch,Josh Brolin<br />Fun Fact: Grace Cathedral Episcopal Church is the West Coast\'s largest Episcopalian cathedral.');
addPin(37.796,-122.407,'My Reality','Grant Avenue & Union Street','Directed by Marcia Kimpton<br />Featuring: Marcia Kimpton');
addPin(37.796,-122.407,'I Remember Mama','Grant Avenue (North Beach)','Directed by George Stevens<br />Featuring: Irene Dunne,Barbara Bel Geddes,');
addPin(37.7969,-122.407,'When a Man Loves a Woman','Grant Street at Pacific Avenue','Directed by Luis Mandoki<br />Featuring: Andy Garcia,Meg Ryan,Ellyn Burstyn');
addPin(37.7749,-122.419,'Burglar','Green Valley Restaurant (510 Green Street Near Grant)','Directed by Hugh Wilson<br />Featuring: Whoppi Goldberg,Bobcat Goldwait,');
addPin(37.7754,-122.404,'The Enforcer','Hall of Justice','Directed by James Fargo<br />Featuring: Clint Eastwood,Tyne Daly,');
addPin(37.7754,-122.404,'The Dead Pool','Hall of Justice (850 Bryant Street)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7754,-122.404,'Sudden Impact','Hall of Justice (850 Bryant Street)','Directed by Clint Eastwood<br />Featuring: Clint Eastwood,Sondra Locke,');
addPin(37.7754,-122.404,'Basic Instinct','Hall of Justice (850 Bryant Street)','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza');
addPin(37.7754,-122.404,'Dirty Harry','Hall of Justice (850 Bryant Street)','Directed by Don Siegel<br />Featuring: Clint Eastwood');
addPin(37.7754,-122.404,'Magnum Force','Hall of Justice (850 Bryant Street)','Directed by Ted Post<br />Featuring: Clint Eastwood');
addPin(37.7754,-122.404,'Jade','Hall of Justice (850 Bryant Street)','Directed by William Friedkin<br />Featuring: David Caruso,Linda Fiorentino,Chazz Palminteri');
addPin(37.7836,-122.414,'Invasion of the Body Snatchers','Hamlin Hotel (385 Eddy Street)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,');
addPin(37.7836,-122.414,'Street Music','Hamlin Hotel (385 Eddy Street)','Directed by Jenny Bowen<br />Featuring: Elizabeth Daily');
addPin(37.8007,-122.415,'Mrs. Doubtfire','Hancock School (940 Filbert Street)','Directed by Chris Columbus<br />Featuring: Robin Williams,Sally Field,Pierce Brosnan');
addPin(37.7941,-122.408,'Joy Luck Club','Hang Ah Alley (Chinatown)','Directed by Wayne Wang<br />Featuring: Kieu Chung');
addPin(37.7732,-122.409,'The Game','Harrison Street (The Embarcadero)','Directed by David Fincher<br />Featuring: Michael Douglas,Sean Penn,');
addPin(37.7765,-122.426,'Greed','Hayes Street at Laguna','Directed by Eric von Stroheim <br />Featuring: Zasu Pitts');
addPin(37.7769,-122.427,'Foul Play','Hayes Valley Care (601 Laguna Street, Hayes Valley)','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,');
addPin(37.756,-122.412,'A Smile Like Yours ','Hills Brothers Plaza (Embarcadero at Harrison Street)','Directed by Keith Samples<br />Featuring: Greg Kinnear,Lauren Holly,Joan Cusack');
addPin(37.7749,-122.419,'Sneakers','Hills Brothers Plaza (The Embarcadero at Harrison)','Directed by Phil Alden Robinson<br />Featuring: Sydney Poitier,Robert Redford,River Phoenix');
addPin(37.7886,-122.411,'Hereafter','Hobart Building (582 Market Street)','Directed by Clint Eastwood<br />Featuring: Matt Damon,Cecile De France,Bryce Dallas Howard');
addPin(37.7749,-122.419,'Dirty Harry','Holiday Inn Select Downtown Hotel (750 Kearney Street)','Directed by Don Siegel<br />Featuring: Clint Eastwood');
addPin(37.7535,-122.42,'Joy Luck Club','Horace Mann School (3351 23rd Street)','Directed by Wayne Wang<br />Featuring: Kieu Chung');
addPin(37.7873,-122.425,'Sweet November','Hotel Majestic (1500 Sutter Street)','Directed by Pat O\'Connor<br />Featuring: Keanu Reeves,Charlize Theron,');
addPin(37.7276,-122.37,'It Came From Beneath the Sea','Hunters Point','Directed by Robert Gordon<br />Featuring: Kenneth Tobey,,<br />Fun Fact: With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world\'s longest span when it opened in 1937.');
addPin(37.7749,-122.419,'Junior','Hyatt Fisherman\'s Wharf (555 Northpoint Street)','Directed by Ivan Reitman<br />Featuring: Arnold Schwarzenegger,Danny DeVito,Emma Thompson');
addPin(37.7943,-122.396,'High Anxiety','Hyatt Regency Hotel (5 Embarcadero Center)','Directed by Mel Brooks<br />Featuring: Mel Brooks,Madeline Kahn,Cloris Leachman');
addPin(37.7943,-122.396,'Freebie and the Bean','Hyatt Regency Hotel (5 Embarcadero Center)','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,');
addPin(37.7943,-122.396,'Time After Time','Hyatt Regency Hotel (5 Embarcadero Center)','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,');
addPin(37.7943,-122.396,'The Towering Inferno','Hyatt Regency Hotel (5 Embarcadero Center, Financial District)','Directed by John Guillermin<br />Featuring: Steve McQueen,Paul Newman,William Holden');
addPin(37.7749,-122.419,'Attack of the Killer Tomatoes','Hyde Street Cable Car','Directed by John DeBello<br />Featuring: David Miller,,<br />Fun Fact: SF Cable Cars are the only moving National Historical Landmark.');
addPin(37.7749,-122.419,'Play it Again, Sam','Hyde Street Cable Car','Directed by Herbert Ross<br />Featuring: Woody Allen,Diane Keaton,');
addPin(37.8095,-122.422,'What\'s Up Doc?','Hyde Street Pier','Directed by Peter Bogdanovich<br />Featuring: Barbara Streisand,Ryan O\'Neal,');
addPin(37.7749,-122.419,'Broken-A Modern Love Story ','Ina Coolbrith Park (1700 Taylor Street)','Directed by Ryan K. Whiting<br />');
addPin(37.7572,-122.403,'When a Man Loves a Woman','International Studies Academy (993 Vermont Street, Potrero Hill)','Directed by Luis Mandoki<br />Featuring: Andy Garcia,Meg Ryan,Ellyn Burstyn');
addPin(37.7976,-122.406,'Nine Months','Jack Kerouac Alley between Columbus & Grant Streets','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold');
addPin(37.7702,-122.47,'Jade','Japanese Tea Garden (Hagiwara Tea Garden Drive, Golden Gate Park)','Directed by William Friedkin<br />Featuring: David Caruso,Linda Fiorentino,Chazz Palminteri<br />Fun Fact: The Japanese Hagiwara family invented "Chinese" fortune cookies in the tea-garden');
addPin(37.7702,-122.47,'The Wedding Planner','Japanese Tea Garden (Hagiwara Tea Garden Drive, Golden Gate Park)','Directed by Adam Shankman<br />Featuring: Jennifer Lopez,Matthew McConaughey,<br />Fun Fact: The Japanese Hagiwara family invented "Chinese" fortune cookies in the tea-garden');
addPin(37.7694,-122.486,'Petulia','Japanese Tea Garden, Hagiwara Tea Garden Drive, Golden Gate Park','Directed by Richard Lester<br />Featuring: Julie Christie,George C. Scott,Richard Chamberlain<br />Fun Fact: The Japanese Hagiwara family invented "Chinese" fortune cookies in the tea-garden');
addPin(37.7815,-122.388,'Copycat','Java House (Pier 40, Embarcadero)','Directed by Jon Amiel<br />Featuring: Sigourney Weaver,Holly Hunter,Dermot Mulroney');
addPin(37.7123,-122.49,'Bullitt','John Muir Drive (Lake Merced)','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,');
addPin(37.7896,-122.414,'Nine Months','Jones Street at Bush','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold');
addPin(37.7944,-122.393,'180','Justin Herman Plaza','Directed by Jayendra<br />Featuring: Siddarth,Nithya Menon,Priya Anand');
addPin(37.7944,-122.393,'Time After Time','Justin Herman Plaza','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,');
addPin(37.7976,-122.405,'Basic Instinct','Kearney Street (Telegraph Hill)','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza');
addPin(37.7815,-122.405,'Bullitt','Kennedy Hotel (226 Embarcadero at Howard Street)','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,<br />Fun Fact: Hotel was destroyed in the 1989 Loma Prieta earthquake. Corporate headquarters for the Gap reside at the location today.');
addPin(37.7668,-122.456,'Dirty Harry','Kezar Stadium, Golden Gate Park','Directed by Don Siegel<br />Featuring: Clint Eastwood,,<br />Fun Fact: The stadium was demolished and completely rebuilt after sustaining damages in the 1898 Loma Prieta earthquake.');
addPin(37.7627,-122.429,'The Dead Pool','KGO-TV ABC7 TV Studios (900 Front Street, Waterfront Historic District)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7931,-122.403,'Fearless','Kohl Building (400 Montgomery Street)','Directed by Peter Weir<br />Featuring: Jeff Bridges,Isabella Rosellini,Rosie Perez');
addPin(37.7749,-122.419,'Twisted','La Bodega (1332 Grant Avenue at Vallejo)','Directed by Philip Kaufman<br />Featuring: Ashley Judd,Samuel L. Jackson,Andy Garcia');
addPin(37.7651,-122.478,'Crackers','La Rondalla (Valencia and 20th Streets)','Directed by Louis Malle<br />Featuring: Donald Sutherland,Sean Penn,');
addPin(37.7916,-122.428,'Invasion of the Body Snatchers','Lafayette Park (Pacific Heights)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,');
addPin(37.7673,-122.389,'Magnum Force','Lefty O\' Doul Drawbridge/ 3rd Street Bridge (3rd Street, China Basin)','Directed by Ted Post<br />Featuring: Clint Eastwood,,<br />Fun Fact: This is SF\'s only drawbridge, and was named after Francis Joseph "Lefty" O\'Doul, a local baseball hero.');
addPin(37.7673,-122.389,'A View to a Kill','Lefty O\' Doul Drawbridge/ 3rd Street Bridge (3rd Street, China Basin)','Directed by John Glen<br />Featuring: Roger Moore,Christopher Walken,<br />Fun Fact: This is SF\'s only drawbridge, and was named after Francis Joseph "Lefty" O\'Doul, a local baseball hero.');
addPin(37.7673,-122.389,'The Enforcer','Lefty O\' Doul Drawbridge/ 3rd Street Bridge (3rd Street, China Basin)','Directed by James Fargo<br />Featuring: Clint Eastwood,Tyne Daly,<br />Fun Fact: This is SF\'s only drawbridge, and was named after Francis Joseph "Lefty" O\'Doul, a local baseball hero.');
addPin(37.7941,-122.408,'Chan is Missing','Li Po (916 Grant Avenue at Washington, Chinatown)','Directed by Wayne Wang<br />');
addPin(37.794,-122.408,'Dim Sum: A Little Bit of Heart','Li Po (916 Grant Avenue at Washington, Chinatown)','Directed by Wayne Wang<br />');
addPin(37.7828,-122.512,'The Wedding Planner','Lincoln Park','Directed by Adam Shankman<br />Featuring: Jennifer Lopez,Matthew McConaughey,<br />Fun Fact: The land on which the park stands was a cemetary until the late 1860s. ');
addPin(37.8021,-122.419,'Sudden Fear','Lombard Street','Directed by David Miller<br />Featuring: Joan Crawford,Jack Palance,<br />Fun Fact: Lombard Street is not actually the crookedest in SF. That honor goes to Potrero Hill\'s Vermont Street between 22nd and 23rd.');
addPin(37.8021,-122.419,'Boys and Girls','Lombard Street','Directed by Robert Iscove<br />Featuring: Freddie Prinze, Jr.,Alyson Hannigan,<br />Fun Fact: Lombard Street is not actually the crookedest in SF. That honor goes to Potrero Hill\'s Vermont Street between 22nd and 23rd.');
addPin(37.7749,-122.419,'What\'s Up Doc?','Lombard Street between Hyde and Leavenworth','Directed by Peter Bogdanovich<br />Featuring: Barbara Streisand,Ryan O\'Neal,');
addPin(37.7713,-122.437,'Milk','Lower Haight Street','Directed by Gus Van Sant<br />Featuring: Sean Penn,Emile Hirsch,Josh Brolin');
addPin(37.8038,-122.41,'Live Nude Girls Unite','Lusty Lady Bar (North Beach)','Directed by Vicky Funari<br />');
addPin(37.7694,-122.486,'Getting Even with Dad','M.H. de Young Memorial Museum (Golden Gate Park)','Directed by Howard Deutch<br />Featuring: Macaulay Culkin,Ted Danson,');
addPin(37.7749,-122.419,'Red Diaper Baby','Magic Theater (Fort Mason, Golden Gate National Recreation Area)','Directed by Doug Pray<br />Featuring: Josh Kornbluth,,<br />Fun Fact: Constructed in 1864 as a coastal defense site, Fort Mason went on to serve as an army post for more than 100 years.');
addPin(37.7882,-122.405,'High Crimes','Maiden Lane','Directed by Mel Brooks<br />Featuring: Mel Brooks,Madeline Kahn,Cloris Leachman');
addPin(37.8015,-122.41,'The Bachelor','Mama\'s Restaurant (1701 Stockton)','Directed by Gary Sinyor<br />Featuring: Chris O\'Donnell,Renee Zellweger,Artie Lang');
addPin(37.7963,-122.407,'The Lady from Shanghai','Mandarin Theatre (1021 Grant Avenue)','Directed by Orson Welles<br />Featuring: Rita Hayworth,Orson Welles,<br />Fun Fact: The Mandarin Theatre was renamed the Sun Sing Theatre in 1949. It closed 1986.');
addPin(37.7846,-122.395,'Nine Months','Marathon Plaza (303 2nd Street)','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold');
addPin(37.8066,-122.439,'Bullitt','Marina Green (Marina District)','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,<br />Fun Fact: Before the 1906 earthquake, the land on which Marina Green sits was a tidal marsh, and rubble from the earthquake was dumped on the site. However, the site was filled in to provide land for the 1915 Panama-Pacific Exhibition. ');
addPin(37.8066,-122.439,'Time After Time','Marina Green (Marina District)','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,<br />Fun Fact: Before the 1906 earthquake, the land on which Marina Green sits was a tidal marsh, and rubble from the earthquake was dumped on the site. However, the site was filled in to provide land for the 1915 Panama-Pacific Exhibition. ');
addPin(37.8066,-122.439,'Dirty Harry','Marina Green, Marina District','Directed by Don Siegel<br />Featuring: Clint Eastwood,,<br />Fun Fact: Before the 1906 earthquake, the land on which Marina Green sits was a tidal marsh, and rubble from the earthquake was dumped on the site. However, the site was filled in to provide land for the 1915 Panama-Pacific Exhibition. ');
addPin(37.8066,-122.439,'Star Trek IV: The Voyage Home','Marina Green, Marina District','Directed by Leonard Nimoy<br />Featuring: William Shatner,Leonard Nimoy,<br />Fun Fact: Before the 1906 earthquake, the land on which Marina Green sits was a tidal marsh, and rubble from the earthquake was dumped on the site. However, the site was filled in to provide land for the 1915 Panama-Pacific Exhibition. ');
addPin(37.7749,-122.419,'Milk','Marine Fireman\'s Union Headquarters','Directed by Gus Van Sant<br />Featuring: Sean Penn,Emile Hirsch,Josh Brolin');
addPin(37.8009,-122.41,'Edtv','Mario\'s Bohemian Cigar Store (Washington Square)','Directed by Ron Howard<br />Featuring: Matthew McConaughey,Jenna Elfman,Woody Harrelson');
addPin(37.807,-122.43,'Sister Act 2: Back in the Habit','Maritime Museum, Building 201 (Fort Mason)','Directed by Bill Duke<br />Featuring: Whoopi Goldberg,Maggie Smith,Lauryn Hill');
addPin(37.7749,-122.419,'Bullitt','Mark Hopkins Hotel (999 California Street)','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,<br />Fun Fact: The Top of the Mark lounge and restaurant at the top of the hotel was formerly a penthouse suite.');
addPin(37.7749,-122.419,'D.O.A','Mark Hopkins Intercontinental Hotel (1 Nob Hill Circle)','Directed by Rudolph Mate<br />Featuring: Edmond O\'Brien,Pamela Britton,Luther Adler<br />Fun Fact: The Top of the Mark lounge and restaurant at the top of the hotel was formerly a penthouse suite.');
addPin(37.7914,-122.41,'Innerspace','Mark Hopkins Intercontinental Hotel (1 Nob Hill Circle, Nob Hill)','Directed by Joe Dante<br />Featuring: Dennis Quaid,Martin Short,Meg Ryan<br />Fun Fact: The Top of the Mark lounge and restaurant at the top of the hotel was formerly a penthouse suite.');
addPin(37.7914,-122.41,'The Lineup','Mark Hopkins Intercontinental Hotel (1 Nob Hill Circle, Nob Hill)','Directed by Don Siegel<br />Featuring: Eli Wallach,,<br />Fun Fact: The Top of the Mark lounge and restaurant at the top of the hotel was formerly a penthouse suite.');
addPin(37.7914,-122.41,'Sudden Impact','Mark Hopkins Intercontinental Hotel (1 Nob Hill Circle, Nob Hill)','Directed by Clint Eastwood<br />Featuring: Clint Eastwood,Sondra Locke,<br />Fun Fact: The Top of the Mark lounge and restaurant at the top of the hotel was formerly a penthouse suite.');
addPin(37.774,-122.421,'The House on Telegraph Hill','Market Street','Directed by Robert Wise<br />Featuring: Richard Basehart');
addPin(37.7771,-122.462,'D.O.A','Market Street (from 6th- 4th Streets)','Directed by Rudolph Mate<br />Featuring: Edmond O\'Brien,Pamela Britton,Luther Adler');
addPin(37.7749,-122.419,'Kamikaze Hearts','Market Street Between Noe and Sanchez','Directed by Juliet Bashore<br />');
addPin(37.785,-122.421,'Sweet November','Marquee Lofts (1000 Van Ness Avenue at Alice B. Tolkas Place)','Directed by Pat O\'Connor<br />Featuring: Keanu Reeves,Charlize Theron,');
addPin(37.7749,-122.419,'How Stella Got Her Groove Back','Marriot Hotel (55 4th Street at Market)','Directed by Kevin Rodney Sullivan<br />Featuring: Angela Bassett,Taye Diggs,Whoppi Goldberg');
addPin(37.7954,-122.412,'Getting Even with Dad','Mason Street at Jackson','Directed by Howard Deutch<br />Featuring: Macaulay Culkin,Ted Danson,');
addPin(37.7197,-122.421,'Bullitt','McClaren Park (Vistacon Valley)','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,<br />Fun Fact: McClaren Park is the 2nd largest park in San Francisco, after Golden Gate Park.');
addPin(37.7782,-122.391,'Twisted','McCovey Point, China Basin Park (24 Willy Mays Plaza)','Directed by Philip Kaufman<br />Featuring: Ashley Judd,Samuel L. Jackson,Andy Garcia');
addPin(37.7788,-122.392,'Sudden Impact','McDonald\'s Restaurant (701 3rd Street, SOMA)','Directed by Clint Eastwood<br />Featuring: Clint Eastwood,Sondra Locke,');
addPin(37.7684,-122.428,'Under the Tuscan Sun','Mecca Restaurant (2029 Market Street)','Directed by Audrey Wells<br />Featuring: Diane Lane,Sandra Oh,');
addPin(37.7749,-122.419,'Time After Time','Merchant Exchange (465 California Street at Leidesdortt)','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,');
addPin(37.793,-122.402,'The Bachelor','Merchant Exchange (465 California Street at Leidesdortt)','Directed by Gary Sinyor<br />Featuring: Chris O\'Donnell,Renee Zellweger,Artie Lang');
addPin(37.7749,-122.419,'The Game','Merchant Exchange Building','Directed by David Fincher<br />Featuring: Michael Douglas,Sean Penn,');
addPin(37.793,-122.402,'The Game','Merchant Exchange Building (465 California Street)','Directed by David Fincher<br />Featuring: Michael Douglas,Sean Penn,');
addPin(37.7591,-122.39,'The Dead Pool','Mirant Energy, LLC (1301 Illinois Street, The Dogpatch)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7644,-122.427,'Vertigo','Mission Delores (3321 16th Street, Mision District)','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,<br />Fun Fact: Mission Delores\' official name is Mission San Francisco de Asis. It is the oldest building in San Francisco, built in 1791, and has survived two major earthquakes.');
addPin(37.7644,-122.427,'Class Action','Mission Delores (3321 16th Street, Mision District)','Directed by Michael Apted<br />Featuring: Gene Hackman,Mary Elizabeth Mastrantonio,Colin Friels<br />Fun Fact: Mission Delores\' official name is Mission San Francisco de Asis. It is the oldest building in San Francisco, built in 1791, and has survived two major earthquakes.');
addPin(37.7597,-122.427,'Dirty Harry','Mission Delores Park (Mission District)','Directed by Don Siegel<br />Featuring: Clint Eastwood,,<br />Fun Fact: The two land plots that comprise the Park were used as a Jewish cemetary until 1894 when San Francisco prohibited all burials within city limits.The graves were moved to Colma, CA.');
addPin(37.7597,-122.427,'Mission (aka City of Bars)','Mission Delores Park (Mission District)','Directed by Loren Marsh<br />Featuring: Chris Coburn,,<br />Fun Fact: The two land plots that comprise the Park were used as a Jewish cemetary until 1894 when San Francisco prohibited all burials within city limits.The graves were moved to Colma, CA.');
addPin(37.7597,-122.427,'Sweet November','Mission Delores Park (Mission District)','Directed by Pat O\'Connor<br />Featuring: Keanu Reeves,Charlize Theron,<br />Fun Fact: The two land plots that comprise the Park were used as a Jewish cemetary until 1894 when San Francisco prohibited all burials within city limits.The graves were moved to Colma, CA.');
addPin(37.7749,-122.419,'Casualties of War','Mission Delores Park (Mission District) via J-Church MUNI Train','Directed by Brian DePalma<br />Featuring: Michael J. Fox,Sean Penn,Don Harvey<br />Fun Fact: The two land plots that comprise the Park were used as a Jewish cemetary until 1894 when San Francisco prohibited all burials within city limits.The graves were moved to Colma, CA.');
addPin(36.8453,-121.536,'Vertigo','Mission San Juan Bautista (2nd & Mariposa Streets)','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,');
addPin(37.7393,-122.424,'Take the Money and Run','Mission Street','Directed by Woody Allen<br />Featuring: Woody Allen');
addPin(37.7993,-122.407,'Twisted','Mojito (1337-1339 Grant Avenue)','Directed by Philip Kaufman<br />Featuring: Ashley Judd,Samuel L. Jackson,Andy Garcia');
addPin(37.801,-122.405,'The Woman In Red','Montgomery Street at Union Street','Directed by Gene Wilder<br />Featuring: Gene Wilder,Charles Grodin,');
addPin(37.801,-122.405,'The Wedding Planner','Montgomery Street at Union Street','Directed by Adam Shankman<br />Featuring: Jennifer Lopez,Matthew McConaughey,');
addPin(37.8011,-122.409,'The Bachelor','Moose\'s Restaurant (1652 Stockton)','Directed by Gary Sinyor<br />Featuring: Chris O\'Donnell,Renee Zellweger,Artie Lang');
addPin(37.7749,-122.419,'Edtv','Moose\'s Restaurant (1652 Stockton)','Directed by Ron Howard<br />Featuring: Matthew McConaughey,Jenna Elfman,Woody Harrelson');
addPin(37.7842,-122.402,'The Net','Moscone Convention Center','Directed by Irwin Winkler<br />Featuring: Sandra Bullock,Jeremy Northam,Dennis Miller');
addPin(37.7391,-122.454,'Sudden Impact','Mt. Davidson','Directed by Clint Eastwood<br />Featuring: Clint Eastwood,Sondra Locke,<br />Fun Fact: Mt. Davidson is highest point in San Francisco (938 feet).');
addPin(37.7383,-122.455,'Dirty Harry','Mt. Davidson Cross, Mt. Davidson','Directed by Don Siegel<br />Featuring: Clint Eastwood,,<br />Fun Fact: The cross sits at the highest point in San Francisco (938 feet). This version of the cross was erected in 1934.Though in Dirty Harry the cross is lit at night, the City stopped this practice in 1990.');
addPin(37.7749,-122.419,'Hemingway & Gelhorn','Muni Metro East (501 Cesar Chavez)','Directed by Philip Kaufman<br />Featuring: Nicole Kidman,Clive Owen,Connie Nielsen');
addPin(37.7954,-122.406,'The Dead Pool','Nam Yuen Restaurant (740 Washington Street, Chinatown)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7858,-122.496,'Sudden Impact','Near Point Lobos, El Camino Del Mar ','Directed by Clint Eastwood<br />Featuring: Clint Eastwood,Sondra Locke,');
addPin(37.7867,-122.407,'Getting Even with Dad','Neiman Marcus (150 Stockton Street, Union Square)','Directed by Howard Deutch<br />Featuring: Macaulay Culkin,Ted Danson,<br />Fun Fact: The City of Paris department store previously occupied the space that now houses Neiman Marcus. City of Paris\' original rotunda and glass dome were incorporated into Neiman Marcus\' design.');
addPin(37.7867,-122.407,'George of the Jungle','Neiman Marcus (150 Stockton Street, Union Square)','Directed by Sam Weisman<br />Featuring: Brendan Fraser,Leslie Mann,Thomas Haden Church<br />Fun Fact: The City of Paris department store previously occupied the space that now houses Neiman Marcus. City of Paris\' original rotunda and glass dome were incorporated into Neiman Marcus\' design.');
addPin(37.7867,-122.407,'The Conversation','Neiman Marcus (150 Stockton Street, Union Square)','Directed by Francis Ford Coppola<br />Featuring: Gene Hackman,,<br />Fun Fact: In the film the City of Paris Department Store is featured. That establishment was located where Neiman Marcus stnads today');
addPin(37.7749,-122.419,'The Dead Pool','New Asia Restaurant (772 Pacific Avenue at Grant)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7749,-122.419,'The Rock','New Russian Hill Market (1198 Pacific Avenue at Jones)','Directed by Michael Bay<br />Featuring: Sean Connery,Nicholas Cage,Ed Harris');
addPin(37.7885,-122.401,'The Bachelor','Nina M. Designs (52 2nd Street at Jessie)','Directed by Gary Sinyor<br />Featuring: Chris O\'Donnell,Renee Zellweger,Artie Lang');
addPin(37.793,-122.416,'Freebie and the Bean','Nob Hill','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,');
addPin(37.793,-122.416,'Family Plot','Nob Hill','Directed by Alfred Hitchcock<br />Featuring: Bruce Dern,Barbara Harris,William Devane');

addPin(37.7749,-122.419,'Edtv','North Beach Video (1398 Grant Avenue at Green)','Directed by Ron Howard<br />Featuring: Matthew McConaughey,Jenna Elfman,Woody Harrelson<br />Fun Fact: The video store has since moved to an adjacent location. ');
addPin(37.7594,-122.511,'Around the Fire','Ocean Beach','Directed by John Jacobsen<br />Featuring: Tara Reid,,<br />Fun Fact: On Jan. 25, 1878, the King Philip ship crashed in Ocean Beach. Occassionally, the ship\'s wreckage may be found on the beach-- most recently it was seen in 2007. ');
addPin(37.7749,-122.419,'Time After Time','Old St. Mary\'s Church (660 California Street at Grant)','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,');
addPin(37.7739,-122.385,'Susan Slade','On Board the SS President Cleveland, docked at Pier 50','Directed by Delmer Daves<br />Featuring: Troy Donahue');
addPin(37.7739,-122.385,'Marnie','On Board the SS President Cleveland, docked at Pier 50','Directed by Alfred Hitchcock<br />Featuring: Tippi Hedren,Sean Connery,');
addPin(37.7946,-122.399,'The Conversation','One Embarcadero Center (Financial District)','Directed by Francis Ford Coppola<br />Featuring: Gene Hackman');
addPin(37.795,-122.399,'Time After Time','One Embarcadero Center (Financial District)','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,');
addPin(37.7939,-122.41,'The Dead Pool','One Thousand Powell Apartments (1000 Powell Street)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7907,-122.43,'Magnum Force','Pacific Heights Towers (2200 Sacramento Street, Pacific Heights)','Directed by Ted Post<br />Featuring: Clint Eastwood');
addPin(37.7749,-122.419,'Quicksilver','Pacific Stock Exchange','Directed by Thomas Michael Donnelly<br />Featuring: Kevin Bacon,Jami Gertz,Paul Rodriguez');
addPin(37.7919,-122.401,'The Bachelor','Pacific Stock Exchange (301 Pine Street at Sansome)','Directed by Gary Sinyor<br />Featuring: Chris O\'Donnell,Renee Zellweger,Artie Lang');
addPin(37.8015,-122.448,'Murder in the First','Palace of Fine Arts','Directed by Marc Rocco<br />Featuring: Christian Slater,Kevin Bacon,Gary Oldman<br />Fun Fact: The original Palace was built for the 1915 Panama-Pacific Exposition, and completely destroyed in 1964. It was rebuilt in 1965.');
addPin(37.8015,-122.448,'Jade','Palace of Fine Arts','Directed by William Friedkin<br />Featuring: David Caruso,Linda Fiorentino,Chazz Palminteri<br />Fun Fact: The original Palace was built for the 1915 Panama-Pacific Exposition, and completely destroyed in 1964. It was rebuilt in 1965.');
addPin(37.7749,-122.419,'Edtv','Palace of Fine Arts (3301 Lyon Street)','Directed by Ron Howard<br />Featuring: Matthew McConaughey,Jenna Elfman,Woody Harrelson<br />Fun Fact: The original Palace was built for the 1915 Panama-Pacific Exposition, and completely destroyed in 1964. It was rebuilt in 1965.');
addPin(37.7749,-122.419,'Forrest Gump','Palace of Fine Arts (3301 Lyon Street)','Directed by Robert Zemeckis<br />Featuring: Tom Hanks,Robin Wright,Sally Field<br />Fun Fact: The original Palace was built for the 1915 Panama-Pacific Exposition, and completely destroyed in 1964. It was rebuilt in 1965.','http://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Fine_Arts_SF_CA.jpg');
addPin(37.7749,-122.419,'The Woman In Red','Palace of Fine Arts (3301 Lyon Street)','Directed by Gene Wilder<br />Featuring: Gene Wilder,Charles Grodin,<br />Fun Fact: The original Palace was built for the 1915 Panama-Pacific Exposition, and completely destroyed in 1964. It was rebuilt in 1965.','http://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Fine_Arts_SF_CA.jpg');
addPin(37.7749,-122.419,'Time After Time','Palace of Fine Arts (3301 Lyon Street)','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,<br />Fun Fact: The original Palace was built for the 1915 Panama-Pacific Exposition, and completely destroyed in 1964. It was rebuilt in 1965.','http://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Fine_Arts_SF_CA.jpg');
addPin(37.7749,-122.419,'Vertigo','Palace of Fine Arts (3301 Lyon Street)','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,<br />Fun Fact: The original Palace was built for the 1915 Panama-Pacific Exposition, and completely destroyed in 1964. It was rebuilt in 1965.','http://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Fine_Arts_SF_CA.jpg');
addPin(37.7749,-122.419,'The Rock','Palace of Fine Arts (3301 Lyon Street)','Directed by Michael Bay<br />Featuring: Sean Connery,Nicholas Cage,Ed Harris<br />Fun Fact: The original Palace was built for the 1915 Panama-Pacific Exposition, and completely destroyed in 1964. It was rebuilt in 1965.','http://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Fine_Arts_SF_CA.jpg');
addPin(37.7749,-122.419,'The Other Sister','Palace of Fine Arts (3301 Lyon Street)','Directed by Garry Marshall<br />Featuring: Juliette Lewis,Diane Keaton,Giovanni Ribisi<br />Fun Fact: The original Palace was built for the 1915 Panama-Pacific Exposition, and completely destroyed in 1964. It was rebuilt in 1965.','http://upload.wikimedia.org/wikipedia/commons/8/87/Palace_of_Fine_Arts_SF_CA.jpg');
addPin(37.7669,-122.44,'Vertigo','Park Hill Sanatorium (351 Buena Vista Avenue East)','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,<br />Fun Fact: This location is now a condominium complex.');
addPin(37.7641,-122.395,'Foul Play','Pawtrero Hill Bathhouse & Feed Co. (199 Mississippi Street)','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,');
addPin(37.7903,-122.387,'Twisted','Pier 24','Directed by Philip Kaufman<br />Featuring: Ashley Judd,Samuel L. Jackson,Andy Garcia');
addPin(37.7984,-122.394,'The Dead Pool','Pier 3 (The Embarcadero)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.8067,-122.405,'Invasion of the Body Snatchers','Pier 33 (Embarcadero)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,');
addPin(37.7815,-122.388,'Sudden Impact','Pier 38-40, The Embarcadero','Directed by Clint Eastwood<br />Featuring: Clint Eastwood,Sondra Locke,');
addPin(37.8087,-122.41,'The Competiton','Pier 39','Directed by Joel Oliansky<br />Featuring: Richard Dreyfuss,Lee Remick,');
addPin(37.8087,-122.41,'Twisted','Pier 39','Directed by Philip Kaufman<br />Featuring: Ashley Judd,Samuel L. Jackson,Andy Garcia');
addPin(37.8087,-122.41,'Dream with the Fishes','Pier 39','Directed by Finn Taylor<br />Featuring: David Arquette,Brad Hunt,Cathy Moriarty');
addPin(37.8087,-122.41,'Homeward Bound II: Lost in San Francisco','Pier 39 (Fisherman\'s Wharf)','Directed by David R. Ellis<br />Featuring: Michael J. Fox,Sally Field,');
addPin(37.8089,-122.412,'The Lineup','Pier 41','Directed by Don Siegel<br />Featuring: Eli Wallach');
addPin(37.7974,-122.394,'Petulia','Pier 43 1/2','Directed by Richard Lester<br />Featuring: Julie Christie,George C. Scott,Richard Chamberlain');
addPin(37.7974,-122.394,'Birdman of Alcatraz','Pier 43 1/2','Directed by John Frankenheimer<br />Featuring: Bert Lancaster,Karl Maden,');
addPin(37.7987,-122.397,'Murder in the First','Pier 7','Directed by Marc Rocco<br />Featuring: Christian Slater,Kevin Bacon,Gary Oldman');
addPin(37.7987,-122.397,'Basic Instinct','Pier 7 (The Embarcadero)','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza');
addPin(37.7987,-122.397,'The Wedding Planner','Pier 7 (The Embarcadero)','Directed by Adam Shankman<br />Featuring: Jennifer Lopez,Matthew McConaughey,');
addPin(37.7987,-122.439,'Nine Months','Pierce Street between Pacific & Green Streets','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold');
addPin(37.7987,-122.397,'Twisted','Piers 30-32','Directed by Philip Kaufman<br />Featuring: Ashley Judd,Samuel L. Jackson,Andy Garcia');
addPin(37.793,-122.413,'The Wedding Planner','Pleasant Street at Taylor','Directed by Adam Shankman<br />Featuring: Jennifer Lopez,Matthew McConaughey,');
addPin(37.7968,-122.395,'A View to a Kill','Port of San Francisco ','Directed by John Glen<br />Featuring: Roger Moore,Christopher Walken<br />TRIVIA: Dianne Feinstein was the mayor of San Francisco at the time of filming. Because Roger Moore was her favorite of the first three actors to play Bond, she granted all the necessary permits to film in the city.','http://upload.wikimedia.org/wikipedia/commons/1/12/Fishermans_Wharf_aerial_view.jpg');
addPin(37.7947,-122.405,'Dirty Harry','Portsmouth Square (Chinatown)','Directed by Don Siegel<br />Featuring: Clint Eastwood,,<br />Fun Fact: In 1847 the first public school in California was erected on what would become Portsmouth Square.');
addPin(37.7941,-122.408,'The Dead Pool','Posrtsmouth Square (Chinatown)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7759,-122.424,'The Woman In Red','Postcard Row (Alamo Square, Hayes Valley)','Directed by Gene Wilder<br />Featuring: Gene Wilder,Charles Grodin,<br />Fun Fact: The 6 Victorian homes across from Alamo Square Park are among the few Victorians to survive the Great Fire.');
addPin(37.7759,-122.424,'Fat Man and Little Boy','Postcard Row (Alamo Square, Hayes Valley)','Directed by Roland Joffe<br />Featuring: Paul Newman,John Cusack,Laura Dern<br />Fun Fact: The 6 Victorian homes across from Alamo Square Park are among the few Victorians to survive the Great Fire.');
addPin(37.7759,-122.424,'Foul Play','Postcard Row (Alamo Square, Hayes Valley)','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,<br />Fun Fact: The 6 Victorian homes across from Alamo Square Park are among the few Victorians to survive the Great Fire.');
addPin(37.7772,-122.438,'Patty Hearst','Postcard Row (Alamo Square, Hayes Valley)','Directed by Paul Schrader<br />Featuring: Natasha Richardson,William Forsythe,Ving Rhames<br />Fun Fact: The 6 Victorian homes across from Alamo Square Park are among the few Victorians to survive the Great Fire.');
addPin(37.7759,-122.424,'Never Die Twice','Postcard Row (Alamo Square, Hayes Valley)','Directed by Sean A.F. Scott<br />Featuring: Claudia Christian,,<br />Fun Fact: The 6 Victorian homes across from Alamo Square Park are among the few Victorians to survive the Great Fire.');
addPin(37.7759,-122.424,'Invasion of the Body Snatchers','Postcard Row (Alamo Square, Hayes Valley)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,<br />Fun Fact: The 6 Victorian homes across from Alamo Square Park are among the few Victorians to survive the Great Fire.');
addPin(37.7759,-122.424,'Junior','Postcard Row (Alamo Square, Hayes Valley)','Directed by Ivan Reitman<br />Featuring: Arnold Schwarzenegger,Danny DeVito,Emma Thompson<br />Fun Fact: The 6 Victorian homes across from Alamo Square Park are among the few Victorians to survive the Great Fire.');
addPin(37.7759,-122.424,'Bicentennial Man','Postcard Row, Alamo Square, Hayes Valley','Directed by Chris Columbus<br />Featuring: Robin Williams,,<br />Fun Fact: The 6 Victorian homes across from Alamo Square Park are among the few Victorians to survive the Great Fire.');
addPin(37.7605,-122.401,'A View to a Kill','Potrero Hill','Directed by John Glen<br />Featuring: Roger Moore,Christopher Walken,<br />Fun Fact: The crookedest street in San Fransisco is actually Potrero Hill\'s Vermont Street between 20th St & 22nd St.');
addPin(37.7605,-122.401,'Freebie and the Bean','Potrero Hill','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,<br />Fun Fact: The crookedest street in San Fransisco is actually Potrero Hill\'s Vermont Street between 20th St & 22nd St.');
addPin(37.7874,-122.408,'The Birds','Powell and Geary Streets (Union Square)','Directed by Alfred Hitchcock<br />Featuring: Tippi Hedren,Suzanne Pleshette,Rod Taylor<br />Fun Fact: The pet shop featured in the film does not exist, but was based on the now-closed Robison\'s House of Pets formerly located on Maiden Lane.');
addPin(37.7961,-122.41,'Swingin\' Along','Powell Street','Directed by Charles Barton<br />Featuring: Tommy Noonan,Barbara Eden,Ray Charles');
addPin(37.806,-122.476,'The Game','Presidio (Golden Gate National Recreation Area)','Directed by David Fincher<br />Featuring: Michael Douglas,Sean Penn,<br />Fun Fact: In 1776, Spain made the Presido a fortified area. The area was then given to Mexico, but then given to the US in 1848. The 1994 demilitarization of the area in 1994 marked the end of its 219 years of military use. ');
addPin(37.806,-122.476,'The Presidio','Presidio (Golden Gate National Recreation Area)','Directed by Peter Hyams<br />Featuring: Sean Connery,Mark Harmon,Meg Ryan<br />Fun Fact: In 1776, Spain made the Presido a fortified area. The area was then given to Mexico, but then given to the US in 1848. The 1994 demilitarization of the area in 1994 marked the end of its 219 years of military use. ');
addPin(37.8345,-122.505,'Patch Adams','Presidio (Golden Gate National Recreation Area)','Directed by Tom Shadyac<br />Featuring: Robin Williams,Philip Seymour Hoffman,<br />Fun Fact: In 1776, Spain made the Presido a fortified area. The area was then given to Mexico, but then given to the US in 1848. The 1994 demilitarization of the area in 1994 marked the end of its 219 years of military use. ');
addPin(37.806,-122.476,'Final Analysis','Presidio, Golden Gate National Recreation Area','Directed by Phil Joanou<br />Featuring: Richard Gere,Kim Basinger,Uma Thurman<br />Fun Fact: In 1776, Spain made the Presido a fortified area. The area was then given to Mexico, but then given to the US in 1848. The 1994 demilitarization of the area in 1994 marked the end of its 219 years of military use. ');
addPin(37.7595,-122.411,'Vegas in Space','Project Artaud (Florida Street)','Directed by Phillip R. Ford<br />');
addPin(37.8005,-122.408,'So I Married an Axe Murderer','Prudente\'s Italian Deli (1462 Grant Ave at Union)','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,<br />Fun Fact: Prudente\'s Italian Deli, which has since closed, is called "Meats of the World" in the film.');
addPin(37.7749,-122.419,'Final Analysis','Public Health Service Hospital (Presidio, Golden Gate National Recreation Area)','Directed by Phil Joanou<br />Featuring: Richard Gere,Kim Basinger,Uma Thurman<br />Fun Fact: In 1776, Spain made the Presido a fortified area. The area was then given to Mexico, but then given to the US in 1848. The 1994 demilitarization of the area in 1994 marked the end of its 219 years of military use. ');
addPin(37.8082,-122.416,'50 First Dates','Rainforest Café (145 Jefferson Street)','Directed by Peter Segal<br />Featuring: Adam Sandler,Drew Barrymore,Rob Schneider');
addPin(37.7785,-122.415,'Invasion of the Body Snatchers','Ramada Plaza Hotel Downtown (1231 Market Street, Civic Center)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,');
addPin(37.7643,-122.438,'180','Randall Musuem','Directed by Jayendra<br />Featuring: Siddarth,Nithya Menon,Priya Anand');
addPin(37.7768,-122.409,'Basic Instinct','Raw Hide II (280 Seventh Street)','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza');
addPin(37.7874,-122.387,'Twisted','Red\'s Java House (Pier 30-32, The Embarcadero)','Directed by Philip Kaufman<br />Featuring: Ashley Judd,Samuel L. Jackson,Andy Garcia');
addPin(37.7879,-122.422,'Swing','Regency Building (1290 Sutter Street)','Directed by Martin Guigui<br />Featuring: Constance Brenneman');
addPin(37.7919,-122.407,'The Game','Ritz-Carlton Hotel (600 Stockton Street)','Directed by David Fincher<br />Featuring: Michael Douglas,Sean Penn,');
addPin(37.7749,-122.419,'Experiment in Terror','Roaring Twenties Nightclub (555 Broadway at Columbus)','Directed by Blake Edwards<br />Featuring: Glenn Ford,Lee Remick,');
addPin(37.8011,-122.412,'So I Married an Axe Murderer','Rocco\'s Corner (Columbus Street)','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,');
addPin(37.7966,-122.4,'The Bachelor','Roof of Cable Car (California at Front Street)','Directed by Gary Sinyor<br />Featuring: Chris O\'Donnell,Renee Zellweger,Artie Lang<br />Fun Fact: SF Cable Cars are the only moving National Historical Landmark.');
addPin(37.7951,-122.407,'Golden Gate','Ross Alley (Chinatown)','Directed by John Madden<br />Featuring: Matt Dillon,Joan Chen,<br />Fun Fact: Ross Alley is the oldest alley in San Francisco. ');
addPin(37.7665,-122.422,'By Hook or By Crook','Royan Hotel (405 Valencia Street, Mission District)','Directed by Harriet Dodge & Silas Howard<br />Featuring: Silas Howard');
addPin(37.8094,-122.416,'Sphere','S.S. Jeremiah O\'Brien','Directed by Barry Levinson<br />Featuring: Dustin Hoffman,Sharon Stone,Samuel L. Jackson');
addPin(37.7893,-122.44,'Dr. Doolittle 2','Sacramento St., Between Pierce & Broderick Streets ','Directed by Steve Carr<br />Featuring: Eddie Murphy,Kristen Wilson,Raven-Symone');
addPin(37.7886,-122.408,'The Conversation','Saks Fifth Avenue (384 Post Street, Union Square)','Directed by Francis Ford Coppola<br />Featuring: Gene Hackman');
addPin(37.7749,-122.419,'The Californians','San Francisco','Directed by Jonathan Parker<br />Featuring: Noah Wyle');
addPin(37.7749,-122.419,'The Fog of War','San Francisco','Directed by Errol Morris<br />Featuring: Robert McNamara');
addPin(37.7749,-122.419,'The Doctor','San Francisco','Directed by Randa Haines<br />Featuring: William Hurt,Christine Lahti,Mandy Patinkin');
addPin(37.7749,-122.419,'The Doors','San Francisco','Directed by Oliver Stone<br />Featuring: Val Kilmer,Meg Ryan,');
addPin(37.7749,-122.419,'The Last of the Gladiators','San Francisco','Directed by Martin Jay Sadoff<br />Featuring: Evel Knievel');
addPin(37.7749,-122.419,'The Laughing Policeman','San Francisco','Directed by Stuart Rosenberg<br />Featuring: Walter Matthau,Bruce Dern,Lou Gossett, Jr. ');
addPin(37.7749,-122.419,'Twisted','San Francisco','Directed by Philip Kaufman<br />Featuring: Ashley Judd,Samuel L. Jackson,Andy Garcia');
addPin(37.7749,-122.419,'Tweek City','San Francisco','Directed by Eric G. Johnson<br />Featuring: Giuseppe Andrews');
addPin(37.7749,-122.419,'Tin Cup','San Francisco','Directed by Ron Shelton<br />Featuring: Kevin Costner,Rene Russo,Don Johnson');
addPin(37.7749,-122.419,'To the Ends of the Earth','San Francisco','Directed by Robert Stevenson<br />Featuring: Dick Powell');
addPin(37.7749,-122.419,'True Believer','San Francisco','Directed by Joseph Ruben<br />Featuring: James Woods,Robert Downey, Jr.,');
addPin(37.7749,-122.419,'The Nightmare Before Christmas','San Francisco','Directed by Henry Selick<br />Featuring: Danny Elfman,Catherine O\'Hara,');
addPin(37.7749,-122.419,'The Organization','San Francisco','Directed by Don Medford<br />Featuring: Sidney Poitier');
addPin(37.7749,-122.419,'They Call Me MISTER Tibbs','San Francisco','Directed by Gordon Douglas<br />Featuring: Sidney Poitier,Martin Landau,');
addPin(37.7749,-122.419,'The Zodiac','San Francisco','Directed by Alexander Bulkley<br />Featuring: Justin Chambers,Robin Tunney,');
addPin(37.7749,-122.419,'Thief of Hearts','San Francisco','Directed by Douglas Day Stewart<br />Featuring: Steven Bauer ,David Caruso,George Wendt');
addPin(37.7749,-122.419,'Yours, Mine and Ours','San Francisco','Directed by Melville Shavelson<br />Featuring: Lucille Ball,Henry Fonda,');
addPin(37.7749,-122.419,'Faces of Death','San Francisco','Directed by Conan Le Cilaire<br />Featuring: Michael Carr');
addPin(37.7749,-122.419,'Dying Young','San Francisco','Directed by Joel Schumacher<br />Featuring: Julia Roberts,Campbell Scott,');
addPin(37.7749,-122.419,'Fathers\' Day','San Francisco','Directed by Ivan Reitman<br />Featuring: Robin Williams,Billy Crystal,Julia Louis-Dreyfus');
addPin(37.7749,-122.419,'Fandom','San Francisco','Directed by Nicholas Tucker<br />Featuring: Mark Hefti,Peter Quintana,');
addPin(37.7749,-122.419,'Days of Wine and Roses','San Francisco','Directed by Blake Edwards<br />Featuring: Jack Lemmon,Lee Remick,');
addPin(37.7749,-122.419,'Desperate Measures','San Francisco','Directed by Barbet Schroeder<br />Featuring: Michael Keaton,Andy Garcia,Brian Cox');
addPin(37.7749,-122.419,'Down Periscope','San Francisco','Directed by David S. Ward<br />Featuring: Kelsey Grammer,Lauren Holly,Rob Schneider');
addPin(37.7749,-122.419,'Confessions of a Burning Man','San Francisco','Directed by Paul Barnett<br />Featuring: Kevin Epps,Anna Getty,Samantha Weaver');
addPin(37.7749,-122.419,'Babies','San Francisco','Directed by Thomas Balmes<br />Featuring: Bayar,Hattie,Mari');
addPin(37.7749,-122.419,'Barbary Coast','San Francisco','Directed by Howard Hawks<br />Featuring: Mariam Hopkins,Edward G. Robinson,');
addPin(37.7749,-122.419,'American Yearbook','San Francisco','Directed by Brian Ging<br />Featuring: Nick Tagas,Jon Carlo Alvarez,Giovannie Pico');
addPin(37.7749,-122.419,'Another 48 Hours','San Francisco','Directed by Walter Hill<br />Featuring: Eddie Murphy,Nick Nolte,');
addPin(37.7749,-122.419,'Big Touble in Lttle China','San Francisco','Directed by John Carpenter<br />Featuring: Kurt Russell,Kim Catrall,');
addPin(37.7749,-122.419,'Bee Season','San Francisco','Directed by Scott McGehee<br />Featuring: Richard Gere,Juliette Binoche,');
addPin(37.7749,-122.419,'Beaches','San Francisco','Directed by Garry Marshall<br />Featuring: Bette Midler,Barbara Hershey,');
addPin(37.7749,-122.419,'24 Hours on Craigslist','San Francisco','Directed by Michael Ferris Gibson<br />Featuring: Craig Newmark');
addPin(37.7749,-122.419,'48 Hours','San Francisco','Directed by Walter Hill<br />Featuring: Nick Nolte,Eddie Murphy,');
addPin(37.7749,-122.419,'Stigmata','San Francisco','Directed by Rupert Wainwright<br />Featuring: Patricia Arquette,Gabriel Byrne,');
addPin(37.7749,-122.419,'Serendipity','San Francisco','Directed by Peter Chelsom<br />Featuring: John Cusack,Kate Beckinsale,');
addPin(37.7749,-122.419,'Shattered','San Francisco','Directed by Wolfgang Petersen<br />Featuring: Tom Berenger,Bob Hoskins,');
addPin(37.7749,-122.419,'Raising Cain','San Francisco','Directed by Brian DePalma<br />Featuring: John Lithgow');
addPin(37.7749,-122.419,'Pretty Woman','San Francisco','Directed by Garry Marshall<br />Featuring: Richard Gere,Julia Roberts,');
addPin(37.7749,-122.419,'Psych-Out','San Francisco','Directed by Richard Rush<br />Featuring: Jack Nicholson,Susan Strasberg,Bruce Dern');
addPin(37.7749,-122.419,'Rollerball','San Francisco','Directed by John McTiernan<br />Featuring: Chris Klein,Jean Reno,LL Cool J');
addPin(37.7749,-122.419,'Panther','San Francisco','Directed by Mario Van Peebles<br />Featuring: Kadeem Hardison,Bookeem Woodbine,Courtney B. Vance');
addPin(37.7749,-122.419,'On the Beach','San Francisco','Directed by Stanley Kramer<br />Featuring: Gregory Peck,Ava Gardner,Fred Astaire');
addPin(37.7749,-122.419,'Night of Henna','San Francisco','Directed by Hassan Zee<br />Featuring: Joyce Carlin,Nancy Carlin,');
addPin(37.7749,-122.419,'Nina Takes a Lover','San Francisco','Directed by Alan Jacobs<br />Featuring: Laura San Giacomo');
addPin(37.7749,-122.419,'Mona Lisa Smile','San Francisco','Directed by Mike Newell<br />Featuring: Julia Roberts,Kirsten Dunst,Julia Stiles');
addPin(37.7749,-122.419,'House of Sand and Fog','San Francisco','Directed by Vadim Perelman<br />Featuring: Jennifer Connelly,Ben Kingsley,');
addPin(37.7749,-122.419,'Hello Frisco, Hello','San Francisco','Directed by Bruce Humberstone<br />Featuring: Alice Faye');
addPin(37.7749,-122.419,'Haiku Tunnel','San Francisco','Directed by Jakob Kornbluth & Josh Kornbluth<br />Featuring: Josh Kornbluth,Warren Keith,');
addPin(37.7749,-122.419,'Happy Gilmore','San Francisco','Directed by Dennis Dugan<br />Featuring: Adam Sandler');
addPin(37.7749,-122.419,'Julie and Jack','San Francisco','Directed by James Nguyen<br />Featuring: Jenn Gotzon,Tippi Hedren,');
addPin(37.7749,-122.419,'James and the Giant Peach','San Francisco','Directed by Henry Selick<br />Featuring: Richard Dreyfuss,Jane Leeves,Joanna Lumley');
addPin(37.7749,-122.419,'Jack','San Francisco','Directed by Francis Ford Coppola<br />Featuring: Robin Williams,Diane Lane,Jennifer Lopez');
addPin(37.7749,-122.419,'Just Like Heaven','San Francisco','Directed by Mark Waters<br />Featuring: Reese Witherspoon,Mark Ruffalo,');
addPin(37.8034,-122.417,'Heart Beat','San Francisco Art Institute (800 Chestnut Street)','Directed by John Byrum<br />Featuring: Nick Nolte,Sissy Spacek,John Heard');
addPin(37.691,-122.311,'Alexander\'s Ragtime Band','San Francisco Bay','Directed by Henry King<br />Featuring: Tyrone Power,Alice Faye,');
addPin(37.7666,-122.42,'A Night Full of Rain','San Francisco Chronicle (901 Mission Street at 15th Street)','Directed by Lina Wertmuller<br />Featuring: Candice Bergen,Giancarlo Gianni,<br />Fun Fact: The San Francisco Zodiac Killer of the late 1960s sent his notes and letters to the Chronicle\'s offices.');
addPin(37.7824,-122.407,'So I Married an Axe Murderer','San Francisco Chronicle (901 Mission Street at 15th Street)','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,<br />Fun Fact: The paper is called the San Francisco Globe in the movie.');
addPin(37.7561,-122.387,'Invasion of the Body Snatchers','San Francisco Drydock (20th and Illinois Streets)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,');
addPin(37.7561,-122.387,'Magnum Force','San Francisco Drydock (20th and Illinois Streets)','Directed by Ted Post<br />Featuring: Clint Eastwood');
addPin(37.7561,-122.387,'Dirty Harry','San Francisco Drydock (20th and Illinois Streets)','Directed by Don Siegel<br />Featuring: Clint Eastwood');
addPin(37.7561,-122.387,'Vertigo','San Francisco Drydock (20th and Illinois Streets)','Directed by Alfred Hitchcock<br />Featuring: James Stewart,Kim Novak,');
addPin(37.7591,-122.39,'The Dead Pool','San Francisco Drydock (The Dogpatch)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7895,-122.43,'The Towering Inferno','San Francisco Fire Station 38 (2150 California Street, Pacific Heights)','Directed by John Guillermin<br />Featuring: Steve McQueen,Paul Newman,William Holden');
addPin(37.7567,-122.404,'The Dead Pool','San Francisco General Hospital Medical Center (1001 Potrero Avenue, Potrero Hill)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,<br />Fun Fact: SF General Hospital is the only Level I Trauma Center serving San Francisco and northern San Mateo County. ');
addPin(37.7567,-122.404,'Fearless','San Francisco General Hospital Medical Center (1001 Potrero Avenue, Potrero Hill)','Directed by Peter Weir<br />Featuring: Jeff Bridges,Isabella Rosellini,Rosie Perez<br />Fun Fact: SF General Hospital is the only Level I Trauma Center serving San Francisco and northern San Mateo County. ');
addPin(37.7567,-122.404,'Nine Months','San Francisco General Hospital Medical Center (1001 Potrero Avenue, Potrero Hill)','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold<br />Fun Fact: SF General Hospital is the only Level I Trauma Center serving San Francisco and northern San Mateo County. ');
addPin(37.786,-122.411,'What\'s Up Doc?','San Francisco Hilton (333 O\'Farrell Street)','Directed by Peter Bogdanovich<br />Featuring: Barbara Streisand,Ryan O\'Neal,');
addPin(37.6152,-122.39,'Magnum Force','San Francisco International Airport','Directed by Ted Post<br />Featuring: Clint Eastwood,,<br />Fun Fact: SFO has a museum dedicated to aviation history. ');
addPin(37.6152,-122.39,'Guess Who\'s Coming to Dinner','San Francisco International Airport','Directed by Stanley Kramer<br />Featuring: Spencer Tracy,Sidney Poitier,Katherine Hepburn<br />Fun Fact: SFO has a museum dedicated to aviation history. ');
addPin(37.6152,-122.39,'Dim Sum: A Little Bit of Heart','San Francisco International Airport','Directed by Wayne Wang<br />Featuring: ,,<br />Fun Fact: SFO has a museum dedicated to aviation history. ');
addPin(37.6152,-122.39,'A Smile Like Yours ','San Francisco International Airport','Directed by Keith Samples<br />Featuring: Greg Kinnear,Lauren Holly,Joan Cusack<br />Fun Fact: SFO has a museum dedicated to aviation history. ');
addPin(37.7822,-122.504,'The Dead Pool','San Francisco National Military Cemetary (Lincoln Blvd., The Presidio, Golden Gate National Recreation Center)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7792,-122.416,'City of Angels','San Francisco Public Library Main Branch (100 Larkin Street)','Directed by Brad Silberling<br />Featuring: Nicholas Cage,Meg Ryan,');

addPin(37.7996,-122.403,'The Presidio','Sansome Street (The Embarcadero)','Directed by Peter Hyams<br />Featuring: Sean Connery,Mark Harmon,Meg Ryan');
addPin(37.7891,-122.399,'Zodiac','SF Chronicle Building (901 Mission St)','Directed by David Fincher<br />Featuring: Jake Gyllenhall,Mark Ruffalo,Anthony Edwards');
addPin(37.7567,-122.404,'Time After Time','SF General Hospital Center (1001 Potrero Avenue, Potrero Hill)','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,<br />Fun Fact: SF General Hospital is the only Level I Trauma Center serving San Francisco and northern San Mateo County. ');
addPin(37.7567,-122.404,'Bullitt','SF General Hospital Center (1001 Potrero Avenue, Potrero Hill)','Directed by Peter Yates<br />Featuring: Steve McQueen,Jacqueline Bisset,<br />Fun Fact: SF General Hospital is the only Level I Trauma Center serving San Francisco and northern San Mateo County. ');
addPin(37.7893,-122.402,'Experiment in Terror','Sheraton Palace Hotel (2 Montgomery Street, Financial District)','Directed by Blake Edwards<br />Featuring: Glenn Ford,Lee Remick,<br />Fun Fact: The hotel was destroyed in the 1906 earthquake and fire, had to be rebuilt, and was reopened in 1909. ');
addPin(37.7887,-122.402,'Patch Adams','Sheraton Palace Hotel (639 Market Street)','Directed by Tom Shadyac<br />Featuring: Robin Williams,Philip Seymour Hoffman,<br />Fun Fact: The hotel was destroyed in the 1906 earthquake and fire, had to be rebuilt, and was reopened in 1909. ');
addPin(37.7749,-122.419,'Herbie Rides Again','Sheraton Palace Hotel (639 Market Street)','Directed by Robert Stevenson<br />Featuring: Helen Hayes,Ken Berry,<br />Fun Fact: The hotel was destroyed in the 1906 earthquake and fire, had to be rebuilt, and was reopened in 1909. ');
addPin(37.7749,-122.419,'Jade','Sheraton Palace Hotel (639 Market Street)','Directed by William Friedkin<br />Featuring: David Caruso,Linda Fiorentino,Chazz Palminteri<br />Fun Fact: The hotel was destroyed in the 1906 earthquake and fire, had to be rebuilt, and was reopened in 1909. ');
addPin(37.7749,-122.419,'The Game','Sheraton Palace Hotel (639 Market Street)','Directed by David Fincher<br />Featuring: Michael Douglas,Sean Penn,<br />Fun Fact: The hotel was destroyed in the 1906 earthquake and fire, had to be rebuilt, and was reopened in 1909. ');
addPin(37.7951,-122.406,'The Dead Pool','Silver Restaurant (737 Washington Street, Chinatown)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7749,-122.419,'The Matrix','skyline/ exterior scenes','Directed by The Wachowski Brothers<br />Featuring: Keanu Reeves,Laurence Fishburne,Carrie-Anne Moss');
addPin(37.7866,-122.429,'Foul Play','Sokoji-Soto Zen Buddhist Temple (1691 Laguna Street)','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,');
addPin(37.756,-122.412,'Copycat','Sound Factory (1st and Harrison Streets)','Directed by Jon Amiel<br />Featuring: Sigourney Weaver,Holly Hunter,Dermot Mulroney');
addPin(37.7732,-122.406,'Dopamine','South Park (Between 2nd and 3rd Streets, Brannan and Bryant Streets)','Directed by Mark Decena<br />Featuring: John Livingston,Sabrina Lloyd,Bruno Campos');
addPin(37.7734,-122.442,'D.O.A','Southern Pacific Memorial Hospital (1400 Fell Street)','Directed by Rudolph Mate<br />Featuring: Edmond O\'Brien,Pamela Britton,Luther Adler');
addPin(37.7929,-122.427,'Pal Joey','Spreckles Mansion (2080 Washington Street, Pacific Heights)','Directed by George Sidney<br />Featuring: Rita Hayworth,Frank Sinatra,Kim Novak');
addPin(37.7944,-122.419,'When a Man Loves a Woman','Spring Valley School (1451 Jackson Street)','Directed by Luis Mandoki<br />Featuring: Andy Garcia,Meg Ryan,Ellyn Burstyn');
addPin(37.7931,-122.41,'Memoirs of an Invisible Man','St. Elizabeth Apartment House (901 Powell Street at Sacramento)','Directed by John Carpenter<br />Featuring: Chevy Chase,Daryl Hannah,');
addPin(37.7868,-122.46,'So I Married an Axe Murderer','St. John\'s Presbyterian Church (25 Lake Street)','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,');
addPin(37.7545,-122.428,'Sister Act','St. Paul\'s Church (Church Street, Noe Valley)','Directed by Emile Ardolino<br />Featuring: Whoopi Goldberg,Maggie Smith,');
addPin(37.8014,-122.411,'Sister Act 2: Back in the Habit','St. Peter & Paul\'s Church (666 Filbert Street, Washington Square)','Directed by Bill Duke<br />Featuring: Whoopi Goldberg,Maggie Smith,Lauryn Hill<br />Fun Fact: Though Marilyn Monroe and Joe DiMaggio were not alllowed to be married at the Church (DiMaggio had married his first wife at the Church but was divorced), the couple returned to the steps of the Church for photos, following their City Hall nuptuals.');
addPin(37.8014,-122.411,'Nine Months','St. Peter & Paul\'s Church (666 Filbert Street, Washington Square)','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold<br />Fun Fact: Though Marilyn Monroe and Joe DiMaggio were not alllowed to be married at the Church (DiMaggio had married his first wife at the Church but was divorced), the couple returned to the steps of the Church for photos, following their City Hall nuptuals.');
addPin(37.8014,-122.411,'Boys and Girls','St. Peter & Paul\'s Church (666 Filbert Street, Washington Square)','Directed by Robert Iscove<br />Featuring: Freddie Prinze, Jr.,Alyson Hannigan,<br />Fun Fact: Though Marilyn Monroe and Joe DiMaggio were not alllowed to be married at the Church (DiMaggio had married his first wife at the Church but was divorced), the couple returned to the steps of the Church for photos, following their City Hall nuptuals.');
addPin(37.8014,-122.411,'Dirty Harry','St. Peter & Paul\'s Church (666 Filbert Street, Washington Square)','Directed by Don Siegel<br />Featuring: Clint Eastwood,,<br />Fun Fact: Though Marilyn Monroe and Joe DiMaggio were not alllowed to be married at the Church (DiMaggio had married his first wife at the Church but was divorced), the couple returned to the steps of the Church for photos, following their City Hall nuptuals.');
addPin(37.8014,-122.411,'Fearless','St. Peter & Paul\'s Church (666 Filbert Street, Washington Square)','Directed by Peter Weir<br />Featuring: Jeff Bridges,Isabella Rosellini,Rosie Perez<br />Fun Fact: Though Marilyn Monroe and Joe DiMaggio were not alllowed to be married at the Church (DiMaggio had married his first wife at the Church but was divorced), the couple returned to the steps of the Church for photos, following their City Hall nuptuals.');
addPin(37.8014,-122.411,'Getting Even with Dad','St. Peter & Paul\'s Church (666 Filbert Street, Washington Square)','Directed by Howard Deutch<br />Featuring: Macaulay Culkin,Ted Danson,<br />Fun Fact: Though Marilyn Monroe and Joe DiMaggio were not alllowed to be married at the Church (DiMaggio had married his first wife at the Church but was divorced), the couple returned to the steps of the Church for photos, following their City Hall nuptuals.');
addPin(37.8014,-122.411,'What\'s Up Doc?','St. Peter & Paul\'s Church (666 Filbert Street, Washington Square)','Directed by Peter Bogdanovich<br />Featuring: Barbara Streisand,Ryan O\'Neal,<br />Fun Fact: Though Marilyn Monroe and Joe DiMaggio were not alllowed to be married at the Church (DiMaggio had married his first wife at the Church but was divorced), the couple returned to the steps of the Church for photos, following their City Hall nuptuals.');
addPin(37.8014,-122.411,'The Other Sister','St. Peter & Paul\'s Church (666 Filbert Street, Washington Square)','Directed by Garry Marshall<br />Featuring: Juliette Lewis,Diane Keaton,Giovanni Ribisi<br />Fun Fact: Though Marilyn Monroe and Joe DiMaggio were not alllowed to be married at the Church (DiMaggio had married his first wife at the Church but was divorced), the couple returned to the steps of the Church for photos, following their City Hall nuptuals.');
addPin(37.8014,-122.411,'The Ten Commandments','St. Peter & Paul\'s Church (666 Filbert Street, Washington Square)','Directed by Cecil B. DeMille<br />Featuring: Charlton Heston,Yul Brynner,Anne Baxter<br />Fun Fact: Exteriors of the church were used. ');
addPin(37.8014,-122.411,'The Bachelor','St. Peter & Paul\'s Church (666 Filbert Street, Washington Square)','Directed by Gary Sinyor<br />Featuring: Chris O\'Donnell,Renee Zellweger,Artie Lang<br />Fun Fact: Though Marilyn Monroe and Joe DiMaggio were not alllowed to be married at the Church (DiMaggio had married his first wife at the Church but was divorced), the couple returned to the steps of the Church for photos, following their City Hall nuptuals.');
addPin(37.7822,-122.411,'Nine Months','Star\'s Café (55 Golden Gate Avenue at Van Ness)','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold');
addPin(37.77,-122.466,'Freebie and the Bean','Steinhart Aquarium (California Academy of Sciences, Golden Gate Park)','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,<br />Fun Fact: The Steinhart Aquarium is home to over 38,000 animals, which represent more than 900 species. ');
addPin(37.77,-122.466,'Basic Instinct','Steinhart Aquarium (California Academy of Sciences, Golden Gate Park)','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza<br />Fun Fact: The Steinhart Aquarium is home to over 38,000 animals, which represent more than 900 species. ');
addPin(37.7694,-122.486,'The Bachelor','Steinhart Aquarium (California Academy of Sciences, Golden Gate Park)','Directed by Gary Sinyor<br />Featuring: Chris O\'Donnell,Renee Zellweger,Artie Lang<br />Fun Fact: The Steinhart Aquarium is home to over 38,000 animals, which represent more than 900 species. ');
addPin(37.77,-122.466,'The Lady from Shanghai','Steinhart Aquarium (California Academy of Sciences, Golden Gate Park)','Directed by Orson Welles<br />Featuring: Rita Hayworth,Orson Welles,<br />Fun Fact: The Steinhart Aquarium is home to over 38,000 animals, which represent more than 900 species. ');
addPin(37.77,-122.466,'The Lineup','Steinhart Aquarium (California Academy of Sciences, Golden Gate Park)','Directed by Don Siegel<br />Featuring: Eli Wallach,,<br />Fun Fact: The Steinhart Aquarium is home to over 38,000 animals, which represent more than 900 species. ');
addPin(37.7863,-122.433,'Freebie and the Bean','Stockton Tunnel (Stockton Street at Sutter Street)','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,<br />Fun Fact: Opened in 1914, the Stockton Tunnel was built to provide North Beach residents access to the thriving downtown area.');
addPin(37.7863,-122.433,'Heart and Souls','Stockton Tunnel (Stockton Street at Sutter Street)','Directed by Tomas Gislason<br />Featuring: Jorgen Leth,,<br />Fun Fact: Opened in 1914, the Stockton Tunnel was built to provide North Beach residents access to the thriving downtown area.');
addPin(37.9577,-121.291,'The Game','Stockton Tunnel Southern Approach Overhang (Bush & Stockton Streets, Chinatown)','Directed by David Fincher<br />Featuring: Michael Douglas,Sean Penn,<br />Fun Fact: Opened in 1914, the Stockton Tunnel was built to provide North Beach residents access to the thriving downtown area.');
addPin(37.7625,-122.507,'Play it Again, Sam','Surf Theater (4520 Irving Street)','Directed by Herbert Ross<br />Featuring: Woody Allen,Diane Keaton,');
addPin(37.7799,-122.514,'Harold and Maude','Sutro Baths (Point Lobos Avenue)','Directed by Hal Ashby<br />Featuring: Ruth Gordon,Bud Cort,');
addPin(37.7799,-122.514,'The Lineup','Sutro Baths (Point Lobos Avenue)','Directed by Don Siegel<br />Featuring: Eli Wallach');
addPin(37.7749,-122.419,'Guess Who\'s Coming to Dinner','Sutter Street between Powell and Mason','Directed by Stanley Kramer<br />Featuring: Spencer Tracy,Sidney Poitier,Katherine Hepburn');
addPin(37.7898,-122.406,'The Bachelor','Sutter-Stockton Garage (330 Sutter Street at Stockton)','Directed by Gary Sinyor<br />Featuring: Chris O\'Donnell,Renee Zellweger,Artie Lang<br />Fun Fact: Garage roof serves as a heliport in the movie');
addPin(37.7903,-122.446,'So I Married an Axe Murderer','Swedenborgian Church (2107 Lyon Street)','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,');
addPin(37.8082,-122.416,'A View to a Kill','Taylor and Jefferson Streets (Fisherman\'s Wharf)','Directed by John Glen<br />Featuring: Roger Moore,Christopher Walken,');
addPin(37.8013,-122.406,'Innerspace','Telegraph Hill','Directed by Joe Dante<br />Featuring: Dennis Quaid,Martin Short,Meg Ryan<br />Fun Fact: Largely untouched by the 1906 earthquake, Telegraph Hill has the most pre-1870 buildings in the city.');
addPin(37.8013,-122.406,'Hulk','Telegraph Hill','Directed by Ang Lee<br />Featuring: Eric Bana,Jennifer Connelly,Sam Elliot<br />Fun Fact: Largely untouched by the 1906 earthquake, Telegraph Hill has the most pre-1870 buildings in the city.');
addPin(37.8013,-122.406,'The House on Telegraph Hill','Telegraph Hill','Directed by Robert Wise<br />Featuring: Richard Basehart,,<br />Fun Fact: Largely untouched by the 1906 earthquake, Telegraph Hill has the most pre-1870 buildings in the city.');
addPin(37.8028,-122.406,'Doctor Doolittle','Telegraph Hill Blvd (Telegraph Hill)','Directed by Betty Thomas<br />Featuring: Eddie Murphy,Ossie Davis,Oliver Platt');
addPin(37.763,-122.424,'Mission (aka City of Bars)','The 500 Club (500 Guerrero Street, Mission District)','Directed by Loren Marsh<br />Featuring: Chris Coburn');
addPin(37.7901,-122.391,'San Francisco','The Barbary Coast','Directed by W.S. Van Dyke<br />Featuring: Clark Gable,Jeanette MacDonald,Spencer Tracy<br />Fun Fact: The Barbary Coast was a red-light district that was largely destroyed in the 1906 earthquake. Though some of the establishments were rebuilt after the earthquake, an anti-vice campaign put the establisments out of business.');
addPin(37.7901,-122.391,'Gentleman Jim','The Barbary Coast','Directed by Raoul Walsh<br />Featuring: Errol Flynn,,<br />Fun Fact: The Barbary Coast was a red-light district that was largely destroyed in the 1906 earthquake. Though some of the establishments were rebuilt after the earthquake, an anti-vice campaign put the establisments out of business.');
addPin(37.7836,-122.414,'The Dead Pool','The Cannery (281 Leavenworth Street, Fisherman\'s Wharf)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,');
addPin(37.7609,-122.435,'The Times of Harvey Milk','The Castro','Directed by Rob Epstein<br />Featuring: Harvey Milk,Harvey Firestein,<br />Fun Fact: From 1910-1920 the Castro was called "Little Scandinavia" because of its high concentration of residents of Scandinavian ancestry.');
addPin(37.7609,-122.435,'Common Threads: Stories From the Quilt','The Castro','Directed by Rob Epstein<br />Featuring: Sara Lewinstein,David Mandell,Suzi Mandell<br />Fun Fact: From 1910-1920 the Castro was called "Little Scandinavia" because of its high concentration of residents of Scandinavian ancestry.');
addPin(37.7609,-122.435,'Sausalito','The Castro','Directed by Andrew Lau<br />Featuring: Maggie Cheung,Leon Lai,<br />Fun Fact: From 1910-1920 the Castro was called "Little Scandinavia" because of its high concentration of residents of Scandinavian ancestry.');
addPin(37.7977,-122.394,'Sneakers','The Embarcadero','Directed by Phil Alden Robinson<br />Featuring: Sydney Poitier,Robert Redford,River Phoenix');
addPin(37.7977,-122.394,'Dirty Harry','The Embarcadero','Directed by Don Siegel<br />Featuring: Clint Eastwood');
addPin(37.7977,-122.394,'The Lineup','The Embarcadero','Directed by Don Siegel<br />Featuring: Eli Wallach');
addPin(37.7977,-122.394,'The Caine Mutiny','The Embarcadero','Directed by Edward Dmytryk<br />Featuring: Humphrey Bogart,Fred MacMurray,');
addPin(37.7951,-122.394,'D.O.A','The Embarcadero/ Ferry Building','Directed by Rudolph Mate<br />Featuring: Edmond O\'Brien,Pamela Britton,Luther Adler<br />Fun Fact: Every hour and half-hour, the clock bell atop the Ferry Building chimes portions of the Westminster Quarters.');
addPin(37.7951,-122.394,'Sudden Impact','The Embarcadero/Ferry Building','Directed by Clint Eastwood<br />Featuring: Clint Eastwood,Sondra Locke,<br />Fun Fact: Every hour and half-hour, the clock bell atop the Ferry Building chimes portions of the Westminster Quarters.');
addPin(37.7959,-122.392,'I Remember Mama','The Ferry Building','Directed by George Stevens<br />Featuring: Irene Dunne,Barbara Bel Geddes,<br />Fun Fact: Every hour and half-hour, the clock bell atop the Ferry Building chimes portions of the Westminster Quarters.');
addPin(37.7986,-122.446,'Hereafter','The Final Final (2990 Baker Street)','Directed by Clint Eastwood<br />Featuring: Matt Damon,Cecile De France,Bryce Dallas Howard');
addPin(37.7749,-122.419,'By Hook or By Crook','The Lexington Club (3464 19th Street at Lexington)','Directed by Harriet Dodge & Silas Howard<br />Featuring: Silas Howard');
addPin(37.8018,-122.404,'Dark Passage','The Malloch Apartment Building (1360 Montgomery Street)','Directed by Delmer Daves<br />Featuring: Humphrey Bogart,Lauren Bacal,');
addPin(37.8018,-122.404,'Nine Months','The Malloch Apartment Building (1360 Montgomery Street)','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold');
addPin(37.7558,-122.421,'Love & Taxes','The Marsh Theatre (1062 Valencia Street)','Directed by Jacob Kornbluth<br />Featuring: Jacob Kornbluth');
addPin(37.7666,-122.484,'Play it Again, Sam','The Music Concourse (Martin Luther King, Jr. Drive, Golden Gate Park)','Directed by Herbert Ross<br />Featuring: Woody Allen,Diane Keaton,<br />Fun Fact: The theater closed in 1985.');
addPin(37.7694,-122.486,'The Wedding Planner','The Music Concourse (Martin Luther King, Jr. Drive, Golden Gate Park)','Directed by Adam Shankman<br />Featuring: Jennifer Lopez,Matthew McConaughey,<br />Fun Fact: Golden Gate Park is similar in shape but 20% larger than New York\'s Central Park.');
addPin(37.7986,-122.407,'Twisted','The Saloon (1232 Grant Avenue)','Directed by Philip Kaufman<br />Featuring: Ashley Judd,Samuel L. Jackson,Andy Garcia');
addPin(37.691,-122.311,'The Rock','The San Francisco Bay','Directed by Michael Bay<br />Featuring: Sean Connery,Nicholas Cage,Ed Harris');
addPin(37.808,-122.418,'Experiment in Terror','The Sea Captain\'s Chest (Fisherman\'s Wharf)','Directed by Blake Edwards<br />Featuring: Glenn Ford,Lee Remick,');
addPin(37.7749,-122.419,'George of the Jungle','The Tamalpias Building (1201 Greenwich Street at Hyde)','Directed by Sam Weisman<br />Featuring: Brendan Fraser,Leslie Mann,Thomas Haden Church');
addPin(37.801,-122.42,'Sudden Fear','The Tamalpias Building (1201 Greenwich Street at Hyde)','Directed by David Miller<br />Featuring: Joan Crawford,Jack Palance,');
addPin(37.7682,-122.442,'Forty Days and Forty Nights','The Walden House, Buena Vista Park','Directed by Michael Lehmann<br />Featuring: Josh Hartnett,Shaynnyn Sossamon,<br />Fun Fact: Established in 1867, Buena Vista Park is the oldest official park in San Francisco.');
addPin(37.7975,-122.406,'Basic Instinct','Tosca Café (242 Columbus Avenue)','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza');
addPin(37.7975,-122.406,'Big Sur','Tosca Café (242 Columbus Avenue, North Beach)','Directed by Micael Polish<br />Featuring: Josh Lucas,Kate Bosworth,Stana Katic');
addPin(37.7975,-122.406,'The Assassination of Richard Nixon','Tosca Café (242 Columbus Avenue, North Beach)','Directed by Niels Mueller<br />Featuring: Sean Penn,Naomi Watts,Don Cheadle');
addPin(37.7975,-122.406,'Until the End of the World','Tosca Café (242 Columbus Avenue, North Beach)','Directed by Wim Wenders<br />Featuring: Solveig Dommartin');
addPin(37.7749,-122.419,'Invasion of the Body Snatchers','Transamerica Building (600 Montgomery Street at Clay)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,<br />Fun Fact: The Pyramid was the tallest skyscraper west of the Mississippi from 1972-1974, until it was surpassed by Los Angeles\' Aon Center. ');
addPin(37.7749,-122.419,'Freebie and the Bean','TransAmerica Pyramid (600 Montgomery Street)','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,<br />Fun Fact: The Pyramid was the tallest skyscraper west of the Mississippi from 1972-1974, until it was surpassed by Los Angeles\' Aon Center. ');
addPin(37.8127,-122.363,'Getting Even with Dad','Transbay Terminal (Mission Street at 1st Street)','Directed by Howard Deutch<br />Featuring: Macaulay Culkin,Ted Danson,<br />Fun Fact: Built in 1939, the Terminal linked San Francisco, the East Bay, and Sacramento by rail for the first time.');
addPin(37.8127,-122.363,'Basic Instinct','Transbay Terminal (Mission Street at 1st Street)','Directed by Paul Verhoeven<br />Featuring: Michael Douglas,Sharon Stone,George Dzundza<br />Fun Fact: Built in 1939, the Terminal linked San Francisco, the East Bay, and Sacramento by rail for the first time.');
addPin(37.8127,-122.363,'Chu Chu and the Philly Flash','Transbay Terminal (Mission Street at 1st Street)','Directed by David Lowell Rich<br />Featuring: Alan Arkin,Carol Burnett,Danny Aiello<br />Fun Fact: Built in 1939, the Terminal linked San Francisco, the East Bay, and Sacramento by rail for the first time.');
addPin(37.8127,-122.363,'The Other Sister','Transbay Terminal (Mission Street at 1st Street)','Directed by Garry Marshall<br />Featuring: Juliette Lewis,Diane Keaton,Giovanni Ribisi<br />Fun Fact: Built in 1939, the Terminal linked San Francisco, the East Bay, and Sacramento by rail for the first time.');
addPin(37.8235,-122.371,'What Dreams May Come','Treasure Island','Directed by Vincent Ward<br />Featuring: Robin Williams,Cuba Gooding, Jr.,<br />Fun Fact: An artificial island, Treasure Island was created for the 1939 Golden Gate International Exposition, and is named after the novel by Robert Louis Stevenson, a one-time San Francisco resident.');
addPin(37.8235,-122.371,'Copycat','Treasure Island','Directed by Jon Amiel<br />Featuring: Sigourney Weaver,Holly Hunter,Dermot Mulroney<br />Fun Fact: An artificial island, Treasure Island was created for the 1939 Golden Gate International Exposition, and is named after the novel by Robert Louis Stevenson, a one-time San Francisco resident.');
addPin(37.8235,-122.371,'Bicentennial Man','Treasure Island','Directed by Chris Columbus<br />Featuring: Robin Williams,,<br />Fun Fact: An artificial island, Treasure Island was created for the 1939 Golden Gate International Exposition, and is named after the novel by Robert Louis Stevenson, a one-time San Francisco resident.');
addPin(37.8235,-122.371,'Flubber','Treasure Island','Directed by Les Mayfield<br />Featuring: Robin Williams,Marcia Gay Harden,<br />Fun Fact: An artificial island, Treasure Island was created for the 1939 Golden Gate International Exposition, and is named after the novel by Robert Louis Stevenson, a one-time San Francisco resident.');
addPin(37.8235,-122.371,'Hulk','Treasure Island','Directed by Ang Lee<br />Featuring: Eric Bana,Jennifer Connelly,Sam Elliot<br />Fun Fact: An artificial island, Treasure Island was created for the 1939 Golden Gate International Exposition, and is named after the novel by Robert Louis Stevenson, a one-time San Francisco resident.');
addPin(37.8235,-122.371,'Milk','Treasure Island','Directed by Gus Van Sant<br />Featuring: Sean Penn,Emile Hirsch,Josh Brolin<br />Fun Fact: An artificial island, Treasure Island was created for the 1939 Golden Gate International Exposition, and is named after the novel by Robert Louis Stevenson, a one-time San Francisco resident.');
addPin(37.8235,-122.371,'Phenomenon','Treasure Island','Directed by Jon Turteltaub<br />Featuring: John Travolta,Kyra Sedgwick,Forest Whitaker<br />Fun Fact: An artificial island, Treasure Island was created for the 1939 Golden Gate International Exposition, and is named after the novel by Robert Louis Stevenson, a one-time San Francisco resident.');
addPin(37.8235,-122.371,'Rent','Treasure Island','Directed by Chris Columbus<br />Featuring: Anthony Rapp,Rosario Dawson,<br />Fun Fact: An artificial island, Treasure Island was created for the 1939 Golden Gate International Exposition, and is named after the novel by Robert Louis Stevenson, a one-time San Francisco resident.');
addPin(37.8235,-122.371,'Patch Adams','Treasure Island','Directed by Tom Shadyac<br />Featuring: Robin Williams,Philip Seymour Hoffman,<br />Fun Fact: An artificial island, Treasure Island was created for the 1939 Golden Gate International Exposition, and is named after the novel by Robert Louis Stevenson, a one-time San Francisco resident.');
addPin(37.7903,-122.405,'My Reality','Triton Hotel (342 Grant Street)','Directed by Marcia Kimpton<br />Featuring: Marcia Kimpton');
addPin(37.7544,-122.448,'Freebie and the Bean','Twin Peaks','Directed by Richard Rush<br />Featuring: Alan Arkin,James Caan,');
addPin(37.7544,-122.448,'Copycat','Twin Peaks','Directed by Jon Amiel<br />Featuring: Sigourney Weaver,Holly Hunter,Dermot Mulroney');
addPin(37.7502,-122.386,'Vegas in Space','Under Highway 101 (near Potrero and Cesar Chavez Streets)','Directed by Phillip R. Ford<br />');
addPin(37.788,-122.407,'The Conversation','Union Square','Directed by Francis Ford Coppola<br />Featuring: Gene Hackman,,<br />Fun Fact: During the Civil War, pro-Union rallies were held in the Square, and thus the area was called "Union Square". ');
addPin(37.788,-122.407,'D.O.A','Union Square','Directed by Rudolph Mate<br />Featuring: Edmond O\'Brien,Pamela Britton,Luther Adler<br />Fun Fact: During the Civil War, pro-Union rallies were held in the Square, and thus the area was called "Union Square". ');
addPin(37.788,-122.407,'High Crimes','Union Square','Directed by Mel Brooks<br />Featuring: Mel Brooks,Madeline Kahn,Cloris Leachman<br />Fun Fact: During the Civil War, pro-Union rallies were held in the Square, and thus the area was called "Union Square". ');
addPin(37.7803,-122.414,'Invasion of the Body Snatchers','United Nations Plaza (Civic Center)','Directed by Philip Kaufman<br />Featuring: Donald Sutherland,Jeff Goldblum,<br />Fun Fact: United Nations Plaza was built in 1975 and across its walkways are white lines into which the preamble to the preamble of the UN charter is carved.');
addPin(37.7803,-122.414,'Junior','United Nations Plaza (Civic Center)','Directed by Ivan Reitman<br />Featuring: Arnold Schwarzenegger,Danny DeVito,Emma Thompson<br />Fun Fact: United Nations Plaza was built in 1975 and across its walkways are white lines into which the preamble to the preamble of the UN charter is carved.');
addPin(37.7803,-122.414,'Time After Time','United Nations Plaza (Civic Center)','Directed by Nicholas Meyer<br />Featuring: Malcolm McDowell,Mary Steenburgen,<br />Fun Fact: United Nations Plaza was built in 1975 and across its walkways are white lines into which the preamble to the preamble of the UN charter is carved.');
addPin(37.7809,-122.416,'Golden Gate','University of California Hastings College of the Law','Directed by Howard Deutch<br />Featuring: Macaulay Culkin,Ted Danson,');
addPin(37.7944,-122.393,'Bedazzled','Vaillancourt Fountain (Justin Herman Plaza)','Directed by Harold Ramis<br />Featuring: Brendan Fraser,Elizabeth Hurley,');
addPin(37.7994,-122.402,'Hulk','Vallejo Street at Sansome','Directed by Ang Lee<br />Featuring: Eric Bana,Jennifer Connelly,Sam Elliot');
addPin(37.7917,-122.423,'A View to a Kill','Van Ness Avenue','Directed by John Glen<br />Featuring: Roger Moore,Christopher Walken,');
addPin(37.7749,-122.419,'Fearless','Varennes Alley between Filbert and Union','Directed by Peter Weir<br />Featuring: Jeff Bridges,Isabella Rosellini,Rosie Perez');
addPin(37.7596,-122.404,'Magnum Force','Vermont Street between 20th and 22nd Streets','Directed by Ted Post<br />Featuring: Clint Eastwood');
addPin(37.7976,-122.406,'High Crimes','Vesuvio Café (255 Columbus Avenue)','Directed by Mel Brooks<br />Featuring: Mel Brooks,Madeline Kahn,Cloris Leachman<br />Fun Fact: Jack Kerouac was a regular at the café.');
addPin(37.7976,-122.406,'So I Married an Axe Murderer','Vesuvio Café (255 Columbus Avenue)','Directed by Thomas Schlamme<br />Featuring: Mike Myers,Nancy Travis,<br />Fun Fact: Jack Kerouac was a regular at the café.');
addPin(37.7976,-122.406,'Twisted','Vesuvio Café (255 Columbus Avenue)','Directed by Philip Kaufman<br />Featuring: Ashley Judd,Samuel L. Jackson,Andy Garcia<br />Fun Fact: Jack Kerouac was a regular at the café.');
addPin(37.7796,-122.421,'Twisted','Veterans\' War Memorial Building (401 Van Ness Avenue)','Directed by Philip Kaufman<br />Featuring: Ashley Judd,Samuel L. Jackson,Andy Garcia');
addPin(37.7878,-122.409,'When a Man Loves a Woman','Victor\'s Restaurant, The Westin St. Francis Hotel (335 Powell Street)','Directed by Luis Mandoki<br />Featuring: Andy Garcia,Meg Ryan,Ellyn Burstyn<br />Fun Fact: The hotel was originally supposed to be named the Crocker Hotel, after Charles Founder the railroad magnate who founded it. However, the hotel took the name the St. Francis after one of the earliest Gold Rush hotels. ');
addPin(37.7796,-122.421,'Getting Even with Dad','War Memorial Building (401 Van Ness Avenue)','Directed by Howard Deutch<br />Featuring: Macaulay Culkin,Ted Danson,');
addPin(37.7796,-122.421,'Foul Play','War Memorial Opera House (401 Van Ness Avenue)','Directed by Colin Higgins<br />Featuring: Goldie Hawn,Chevy Chase,<br />Fun Fact: In 1945 the United Nations had its first conference at The War Memorial Opera House.');
addPin(37.7796,-122.421,'Heart and Souls','War Memorial Opera House (401 Van Ness Avenue)','Directed by Tomas Gislason<br />Featuring: Jorgen Leth,,<br />Fun Fact: In 1945 the United Nations had its first conference at The War Memorial Opera House.');
addPin(37.7796,-122.421,'Jade','War Memorial Opera House (401 Van Ness Avenue)','Directed by William Friedkin<br />Featuring: David Caruso,Linda Fiorentino,Chazz Palminteri<br />Fun Fact: In 1945 the United Nations had its first conference at The War Memorial Opera House.');
addPin(37.7796,-122.421,'The Lineup','War Memorial Opera House (401 Van Ness Avenue)','Directed by Don Siegel<br />Featuring: Eli Wallach,,<br />Fun Fact: In 1945 the United Nations had its first conference at The War Memorial Opera House.');
addPin(37.8009,-122.41,'Jade','Washington Square (North Beach)','Directed by William Friedkin<br />Featuring: David Caruso,Linda Fiorentino,Chazz Palminteri<br />Fun Fact: Washington Square Park is not actually a square, as it has 5 sides. North Beach is not a beach.');
addPin(37.8004,-122.411,'Heart Beat','Washington Square Bar & Grill (1707 Powell)','Directed by John Byrum<br />Featuring: Nick Nolte,Sissy Spacek,John Heard');
addPin(37.7749,-122.419,'Bedazzled','Washington Square Park (Filbert, between Stockton and Powell)','Directed by Harold Ramis<br />Featuring: Brendan Fraser,Elizabeth Hurley,');
addPin(37.8008,-122.41,'The Dead Pool','Washington Square Park (North Beach)','Directed by Buddy Van Horn<br />Featuring: Clint Eastwood,Liam Neeson,<br />Fun Fact: Washington Square Park is not actually a square, as it has 5 sides. North Beach is not a beach. The statue in the Park is Ben Franklin, not George Washington.');
addPin(37.8008,-122.41,'The Bachelor','Washington Square Park (North Beach)','Directed by Gary Sinyor<br />Featuring: Chris O\'Donnell,Renee Zellweger,Artie Lang<br />Fun Fact: Washington Square Park is not actually a square, as it has 5 sides. North Beach is not a beach. The statue in the Park is Ben Franklin, not George Washington.');
addPin(37.8009,-122.41,'Dirty Harry','Washington Square, North Beach','Directed by Don Siegel<br />Featuring: Clint Eastwood');
addPin(37.77,-122.449,'Nine Months','Wasteland Store (1600 Haight Street)','Directed by Chris Columbus<br />Featuring: Hugh Grant,Julianne Moore,Tom Arnold');
addPin(37.7839,-122.432,'Doctor Doolittle','Webster Street','Directed by Betty Thomas<br />Featuring: Eddie Murphy,Ossie Davis,Oliver Platt');
addPin(37.7932,-122.397,'Experiment in Terror','Wells Fargo Bank (1 California Street, Financial District)','Directed by Blake Edwards<br />Featuring: Glenn Ford,Lee Remick,');
addPin(37.8076,-122.47,'Dr. Doolittle 2','West Chrissy Field (Presidio, Golden Gate National Recreation Area)','Directed by Steve Carr<br />Featuring: Eddie Murphy,Kristen Wilson,Raven-Symone<br />Fun Fact: This movie was the first to film in the revamped Chrissy Field Picnic Area.');
addPin(36.7553,-121.765,'Star Trek IV: The Voyage Home','West Harbor, Marina District','Directed by Leonard Nimoy<br />Featuring: William Shatner,Leonard Nimoy,');
addPin(37.7878,-122.409,'D.O.A','Westin St. Francis Hotel (335 Powell Street)','Directed by Rudolph Mate<br />Featuring: Edmond O\'Brien,Pamela Britton,Luther Adler<br />Fun Fact: The hotel was originally supposed to be named the Crocker Hotel, after Charles Founder the railroad magnate who founded it. However, the hotel took the name the St. Francis after one of the earliest Gold Rush hotels. ');
addPin(37.7878,-122.409,'Final Analysis','Westin St. Francis Hotel (335 Powell Street, Union Square)','Directed by Phil Joanou<br />Featuring: Richard Gere,Kim Basinger,Uma Thurman<br />Fun Fact: The hotel was originally supposed to be named the Crocker Hotel, after Charles Founder the railroad magnate who founded it. However, the hotel took the name the St. Francis after one of the earliest Gold Rush hotels. ');
addPin(37.7878,-122.409,'The Conversation','Westin St. Francis Hotel (335 Powell Street, Union Square)','Directed by Francis Ford Coppola<br />Featuring: Gene Hackman,,<br />Fun Fact: The hotel was originally supposed to be named the Crocker Hotel, after Charles Founder the railroad magnate who founded it. However, the hotel took the name the St. Francis after one of the earliest Gold Rush hotels. ');
addPin(37.7878,-122.409,'The Candidate','Westin St. Francis Hotel (335 Powell Street, Union Square)','Directed by Michael Ritchie<br />Featuring: Robert Redford,Peter Boyle,<br />Fun Fact: The hotel was originally supposed to be named the Crocker Hotel, after Charles Founder the railroad magnate who founded it. However, the hotel took the name the St. Francis after one of the earliest Gold Rush hotels. ');

}

function typing(fld) {
}

function entering(fld) {

}

function leaving(fld) {

}

function validateLoginForm()
    {
        
		if ($("#username").val().length < 3) { 
			alert('Please enter your MapHook username');
			return false;
		}
		
		if ($("#password").val().length < 3) { 
			alert('Please enter your MapHook username');
			return false;
		}
		
     
		document.getElementById('signIn').disabled = true;
		
		document.getElementById("login_div").style.display = "block";
		document.getElementById("login_div").innerHTML = "Loading..<img src='../images/bigLoader.gif' height='27'>";        	
         
        if($('FrmLogin').serialize(true)){
          
		    // submit via Ajax
            new Ajax.Request('/site/mhweb/api/exec_js_login.jsp?set=1', {
                method: 'post',
                parameters: $('FrmLogin').serialize(true)
            });
        }else{
             
			// submit via Ajax
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
           
            new Ajax.Request('/site/mhweb/api/exec_js_login.jsp?set=1', {
                method: 'post',
                parameters: "username="+username+"&password="+password
            });
        }
    }
	
	function loginSuccess(url)
    {
        self.location = url;
    }
