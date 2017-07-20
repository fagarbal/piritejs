import { Component, Template } from '../src';
import template from './templates/demo.html';

@Template(template)
export default class Demo extends Component {
  click() {
    this.props.click(this.props.name);
  }
}
