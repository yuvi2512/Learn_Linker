import bcrypt from 'bcryptjs';
import User  from '../../models/user';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end(); // Allow only POST method

  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the role is valid
  if (!['student', 'teacher', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  //Check if the user already exists
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
}
