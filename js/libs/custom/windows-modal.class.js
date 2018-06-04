class WindowsModal{

	constructor(container, selectors, icon, title, buttons, w, h, x, y, visible){
		var self = this;
		/*
		< --- Overlay - Properties and Methods --- >
		*/
		this.Overlay = {
			selector: ".overlay",
			backgroundColor: function(c){
				$(self.Overlay.selector).css({"background-color":c});
			},
			show: function(effect, duration, action){
				if(!effect){
					effect = "fade";
				}
				if(!duration){
					duration = 0;
				}
				if(action){
					$(self.Overlay.selector).hide(effect, {percent: 100}, duration);
				}else{
					if($(self.Overlay.selector).css("display") == "none"){
						$(self.Overlay.selector).show(effect, {percent: 100}, duration);
					}else{
						$(self.Overlay.selector).hide(effect, {percent: 100}, duration);
					}
				}
			}
		}
		/*
		< --- Window - Properties and Methods --- >
		*/
		this.Window = {
			selector: ".window",
			Overlay: function(s, c, v){
				self.NewOverlay(s, c, v);
			},
			window: {
				alpha: function(a){
					$(self.Window.selector).css({"opacity":a});
				},
				backgroundColor: function(color){
					$(self.Window.selector).css({"background-color":color});
				}
			},
			container: {
				alpha: function(a){
					$(self.Window.selector+" .container").css({"opacity":a});
				},
				backgroundColor: function(color){
					$(self.Window.selector+" .container").css({"background-color":color});
				},
				css: function(f){
					$(self.Window.selector+" .container").css(f);
				},
				text: {
					add: function(text, pos){
						if(pos == "first"){
							$(self.Window.selector+" .container").prepend(text);
						}
						if(pos == "last"){
							$(self.Window.selector+" .container").append(text);
						}
						if(!pos){
							$(self.Window.selector+" .container").html(text);
						}
					},
					font: function(f, s){
						$(self.Window.selector+" .container "+s).css(f);
					}
				},
				load: function(path){
					$(self.Window.selector+" .container").load(path, function(){return true;});
				}
			},
			size: {
				width: 0,
				height: 0,
				setTo: function(w, h){
					if(!w){
						w = self.Window.size.width;
					}
					if(!h){
						h = self.Window.size.height;
					}
					self.Window.size.width = w;
					self.Window.size.height = h;
					$(self.Window.selector).css({"min-width":w+"px"});
					$(self.Window.selector+" .container").css({"min-width":w+"px", "min-height":h+"px"});
				}
			},
			position: {
				x: 0,
				y: 0,
				setTo: function(x, y){
					if(!x){
						x = self.Window.position.x;
					}
					if(!y){
						y = self.Window.position.y;
					}
					self.Window.position.x = x;
					self.Window.position.y = y;
					$(self.Window.selector).css({"top":y+"px", "left":x+"px"});
				},
				center: function(a){
					if(!a){
						a = $("body");
					}
					var left = (a.width()/2)-($(self.Window.selector).width()/2);
					var top = (a.height()/2)-($(self.Window.selector).height()/2);
					self.Window.position.setTo(left, top);
				}
			},
			show: function(effect, duration, overlay, action){
				if(!effect){
					effect = "fade";
				}
				if(!duration){
					duration = 0;
				}
				if(self.Window.Overlay.selector){
					if(!overlay){
						overlay = {close: false, show: false};
					}
					if(!overlay.effect){
						overlay.effect = "fade";
					}
					if(!overlay.duration){
						overlay.duration = 0;
					}
					if(overlay.close){
						$(self.Overlay.selector).hide(overlay.effect, {percent: 100}, overlay.duration);
					}
					if(overlay.show){
						$(self.Overlay.selector).show(overlay.effect, {percent: 100}, overlay.duration);
					}
				}
				if(!action){
					if($(self.Window.selector).css("display") == "none"){
						$(self.Window.selector).show(effect, {percent: 100}, duration);
					}else{
						$(self.Window.selector).hide(effect, {percent: 100}, duration);
					}
				}else{
					$(self.Window.selector).hide(effect, {percent: 100}, duration);
				}
			},
			title: {
				text: function(text){
					$(self.Window.selector+" .title .text").html(text);
				},
				icon: function(icon){
					$(self.Window.selector+" .title").css({"background-image":"url("+icon+")"});
				},
				font: function(f){
					$(self.Window.selector+" .title").css(f);
				},
				alpha: function(a){
					$(self.Window.selector+" .title").css({"opacity":a});
				},
				backgroundColor: function(color){
					$(self.Window.selector+" .title").css({"background-color":color});
				}
			},
			draggable: function(type){
				if(type){
					$(self.Window.selector+" .title").on("mouseenter", function(){
					$(self.Window.selector).draggable();
					$(self.Window.selector).draggable("enable");
					}).on("mouseleave", function(){
						$(self.Window.selector).draggable("disable");
					});
				}else{
					$(self.Window.selector+" .title").off("mouseenter");
					$(self.Window.selector+" .title").off("mouseleave");
				}
			},
			resizable: function(type){
				if(type){
					$(self.Window.selector+" .container").resizable();
					$(self.Window.selector+" .container").resizable("enable");
					$(".ui-resizable-handle.ui-resizable-se.ui-icon.ui-icon-gripsmall-diagonal-se").css({
						"top":$(self.Window.selector).height()-$(self.Window.selector+" .title").height()-16,
						"left":$(self.Window.selector).width()-16
					});
					$(self.Window.selector+" .container").on("resize", function(){
						$(".ui-resizable-handle.ui-resizable-se.ui-icon.ui-icon-gripsmall-diagonal-se").css({
							"top":$(self.Window.selector).height()-$(self.Window.selector+" .title").height()-16,
							"left":$(self.Window.selector).width()-16
						});
					});
				}else{
					$(self.Window.selector+" .container").resizable("disable");
					$(self.Window.selector+" .container").off("resize");
				}
			}
		};
		this.Window.selector = ".window";
		return this.NewWindow(container, selectors, icon, title, buttons, w, h, x, y, visible);
	}

	NewOverlay(selector, container, visible){
		if(!selector){
			selector = Math.floor((Math.random()+1) * 10);
		}
		if(!container){
			container = "body";
		}
		this.Overlay.selector += "."+selector;
		$(container).append("<div class='overlay "+selector+"'></div>");
		if(visible){
			$(this.Overlay.selector).show();
		}
		this.Window.Overlay = this.Overlay;
	}

	NewWindow(container, selectors, icon, title, buttons, w, h, x, y, visible){
		var self = this;
		if(!container){
			container = "body";
		}
		if(!selectors){
			selectors = {class: "", id: ""};
		}
		if(selectors.class){
			this.Window.selector += "."+selectors.class;
			selectors.class = " "+selectors.class;
		}
		if(selectors.id){
			this.Window.selector += "#"+selectors.id;
			selectors.id = "id='"+selectors.id+"'";
		}
		if(!icon){
			icon = "css/images/DefaultIcon.png";
		}
		if(!title){
			title = "New Window";
		}
		if(!buttons){
			buttons = {close: true};
		}
		$(container).append("<div class='window"+selectors.class+"' "+selectors.id+"></div>");
		$(this.Window.selector).append("<div class='title' style='background-image:url("+icon+");'><div class='text'>"+title+"</div></div>");
		$(this.Window.selector+" .title").append("<div class='buttons'></div>");
		$(this.Window.selector).append("<div class='container'></div>");
		if(buttons.minimize){
			$(this.Window.selector+" .title .buttons").append("<div class='minimize'></div>");
		}
		if(buttons.maximize){
			$(this.Window.selector+" .title .buttons").append("<div class='maximize'></div>");
		}
		if(buttons.close){
			$(this.Window.selector+" .title .buttons").append("<div class='close'></div>");
			$(this.Window.selector+" .title .buttons .close").on("click", function(){self.Window.show(null, null, {close: true}, true)});
		}
		if(!w){
			w = 0;
		}
		if(!h){
			h = 0;
		}
		if(!x){
			x = 0;
		}
		if(!y){
			y = 0;
		}
		$(this.Window.selector).css({
			"min-width":w+"px",
			"top":y+"px",
			"left":x+"px",
		});
		$(this.Window.selector+" .container").css({
			"min-width":w+"px",
			"min-height":h+"px"
		});
		this.Window.size.setTo(w, h);
		this.Window.position.setTo(x, y);
		if(visible){
			this.Window.show();
		}
		return this.Window;
	}

}