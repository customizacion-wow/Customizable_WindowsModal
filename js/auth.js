var Modal;
$(window).on("load", StartApp);
function StartApp(){
	Modal = new WindowsModal("body", {class: "", id: "FirstModal"}, "css/images/DefaultIcon.png", "Ventana Modal", {close: true}, 300, 150, 0, 0);
	Modal.container.css({"overflow":"hidden"});
	Modal.container.text.add("<p class='simple-title'>Hello FDW!</p>"); // Agrega el texto eliminando lo demas.
	Modal.container.text.font({"text-align":"center", "padding":"2vmin", "font-size":"2vmin", "text-shadow":"0px 0px 10px rgba(0,0,0,1)"}, ".simple-title");
	Modal.container.text.add("<div class='simple-text'>Make to resizable: <input type='checkbox' onchange='Modal.resizable(this.checked)'></div>", "last"); // Agrega el texto a continuacion o "first" al comienzo.
	Modal.container.text.add("<div class='simple-text'>Make to draggable: <input type='checkbox' onchange='Modal.draggable(this.checked)'></div>", "last");
	Modal.container.text.add("<div class='button' onclick='Modal.Overlay(null, null, true);'>Add a overlay</div>", "last");
	Modal.container.text.add("<div class='button' onclick='Modal.position.center();'>Center Me</div>", "last");
	Modal.container.text.font({"text-align":"center", "padding":"1vmin", "font-size":"1.3vmin", "text-shadow":"0px 0px 5px rgba(0,0,0,1)"}, ".simple-text");
	Modal.container.text.add("<div class='simple-text'>¿Do you like this addon?</div>", "last");
	Modal.container.text.font({"text-align":"center", "padding":"2vmin", "font-size":"1.6vmin"}, ".simple-text");
	Modal.container.text.add("<div class='simple-text'>Yes, i like <input type='radio' name='like'></div>", "last");
	Modal.container.text.add("<div class='simple-text'>No, i like not <input type='radio' name='like'></div>", "last");
	Modal.container.text.font({"text-align":"center", "padding":"1vmin", "font-size":"1.3vmin"}, ".simple-text");
	Modal.position.center();
}