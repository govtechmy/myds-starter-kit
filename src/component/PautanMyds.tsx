// This component will be reworked and integrated into the MYDS component library soon.
import { Button } from "@govtechmy/myds-react/button";
import { ArrowOutgoingIcon } from "@govtechmy/myds-react/icon";

type LinkItem = {
  id: number;
  icon: React.ReactElement;
  websiteName: string;
  Link: string;
};

type PautanMydsProps = {
  dataItemLinks: LinkItem[];
  header?: string;
  title?: string;
};

export default function PautanMyds({
  dataItemLinks,
  header,
  title,
}: PautanMydsProps) {
  return (
    <div className="flex flex-col gap-12 py-16 border-t border-otl-gray-200">
      <div className="gap-4 flex flex-col">
        <div className="text-txt-primary font-body font-semibold text-sm tracking-[2.8px] pb-4">
          {header}
        </div>
        <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-2">
          <div className="text-txt-black-900 font-heading font-semibold text-heading-sm">
            {title}
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-3 ">
        {dataItemLinks.map((item: LinkItem) => {
          return (
            <div key={item.id}>
              <Button
                variant={"default-outline"}
                size="large"
                className="flex justify-between gap-4.5 p-4.5 rounded-[14px] w-full"
              >
                <div className="flex items-center">
                  <div className="bg-bg-white-hover size-12 rounded-full border border-otl-divider items-center justify-center flex">
                    {item.icon}
                  </div>
                  <div className="pl-2 text-start font-heading text-body-md font-semibold">
                    {item.websiteName.split(" ")[0]}
                  </div>
                </div>
                <div className="p-1.5">
                  <ArrowOutgoingIcon />
                </div>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
