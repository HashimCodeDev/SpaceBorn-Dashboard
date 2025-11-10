const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-lg p-6 ${className}`}>
      {title && <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;