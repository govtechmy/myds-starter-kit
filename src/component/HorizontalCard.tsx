import { Button, ButtonIcon } from "@govtechmy/myds-react/button";
import { ArrowBackIcon, ArrowForwardIcon } from "@govtechmy/myds-react/icon";
import { useRef, useState } from "react";

interface HorizontalCardProps {
  children?: React.ReactNode;
  totalPages?: number; // total number of "dot" indicators
}

export default function HorizontalCard({
  children,
  totalPages = 4,
}: HorizontalCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollAmount = 248 + 18; // card width (248px) + gap (18px for gap-4.5)

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const scrollPosition = scrollAmount * index;
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
    setActiveIndex(index);
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      const newIndex = activeIndex - 1;
      scrollToIndex(newIndex);
      setActiveIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (activeIndex < totalPages - 1) {
      const newIndex = activeIndex + 1;
      scrollToIndex(newIndex);
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="justify-between flex mb-10 items-center" />

      <div
        ref={scrollRef}
        className="flex gap-4.5 w-full overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
      >
        {children}
      </div>

      <div className="flex justify-between items-center max-sm:flex-col max-sm gap-2 pt-8">
        {/*  Blue Dots */}
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
        <div></div>

        {/*  Arrow Buttons */}
        <div className="flex gap-2 pl-2 ">
          <Button 
            variant="default-outline" 
            className="p-2 disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handlePrev}
            disabled={activeIndex === 0}
          >
            <ButtonIcon>
              <ArrowBackIcon className="size-5" />
            </ButtonIcon>
          </Button>
          <Button 
            variant="default-outline" 
            className="p-2 disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handleNext}
            disabled={activeIndex === totalPages - 1}
          >
            <ButtonIcon>
              <ArrowForwardIcon className="size-5" />
            </ButtonIcon>
          </Button>
        </div>
      </div>
    </div>
  );
}
