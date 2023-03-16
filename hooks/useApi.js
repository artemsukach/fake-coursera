import { useState } from 'react';

export default (apiCallback) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);

    try {
      const result = await apiCallback(...args);

      setData(result.data);
    } catch (err) {
      setError(err.message || 'Unexpected Error!');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};
