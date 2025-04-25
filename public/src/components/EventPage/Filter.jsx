import { useEventDetailStore } from '../../store';

export default function Filter() {
  const { filterType, setFilterType } = useEventDetailStore();

  return (
    <div className="flex gap-5 bg-darkGreen p-3 rounded items-center">
      <label className="text-customwhite font-extrabold text-lg">Filter:</label>
      <select
        name="Filter"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="bg-lightgray text-blak p-2 rounded"
      >
        <option value="">All</option>
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>
    </div>
  );
}