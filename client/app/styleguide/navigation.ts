export interface NavItem {
  name: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [{ name: "Design Tokens", href: "/styleguide" }],
  },
  {
    title: "Components",
    items: [
      { name: "Feature Card", href: "/styleguide/components/feature-card" },
      {
        name: "Plant Presentation Card",
        href: "/styleguide/components/plant-presentation-card",
      },
    ],
  },
];
