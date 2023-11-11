import { Block2 } from "../../Components/Block2/Block2";

export const AboutPage = () => {
  const data = {
    title: "Welcome",
    par1: "Welcome to [Your Website Name], a vibrant community dedicated to fostering creativity and storytelling. At [Your Website Name], we believe in the power of words to inspire, connect, and transform. Our platform is designed to encourage writers of all ages and experience levels to explore the world of short stories. Whether you're a seasoned storyteller or just starting your writing journey, our community provides a space for you to express your creativity, share your unique perspectives, and receive constructive feedback",
    par2: `We emphasize the importance of reading,
    reviewing, and editing short stories, creating
    an environment where writers can learn from one 
    another and grow their skills. Join us on this literary 
    adventure, where imagination knows no bounds,
    and every story has the potential to captivate 
    and inspire.`,
    link: { to: "/contact", text: "Contact Us" },
  };
  return (
    <div className="container">
      <Block2 data={data} />
    </div>
  );
};
