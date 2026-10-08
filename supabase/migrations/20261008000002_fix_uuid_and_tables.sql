-- Enable pgcrypto extension
create extension if not exists "pgcrypto";

-- Drop existing tables to avoid conflicts (if any)
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS hotels;
DROP TABLE IF EXISTS users;

-- Create users table
create table users (
  id uuid primary key references auth.users not null,
  email text unique not null,
  full_name text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create hotels table
create table hotels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  location text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create rooms table
create table rooms (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid not null references hotels on delete cascade,
  type text not null,
  description text,
  price_per_night decimal(10,2) not null check (price_per_night >= 0),
  capacity integer not null check (capacity >= 1),
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create bookings table
create table bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users on delete cascade,
  room_id uuid not null references rooms on delete cascade,
  check_in date not null,
  check_out date not null check (check_out > check_in),
  guests integer not null check (guests >= 1),
  total_price decimal(10,2) not null check (total_price >= 0),
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table users enable row level security;
alter table hotels enable row level security;
alter table rooms enable row level security;
alter table bookings enable row level security;

-- Policies for users: users can only see and update their own data
create policy "Users can view their own data"
  on users for select
  using (auth.uid() = id);

create policy "Users can update their own data"
  on users for update
  using (auth.uid() = id);

-- Policies for hotels: anyone can view hotels, only admins can insert/update/delete
create policy "Anyone can view hotels"
  on hotels for select
  using (true);

create policy "Only admins can insert hotels"
  on hotels for insert
  with check (exists (select 1 from users where id = auth.uid() and role = 'admin'));

create policy "Only admins can update hotels"
  on hotels for update
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'));

create policy "Only admins can delete hotels"
  on hotels for delete
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'));

-- Policies for rooms: anyone can view rooms, only admins can insert/update/delete
create policy "Anyone can view rooms"
  on rooms for select
  using (true);

create policy "Only admins can insert rooms"
  on rooms for insert
  with check (exists (select 1 from users where id = auth.uid() and role = 'admin'));

create policy "Only admins can update rooms"
  on rooms for update
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'));

create policy "Only admins can delete rooms"
  on rooms for delete
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'));

-- Policies for bookings: users can view and create their own bookings, admins can view all
create policy "Users can view their own bookings"
  on bookings for select
  using (auth.uid() = user_id);

create policy "Admins can view all bookings"
  on bookings for select
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'));

create policy "Users can insert their own bookings"
  on bookings for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own bookings"
  on bookings for update
  using (auth.uid() = user_id);

create policy "Users can delete their own bookings"
  on bookings for delete
  using (auth.uid() = user_id);

create policy "Admins can update any booking"
  on bookings for update
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'));

create policy "Admins can delete any booking"
  on bookings for delete
  using (exists (select 1 from users where id = auth.uid() and role = 'admin'));