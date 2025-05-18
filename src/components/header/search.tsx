import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  return (
    <Button variant="ghost" className="size-10 cursor-not-allowed rounded-full hover:bg-slate-200">
      <SearchIcon className="size-5" />
    </Button>
  );
}
