import { Component } from '../src';
import template from './templates/demo.html';

export default class Demo extends Component {
  template() {
    return template;
  }

  click() {
    this.props.click(this.props.name);
  }
}
