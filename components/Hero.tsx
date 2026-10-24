import Button from "./Button";
import HeroHeading from "./HeroHeading";

export default function Hero() {
  return (
    <section id="home" className="flex min-h-svh items-center pt-28 pb-16">
      <div className="page-wrap">
        <p className="reveal mb-4 font-mono text-sm text-muted">Hi, my name is</p>
        <HeroHeading />
        <p className="reveal mt-8 max-w-[560px] text-lg/[1.65] text-muted">
          Software engineering student who enjoys building across the whole stack — from backend
          services and machine learning models to responsive web apps and desktop tools.
        </p>
        <div className="reveal mt-8 flex flex-wrap gap-3">
          <Button href="#projects">View Projects</Button>
          <Button href="#stack" variant="ghost">
            My Tech Stack
          </Button>
        </div>
      </div>
    </section>
  );
}
