import {
  render,
  screen,
  cleanup,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Loading from '../loading';

describe('Loading', () => {
  afterEach(cleanup);

  it('renders correctly in the DOM', () => {
    const tree = renderer
      .create(<Loading />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with the green border', () => {
    render(
      <Loading />,
    );

    const loading = screen.getByTestId('loading');
    const { classList } = loading;

    expect(classList).toContain('border-t-lime-500');
  });
});
