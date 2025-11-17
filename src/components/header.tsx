export default function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-foreground">
            Companies Directory
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover and explore companies from around the world
          </p>
        </div>
      </div>
    </header>
  );
}
