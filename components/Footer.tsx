import CurrentYear from "./CurrentYear";

export default function Footer() {
  return (
    <footer className="border-t border-hairline py-8 text-center font-mono text-xs text-subtle">
      <p>
        Designed &amp; built by Nathan Ian Comiso · © <CurrentYear />
      </p>
    </footer>
  );
}
