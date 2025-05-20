import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  return (
    <Button disabled variant="ghost" className="size-10 rounded-full hover:bg-slate-200">
      <SearchIcon className="size-5" />
    </Button>
  );
}
