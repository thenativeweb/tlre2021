import { HostInfo } from './HostInfo';
import { renderWithTheme } from '../../../../test/renderWithTheme';
import { screen } from '@testing-library/react';

describe('<HostInfo />', (): void => {
  it('displays the hosts name.', async (): Promise<void> => {
    renderWithTheme(<HostInfo name='Test Name' />);

    expect(screen.getByText('Test Name')).toBeInTheDocument();
  });

  it('shows the image of the given avatarUrl.', async (): Promise<void> => {
    renderWithTheme(<HostInfo name='Test Name' avatarUrl='http://test.com/path/to/avatar' />);

    const image = screen.getByRole('img') as HTMLImageElement;

    expect(image.src).toEqual('http://test.com/path/to/avatar');
  });

  it('puts an alt text with the hosts name to the image (a11y).', async (): Promise<void> => {
    renderWithTheme(<HostInfo name='Test Name' avatarUrl='http://test.com/path/to/avatar' />);

    expect(screen.getByAltText('Avatar von Test Name')).toBeInTheDocument();
  });

  it('does not render avatar if no url given.', async (): Promise<void> => {
    renderWithTheme(<HostInfo name='Test Name' />);

    expect(screen.queryByText('Avatar von Test Name')).not.toBeInTheDocument();
  });
});
