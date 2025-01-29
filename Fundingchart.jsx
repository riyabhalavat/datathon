import React, { useEffect, useState } from 'react';

function FundingChart() {
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Add timestamp to URL to prevent caching
    fetch(`http://127.0.0.1:5000/graph?t=${new Date().getTime()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading graph:', error);
        setIsLoading(false);
      });

    // Cleanup function
    return () => {
      if (imageData) {
        URL.revokeObjectURL(imageData);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="p-4">
      {isLoading ? (
        <div>Loading graph...</div>
      ) : imageData ? (
        <img 
          src={imageData} 
          alt="Company Funding Chart" 
          style={{
            maxWidth: '100%',
            height: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px'
          }}
        />
      ) : (
        <div>Failed to load graph</div>
      )}
    </div>
  );
}

export default FundingChart;