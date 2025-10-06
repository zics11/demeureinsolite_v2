export function assertAdminRequest(request) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) {
    return;
  }

  const providedKey = request.headers.get('x-admin-key');
  if (providedKey !== adminKey) {
    const error = new Error('UNAUTHORIZED');
    error.code = 'UNAUTHORIZED';
    throw error;
  }
}
