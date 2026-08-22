import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      year: "2024",
      description: "Started my journey through freelancing and continuous learning, developing skills in video editing, UI/UX design, and creative design."
    },
    {
      year: "2025",
      description: "Worked as an Intern at Chitralai while continuing freelance projects, gaining practical experience and strengthening my creative skills."
    },
    {
      year: "2026",
      description: "Currently working as an Intern at AI Smart Live Solutions Pvt. Ltd. while continuing freelance projects and growing professionally in UI/UX design and video editing."
    }
  ];

  return (
    <section className="experience" id="about">
      <div className="section-header">
        <h2 className="section-title">MY EXPERIENCE</h2>
        <div className="header-line"></div>
      </div>
      
      <div className="experience-cards">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card glass-panel">
            <h3 className="exp-year">{exp.year}</h3>
            <p className="exp-desc">{exp.description}</p>
            <div className="exp-accent-line"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
