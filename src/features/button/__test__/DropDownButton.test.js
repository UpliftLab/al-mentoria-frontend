import {
  render,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import DropDownButton from '../DropDownButton';

describe('DropDownButton', () => {
  let options;
  let defaultOption;
  let elementID;

  beforeEach(() => {
    const arr = new Array(10).fill(0);
    options = arr.map((_, i) => ({ id: i, text: `text ${i}` }));
    defaultOption = 'Select a Topic';
    elementID = 'DropDownID';
  });

  afterEach(cleanup);

  it('renders correctly in the DOM', () => {
    const tree = renderer
      .create(<DropDownButton
        options={options}
        defaultOption={defaultOption}
        elementID={elementID}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with the green background and white text', () => {
    render(
      <DropDownButton
        options={options}
        defaultOption={defaultOption}
        elementID={elementID}
      />,
    );

    const select = screen.getByRole('combobox');
    const { classList } = select;

    expect(classList).toContain('bg-lime-500');
    expect(classList).toContain('text-white');
  });

  it('renders with the default option', () => {
    render(
      <DropDownButton
        options={options}
        defaultOption={defaultOption}
        elementID={elementID}
      />,
    );

    const select = screen.getByDisplayValue(defaultOption);

    expect(select).toBeInTheDocument();
  });

  it('permits the selection of an option', () => {
    const { container } = render(
      <DropDownButton
        options={options}
        defaultOption={defaultOption}
        elementID={elementID}
      />,
    );

    const select = container.querySelector(`#${elementID}`);

    fireEvent.change(select, { target: { value: 2 } });

    expect(select.selectedIndex).toBe(select.options[2].index + 1);
  });
});
