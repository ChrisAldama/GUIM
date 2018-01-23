import React from 'react';
import Table, { StickyHeader } from './Table';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import { findDOMNode } from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

Math.random = jest.fn(() => 0.1234);

describe('<Table />', () => {
  let component;
  let highlighted = -1;
  let tree;

  const onMouseEnterRow = (i) => highlighted = i;
  const onMouseLeaveRow = () => highlighted = -1;

  const refreshTree = () => tree = component.toJSON();
  const reRender = (striped = false,
    ticky = {active: false, top: 0}) => {
      component = renderer.create(
        <Table
          striped={striped}
          sticky_header={ticky}
          headers={[
            "Product",
            "Product Name",
            "Product Quality",
            "Product Quantity"
          ]}
          body={[
            [1, "Wheat", "Good", "200 Bags"],
            [2, "Rice", "Regular", "300 Bags"],
            [3, "Sugar", "Bad", "100 Bags"],
            [4, "Meat", "Good", "200 Kgs"]
          ]}
          row_mouseEnter={onMouseEnterRow}
          row_mouseLeave={onMouseLeaveRow}
          row_hovered={highlighted}
        />
      )
      refreshTree();
    };
  it("match dom snapshot", () => {
    reRender();
    expect(tree).toMatchSnapshot();
  });

  it("highlights row when hover", () => {
    reRender();

    // Mouse enter on row
    tree[1]
      .children[0]
      .children[2].props.onMouseEnter(2);

    reRender();
    expect(tree).toMatchSnapshot();

    // Mouse leave row
    tree[1]
      .children[0]
      .children[2].props.onMouseLeave();

    reRender();
    expect(tree).toMatchSnapshot();
  });

  it("handles striped and non striped rows", () => {
    reRender(true);
    expect(tree).toMatchSnapshot();

    reRender(false);
    expect(tree).toMatchSnapshot();
  });

});

describe('<Table />', () => {
  let component;
  it('handles a sticky header yo', () => {
    component = shallow(
      <StickyHeader
        id={'head-id'}
        headers={[
          "Product",
          "Product Name",
          "Product Quality",
          "Product Quantity"
        ]}
        top={0}
      />
    )

    expect(component).toMatchSnapshot();
    component.setState({active: true});
    expect(component).toMatchSnapshot();
  });
});
