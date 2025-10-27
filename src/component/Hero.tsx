export default function Hero({
  title,
  search,
  links,
  background,
}: {
  title: string;
  search?: React.ReactNode;
  links?: React.ReactNode;
  background?: React.ReactNode;
}) {
  return (
    <section className="relative border-b border-outline-200 min-h-[500px] flex flex-col">
      <div className="absolute inset-0 -z-10 w-full h-full justify-center flex">
        {background}
      </div>
      <div className="flex-1 w-full px-6 py-16 flex flex-col justify-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-txt-black-900 font-heading font-semibold text-heading-md text-center mb-3">
            {title}
          </h1>
          <div className="items-center flex w-full justify-center">
            <div className="flex-1 max-w-[600px]">{search}</div>
          </div>
          <div className="items-center flex w-full justify-center">
            <div className="flex-1 max-w-[850px]">{links}</div>
          </div>
        </div>
      </div>
    </section>
  );
}