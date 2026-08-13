type Agency = {
  id: string;
  slug: string;
  name: string;
};

type AgencyHomePageProps = {
  agency: Agency;
};

export function AgencyHomePage({ agency }: AgencyHomePageProps) {
  return (
    <main className="min-h-screen bg-muted text-foreground">
      <header className="border-b bg-background px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Agency portal
          </p>
          <h1 className="text-xl font-semibold tracking-tight">{agency.name}</h1>
        </div>
      </header>
    </main>
  );
}
