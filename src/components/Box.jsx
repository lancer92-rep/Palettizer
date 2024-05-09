import PropTypes from "prop-types";

const Box = ({
  top,
  left,
  width,
  height,
  onClick,
  onDragStart,
  error,
  text,
}) => {
  return (
    <div
      className={`box ${error ? "error" : ""}`}
      draggable
      onDragStart={onDragStart}
      style={{
        top: top,
        left: left,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div>
        <p>{text}</p>
        <button className="rotate-button" onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4b5090"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
          </svg>
        </button>
      </div>
    </div>
  );
};

Box.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  onDragStart: PropTypes.func,
  error: PropTypes.bool,
  text: PropTypes.string,
};

export default Box;
