import { PartyDescription } from './PartyDescription';
import { render, screen } from '@testing-library/react';

describe('<PartyDescription />', (): void => {
  it('displays the given Party description.', async (): Promise<void> => {
    render(<PartyDescription description='Test Description' />);

    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
