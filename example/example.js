import { Component } from '../src';
import template from './example.html';

export default class Example extends Component {
  constructor(...props) {
    super(...props);

    setInterval(() => {
      this.state.counter++;
    }, this.props.refresh ||  1000);
  }

  getTemplate() {
    return template;
  }

  initState() {
    return {
      answer: this.props.answer,
      name: this.props.name ||  '',
      counter: 0
    };
  }

  click(event) {
    this.state.answer = !this.state.answer;
    this.props.click(this.state.name);
  }

  change(event) {
    this.state.name = event.target.value;
  }

  title() {
    return `<h1>Esto es un titulo <span> Count ${this.state.counter}<br></span></h1>`;
  }
}
