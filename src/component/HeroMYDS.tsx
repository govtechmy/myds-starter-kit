import React from 'react';
import { Button } from "@govtechmy/myds-react/button";

interface HeroProps {
  children: React.ReactNode;
  className?: string;
}

interface HeroBackgroundProps {
  children: React.ReactNode;
}

interface HeroContentProps {
  children: React.ReactNode;
  className?: string;
}

interface HeroTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface HeroSearchProps {
  children: React.ReactNode;
  className?: string;
}

interface HeroLinksProps {
  children: React.ReactNode;
  className?: string;
}

interface HeroLinksHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface HeroLinksContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface HeroLinkItemProps {
  item: {
    name: string;
    link: string;
    icon: React.ReactNode;
  };
  className?: string;
  children?: React.ReactNode;
}

// Main Hero component
function Hero({ children, className = "" }: HeroProps) {
  return (
    <section className={`relative border-b border-otl-gray-200 min-h-[500px] flex flex-col ${className}`}>
      {children}
    </section>
  );
}

// Background component
function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full justify-center flex">
      {children}
    </div>
  );
}

// Content wrapper component
function HeroContent({ children, className = "" }: HeroContentProps) {
  return (
    <div className={`flex-1 w-full px-6 py-16 flex flex-col justify-center ${className}`}>
      <div className="flex flex-col gap-6">
        {children}
      </div>
    </div>
  );
}

// Title component
function HeroTitle({ children, className = "" }: HeroTitleProps) {
  return (
    <h1 className={`text-txt-black-900 font-heading font-semibold text-heading-md text-center mb-3 ${className}`}>
      {children}
    </h1>
  );
}

// Search component
function HeroSearch({ children, className = "" }: HeroSearchProps) {
  return (
    <div className="items-center flex w-full justify-center">
      <div className={`flex-1 max-w-[600px] ${className}`}>
        {children}
      </div>
    </div>
  );
}

// Links component
function HeroLinks({ children, className = "" }: HeroLinksProps) {
  return (
    <div className="items-center flex w-full justify-center">
      <div className={`flex-1 max-w-[850px] ${className}`}>
        <div className="flex flex-col gap-3 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

// Links Header component
function HeroLinksHeader({ children, className = "" }: HeroLinksHeaderProps) {
  return (
    <div className={`text-body-sm font-body font-normal text-txt-black-700 justify-center flex ${className}`}>
      {children}
    </div>
  );
}

// Links Container component
function HeroLinksContainer({ children, className = "" }: HeroLinksContainerProps) {
  return (
    <div className={`flex flex-row flex-wrap gap-[6px] justify-center ${className}`}>
      {children}
    </div>
  );
}

// Individual Link Item component
function HeroLinkItem({ item, className = "", children }: HeroLinkItemProps) {
  return (
    <Button
      variant="default-outline"
      className={`rounded-full text-xs text-txt-black-900 ${className}`}
      size="medium"
      onClick={() => window.open(item.link, "_blank")}
    >
      {children || (
        <>
          <div className="rounded-full bg-primary-50 text-txt-primary size-8 items-center justify-center flex">
            {item.icon}
          </div>
          <div className="text-left text-txt-black-700 font-body font-medium text-xs leading-snug line-clamp-2 max-w-[150px] break-words">
            {item.name}
          </div>
        </>
      )}
    </Button>
  );
}

// Attach sub-components to the main Hero component
Hero.Background = HeroBackground;
Hero.Content = HeroContent;
Hero.Title = HeroTitle;
Hero.Search = HeroSearch;
Hero.Links = HeroLinks;
Hero.LinksHeader = HeroLinksHeader;
Hero.LinksContainer = HeroLinksContainer;
Hero.LinkItem = HeroLinkItem;

export default Hero;

// This component will be reworked and integrated into the MYDS component library soon.
/* 
USAGE EXAMPLES:

// Basic Hero with Background and Title
<Hero>
  <Hero.Background>
    <img src="/hero-bg.jpg" alt="Background" className="w-full h-full object-cover" />
  </Hero.Background>
  <Hero.Content>
    <Hero.Title>Welcome to PortalMY</Hero.Title>
  </Hero.Content>
</Hero>

// Complete Hero Section (like in App.tsx)
<Hero>
  <Hero.Background>
    {isDarkMode ? <HeroDark /> : <HeroLight />}
  </Hero.Background>
  <Hero.Content>
    <Hero.Title>Selamat Datang Ke PortalMY</Hero.Title>
    <Hero.Search>
      <SearchBarMyds />
    </Hero.Search>
    <Hero.Links>
      <Hero.LinksHeader>Pautan Popular:</Hero.LinksHeader>
      <Hero.LinksContainer>
        {pautanPopular.map((item, index) => (
          <Hero.LinkItem key={index} item={item} />
        ))}
      </Hero.LinksContainer>
    </Hero.Links>
  </Hero.Content>
</Hero>

// Data structure for Hero.LinkItem:
const linkData = {
  name: "Service Name",
  link: "https://example.com",
  icon: <IconComponent />
};

// Custom styling examples:
<Hero className="custom-hero-class">
  <Hero.Title className="text-blue-600">Custom Title</Hero.Title>
  <Hero.LinkItem item={linkData} className="hover:bg-primary-100" />
</Hero>
*/

