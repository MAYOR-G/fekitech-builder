type ButtonLinkProps = {
  href: string;
  children: string;
  variant?: "dark" | "light" | "outline";
  onNavigate?: (page: string) => void;
};

function pageFromHref(href: string) {
  if (href === "#/flavors") return "flavors";
  if (href === "#/about") return "about";
  if (href === "#/book-event") return "book-event";
  return "";
}

export default function ButtonLink({ href, children, variant = "dark", onNavigate }: ButtonLinkProps) {
  return (
    <a
      className={`vs-button vs-button--${variant}`}
      href={href}
      onClick={(event) => {
        const page = pageFromHref(href);
        if (!page || !onNavigate) return;
        event.preventDefault();
        onNavigate(page);
      }}
    >
      <span>{children}</span>
    </a>
  );
}
