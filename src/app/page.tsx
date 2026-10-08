import { supabase } from '@/lib/supabase';
import HeroSection from '@/components/HeroSection';
import SearchForm from '@/components/SearchForm';
import HotelList from '@/components/HotelList';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch featured hotels (we'll just get all hotels for now)
  const { data: hotels, error } = await supabase
    .from('hotels')
    .select('*')
    .limit(3);

  if (error) {
    console.error('Error fetching hotels:', error);
    return <div>Error loading hotels</div>;
  }

  return (
    <>
      <HeroSection />
      <SearchForm />
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Hotels</h2>
          <HotelList hotels={hotels || []} />
        </div>
      </section>
    </>
  );
}
