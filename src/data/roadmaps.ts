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
  },
  {
    id: 'uiux-designer',
    title: 'UI/UX Designer',
    description: 'Learn to design beautiful, functional, and user-centered digital products and experiences',
    icon: '🎨',
    steps: [
      {
        id: 'uiux-fundamentals',
        title: 'Design Fundamentals',
        description: 'Learn the basics of visual design including color theory, typography, layout, and composition.',
        level: 'beginner',
        resources: [
          {
            name: 'Design for Non-Designers',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=QFjISxJe-kE'
          },
          {
            name: 'Principles of Design',
            type: 'article',
            url: 'https://www.interaction-design.org/literature/topics/design-principles'
          }
        ]
      },
      {
        id: 'user-research',
        title: 'User Research & Personas',
        description: 'Learn methods for understanding your users through research, interviews, and creating user personas.',
        level: 'beginner',
        resources: [
          {
            name: 'UX Research Methods',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=gGZGDnTY454'
          },
          {
            name: 'Creating User Personas',
            type: 'course',
            url: 'https://www.nngroup.com/articles/persona-creation/'
          }
        ]
      },
      {
        id: 'wireframing-prototyping',
        title: 'Wireframing & Prototyping',
        description: 'Master the tools and techniques for creating wireframes and interactive prototypes.',
        level: 'intermediate',
        resources: [
          {
            name: 'Figma Tutorial for Beginners',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=jk1T0CdLxwU'
          },
          {
            name: 'Prototyping UI with Figma',
            type: 'course',
            url: 'https://www.figma.com/resources/learn-design/prototyping/'
          }
        ]
      },
      {
        id: 'usability-testing',
        title: 'Usability Testing',
        description: 'Learn to conduct usability tests to validate your designs and gather user feedback.',
        level: 'intermediate',
        resources: [
          {
            name: 'Usability Testing Basics',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=0YL0xoSmyZI'
          },
          {
            name: 'Remote Usability Testing Guide',
            type: 'article',
            url: 'https://www.nngroup.com/articles/remote-usability-tests/'
          }
        ]
      },
      {
        id: 'interaction-design',
        title: 'Interaction Design',
        description: 'Focus on creating meaningful interactions and micro-interactions for your digital products.',
        level: 'advanced',
        resources: [
          {
            name: 'Micro-interactions in UI Design',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=AhWIJslo6vI'
          },
          {
            name: 'Interaction Design Principles',
            type: 'article',
            url: 'https://www.interaction-design.org/literature/topics/interaction-design'
          }
        ]
      },
      {
        id: 'accessibility-design',
        title: 'Accessibility in Design',
        description: 'Learn to design products that are accessible to users of all abilities and disabilities.',
        level: 'advanced',
        resources: [
          {
            name: 'Designing for Accessibility',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=aqM6rV5IBlg'
          },
          {
            name: 'Web Content Accessibility Guidelines',
            type: 'article',
            url: 'https://www.w3.org/WAI/standards-guidelines/wcag/'
          }
        ]
      },
      {
        id: 'design-systems',
        title: 'Design Systems',
        description: 'Create and maintain scalable design systems that ensure consistency across products.',
        level: 'expert',
        resources: [
          {
            name: 'Building a Design System',
            type: 'course',
            url: 'https://designsystem.digital.gov/'
          },
          {
            name: 'Design Systems Best Practices',
            type: 'article',
            url: 'https://www.invisionapp.com/inside-design/guide-to-design-systems/'
          }
        ]
      }
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Learn to build products that solve real problems and create value for users and businesses',
    icon: '📊',
    steps: [
      {
        id: 'product-fundamentals',
        title: 'Product Management Fundamentals',
        description: 'Understand the role of a product manager and the product development lifecycle.',
        level: 'beginner',
        resources: [
          {
            name: 'What is Product Management?',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=yUOC-Y0f5ZQ'
          },
          {
            name: 'Product Management Guide',
            type: 'article',
            url: 'https://www.productplan.com/learn/what-is-product-management/'
          }
        ]
      },
      {
        id: 'user-discovery',
        title: 'User Discovery & Market Research',
        description: 'Learn to identify user needs, market opportunities, and validate product ideas.',
        level: 'beginner',
        resources: [
          {
            name: 'User Research for Product Managers',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=6GwjzBgJqF4'
          },
          {
            name: 'Market Research Techniques',
            type: 'course',
            url: 'https://www.productschool.com/blog/product-management-2/market-research/'
          }
        ]
      },
      {
        id: 'product-strategy',
        title: 'Product Strategy & Roadmapping',
        description: 'Develop strategic thinking and learn to create effective product roadmaps.',
        level: 'intermediate',
        resources: [
          {
            name: 'Building a Product Roadmap',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=GXwWwyNQ9-I'
          },
          {
            name: 'Product Strategy Framework',
            type: 'article',
            url: 'https://www.productplan.com/learn/product-strategy-framework/'
          }
        ]
      },
      {
        id: 'agile-methodologies',
        title: 'Agile Methodologies',
        description: 'Master Agile, Scrum, and other frameworks for effective product development.',
        level: 'intermediate',
        resources: [
          {
            name: 'Agile Product Management',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=502ILHjX9EE'
          },
          {
            name: 'Scrum Guide',
            type: 'article',
            url: 'https://scrumguides.org/scrum-guide.html'
          }
        ]
      },
      {
        id: 'metrics-analytics',
        title: 'Product Metrics & Analytics',
        description: 'Learn to define, track, and analyze product metrics to measure success.',
        level: 'advanced',
        resources: [
          {
            name: 'Product Metrics That Matter',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=ra_fLrHEe70'
          },
          {
            name: 'Data-Driven Product Decisions',
            type: 'course',
            url: 'https://www.productschool.com/blog/product-management-2/data-product-manager/'
          }
        ]
      },
      {
        id: 'product-launch',
        title: 'Product Launch & GTM Strategy',
        description: 'Develop strategies for successful product launches and go-to-market planning.',
        level: 'advanced',
        resources: [
          {
            name: 'Product Launch Playbook',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=LeBhdBN4ThM'
          },
          {
            name: 'Go-to-Market Strategy',
            type: 'article',
            url: 'https://www.productplan.com/learn/go-to-market-strategy/'
          }
        ]
      },
      {
        id: 'stakeholder-management',
        title: 'Stakeholder Management',
        description: 'Master the art of managing stakeholders, securing buy-in, and effective communication.',
        level: 'expert',
        resources: [
          {
            name: 'Stakeholder Management for PMs',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=QDxuGdUixqc'
          },
          {
            name: 'Influence Without Authority',
            type: 'course',
            url: 'https://www.productschool.com/blog/product-management-2/influence-without-authority/'
          }
        ]
      }
    ]
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Master software engineering principles, architecture, and best practices for scalable applications',
    icon: '💻',
    steps: [
      {
        id: 'programming-fundamentals',
        title: 'Programming Fundamentals',
        description: 'Learn core programming concepts, data structures, and algorithms.',
        level: 'beginner',
        resources: [
          {
            name: 'Data Structures & Algorithms',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=8hly31xKli0'
          },
          {
            name: 'Introduction to Algorithms',
            type: 'course',
            url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/'
          }
        ]
      },
      {
        id: 'software-design',
        title: 'Software Design & Architecture',
        description: 'Learn design patterns, software architecture principles, and system design.',
        level: 'intermediate',
        resources: [
          {
            name: 'Software Architecture & Design Patterns',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=FLtqAi7WNBY'
          },
          {
            name: 'System Design Primer',
            type: 'article',
            url: 'https://github.com/donnemartin/system-design-primer'
          }
        ]
      },
      {
        id: 'testing-debugging',
        title: 'Testing & Debugging',
        description: 'Master various testing methodologies and debugging techniques.',
        level: 'intermediate',
        resources: [
          {
            name: 'Test-Driven Development',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=z6gOPonp2t0'
          },
          {
            name: 'Advanced Debugging Techniques',
            type: 'article',
            url: 'https://blog.logrocket.com/advanced-debugging-techniques-for-react-applications/'
          }
        ]
      },
      {
        id: 'backend-development',
        title: 'Backend Development',
        description: 'Learn server-side programming, APIs, databases, and backend architecture.',
        level: 'intermediate',
        resources: [
          {
            name: 'RESTful API Design',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=Q-BpqyOT3a8'
          },
          {
            name: 'Database Design Fundamentals',
            type: 'course',
            url: 'https://www.coursera.org/learn/database-design'
          }
        ]
      },
      {
        id: 'devops-ci-cd',
        title: 'DevOps & CI/CD',
        description: 'Understand continuous integration, deployment, and DevOps practices.',
        level: 'advanced',
        resources: [
          {
            name: 'DevOps Engineering Course',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=j5Zsa_eOXeY'
          },
          {
            name: 'CI/CD Pipeline Explained',
            type: 'article',
            url: 'https://www.redhat.com/en/topics/devops/what-is-ci-cd'
          }
        ]
      },
      {
        id: 'cloud-services',
        title: 'Cloud Services & Deployment',
        description: 'Master cloud platforms, serverless architecture, and deployment strategies.',
        level: 'advanced',
        resources: [
          {
            name: 'AWS for Software Engineers',
            type: 'course',
            url: 'https://aws.amazon.com/getting-started/hands-on/build-web-app-s3-lambda-api-gateway-dynamodb/'
          },
          {
            name: 'Serverless Architecture',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=W_VV2CnNlK4'
          }
        ]
      },
      {
        id: 'scalability-performance',
        title: 'Scalability & Performance',
        description: 'Learn techniques for building highly scalable and performant applications.',
        level: 'expert',
        resources: [
          {
            name: 'High Scalability Architecture',
            type: 'article',
            url: 'http://highscalability.com/blog/2016/1/11/a-beginners-guide-to-scaling-to-11-million-users-on-amazons.html'
          },
          {
            name: 'Web Performance Optimization',
            type: 'course',
            url: 'https://web.dev/learn/performance/'
          }
        ]
      }
    ]
  },
  {
    id: 'sde',
    title: 'SDE (Software Development Engineer)',
    description: 'Become an expert in software development engineering with focus on large-scale systems',
    icon: '⚙️',
    steps: [
      {
        id: 'coding-proficiency',
        title: 'Coding Proficiency',
        description: 'Master at least one programming language and fundamental coding principles.',
        level: 'beginner',
        resources: [
          {
            name: 'Python for SDE',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=rfscVS0vtbw'
          },
          {
            name: 'Clean Code Principles',
            type: 'article',
            url: 'https://www.freecodecamp.org/news/clean-coding-for-beginners/'
          }
        ]
      },
      {
        id: 'computer-science-foundations',
        title: 'Computer Science Foundations',
        description: 'Strengthen your knowledge of data structures, algorithms, and problem-solving techniques.',
        level: 'beginner',
        resources: [
          {
            name: 'Algorithms and Data Structures',
            type: 'course',
            url: 'https://www.coursera.org/specializations/algorithms'
          },
          {
            name: 'Leetcode Problem Solving',
            type: 'article',
            url: 'https://leetcode.com/problemset/all/'
          }
        ]
      },
      {
        id: 'system-design',
        title: 'System Design',
        description: 'Learn to design scalable, reliable and maintainable systems.',
        level: 'intermediate',
        resources: [
          {
            name: 'System Design Interview',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=0163cssUxLA'
          },
          {
            name: 'Designing Data-Intensive Applications',
            type: 'course',
            url: 'https://dataintensive.net/'
          }
        ]
      },
      {
        id: 'distributed-systems',
        title: 'Distributed Systems',
        description: 'Understand the principles of distributed computing and microservices architecture.',
        level: 'advanced',
        resources: [
          {
            name: 'Microservices Architecture',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=y8IQb4ofjDo'
          },
          {
            name: 'Distributed Systems Design',
            type: 'article',
            url: 'https://martinfowler.com/articles/microservices.html'
          }
        ]
      },
      {
        id: 'security-privacy',
        title: 'Security & Privacy',
        description: 'Learn security best practices and how to build secure software systems.',
        level: 'advanced',
        resources: [
          {
            name: 'Application Security Fundamentals',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=qjrkV4RAdTg'
          },
          {
            name: 'OWASP Top 10',
            type: 'article',
            url: 'https://owasp.org/www-project-top-ten/'
          }
        ]
      },
      {
        id: 'infrastructure-deployment',
        title: 'Infrastructure & Deployment',
        description: 'Master infrastructure as code, containerization, and CI/CD pipelines.',
        level: 'advanced',
        resources: [
          {
            name: 'Docker and Kubernetes',
            type: 'course',
            url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/'
          },
          {
            name: 'Infrastructure as Code',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=53X-HAw7BbA'
          }
        ]
      },
      {
        id: 'operational-excellence',
        title: 'Operational Excellence',
        description: 'Learn about monitoring, observability, and maintaining production systems.',
        level: 'expert',
        resources: [
          {
            name: 'Site Reliability Engineering',
            type: 'article',
            url: 'https://sre.google/sre-book/table-of-contents/'
          },
          {
            name: 'Observability in Production',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=MkSdvBdC_1w'
          }
        ]
      }
    ]
  }
];
