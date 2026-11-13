import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_robin_educashback_2026';

export const DEFAULT_ADMIN = {
  email: 'admin@educashback.com',
  username: 'admin',
  password: 'admin123',
  name: 'Platform Administrator',
  role: 'superadmin',
};

// Seed default admin in MongoDB if not already present
export async function ensureDefaultAdmin() {
  await connectToDatabase();
  const existing = await Admin.findOne({
    $or: [{ email: DEFAULT_ADMIN.email }, { username: DEFAULT_ADMIN.username }]
  });

  if (!existing) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, salt);

    await Admin.create({
      email: DEFAULT_ADMIN.email,
      username: DEFAULT_ADMIN.username,
      password: hashedPassword,
      name: DEFAULT_ADMIN.name,
      role: DEFAULT_ADMIN.role,
    });
    console.log('Seeded default admin in MongoDB successfully:', DEFAULT_ADMIN.email);
  }
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
