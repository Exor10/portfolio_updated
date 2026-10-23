import Button from "./Button";
import Section from "./Section";

export default function ContactSection() {
  return (
    <Section
      id="contact"
      kicker="Get in touch"
      title="Let's Build Something"
      sub="Open to internships, junior roles and collaborations — the fastest way to reach me is email or GitHub."
      centered
    >
      <div className="reveal flex flex-wrap justify-center gap-3">
        <Button href="mailto:greattimeatday@gmail.com">Say Hello 👋</Button>
        <Button href="https://github.com/Exor10" variant="ghost" external>
          github.com/Exor10
        </Button>
      </div>
    </Section>
  );
}
