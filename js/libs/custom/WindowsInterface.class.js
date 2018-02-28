class WindowsInterface{

	constructor(IDSelector){
		this.ID = IDSelector;
		this.Window = ".window#"+IDSelector+"";
		this.Icon;
		this.Title;
		this.Buttons = {Minimize: {active: false, position: {x: 0, y: 0}}, Maximize: {active: false, position: {x: 0, y: 0}}, Close: {Active: false}};
		this.Left = 0;
		this.Top = 0;
		this.Width = 0;
		this.Height = 0;
		this.Visible = false;
		this.system = false;
		return this;
	}

	init(icon, title, x, y, w, h, battrs, visible){
		if(icon != null){
			this.Icon = "style='background-image:url("+icon+");'";
		}else{
			this.Icon = "";
		}
		if(visible){
			this.Visible = "block";
		}else{
			this.Visible = "none";
		}
		this.Title = title;
		this.Width = w;
		this.Height = h;
		this.Left = x;
		this.Top = y;
		this.Buttons.Minimize.active = battrs.minimize;
		this.Buttons.Maximize.active = battrs.maximize;
		this.Buttons.Close.active = battrs.close;
		this.CreateWindow();
	}

	CreateWindow(){
		var self = this;
		$("body").append("<div id='"+this.ID+"' class='window'></div>");
		$(this.Window).append("<div class='title' "+this.Icon+"></div>");
		$(this.Window+" .title").append("<div class='text'>"+this.Title+"</div>");
		$(this.Window+" .title").append("<div class='buttons-actions'></div>");
		if(this.Buttons.Minimize.active){
			$(this.Window+" .title .buttons-actions").append("<div class='minimize'></div>");
		}
		if(this.Buttons.Maximize.active){
			$(this.Window+" .title .buttons-actions").append("<div class='maximize'></div>");
		}
		if(this.Buttons.Close.active){
			$(this.Window+" .title .buttons-actions").append("<div class='close'></div>");
		}
		$(this.Window+" .title .buttons-actions .minimize").on("click", function(){
			self.Minimize();
		});
		$(this.Window+" .title .buttons-actions .maximize").on("click", function(){
			self.Maximize();
		});
		$(this.Window+" .title .buttons-actions .close").on("click", function(){
			self.Close();
		});
		$(this.Window).append("<div class='container'></div>");
		$(this.Window).css({
			"width":this.Width+"px",
			"min-height":this.Height+"px",
			"left":this.Left+"px",
			"top":this.Top+"px",
			"display":this.Visible
		});
		$(this.Window+" .container").height(this.Height-$(this.Window+" .title")[0].getBoundingClientRect().height);
	}

	SetWindow(){
		var self = this;
		this.Visible = function(action, effect, duration){
			if(action){
				$(self.Window).show(effect, {percent: 100}, duration);
			}else{
				$(self.Window).hide(effect, {percent: 100}, duration);
			}
		}
		this.SetWidth = function(w){
			$(self.Window).css({"width":w})
			self.SetContent().AutoSize();
		}
		this.SetHeight = function(h){
			$(self.Window).css({"height":h});
			self.SetContent().AutoSize();
		}
		this.Size = function(w, h){
			$(self.Window).css({"width":w, "height":h});
			self.SetContent().AutoSize();
		}
		this.Border = function(b){
			$(self.Window).css({"border":b});
		}
		this.BackgroundColor = function(color){
			$(self.Window).css({"background-color":color});
		}
		this.Resizable = function(action){
			$(self.Window).resizable();
			var Classes = $(self.Window).attr("class");
			var ClassList = Classes.split(" ");
			var Active = false;
			for(var i = 0; i < ClassList.length; i++){
				if(ClassList[i] == "ui-resizable-disabled"){
					Active = true;
				}
			}
			switch(action){
				case true:
					if(Active){
						$(self.Window).removeClass("ui-resizable-disabled").resizable("enable");
					}else{
						$(self.Window).resizable().css({"position":"fixed"});
					}
				break;
				case false:
					$(self.Window).resizable("disable");
				break;
			}
			new ResizeSensor(jQuery(self.Window), function(){
				self.SetContent().AutoSize();
			});
		}
		this.Draggable = function(action){
			$(self.Window+" .title").on("mouseenter", function(){
				$(self.Window).draggable();
				var Classes = $(self.Window).attr("class");
				var ClassList = Classes.split(" ");
				var Active = false;
				for(var i = 0; i < ClassList.length; i++){
					if(ClassList[i] == "ui-draggable-disabled"){
						Active = true;
					}
				}
				switch(action){
					case true:
						if(Active){
							$(self.Window).removeClass("ui-draggable-disabled").draggable("enable");
						}else{
							$(self.Window).draggable();
						}
					break;
					case false:
						$(self.Window).draggable("disable");
					break;
				}
			}).on("mouseleave", function(){
				$(self.Window).draggable("disable");
			});
		}
		return this;
	}

	SetTitle(){
		var self = this;
		this.BackgroundColor = function(c){
			$(self.Window+" .title").css({"background-color":c});
		}
		this.FontColor = function(c){
			$(self.Window+" .title .text").css({"color":c});
		}
		this.FontSize = function(fs){
			$(self.Window+" .title .text").css({"font-size":fs});
		}
		this.FontStyle = function(fs){
			$(self.Window+" .title .text").css({"font-style":fs});
		}
		this.FontFamily = function(ff){
			$(self.Window+" .title .text").css({"font-family":ff});
		}
		this.FontWeight = function(fw){
			$(self.Window+" .title .text").css({"font-weight":fw});
		}
		this.Font = function(ff, fs, c, fw){
			$(self.Window+" .title .text").css({
				"font-family":ff,
				"font-size":fs,
				"color":c,
				"font-weight":fw
			});
		}
		return this;
	}

	SetContent(){
		var self = this;
		this.Message = function(message){
			$(self.Window+" .container").append(message);
		}
		this.BackgroundColor = function(c){
			$(self.Window+" .container").css({"background-color":c});
		}
		this.FontColor = function(s, c){
			$(self.Window+" .container "+s).css({"color":c});
		}
		this.FontSize = function(s, fs){
			$(self.Window+" .container "+s).css({"font-size":fs});
		}
		this.FontStyle = function(s, fs){
			$(self.Window+" .container "+s).css({"font-style":fs});
		}
		this.FontFamily = function(s, ff){
			$(self.Window+" .container "+s).css({"font-family":ff});
		}
		this.FontWeight = function(s, fw){
			$(self.Window+" .container "+s).css({"font-weight":fw});
		}
		this.Font = function(s, ff, fs, c, fw){
			$(self.Window+" .container "+s).css({
				"font-family":ff,
				"font-size":fs,
				"color":c,
				"font-weight":fw
			});
		}
		this.Button = function(){
			self.Add = function(bi, bc, bv, bf){
				if(bi == null){
					bi = "";
				}else{
					bi = "id='"+bi+"'";
				}
				if(bc == null){
					bc = "";
				}else{
					bc = "class='"+bc+"'";
				}
				$(self.Window+" .container").append("<input type='button' "+bi+" "+bc+" value='"+bv+"' onclick="+bf+"()>");
			}
			return self;
		}
		self.Position = function(s, attrs){
			$(self.Window+" .container "+s).css(attrs);
		}
		this.Scrollable = function(action){
			if(action){
				$(self.Window+" .container").css({"overflow":"auto"});
			}else{
				$(self.Window+" .container").css({"overflow":"hidden"});
			}
		}
		this.AutoSize = function(){
			$(self.Window+" .container").css({
				"width":$(self.Window).width()+"px",
				"height":($(self.Window).height()-$(self.Window+" .title").height())+"px"
			});
		}
		this.Load  = function(path){
			$(self.Window+" .container").html("<div class='loading'></div>");
		}
		return this;
	}

	Minimize(){
		if(this.Buttons.Minimize.active){
			$(this.Window).animate({
				"left":this.Buttons.Minimize.position.x+"px",
				"top":this.Buttons.Minimize.position.y+"px"
			}, 1);
		}else{
			this.Buttons.Minimize.position.x = $(this.Window)[0].getBoundingClientRect().left;
			this.Buttons.Minimize.position.y = $(this.Window)[0].getBoundingClientRect().top;
			$(this.Window).animate({
				"left":"0px",
				"top":(window.innerHeight-$(this.Window+" .title").height())+"px"
			}, 1);
		}
		this.Buttons.Minimize.active = !this.Buttons.Minimize.active;
	}

	Maximize(){
		if(this.Buttons.Maximize.active){
			if(this.Buttons.Minimize.active){
				this.Buttons.Minimize.active = !this.Buttons.Minimize.active;
			}
			$(this.Window).css({
				"left":this.Buttons.Maximize.position.x+"px",
				"top":this.Buttons.Maximize.position.y+"px",
				"width":this.Width+"px",
				"height":this.Height+"px"
			});
		}else{
			if(this.Buttons.Minimize.active){
				this.Minimize();
				this.Buttons.Maximize.position.x = this.Buttons.Minimize.position.x;
				this.Buttons.Maximize.position.y = this.Buttons.Minimize.position.y;
			}else{
				this.Buttons.Maximize.position.x = $(this.Window)[0].getBoundingClientRect().left;
				this.Buttons.Maximize.position.y = $(this.Window)[0].getBoundingClientRect().top;
			}
			$(this.Window).css({
				"left":"0px",
				"top":"0px",
				"width":window.innerWidth+"px",
				"height":window.innerHeight+"px"
			});
		}
		this.SetContent().AutoSize();
		this.Buttons.Maximize.active = !this.Buttons.Maximize.active;
	}

	Close(){
		$(this.Window).remove();
	}

}