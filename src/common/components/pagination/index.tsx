import { PaginationControll, PaginationItem } from "./pagination-item";

export interface PaginationProps {
  total: number;
  perPage: number;
  page: number;
  value: (page: any) => void;
  change: () => void;
}

export const Pagination = ({
  total,
  perPage,
  page,
  value,
  change,
}: PaginationProps) => {
  const totalItemPages = Math.ceil(total / perPage);

  const items: number[] = Array.from(
    { length: totalItemPages },
    (_, i) => i + 1
  );

  const next = () => {
    if (page < totalItemPages) {
      value(page + 1);
      change();
    }
  };

  const prev = () => {
    if (page > 1) {
      value(page - 1);
      change();
    }
  };

  const goTo = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalItemPages) {
      value(newPage);
      change();
    }
  };

  return (
    <>
      <div className="flex gap-1">
        <PaginationControll change={prev} type="prev" disabled={!(page > 1)} />
        {items.map((item) => (
          <PaginationItem
            change={() => goTo(item)}
            key={item}
            text={item}
            active={item === page}
          />
        ))}
        <PaginationControll change={next} type="next" disabled={!(page < totalItemPages)} />
      </div>
    </>
  );
};
