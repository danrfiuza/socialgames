window.onload = function () {

//Better to construct options first and then pass it as a parameter
	var options = {
		title: {
			text: "Column Chart using jQuery Plugin"
		},
                animationEnabled: true,
		data: [
		{
			type: "column", //change it to line, area, bar, pie, etc
			dataPoints: [
				{ x: 10, y: 10 },
				{ x: 20, y: 11 },
				{ x: 30, y: 14 },
				{ x: 40, y: 16 },
				{ x: 50, y: 19 },
				{ x: 60, y: 15 },
				{ x: 70, y: 12 },
				{ x: 80, y: 10 }
			]
		}
		]
	};

	$("#chartContainer").CanvasJSChart(options);

}
