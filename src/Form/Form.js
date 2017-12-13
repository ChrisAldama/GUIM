import React, {
  Component,
  Children,
  cloneElement,
  isValidElement
} from 'react';

const connectInput = (parent, child) => {
  switch(child.props.guimInput) {
    case 'checkbox':
      name = 'checkbox';
      return cloneElement(child, {
        onChange: () => parent.setState({[name]: !parent.state[name]}),
        checked: parent.state[name]
      });
    default:
      return child
  }
};

const initState = children => {
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = initState(props.children);
  }

  componentWillMount() {
    const {children} = this.props;
    Children.map(children, child => {
      console.log(child);
    });
    //this.children = this.proccesChildren(children);
  }

  proccesChildren(children) {
    return Children.map(children, child => {
      console.log(child,isValidElement(child));
      /*if(child.props.guimInput)
        return connectInput(this, child);
      else
      return child;*/
    });
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

Form.defaultProps = {
  className: 'GUIMForm'
}

export default Form;