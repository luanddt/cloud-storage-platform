const Home = async ({ params }: HomeProps) => {
  const { slug } = await params;

  return (
    <div>{slug}</div>
  );
};

export default Home;