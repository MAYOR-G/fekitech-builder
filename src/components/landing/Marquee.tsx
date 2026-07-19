export default function Marquee() {
  const items = [
    { text: "No code", gradient: false },
    { text: "Launch faster", gradient: true },
    { text: "No stress", gradient: false },
    { text: "Customizable", gradient: true },
    { text: "No code", gradient: false },
    { text: "Launch faster", gradient: true },
    { text: "No stress", gradient: false },
    { text: "Customizable", gradient: true },
  ];

  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} className="flex items-center gap-6 mx-6">
        <span
          className={`text-3xl md:text-5xl font-bold whitespace-nowrap ${
            item.gradient ? "gradient-text" : "text-ft-muted"
          }`}
        >
          {item.text}
        </span>
        <span className="text-ft-muted/40 text-lg">✦</span>
      </span>
    ));

  return (
    <div className="w-full bg-white border-y border-ft-border-light py-8 md:py-12 overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee-scroll 30s linear infinite",
          width: "max-content",
        }}
      >
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  );
}
