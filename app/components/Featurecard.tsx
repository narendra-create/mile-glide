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
    <div className="border border-ink-muted/40 p-5 flex flex-col lg:w-86 lg:h-48 gap-2">
      {item.isghost && <div className="step-n text-2xl lg:text-4xl">0{item.ghostnumber}</div>}
      <h3 className="text-[14px] lg:text-[17px]">{item.title}</h3>
      <p className="text-sm text-ink-muted/78 lg:text-[12px]">{item.body}</p>
    </div>
  );
}
