var WI;
$(window).on("load", StartPage);

function StartPage(){
	Windows1 = new WindowsInterface("alert");
	Windows1.init(null, "Mi Ventana", 10, 10, 500, 250, {minimize: false, maximize: false, close: true}, false);
	Windows1.SetWindow().Visible(true, "slide", 600);
	Windows1.SetContent().Message("<p>Hola Mundo!</p>");
	Windows1.SetContent().FontSize("p", "1.5vmin");
	Windows1.SetWindow().BackgroundColor("rgba(255,255,25,1)");

}