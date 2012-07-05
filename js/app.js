(function($){
	var _projects;
	
	var prepareMainPanel = function() {
		if (!_projects) return;
		
		var mainPanel = $("#main-panel");
		var imagePanel = $("#image-panel");
		
		// set size of main panel
		mainPanel.width(_projects.props.width);
		mainPanel.height(_projects.props.height);
		
		// set size of image panel
		imagePanel.width(_projects.props.width*_projects.projects.length);
		imagePanel.height(_projects.props.height);
		
		// setup panels and image panel
		$.each(_projects.projects,function(index){
			mainPanel.append("<div class='panel' data-scroll='"+ -index +"' data-link='"+ this.link +"' ></div>");
			imagePanel.append("<div class='image'><img src='"+ this.image +"' width='"+ _projects.props.width +"' height='"+ _projects.props.height +"' alt='"+ this.name +"' /><div class='label'><span class='title'>"+ this.name +"</span>"+ this.desc +"</div></div>");
		});
		
		// set size of panels
		$(".panel").width(_projects.props.width/_projects.projects.length);
		$(".panel").height(_projects.props.height);
		
		// add event listeners to panels
		$(".panel").hover(function(){
			imagePanel.css("left",_projects.props.width*$(this).data("scroll")+"px");
		}).click(function(){
			window.location.href = $(this).data("link");
		});
		
	};
	
	$.getJSON("projects.json", function(data){
		_projects = data;
		prepareMainPanel();
	});
	
	
	
})(jQuery);