import React from 'react';
import { useRouter } from 'next/router';

export const Ps1 = () => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <div>
      <span className="text-gruvbox-yellow">guest</span>
      <span className="text-gruvbox-gray">@</span>
      <span className="text-gruvbox-green">m4tt72.com</span>
      <span className="text-gruvbox-gray">:$ ~ </span>
    </div>
  );
};

export default Ps1;
