const Card = ({ file }: { file: ModelsDocument }) => {
  return (
    <div>{file.name}</div>
  );
};

export default Card;