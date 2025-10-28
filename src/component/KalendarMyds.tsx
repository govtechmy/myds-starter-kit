// This component will be reworked and integrated into the MYDS component library soon.
import { Button } from "@govtechmy/myds-react/button";
import { ArrowForwardIcon } from "@govtechmy/myds-react/icon";



interface KalendarProps {
  header?: string;
  title?: string;
  children?: React.ReactNode;
}

export default function KalendarMyds({
  children,
  header,
  title,
}: KalendarProps) {
  return (
    <div className="w-full flex flex-col py-16 border-t border-otl-gray-200">
      <div className="flex flex-col gap-4">
        <div className="text-txt-primary font-body font-semibold text-sm tracking-[2.8px]">
          {title}
        </div>
        <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-2">
          <div className="text-txt-black-900 font-heading font-semibold text-heading-sm">
            {header}
          </div>
          <Button variant="default-outline" onClick={() => window.open("https://www.google.com", "_blank")}>
            Semua Acara <ArrowForwardIcon />
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
