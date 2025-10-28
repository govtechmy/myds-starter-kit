// This component will be reworked and integrated into the MYDS component library soon.
import { Button, ButtonIcon } from "@govtechmy/myds-react/button";
import { ArrowBackIcon, ArrowForwardIcon } from "@govtechmy/myds-react/icon";
import { Tag } from "@govtechmy/myds-react/tag";
import { useRef, createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Context for sharing scroll functionality between components
interface HorizontalCardContextType {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  scroll: (offset: number) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  totalPages: number;
  setTotalPages: (total: number) => void;
}

const HorizontalCardContext = createContext<HorizontalCardContextType | null>(null);

// Hook to use the context
const useHorizontalCard = () => {
  const context = useContext(HorizontalCardContext);
  if (!context) {
    throw new Error('HorizontalCard components must be used within a HorizontalCard');
  }
  return context;
};

// Main HorizontalCard component
interface HorizontalCardProps {
  children: ReactNode;
}

function HorizontalCard({ children }: HorizontalCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(4); // default value

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const contextValue = {
    scrollRef,
    scroll,
    activeIndex,
    setActiveIndex,
    totalPages,
    setTotalPages,
  };

  return (
    <HorizontalCardContext.Provider value={contextValue}>
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </HorizontalCardContext.Provider>
  );
}

// Header component for title and controls
interface HorizontalCardHeaderProps {
  children?: ReactNode;
}

function HorizontalCardHeader({ children }: HorizontalCardHeaderProps) {
  return (
    <div className="justify-between flex mb-12 mt-4 items-center">
      {children}
    </div>
  );
}

// Title component
interface HorizontalCardTitleProps {
  children: ReactNode;
}

function HorizontalCardTitle({ children }: HorizontalCardTitleProps) {
  return (
    <div className="text-txt-black-900 font-heading font-semibold text-heading-sm">
      {children}
    </div>
  );
}

// Controls container
interface HorizontalCardControlsProps {
  children: ReactNode;
}

function HorizontalCardControls({ children }: HorizontalCardControlsProps) {
  return (
    <div className="flex gap-2 pl-2">
      {children}
    </div>
  );
}

// Arrow buttons
interface HorizontalCardArrowButtonProps {
  direction: 'left' | 'right';
}

function HorizontalCardArrowButton({ direction }: HorizontalCardArrowButtonProps) {
  const { activeIndex, setActiveIndex, totalPages, scrollRef } = useHorizontalCard();
  
  const handleClick = () => {
    let newIndex = activeIndex;
    const scrollAmount = 248 + 18; // card width (248px) + gap (18px for gap-4.5)
    
    if (direction === 'left' && activeIndex > 0) {
      newIndex = activeIndex - 1;
    } else if (direction === 'right' && activeIndex < totalPages - 1) {
      newIndex = activeIndex + 1;
    }
    
    // Update the active index
    setActiveIndex(newIndex);
    
    // Scroll to the new position
    if (scrollRef.current) {
      const scrollPosition = scrollAmount * newIndex;
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  const isDisabled = 
    (direction === 'left' && activeIndex === 0) || 
    (direction === 'right' && activeIndex === totalPages - 1);

  return (
    <Button
      variant="default-outline"
      className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleClick}
      disabled={isDisabled}
    >
      <ButtonIcon>
        {direction === 'left' ? (
          <ArrowBackIcon className="size-5" />
        ) : (
          <ArrowForwardIcon className="size-5" />
        )}
      </ButtonIcon>
    </Button>
  );
}

// Content/scrollable area
interface HorizontalCardContentProps {
  children: ReactNode;
}

function HorizontalCardContent({ children }: HorizontalCardContentProps) {
  const { scrollRef, setTotalPages } = useHorizontalCard();
  
  // Calculate total pages based on children count
  useEffect(() => {
    const childrenArray = Array.isArray(children) ? children : [children];
    const validChildren = childrenArray.filter(child => child !== null && child !== undefined);
    setTotalPages(validChildren.length);
  }, [children, setTotalPages]);
  
  return (
    <div
      ref={scrollRef}
      className="flex gap-4.5 w-full overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
    >
      {children}
    </div>
  );
}

// Footer component for dots and controls
interface HorizontalCardFooterProps {
  children?: ReactNode;
}

function HorizontalCardFooter({ children }: HorizontalCardFooterProps) {
  return (
    <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-2 pt-8">
      {children}
    </div>
  );
}

// Blue dots pagination
function HorizontalCardDots() {
  const { activeIndex, setActiveIndex, totalPages, scrollRef } = useHorizontalCard();
  const scrollAmount = 248 + 18; // card width (248px) + gap (18px for gap-4.5)

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const scrollPosition = scrollAmount * index;
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
    setActiveIndex(index);
  };

  return (
    <div className="flex items-center gap-2 pl-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => scrollToIndex(i)}
          className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
            i === activeIndex ? "bg-primary-600" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

// Individual Item component
interface HorizontalCardItemProps {
  item: {
    id: number;
    imageSrc: string;
    imageAlt: string;
    day: string;
    date: string;
    title: string;
  };
  children?: ReactNode;
  className?: string;
}

function HorizontalCardItem({ item, children, className = "" }: HorizontalCardItemProps) {
  return (
    <div
      className={`relative border border-otl-gray-200 rounded-lg p-3 h-[350px] min-w-[248px] w-[248px] flex flex-shrink-0 flex-col gap-4.5 overflow-hidden ${className}`}
    >
      {children || (
        <>
          {/* Background image */}
          <img
            src={item.imageSrc}
            alt={item.imageAlt}
            className="absolute inset-0 w-full h-full object-cover rounded-[6px] z-0"
          />
          {/* Background Layer (only half height) */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0)_100%)]"></div>

          {/* Foreground content */}
          <div className="relative z-10 flex flex-col justify-end h-full text-white px-3 pb-4 rounded-[6px]">
            <Tag variant="primary" className="w-fit">
              <div>{item.day}</div>
              <div> | </div>
              <div>{item.date}</div>
            </Tag>
            <div className="text-body-lg font-semibold text-white">
              {item.title}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Compound component exports
HorizontalCard.Header = HorizontalCardHeader;
HorizontalCard.Title = HorizontalCardTitle;
HorizontalCard.Controls = HorizontalCardControls;
HorizontalCard.ArrowButton = HorizontalCardArrowButton;
HorizontalCard.Content = HorizontalCardContent;
HorizontalCard.Footer = HorizontalCardFooter;
HorizontalCard.Dots = HorizontalCardDots;
HorizontalCard.Item = HorizontalCardItem;

export default HorizontalCard;
