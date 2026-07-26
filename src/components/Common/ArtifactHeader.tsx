interface ArtifactHeaderProps {
  category: string;
  title: string;
}

export default function ArtifactHeader({ category, title }: ArtifactHeaderProps) {
  return (
    <header className="artifact-header">
      <div className="artifact-header__context" aria-label={`${category}, ${title}`}>
        <span>{category}</span>
        <span aria-hidden="true">/</span>
        <strong>{title}</strong>
      </div>
      <nav className="artifact-header__nav" aria-label={`${category} navigation`}>
        <a href="#/projects#experiments">← Back to Projects</a>
        <a href="#/">Home</a>
      </nav>
    </header>
  );
}
