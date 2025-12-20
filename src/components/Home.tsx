import React from "react";
import "../Custom_CSS/Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Build the <span>Future</span> Today
          </h1>
          <p>
            A next-generation platform for secure, scalable and intelligent
            digital solutions.
          </p>

          <div className="hero-actions">
            <button className="btn-primary">Get Started</button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>

        <div className="hero-glow" />
      </section>

      {/* FEATURES */}
      <section className="features">
        <FeatureCard
          title="AI-Powered"
          description="Smart automation with intelligent decision making."
        />
        <FeatureCard
          title="Secure by Design"
          description="OAuth2, JWT & Zero-Trust architecture."
        />
        <FeatureCard
          title="Cloud Ready"
          description="Scalable, fast, and globally distributed."
        />
      </section>

      {/* STATS */}
      <section className="stats">
        <Stat value="99.99%" label="Uptime" />
        <Stat value="500K+" label="Users" />
        <Stat value="120+" label="Enterprises" />
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to experience the future?</h2>
        <button className="btn-primary large">Launch Platform</button>
      </section>
    </div>
  );
};

export default Home;

/* ---------------- COMPONENTS ---------------- */

type FeatureProps = {
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureProps> = ({ title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-glow" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

type StatProps = {
  value: string;
  label: string;
};

const Stat: React.FC<StatProps> = ({ value, label }) => {
  return (
    <div className="stat">
      <h3>{value}</h3>
      <span>{label}</span>
    </div>
  );
};
