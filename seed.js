const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY // we need to set this

if (!supabaseUrl || !supabaseServiceRole) {
  console.error('Missing env variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRole)

async function seed() {
  // Insert hotels
  const { data: hotels, error: hotelError } = await supabase
    .from('hotels')
    .insert([
      {
        name: 'Grand Ocean Hotel',
        description: 'Luxury beachfront hotel with stunning views and world-class amenities.',
        location: 'Malibu, California',
        image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60'
      },
      {
        name: 'Mountain Retreat Lodge',
        description: 'Cozy lodge nestled in the Rockies, perfect for a peaceful getaway.',
        location: 'Aspen, Colorado',
        image_url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=60'
      },
      {
        name: 'City Center Boutique',
        description: 'Modern boutique hotel in the heart of downtown, steps from attractions.',
        location: 'New York, New York',
        image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=60'
      }
    ])
    .select()

  if (hotelError) {
    console.error('Error inserting hotels:', hotelError)
    process.exit(1)
  }

  // Insert rooms for each hotel
  for (const hotel of hotels) {
    const rooms = [
      {
        hotel_id: hotel.id,
        type: 'Standard Room',
        description: 'Comfortable room with a queen bed and modern amenities.',
        price_per_night: 120.00,
        capacity: 2,
        image_url: 'https://images.unsplash.com/photo-1582719478250-5969f0cfac12?auto=format&fit=crop&w=800&q=60'
      },
      {
        hotel_id: hotel.id,
        type: 'Deluxe Suite',
        description: 'Spacious suite with a king bed, sitting area, and premium views.',
        price_per_night: 250.00,
        capacity: 4,
        image_url: 'https://images.unsplash.com/photo-1590492446132-2c76e2ea98d6?auto=format&fit=crop&w=800&q=60'
      }
    ]

    const { error: roomError } = await supabase.from('rooms').insert(rooms)
    if (roomError) {
      console.error('Error inserting rooms:', roomError)
      process.exit(1)
    }
  }

  console.log('Seeding completed successfully')
}

seed()