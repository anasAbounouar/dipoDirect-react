// Import your icon as a React component if you're using SVGs
// import { ReactComponent as YourIconSVG } from './path-to-your-icon.svg';

interface ButtonProps {
  text: string;
  onClick: () => void;
  icon?: JSX.Element; // Icon should be a JSX element
  className?: string;
  ariaLabel?: string; // ARIA label for accessibility
  height?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  className,
  ariaLabel,
  height,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${className || ''} ${
        height || 'h-[50px]'
      } flex flex-row items-center justify-center`}
      aria-label={ariaLabel || text} // Fallback to text if no ariaLabel is provided
      tabIndex={0} // Ensure button is focusable
    >
      {text}
      {icon && (
        <span className="icon-wrapper" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
