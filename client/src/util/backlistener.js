import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useNavListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      navigate('/'); // Navigate to home page when the back button is clicked
    };

    window.addEventListener('popstate', handlePopState);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return null; 
}

export default useNavListener;