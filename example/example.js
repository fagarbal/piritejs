import { Component } from '../src';
import template from './templates/example.html';

export default class Example extends Component {
  loaded() {
  }

  template() {
    return template;
  }

  parameters() {
    return {
      answer: this.props.answer,
      name: this.props.name ||  '',
      counter: 0
    };
  }

  click(event) {
    this.param.answer = !this.param.answer;
    this.props.click(this.param.name);
  }

  childClick(value) {
    this.param.name = value;
  }

  change(event) {
    this.param.name = event.target.value;
  }

  title() {
    return `<h1>Esto es un titulo <span> Count ${this.param.counter}<br></span></h1>`;
  }
}
