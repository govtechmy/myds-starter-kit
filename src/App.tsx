import MastHeadMYDS from "./component/MastHeadMYDS";
import NavbarMYDS from "./component/NavbarMYDS";
import FooterMYDS from "./component/FooterMYDS";
import { kalendar, pautanPantas, pautanPopular, siaran } from "./contentData";
import { Button } from "@govtechmy/myds-react/button";
import HeroLight from "./assets/heroLight";
import Hero from "./component/Hero";
import SearchBarMyds from "./component/SearchBarMyds";
import SiaranMYDS from "./component/SiaranMYDS";
import KalendarMyds from "./component/KalendarMyds";
import HeroDark from "./assets/heroDark";
import { useState, useEffect } from "react";
import PautanMyds from "./component/PautanMyds";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Function to check if dark mode is active
    const checkDarkMode = () => {
      const htmlElement = document.documentElement;
      const hasDarkClass = htmlElement.classList.contains("dark");
      setIsDarkMode(hasDarkClass);
    };

    // Check initially
    checkDarkMode();

    // Create observer to watch for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          checkDarkMode();
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  return (
    <div className="">
      <MastHeadMYDS />
      <NavbarMYDS />
      <Hero
        title="Selamat Datang Ke PortalMY"
        // background={<HeroLight className="w-full h-full object-cover"/>}
        background={isDarkMode ? <HeroDark /> : <HeroLight />}
        search={<SearchBarMyds />}
        links={
          <div className="flex flex-col gap-3 w-full">
            <div className="text-body-sm font-body font-normal text-txt-black-700 justify-center flex">
              Pautan Popular:
            </div>
            <div className="flex flex-row flex-wrap gap-[6px] justify-center">
              {pautanPopular.map((item, index) => (
                <Button
                  key={index}
                  variant="default-outline"
                  className="rounded-full text-xs text-txt-black-900"
                  size="medium"
                  onClick={() => window.open(item.link, "_blank")}
                >
                  <div className="rounded-full bg-primary-50 text-txt-primary size-8 items-center justify-center flex">
                    {item.icon}
                  </div>
                  <div className="text-left text-txt-black-700 font-body font-medium text-xs leading-snug line-clamp-2 max-w-[150px] break-words">
                    {item.name}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        }
      ></Hero>
      <BodyApp>
        <SiaranMYDS dataItemSiaran={siaran} header="SIARAN" />
        <KalendarMyds
          kalendar={kalendar}
          title="Majlis yang bakal disambut tahun ini"
          header="KALENDAR"
        />
        <PautanMyds
          dataItemLinks={pautanPantas}
          title="Pautan Popular bagi rakyat awam"
          header="PAUTAN PANTAS"
        />
      </BodyApp>

      <FooterMYDS />
    </div>
  );
}

function BodyApp({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-bg-white">
      <div className="mx-auto flex-1 px-[18px] sm:px-[18px] md:px-[24px] lg:px-[24px] xl:px-[24px] max-w-[1328px] p-8 flex w-full overflow-visible">
        <div className="w-full px-0 sm:px-4 md:px-8 lg:px-16 xl:px-[109px]">{children}</div>
      </div>
    </div>
  );
}
