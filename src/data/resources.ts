
export interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  type: "video" | "article" | "tutorial" | "course" | "tool";
  tags: string[];
}

export const resources: Resource[] = [
  {
    id: "1",
    title: "Frontend Developer Roadmap",
    description: "A complete roadmap to becoming a modern frontend developer in 2025.",
    link: "https://roadmap.sh/frontend",
    type: "article",
    tags: ["frontend", "web development", "all"]
  },
  {
    id: "2",
    title: "Backend Developer Roadmap",
    description: "A comprehensive roadmap to becoming a backend developer in 2025.",
    link: "https://roadmap.sh/backend",
    type: "article",
    tags: ["backend", "web development", "all"]
  },
  {
    id: "3",
    title: "React JS Crash Course",
    description: "A crash course covering React fundamentals for beginners.",
    link: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
    type: "video",
    tags: ["frontend", "react", "web development", "all"]
  },
  {
    id: "4",
    title: "The Complete Node.js Course",
    description: "Comprehensive guide to building RESTful APIs with Node.js and Express.",
    link: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/",
    type: "course",
    tags: ["backend", "node.js", "web development", "all"]
  },
  {
    id: "5",
    title: "How to Create a Full-Stack Application",
    description: "Step-by-step tutorial for building a full-stack web application.",
    link: "https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/",
    type: "tutorial",
    tags: ["fullstack", "web development", "all"]
  },
  {
    id: "6",
    title: "Modern JavaScript Tutorial",
    description: "From the basics to advanced topics with simple, but detailed explanations.",
    link: "https://javascript.info/",
    type: "tutorial",
    tags: ["frontend", "javascript", "web development", "all"]
  },
  {
    id: "7",
    title: "Git & GitHub Crash Course",
    description: "Learn the basics of Git and GitHub in this crash course.",
    link: "https://www.youtube.com/watch?v=RGOj5yH7evk",
    type: "video",
    tags: ["git", "version control", "all"]
  },
  {
    id: "8",
    title: "Data Structures and Algorithms in JavaScript",
    description: "Learn data structures and algorithms in JavaScript for technical interviews.",
    link: "https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/",
    type: "course",
    tags: ["algorithms", "javascript", "all"]
  },
  {
    id: "9",
    title: "TypeScript Handbook",
    description: "The official TypeScript documentation with detailed guides and examples.",
    link: "https://www.typescriptlang.org/docs/handbook/intro.html",
    type: "article",
    tags: ["typescript", "frontend", "backend", "all"]
  }
];
