// This component will be reworked and integrated into the MYDS component library soon.
import { Button } from "@govtechmy/myds-react/button";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowOutgoingIcon,
} from "@govtechmy/myds-react/icon";
import { useEffect, useState, useCallback, createContext, useContext, type ReactNode } from "react";

export type SiaranMYDSData = {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
  url: string;
  information: string;
};

interface SiaranContextType {
  data: SiaranMYDSData[];
  current: number;
  isTransitioning: boolean;
  goToSlide: (index: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  currentItem: SiaranMYDSData | undefined;
  childrenCount: number;
  setChildrenCount: (count: number) => void;
}

const SiaranContext = createContext<SiaranContextType | undefined>(undefined);

const useSiaranContext = () => {
  const context = useContext(SiaranContext);
  if (!context) {
    throw new Error("Siaran components must be used within a Siaran component");
  }
  return context;
};

interface SiaranProps {
  children: ReactNode;
  dataItemSiaran?: SiaranMYDSData[];
  jsonData?: string;
  className?: string;
}

interface SiaranHeaderProps {
  children: ReactNode;
  className?: string;
}

interface SiaranContentProps {
  children: ReactNode;
  className?: string;
}

interface SiaranInfoProps {
  children: ReactNode;
  className?: string;
}

interface SiaranTitleProps {
  children?: ReactNode;
  className?: string;
}

interface SiaranDescriptionProps {
  children?: ReactNode;
  className?: string;
}

interface SiaranActionProps {
  children?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

interface SiaranCarouselProps {
  children?: ReactNode;
  className?: string;
}

interface SiaranCarouselItemProps {
  item: SiaranMYDSData;
  className?: string;
  children?: ReactNode;
}

interface SiaranControlsProps {
  children?: ReactNode;
  className?: string;
}

// Main Siaran component (Provider)
function Siaran({ children, dataItemSiaran, jsonData, className = "" }: SiaranProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [data, setData] = useState<SiaranMYDSData[]>([]);
  const [childrenCount, setChildrenCount] = useState(0);

  useEffect(() => {
    if (dataItemSiaran && dataItemSiaran.length > 0) {
      setData(dataItemSiaran);
    } else if (jsonData) {
      try {
        const parsedData = JSON.parse(jsonData);
        setData(Array.isArray(parsedData) ? parsedData : [parsedData]);
      } catch (error) {
        console.error("Invalid JSON data provided:", error);
        setData([]);
      }
    } else {
      setData([]);
    }
  }, [dataItemSiaran, jsonData]);

  const totalItems = childrenCount > 0 ? childrenCount : data.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current || isTransitioning) return;

      setIsTransitioning(true);
      setCurrent(index);

      setTimeout(() => setIsTransitioning(false), 100);
    },
    [current, isTransitioning]
  );

  const goToPrevious = useCallback(() => {
    if (current > 0) {
      const newIndex = current - 1;
      goToSlide(newIndex);
    }
  }, [current, goToSlide]);

  const goToNext = useCallback(() => {
    if (current < totalItems - 1) {
      const newIndex = current + 1;
      goToSlide(newIndex);
    }
  }, [current, totalItems, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && current > 0) {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight" && current < totalItems - 1) {
        event.preventDefault();
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [current, totalItems, goToPrevious, goToNext]);

  const currentItem = data[current];

  const contextValue: SiaranContextType = {
    data,
    current,
    isTransitioning,
    goToSlide,
    goToPrevious,
    goToNext,
    currentItem,
    childrenCount,
    setChildrenCount,
  };

  return (
    <SiaranContext.Provider value={contextValue}>
      <div className={`w-full py-12 lg:py-16 ${className}`}>
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </SiaranContext.Provider>
  );
}

// Header component
function SiaranHeader({ children, className = "" }: SiaranHeaderProps) {
  return (
    <div className={`text-txt-primary font-body font-semibold text-sm tracking-[2.8px] ${className}`}>
      {children}
    </div>
  );
}

// Content wrapper component
function SiaranContent({ children, className = "" }: SiaranContentProps) {
  return (
    <div className={`flex flex-col-reverse gap-8 lg:flex-row lg:gap-12 ${className}`}>
      {children}
    </div>
  );
}

// Info section component
function SiaranInfo({ children, className = "" }: SiaranInfoProps) {
  return (
    <div className={`flex flex-col justify-between lg:w-1/3 lg:py-[56px] ${className}`}>
      <div className="gap-[18px] flex flex-col">
        {children}
      </div>
    </div>
  );
}

// Title component
function SiaranTitle({ children, className = "" }: SiaranTitleProps) {
  const { currentItem } = useSiaranContext();
  
  return (
    <h2 className={`text-heading-sm font-bold font-heading text-txt-black-900 lg:text-3xl !mt-[0px] ${className}`}>
      {children || currentItem?.title || ""}
    </h2>
  );
}

// Description component
function SiaranDescription({ children, className = "" }: SiaranDescriptionProps) {
  const { currentItem } = useSiaranContext();
  
  return (
    <p className={`text-body-md font-normal text-txt-black-700 leading-relaxed ${className}`}>
      {children || currentItem?.information || ""}
    </p>
  );
}

// Action component
function SiaranAction({ children, href, onClick, className = "" }: SiaranActionProps) {
  return (
    <div className="mt-3">
      <Button
        variant="primary-fill"
        size="medium"
        className={`rounded-full ${className}`}
        onClick={onClick || (() => window.open(href || "https://www.google.com", "_blank"))}
      >
        {children || (
          <>
            Ketahui lebih lanjut <ArrowOutgoingIcon />
          </>
        )}
      </Button>
    </div>
  );
}

// Carousel component
function SiaranCarousel({ children, className = "" }: SiaranCarouselProps) {
  const { current, setChildrenCount } = useSiaranContext();
  
  useEffect(() => {
    if (children && Array.isArray(children)) {
      setChildrenCount(children.length);
    } else if (children) {
      setChildrenCount(1);
    } else {
      setChildrenCount(0);
    }
  }, [children, setChildrenCount]);
  
  return (
    <div className={`lg:w-2/3 relative ${className}`}>
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// Carousel Item component
function SiaranCarouselItem({ item, className = "", children }: SiaranCarouselItemProps) {
  return (
    <div className={`w-full flex-shrink-0 border border-otl-gray-200 overflow-hidden rounded-2xl ${className}`}>
      <div className="relative">
        {children || (
          <img
            src={item?.image}
            alt={item?.title || "Image"}
            className="w-full object-cover sm:h-[450px]"
          />
        )}
      </div>
    </div>
  );
}

// Controls component
function SiaranControls({ children, className = "" }: SiaranControlsProps) {
  const { data, current, goToPrevious, goToNext, goToSlide, isTransitioning, childrenCount } = useSiaranContext();
  
  const totalItems = childrenCount > 0 ? childrenCount : data.length;
  
  if (totalItems <= 1) return null;
  
  return (
    <div className={`flex flex-col-reverse items-center gap-6 lg:flex-row lg:justify-between px-4 ${className}`}>
      <div className="flex gap-2">
        <Button
          variant="default-outline"
          size="medium"
          className="h-10 w-10 rounded-full text-txt-black-700"
          onClick={goToPrevious}
          disabled={current === 0}
          aria-label="Previous slide"
        >
          <ArrowBackIcon className="w-4 h-4 " />
        </Button>
        <Button
          variant="default-outline"
          size="medium"
          className="h-10 w-10 rounded-full text-txt-black-700"
          onClick={goToNext}
          disabled={current === totalItems - 1}
          aria-label="Next slide"
        >
          <ArrowForwardIcon className="w-4 h-4 " />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalItems }, (_, i) => (
          <button
            key={i}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-4 h-2 bg-primary-600"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => goToSlide(i)}
            disabled={isTransitioning}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? "true" : "false"}
          />
        ))}
      </div>
      {children}
    </div>
  );
}

// Attach sub-components to the main Siaran component
Siaran.Header = SiaranHeader;
Siaran.Content = SiaranContent;
Siaran.Info = SiaranInfo;
Siaran.Title = SiaranTitle;
Siaran.Description = SiaranDescription;
Siaran.Action = SiaranAction;
Siaran.Carousel = SiaranCarousel;
Siaran.CarouselItem = SiaranCarouselItem;
Siaran.Controls = SiaranControls;

// Legacy component for backward compatibility
export default function SiaranMYDS({
  dataItemSiaran,
  jsonData,
  header,
}: {
  dataItemSiaran: SiaranMYDSData[];
  jsonData?: string;
  header?: string;
}) {
  return (
    <Siaran dataItemSiaran={dataItemSiaran} jsonData={jsonData}>
      <Siaran.Content>
        <Siaran.Info>
          <Siaran.Header>{header}</Siaran.Header>
          <Siaran.Title />
          <Siaran.Description />
          <Siaran.Action />
        </Siaran.Info>
        <Siaran.Carousel>
          {dataItemSiaran.map((item) => (
            <SiaranCarouselItem key={item.id} item={item} />
          ))}
        </Siaran.Carousel>
      </Siaran.Content>
      <Siaran.Controls />
    </Siaran>
  );
}

// Export the compound component as well
export { Siaran };

/*
USAGE EXAMPLES:

1. Basic Siaran with data:
   <Siaran dataItemSiaran={siaranData}>
     <Siaran.Content>
       <Siaran.Info>
         <Siaran.Header>SIARAN</Siaran.Header>
         <Siaran.Title />
         <Siaran.Description />
         <Siaran.Action />
       </Siaran.Info>
       <Siaran.Carousel>
         {siaranData.map((item) => (
           <Siaran.CarouselItem key={item.id} item={item} />
         ))}
       </Siaran.Carousel>
     </Siaran.Content>
     <Siaran.Controls />
   </Siaran>

2. Legacy component usage (backward compatibility):
   <SiaranMYDS 
     dataItemSiaran={siaranData}
     header="SIARAN"
   />

3. Custom content with overrides:
   <Siaran dataItemSiaran={siaranData}>
     <Siaran.Content>
       <Siaran.Info>
         <Siaran.Header className="text-blue-600">CUSTOM HEADER</Siaran.Header>
         <Siaran.Title>Custom Title Override</Siaran.Title>
         <Siaran.Description>Custom description text</Siaran.Description>
         <Siaran.Action href="https://custom-url.com">Custom Action</Siaran.Action>
       </Siaran.Info>
       <Siaran.Carousel>
         {siaranData.map((item) => (
           <Siaran.CarouselItem key={item.id} item={item}>
             <img src={item.image} alt={item.title} className="w-full h-[300px] object-cover" />
           </Siaran.CarouselItem>
         ))}
       </Siaran.Carousel>
     </Siaran.Content>
     <Siaran.Controls className="px-8" />
   </Siaran>

4. Data structure for SiaranMYDSData:
   const siaranData = [
     {
       id: 1,
       category: "News",
       title: "Important Announcement",
       date: "2024-01-15",
       image: "/path/to/image.jpg",
       url: "https://example.com/news/1",
       information: "Detailed information about the announcement..."
     }
   ];

5. Using JSON data instead of array:
   <Siaran jsonData='[{"id":1,"title":"Test","image":"/test.jpg",...}]'>
     <Siaran.Content>
       <Siaran.Info>
         <Siaran.Header>JSON DATA</Siaran.Header>
         <Siaran.Title />
         <Siaran.Description />
         <Siaran.Action />
       </Siaran.Info>
       <Siaran.Carousel>
         // Children managed automatically by context
       </Siaran.Carousel>
     </Siaran.Content>
     <Siaran.Controls />
   </Siaran>

FEATURES:
- Keyboard navigation (Arrow keys)
- Auto-disable navigation at boundaries  
- Smooth transitions with loading states
- Context-based data sharing between components
- Supports both data array and JSON string input
- Custom content override capabilities
- Responsive design (mobile/desktop layouts)
- Automatic slide management and transitions
*/
