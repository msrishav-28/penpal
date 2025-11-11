interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading = ({ message = 'Loading...', fullScreen = false }: LoadingProps) => {
  const containerClasses = fullScreen
    ? 'min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100'
    : 'flex items-center justify-center py-12';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
