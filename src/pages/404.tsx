import { useRouter } from 'next/router';
import React from 'react';

const NotFoundPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.replace('/');
  });

  return null;
};

export default NotFoundPage;
