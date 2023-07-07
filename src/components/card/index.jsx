function Card(props) {
  const { variant, extra, children, handleClick = null, ...rest } = props;

  return (
    <div
      onClick={handleClick}
      className={`!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
