
export type RoadmapStep = {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  resources: {
    name: string;
    type: 'video' | 'article' | 'course';
    url: string;
  }[];
};

export type Roadmap = {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: RoadmapStep[];
};

export const roadmaps: Roadmap[] = [
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    description: 'Learn to build beautiful and interactive user interfaces for web applications',
    icon: '🎨',
    steps: [
      {
        id: 'frontend-basics',
        title: 'Basics of Web Development',
        description: 'Learn HTML, CSS, and basic JavaScript to understand the structure, styling, and interactivity of web pages.',
        level: 'beginner',
        resources: [
          {
            name: 'HTML, CSS & JS for Beginners',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=mU6anWqZJcc'
          },
          {
            name: 'Google HTML/CSS Style Guide',
            type: 'article',
            url: 'https://google.github.io/styleguide/htmlcssguide.html'
          }
        ]
      },
      {
        id: 'responsive-design',
        title: 'Responsive Design & Advanced CSS',
        description: 'Master media queries, flexbox, CSS grid, animations, and transitions for responsive and dynamic websites.',
        level: 'intermediate',
        resources: [
          {
            name: 'Responsive Web Design Tutorial',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=srvUrASNj0s'
          },
          {
            name: 'Responsive Web Design Fundamentals',
            type: 'course',
            url: 'https://web.dev/learn/design/'
          }
        ]
      },
      {
        id: 'js-deep-dive',
        title: 'JavaScript Deep Dive',
        description: 'Explore advanced JavaScript concepts including ES6+ features, asynchronous programming, and APIs.',
        level: 'intermediate',
        resources: [
          {
            name: 'JavaScript Full Course for Beginners',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg'
          },
          {
            name: 'JavaScript.info',
            type: 'article',
            url: 'https://javascript.info/'
          }
        ]
      },
      {
        id: 'version-control',
        title: 'Version Control',
        description: 'Learn Git and GitHub for code management, collaboration, and version tracking.',
        level: 'intermediate',
        resources: [
          {
            name: 'Git and GitHub for Beginners',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=RGOj5yH7evk'
          },
          {
            name: 'Google Git Style Guide',
            type: 'article',
            url: 'https://google.github.io/eng-practices/review/developer/small-cls.html'
          }
        ]
      },
      {
        id: 'frameworks',
        title: 'Frameworks & Libraries',
        description: 'Learn React including JSX, components, props, state, hooks, routing, and APIs.',
        level: 'advanced',
        resources: [
          {
            name: 'React JS Full Course',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=bMknfKXIFA8'
          },
          {
            name: 'React Documentation',
            type: 'article',
            url: 'https://reactjs.org/docs/getting-started.html'
          }
        ]
      },
      {
        id: 'build-projects',
        title: 'Build Projects',
        description: 'Create a portfolio, to-do list, weather app, blog, or dashboard to showcase your skills.',
        level: 'advanced',
        resources: [
          {
            name: 'Build a Portfolio with React',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=bmpI252DmiI'
          },
          {
            name: 'Project Ideas for Web Developers',
            type: 'article',
            url: 'https://www.freecodecamp.org/news/javascript-projects-for-beginners/'
          }
        ]
      },
      {
        id: 'additional-skills',
        title: 'Optional but Important',
        description: 'Learn Tailwind CSS/Bootstrap, TypeScript, testing with Jest, and deployment options.',
        level: 'expert',
        resources: [
          {
            name: 'Tailwind CSS Crash Course',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=UBOj6rqRUME'
          },
          {
            name: 'TypeScript for Beginners',
            type: 'course',
            url: 'https://www.typescriptlang.org/docs/handbook/intro.html'
          }
        ]
      }
    ]
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    description: 'Learn to build the server-side of applications, handle databases, and create APIs',
    icon: '🔧',
    steps: [
      {
        id: 'backend-basics',
        title: 'Backend Fundamentals',
        description: 'Choose a backend language like Node.js, Python, Java, or PHP to start your journey.',
        level: 'beginner',
        resources: [
          {
            name: 'Backend Development Full Course - Node.js',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=Oe421EPjeBE'
          },
          {
            name: 'Node.js Documentation',
            type: 'article',
            url: 'https://nodejs.org/en/docs/'
          }
        ]
      },
      {
        id: 'apis',
        title: 'APIs & Protocols',
        description: 'Learn about REST and GraphQL APIs, HTTP protocols, and how to design efficient interfaces.',
        level: 'intermediate',
        resources: [
          {
            name: 'RESTful APIs in Node.js',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=fsCjFHuMXj0'
          },
          {
            name: 'GraphQL Tutorial',
            type: 'course',
            url: 'https://graphql.org/learn/'
          }
        ]
      },
      {
        id: 'databases',
        title: 'Databases',
        description: 'Work with SQL databases like MySQL/PostgreSQL and NoSQL databases like MongoDB.',
        level: 'intermediate',
        resources: [
          {
            name: 'SQL Tutorial - Full Database Course',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY'
          },
          {
            name: 'MongoDB Crash Course',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=2QQGWYe7IDU'
          }
        ]
      },
      {
        id: 'auth-security',
        title: 'Authentication & Security',
        description: 'Implement JWT, OAuth, secure your applications, and learn about hashing and CORS.',
        level: 'advanced',
        resources: [
          {
            name: 'Node.js Security Best Practices',
            type: 'article',
            url: 'https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html'
          },
          {
            name: 'JWT Authentication Tutorial',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=7Q17ubqLfaM'
          }
        ]
      },
      {
        id: 'deployment',
        title: 'Deployment & DevOps',
        description: 'Learn Docker, CI/CD pipelines, and deploy to cloud platforms like AWS, GCP, or Azure.',
        level: 'expert',
        resources: [
          {
            name: 'Docker Crash Course',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo'
          },
          {
            name: 'AWS for Beginners',
            type: 'course',
            url: 'https://aws.amazon.com/getting-started/'
          }
        ]
      }
    ]
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack Developer',
    description: 'Master both frontend and backend development to build complete web applications',
    icon: '🚀',
    steps: [
      {
        id: 'fullstack-basics',
        title: 'Web Development Fundamentals',
        description: 'Learn HTML, CSS, JavaScript, and understand how the web works end-to-end.',
        level: 'beginner',
        resources: [
          {
            name: 'Web Development In 2023 - Roadmap',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=EqzUcMzfV1w'
          },
          {
            name: 'The Odin Project',
            type: 'course',
            url: 'https://www.theodinproject.com/'
          }
        ]
      },
      {
        id: 'frontend-skills',
        title: 'Frontend Skills',
        description: 'Master a modern JavaScript framework like React, Angular, or Vue.',
        level: 'intermediate',
        resources: [
          {
            name: 'React Full Course',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=bMknfKXIFA8'
          },
          {
            name: 'CSS Frameworks Comparison',
            type: 'article',
            url: 'https://www.creative-tim.com/blog/web-design/best-css-frameworks/'
          }
        ]
      },
      {
        id: 'backend-skills',
        title: 'Backend Skills',
        description: 'Learn Node.js/Express, Django, or Spring Boot for server-side development.',
        level: 'intermediate',
        resources: [
          {
            name: 'Node.js and Express.js Full Course',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=Oe421EPjeBE'
          },
          {
            name: 'Backend Comparison Guide',
            type: 'article',
            url: 'https://www.freecodecamp.org/news/which-back-end-framework-should-i-use/'
          }
        ]
      },
      {
        id: 'fullstack-databases',
        title: 'Databases & Data Management',
        description: 'Work with both SQL and NoSQL databases and understand when to use each.',
        level: 'advanced',
        resources: [
          {
            name: 'SQL vs NoSQL: Key Differences',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=Q5aTUc7c4jg'
          },
          {
            name: 'Database Design Course',
            type: 'course',
            url: 'https://www.khanacademy.org/computing/computer-programming/sql'
          }
        ]
      },
      {
        id: 'fullstack-projects',
        title: 'Full Stack Projects',
        description: 'Build complete applications that showcase both frontend and backend skills.',
        level: 'advanced',
        resources: [
          {
            name: 'Full Stack MERN Application',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=ngc9gnGgUdA'
          },
          {
            name: 'Project Ideas for Full Stack Developers',
            type: 'article',
            url: 'https://www.freecodecamp.org/news/15-app-ideas-to-build-and-level-up-your-coding-skills'
          }
        ]
      },
      {
        id: 'deployment-cicd',
        title: 'Deployment & CI/CD',
        description: 'Learn about hosting, serverless architectures, and automated deployment pipelines.',
        level: 'expert',
        resources: [
          {
            name: 'Deploy a Full Stack App to Heroku',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=MxfxiR8TVNU'
          },
          {
            name: 'CI/CD with GitHub Actions',
            type: 'course',
            url: 'https://lab.github.com/githubtraining/github-actions:-continuous-integration'
          }
        ]
      }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Learn to analyze and interpret complex data to help organizations make better decisions',
    icon: '📊',
    steps: [
      {
        id: 'python-basics',
        title: 'Python Fundamentals',
        description: 'Learn Python programming language basics, which is essential for data science.',
        level: 'beginner',
        resources: [
          {
            name: 'Python for Data Science Full Course',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI'
          },
          {
            name: 'Python Data Science Handbook',
            type: 'article',
            url: 'https://jakevdp.github.io/PythonDataScienceHandbook/'
          }
        ]
      },
      {
        id: 'data-analysis',
        title: 'Data Analysis Libraries',
        description: 'Master NumPy, Pandas, and Matplotlib for data manipulation and visualization.',
        level: 'intermediate',
        resources: [
          {
            name: 'Pandas Tutorial',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=vmEHCJofslg'
          },
          {
            name: 'Data Visualization with Matplotlib',
            type: 'course',
            url: 'https://matplotlib.org/stable/tutorials/index.html'
          }
        ]
      },
      {
        id: 'sql-data',
        title: 'SQL for Data Analysis',
        description: 'Learn SQL to query and analyze data from relational databases effectively.',
        level: 'intermediate',
        resources: [
          {
            name: 'SQL for Data Analysis',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY'
          },
          {
            name: 'Advanced SQL Queries',
            type: 'article',
            url: 'https://mode.com/sql-tutorial/'
          }
        ]
      },
      {
        id: 'machine-learning',
        title: 'Machine Learning Fundamentals',
        description: 'Learn the basics of machine learning with scikit-learn for predictive modeling.',
        level: 'advanced',
        resources: [
          {
            name: 'Machine Learning with Python',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=7eh4d6sabA0'
          },
          {
            name: 'Google ML Crash Course',
            type: 'course',
            url: 'https://developers.google.com/machine-learning/crash-course'
          }
        ]
      },
      {
        id: 'deep-learning',
        title: 'Deep Learning',
        description: 'Explore neural networks and deep learning with TensorFlow and Keras.',
        level: 'expert',
        resources: [
          {
            name: 'Deep Learning Specialization',
            type: 'course',
            url: 'https://www.coursera.org/specializations/deep-learning'
          },
          {
            name: 'TensorFlow Tutorial',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=tPYj3fFJGjk'
          }
        ]
      },
      {
        id: 'data-projects',
        title: 'Data Science Projects',
        description: 'Build a portfolio of data science projects to showcase your skills to employers.',
        level: 'expert',
        resources: [
          {
            name: 'Data Science Project from Scratch',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=MpF9HENQjDo'
          },
          {
            name: 'Kaggle Competitions',
            type: 'course',
            url: 'https://www.kaggle.com/competitions'
          }
        ]
      }
    ]
  }
];
