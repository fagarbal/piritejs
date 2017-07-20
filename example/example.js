import { Template, State, Component } from '../src';
import template from './templates/example.html';

@Template(template, {
	title: (controller) => `
		<h1>Esto es un titulo</h1>
		<span>Count ${controller.state.counter}</span>
		</br>
	`,
	elements: (controller) => {
		return controller.state.elements.map((element) => element).join('&nbsp;');
	}
})
@State({
	counter: 100,
	elements: []
})
export default class Example extends Component {
	click(event) {
		this.state.answer = !this.state.answer;
		this.state.counter++
		this.state.elements.push(this.state.counter);
		this.props.click(this.state.name);
	}

	childClick(value) {
		this.state.name = value;
	}

	change(event) {
		this.state.name = event.target.value;
	}
}