import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/preact';
import { useState } from 'preact/hooks';
import Dialog from './Dialog';

function DialogTestWrapper() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      <Dialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Test Dialog"
        icon="info"
      >
        <p>Dialog content</p>
      </Dialog>
    </div>
  );
}

describe('Dialog', () => {
  it('opens when the button is clicked', async () => {
    render(<DialogTestWrapper />);
    fireEvent.click(screen.getByText('Open Dialog'));
    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('closes when the close button is clicked', async () => {
    render(<DialogTestWrapper />);
    fireEvent.click(screen.getByText('Open Dialog'));
    const closeBtn = screen.getByLabelText('Close dialog');
    console.log(screen.getByLabelText('Close dialog'));
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // it('closes when the Escape key is pressed', async () => {
  //     render(<DialogTestWrapper />);
  //     fireEvent.click(screen.getByText('Open Dialog'));
  //     const dialog = screen.getByRole('dialog');
  //     fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });
  //     expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  // });
});
