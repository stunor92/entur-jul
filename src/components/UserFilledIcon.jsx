import React from 'react';

// Linje har ikke en fylt variant av UserIcon; denne følger formen i Entur-appens tab-bar.
function UserFilledIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" className="eds-icon" {...props}>
      <path
        fillRule="evenodd"
        d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm0 4.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5ZM5.8 18.3a7.75 7.75 0 0 1 12.4 0A8.98 8.98 0 0 1 12 21a8.98 8.98 0 0 1-6.2-2.7Z"
      />
    </svg>
  );
}

export default UserFilledIcon;
