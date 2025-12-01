
function initLeaflet() {
	var address = $('#map-address').attr('data-map-address');
	var map_pin_color = $('#map-pin-color').attr('data-map-pin-color');
	var url = $('#map-layout-url').attr('data-map-layout-url');
	var attribution = $('#map-layout-attribution').attr('data-map-layout-attribution');
	var pinpath = '/static_assets/wabs_map/Icons/streamline-icon-style-two-pin-marker@64x64.svg';

 	var geocode = 'https://nominatim.openstreetmap.org/search?format=json&q='+address;
	$.getJSON(geocode, function(data) {
		// get lat + lon from first match
		var latlng = [data[0].lat, data[0].lon]
		var map = L.map('map').setView(latlng, 12);// 5);

		url = url.replace(/\(/g, "{").replace(/\)/g, "}"); // replace () -> {} as fluid template doesn't allow {} without variable
		L.tileLayer(url, {
			attribution: attribution
		}).addTo(map);

		// load svg data,
		var svg_data = '';
		$.get(pinpath, undefined, function(data) {
			svg_data = data.replace(/[\r\n]/g, '').replace(/^<svg/, '<svg class="osm-pin-icon"');
			if (map_pin_color) {
				svg_data = svg_data.replace(/"fill:[ ][a-zA-Z#0-9]*/, '"fill: ' + map_pin_color);
			}
		}, "html").done(function() {
			if (svg_data) {
				var img = new Image();
				img.src = pinpath;
				img.onload = function() {
					// SVG DivIcon mit css
					var icon = new L.DivIcon({
						className: 'osm-pin-div',
						html: ''+svg_data+''
						// html: '<svg class="osm-pin-test" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="matrix(2.6666666666666665,0,0,2.6666666666666665,0,0)"><path d="M12,0A9.51,9.51,0,0,0,2.5,9.5C2.5,16.05,9,22,11,23.65a1.49,1.49,0,0,0,1.92,0C15,22,21.5,16.05,21.5,9.5A9.51,9.51,0,0,0,12,0Zm0,14.5a5,5,0,1,1,5-5A5,5,0,0,1,12,14.5Z" style="fill: #000000"></path></g></svg>'
						// html: '<img class="osm-pin-icon" src="'+pinpath+'"/>'
					})
					L.marker(latlng, {icon: icon}).addTo(map);
				}
			} else {
				L.marker(latlng).addTo(map); // use default icon
			}
		}).fail(function(jqXHR, textStatus) {
		});
	}).fail(function(jqXHR, textStatus) {
	});
}
