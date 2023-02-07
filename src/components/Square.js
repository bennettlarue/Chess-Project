const Square = (props) => {
  return (
    <button
      className="square"
      style={props.style}
      onClick={() => props.onClick()}
      onAnimationEnd={() => props.onAnimationEnd()}
    >
      <img src={props.img} width="50" height="50" style={props.imageStyle} />
    </button>
  );
};

export default Square;
