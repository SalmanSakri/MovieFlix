const LoadingSpinner = ({ size = 'xlarge', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-20 w-20' // new bigger size
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center py-20">
      <div
        className={`animate-spin rounded-full border-[6px] border-gray-800 border-b-purple-700 ${sizeClasses[size]}`}
      ></div>
      {message && (
        <p className="text-gray-200 mt-6 text-lg font-semibold">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;