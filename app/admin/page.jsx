import { fetchListingsWithAdminData } from '@/lib/booking';
import AdminDashboard from '@/components/admin/admin-dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const listings = await fetchListingsWithAdminData();
  return <AdminDashboard initialListings={listings} />;
}
