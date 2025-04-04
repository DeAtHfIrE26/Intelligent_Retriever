import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { useDocumentContext } from "@/context/DocumentContext";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const { setSearchQuery, performSearch } = useDocumentContext();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
    if (localSearchQuery.trim()) {
      performSearch(localSearchQuery);
    }
  };
  
  return (
    <div className="max-w-lg w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <Input
          ref={inputRef}
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          type="text"
          placeholder="Search documents..."
          className="block w-full pl-10 pr-12 py-2 border border-slate-300 rounded-md bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-2">
          <kbd className="inline-flex items-center rounded border border-slate-200 px-2 text-sm font-sans font-medium text-slate-400">⌘K</kbd>
        </div>
      </form>
    </div>
  );
}
