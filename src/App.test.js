import React from 'react';
import { cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from './app/store';
import App from './App';

describe('App', () => {
  afterEach(cleanup);

  test('renders learn react link', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
