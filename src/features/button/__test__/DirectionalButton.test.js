import {
  render,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import DirectionalButton from '../DirectionalButton';

describe('DirectionalButton', () => {
  afterEach(cleanup);

  it('renders correctly in the DOM', () => {
    const tree = renderer
      .create(<DirectionalButton />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with the green background', () => {
    render(
      <DirectionalButton />,
    );

    const button = screen.getByRole('button');
    const { classList } = button;

    expect(classList).toContain('bg-lime-500');
  });

  it('renders with additional twClasses', () => {
    render(
      <DirectionalButton twClasses="mx-4" />,
    );

    const button = screen.getByRole('button');
    const { classList } = button;

    expect(classList).toContain('mx-4');
  });

  it('renders a right direction by default', () => {
    const { container } = render(<DirectionalButton />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();

    const d = icon.querySelector('path').getAttribute('d');

    expect(d).toContain('M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A.998.998 0 0 0 5 3v18a1 1 0 0 0 .536.886zM7 4.909 17.243 12 7 19.091V4.909z');
  });

  it('renders a left direction when given the left prop', () => {
    const { container } = render(<DirectionalButton left />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();

    const d = icon.querySelector('path').getAttribute('d');

    expect(d).toContain('M18.464 2.114a.998.998 0 0 0-1.033.063l-13 9a1.003 1.003 0 0 0 0 1.645l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-.536-.886zM17 19.091 6.757 12 17 4.909v14.182z');
  });

  it('fires the callback function when clicked', () => {
    render(<DirectionalButton onClick={() => { render(<p data-testid="text">You clicked</p>); }} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const text = screen.getByTestId('text');

    expect(text).toHaveTextContent('You clicked');
  });

  it('does not fires the callback function when clicked', () => {
    render(<p data-testid="text">No click yet</p>);

    render(<DirectionalButton onClick={() => { render(<p data-testid="text">You clicked</p>); }} disabled />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const text = screen.getByTestId('text');

    expect(text).toHaveTextContent('No click yet');
  });
});
