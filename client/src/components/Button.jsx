function Button(props) {
    return (
      <div>
        <a href={props.link}>
          <button className="btn" onClick={props.onClick}>
            {props.title}
          </button>
        </a>
      </div>
    );
  }
  
  export default Button;