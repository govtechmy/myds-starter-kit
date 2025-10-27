import MastHeadMYDS from "./component/MastHeadMYDS";
import NavbarMYDS from "./component/NavbarMYDS";
import FooterMYDS from "./component/FooterMYDS";
import { pautanPopular } from "./contentData";
import { Button } from "@govtechmy/myds-react/button";
import HeroLight from "./assets/heroLight";
import Hero from "./component/Hero";
import SearchBarMyds from "./component/SearchBarMyds";

function App() {
  return (
    <div className="">
      <MastHeadMYDS />
      <NavbarMYDS />
      <Hero
        title="Selamat Datang Ke PortalMY"
        background={<HeroLight className="w-full h-full object-cover" />}
        search={<SearchBarMyds />}
        links={
          <div className="flex flex-col gap-3 w-full">
            <div className="text-body-sm text-txt-black-500 justify-center flex">
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
                  <div className="max-w-[150px] truncate">{item.name}</div>
                </Button>
              ))}
            </div>
          </div>
        }
      ></Hero>
      <BodyApp>
        hehe
      </BodyApp>

      <FooterMYDS />
    </div>
  );
}

export default App;

// // body design
// // uncomment below to use body design
function BodyApp({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex-1 px-[18px] sm:px-[18px] md:px-[24px] lg:px-[24px] xl:px-[24px] max-w-[1328px] p-8 flex w-full overflow-visible">
      <div className="w-full overflow-visible">{children}</div>
    </div>
  );
}
