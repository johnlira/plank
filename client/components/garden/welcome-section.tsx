interface WelcomeSectionProps {
  userName?: string;
}

export function WelcomeSection({ userName }: WelcomeSectionProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground">
        Hello, {userName || "Guest"}!
      </h1>
      <p className="mt-2 text-muted-foreground">
        Welcome to your garden. Start adding your plants.
      </p>
    </div>
  );
}
