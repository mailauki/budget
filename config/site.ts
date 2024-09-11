export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Boho Budget",
  description: "Make a budget and track your expenses.",
  navItems: [
    {
      label: "Transactions",
      href: "/transactions",
    },
    {
      label: "Budget",
      href: "/budget",
    },
    {
      label: "Goals",
      href: "/goals",
    },
  ],
  navMenuItems: [
    {
      label: "Overview",
      href: "/",
    },
    {
      label: "Transactions",
      href: "/transactions",
    },
    {
      label: "Budget",
      href: "/budget",
    },
    {
      label: "Goals",
      href: "/goals",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
