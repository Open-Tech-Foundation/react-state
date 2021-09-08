import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ReactState } from '../lib/index.js';

describe('ReactState', () => {
  it('renders a div with text', () => {
    render(<ReactState thing="World" />);
    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});
