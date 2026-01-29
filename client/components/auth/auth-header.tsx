interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <h1 className="mb-2 text-3xl font-bold text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
