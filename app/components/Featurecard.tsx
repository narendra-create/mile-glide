export type cardprop = {
  title: string;
  isghost?: boolean;
  ghostnumber?: number;
  body: string;
};

type usedpropincard = {
  item: cardprop;
};

export function Featurecard({ item }: usedpropincard) {
  return (
    <div
      className={`border border-ink-muted/40 p-5 ${!item.isghost ? "lg:min-h-[140px] lg:pt-8": "min-h-[180px]"} flex flex-col w-full gap-2`}
    >
      {item.isghost && (
        <div className="step-n text-2xl lg:text-4xl">0{item.ghostnumber}</div>
      )}
      <h3
        className={`text-[14px] lg:text-[17px] ${item.isghost ? "lg:text-[17px]" : "lg:text-[18px]"}`}
      >
        {item.title}
      </h3>
      <p
        className={`text-sm text-ink-muted/78 ${item.isghost ? "lg:text-[12px]" : "lg:text-[14px]"}`}
      >
        {item.body}
      </p>
    </div>
  );
}
