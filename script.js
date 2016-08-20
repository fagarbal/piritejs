class Controller {
	constructor() {
		this.name = "Name";
		this.button = "Haz click";
	}

	click() {
		alert(this.phone);
	}
}

fabiolib
.App('xs')
.Component({
	name: 'fabio',
	template: `
		<h1>{{name}} {!apellido}</h1>
		<h2>Phone  {!phone}</h2>
		<span>{{name}}</span><input type="text" model="apellido">
		<span>Telefono</span><input type="text" model="phone">

		<button onclick="{{click}}">{{button}}</button>
	`,
	controller: Controller
})
.Component({
	name: 'ejemplo',
	template: '<h1>ejemplo</h1>'
});