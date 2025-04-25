import { useEventDetailStore } from '../../store';

export default function SearchBox() {
  const { searchQuery, setSearchQuery } = useEventDetailStore();

  return (
    <input
      type="text"
      placeholder="Search by Sport"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
      className="border-solid rounded-xl border-2 w-1/2 h-15 p-2"
    />
  );
}