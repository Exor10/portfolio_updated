// Every technology in the Tech Stack section, grouped. `icon` is a Devicon
// class (add "colored" for the brand colour); leave it out for a plain dot.

export type StackItem = { name: string; icon?: string };
export type StackGroup = { title: string; items: StackItem[] };

export const stack: StackGroup[] = [
  {
    title: "Languages",
    items: [
      { name: "Java", icon: "devicon-java-plain colored" },
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "TypeScript", icon: "devicon-typescript-plain colored" },
      { name: "SQL", icon: "devicon-mysql-original colored" },
      { name: "HTML5", icon: "devicon-html5-plain colored" },
      { name: "CSS3", icon: "devicon-css3-plain colored" },
      { name: "Luau", icon: "devicon-lua-plain colored" },
    ],
  },
  {
    title: "Backend & Frameworks",
    items: [
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored" },
      { name: "Spring Boot", icon: "devicon-spring-original colored" },
      { name: "Spring Security", icon: "devicon-spring-original colored" },
      { name: "JPA / Hibernate", icon: "devicon-hibernate-plain colored" },
      { name: "Servlets / JSP", icon: "devicon-java-plain colored" },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
      { name: "jQuery", icon: "devicon-jquery-plain colored" },
      { name: "Google Apps Script", icon: "devicon-google-plain colored" },
    ],
  },
  {
    title: "Data & Machine Learning",
    items: [
      { name: "pandas", icon: "devicon-pandas-plain colored" },
      { name: "NumPy", icon: "devicon-numpy-plain colored" },
      { name: "scikit-learn", icon: "devicon-scikitlearn-plain colored" },
      { name: "TensorFlow / Keras", icon: "devicon-tensorflow-original colored" },
      { name: "Matplotlib / Seaborn", icon: "devicon-matplotlib-plain colored" },
      { name: "Jupyter", icon: "devicon-jupyter-plain colored" },
      { name: "MySQL", icon: "devicon-mysql-original colored" },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Git & GitHub", icon: "devicon-git-plain colored" },
      { name: "Maven", icon: "devicon-maven-plain colored" },
      { name: "IntelliJ IDEA", icon: "devicon-intellij-plain colored" },
      { name: "VS Code", icon: "devicon-vscode-plain colored" },
      { name: "MySQL Workbench", icon: "devicon-mysql-original colored" },
      { name: "Cisco Packet Tracer" },
      { name: "Roblox Studio" },
      { name: "GitHub Pages", icon: "devicon-github-original" },
      { name: "Supabase", icon: "devicon-supabase-plain colored" },
      { name: "Vercel", icon: "devicon-vercel-original" },
    ],
  },
];
