import {
  render,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Button from '../Button';

describe('Button', () => {
  afterEach(cleanup);

  it('renders correctly in the DOM', () => {
    const tree = renderer
      .create(<Button child="click" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with the green background', () => {
    render(
      <Button child="click" />,
    );

    const button = screen.getByRole('button');
    const { classList } = button;

    expect(classList).toContain('bg-lime-500');
  });

  it('renders with the white background', () => {
    render(
      <Button child="click" isWhite />,
    );

    const button = screen.getByRole('button');
    const { classList } = button;

    expect(classList).toContain('bg-white');
  });

  it('renders with the correct text', () => {
    render(<Button child="click" />);

    const button = screen.getByRole('button');

    expect(button.textContent).toContain('click');
  });

  it('renders with the button type by default', () => {
    render(<Button child="click" />);

    const button = screen.getByRole('button');

    expect(button.type).toBe('button');
  });

  it('renders with the submit type when isSubmit is true', () => {
    render(<Button child="click" isSubmit />);

    const button = screen.getByRole('button');

    expect(button.type).toBe('submit');
  });

  it('renders with the submit type when isSubmit is true', () => {
    render(<Button child="click" isSubmit />);

    const button = screen.getByRole('button');

    expect(button.type).toBe('submit');
  });

  it('fires the callback function when clicked', () => {
    render(<Button child="click" onClick={() => { render(<p data-testid="text">You clicked</p>); }} isSubmit />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const text = screen.getByTestId('text');

    expect(text).toHaveTextContent('You clicked');
  });
});
