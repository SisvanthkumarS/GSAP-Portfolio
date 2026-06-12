import React from "react";
import "./Projects.scss";

const PROJECTS = [
  {
  title: "GSAP Portfolio — React + GSAP",
  desc: "Designed and built a high-performance animated portfolio using React and GSAP. Implemented ScrollTrigger-based section pinning, scrubbed timelines, parallax/zoom effects, and smooth anchor navigation. Built reusable motion patterns, responsive layouts, and optimized rendering with will-change, transform-based animations, and cleanup-safe GSAP hooks for consistent behavior across refresh/resize.",
  image: "/assets/images/common/portfolio-image.png",
  tags: ["React", "GSAP", "ScrollTrigger", "SCSS", "Vite"],
  links: [
    { label: "Source Code", href: "https://github.com/SisvanthkumarS/GSAP-Portfolio", icon: "⌂" }
  ]
}
,
  {
    title: "Dining Concierge Chatbot — AWS",
    desc: "Built a production-style serverless dining recommendation system leveraging AWS cloud-native services. Implemented a decoupled microservices architecture using API Gateway, Lex, Lambda, SQS, OpenSearch, DynamoDB, SES, and EventBridge.",
    image: "/assets/images/common/chatbot-cover.png",
   tags: ["AWS", "Lex", "Lambda", "API Gateway", "SQS", "DynamoDB", "OpenSearch"],
    links: [
      { label: "Source Code", href: "https://github.com/SisvanthkumarS/dining-concierge-chatbot", icon: "⌂" },
    ],
  },
  {
    title: "LLM Sentinel — Multi-Layer AI Security System",
    desc: "Designed and implemented a multi-layer security system for detecting and logging adversarial prompts and jailbreak attempts against LLMs. Built a pipeline that captures bypass payloads, logs attack metadata to DynamoDB, archives raw payloads in S3, and visualizes attack trends through a Streamlit dashboard deployed on EC2. Collaborated with a team to design detection layers, scoring heuristics, and a real-time monitoring workflow.",
    image: "/assets/images/common/LLM-senti.jpeg",
    tags: ["AWS", "DynamoDB", "S3", "EC2", "Streamlit", "LLM Security", "Python"],
    links: [
      { label: "Source Code", href: "https://github.com/SisvanthkumarS/llm-sentinel", icon: "⌂" }
    ]
  },
  {
    title: "Amazon Fake Review Detection",
    desc: "Researched and proposed a machine learning pipeline to identify fake or manipulated product reviews on Amazon at scale. Explored large-scale dataset processing, feature engineering for review authenticity signals, and distributed data processing techniques as part of a graduate Big Data systems project. Collaborated with a team to design the data pipeline architecture and detection approach.",
    image: "/assets/images/common/fake-review-cover.png",
    tags: ["PySpark", "Big Data", "Machine Learning", "Python"],
    links: [
      { label: "Source Code", href: "https://github.com/SisvanthkumarS/fake-review-detection", icon: "⌂" }
    ]
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      {/* Header like your Certifications screenshot */}
      <div className="sectionHeader">
        <p className="sectionKicker">04. PROJECTS</p>
        <h2 className="sectionTitle">PROJECTS </h2>
        <p className="sectionSub">
          A selection of builds that showcase frontend motion craft and cloud-first architecture.
        </p>
      </div>

      {/* Cards like your first screenshot */}
      <div className="projectsGrid">
        {PROJECTS.map((p) => (
          <article className="projectCard" key={p.title}>
            <div className="projectMedia">
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="projectMediaOverlay" />
            </div>

            <div className="projectBody">
              <h3 className="projectTitle">{p.title}</h3>
              <p className="projectDesc">{p.desc}</p>

              <div className="projectTags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="projectFooter">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    className="projectLink"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="icon">{l.icon}</span>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
