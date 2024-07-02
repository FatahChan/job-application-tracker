import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import type { PropsWithChildren } from 'react';
import type { Column } from '@tanstack/react-table';

function HeaderArrow({ isSorted }: { isSorted: 'asc' | 'desc' | false }) {
  switch (isSorted) {
    case 'asc':
      return <ArrowUp className="ml-2 h-4 w-4" />;
    case 'desc':
      return <ArrowDown className="ml-2 h-4 w-4" />;
    default:
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
  }
}
function SortableHeader<TData>({ column, children }: PropsWithChildren<{ column: Column<TData> }>) {
  return (
    <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {children}
      <HeaderArrow isSorted={column.getIsSorted()} />
    </Button>
  );
}

export default SortableHeader;
