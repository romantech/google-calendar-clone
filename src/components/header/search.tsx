import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  return (
    <Button variant="ghost" className="hover:bg-hover size-10 cursor-not-allowed rounded-full">
      <SearchIcon className="size-5" />
    </Button>
  );
}
