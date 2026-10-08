import Link from 'next/link';

type Hotel = {
  id: string;
  name: string;
  description: string;
  location: string;
  image_url: string | null;
};

type HotelListProps = {
  hotels: Hotel[];
};

export default function HotelList({ hotels }: HotelListProps) {
  if (hotels.length === 0) {
    return <p className="text-gray-500">No hotels found.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {hotels.map((hotel) => (
        <Link
          key={hotel.id}
          href={`/hotels/${hotel.id}`}
          className="group"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full">
              {hotel.image_url ? (
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">No Image</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {hotel.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {hotel.location}
              </p>
              <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                {hotel.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}