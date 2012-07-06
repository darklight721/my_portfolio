(function($){
	var _portfolio;
	
	var prepareGUI = function() {
		if (!_portfolio) return;
		
		var mainPanel = $("#main-panel");
		var imagePanel = $("#image-panel");
		
		// set size of main panel
		mainPanel.width(_portfolio.props.width);
		mainPanel.height(_portfolio.props.height);

		// resize container
		$("#container").width(mainPanel.outerWidth());
		
		// set size of image panel
		imagePanel.width(_portfolio.props.width*_portfolio.projects.length);
		imagePanel.height(_portfolio.props.height);
		
		// setup panels and image panel
		$.each(_portfolio.projects,function(index){
			mainPanel.append("<div class='panel' data-scroll='"+ -index +"' data-link='"+ this.link +"' ></div>");
			imagePanel.append("<div class='image'><img src='"+ this.image +"' width='"+ _portfolio.props.width +"' height='"+ _portfolio.props.height +"' alt='"+ this.name +"' /><div class='label'><span class='title'>"+ this.name +"</span>"+ this.desc +"</div></div>");
		});
		
		// set size of panels
		$(".panel").width(_portfolio.props.width/_portfolio.projects.length);
		$(".panel").height(_portfolio.props.height);
		
		// add event listeners to panels
		$(".panel").hover(function(){
			imagePanel.css("left",_portfolio.props.width*$(this).data("scroll")+"px");
		}).click(function(){
			window.location.href = $(this).data("link");
		});
		
		$(".tab").click(function(){
			if ($(this).hasClass("selected")) return;
			
			$(".tab").toggleClass("selected");
			
			var tab = $(this).text();
			if (tab === "Bio")
			{
				imagePanel.css("left",-_portfolio.props.width*_portfolio.projects.length+"px");
			}
			else if (tab === "Portfolio")
			{
				imagePanel.css("left","0px");
			}
			$(".panel").toggle(500);
		});
	};
	
	$.getJSON("projects.json", function(data){
		_portfolio = data;
		prepareGUI();
	});
	
})(jQuery);