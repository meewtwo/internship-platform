import express from 'express';
import { createClient } from '@/lib/supabase/server';
import { registerSchema, type RegisterInput } from '../lib/validations/auth.ts';

export const router = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user (student or employer)
 * @access Public
 * @param {RegisterInput} req.body - User registration data
 * @returns {201} { success: boolean, message: string } - Registration initiated
 * @returns {400} { error: string } - Validation or Supabase error
 */
router.post(
  '/register',
  async (req: express.Request<object, object, RegisterInput>, res: express.Response) => {
    try {
      const result = registerSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.flatten() });
      }
      const { role, first_name, last_name, university_id, email, password } = result.data;

      const supabase = await createClient();

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            first_name,
            last_name,
            university_id: role === 'student' ? university_id : null,
          },
        },
      });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(201).json({ success: true, message: 'Registration initiated' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
);

/**
 * @route POST /api/auth/login
 * @description Log in with email and password
 * @access Public
 * @param {object} req.body - Email and password
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's password
 * @returns {200} { success: boolean } - Login successful
 * @returns {401} { error: string } - Authentication failed
 */
router.post(
  '/login',
  async (req: express.Request<object, object, { email: string; password: string }>, res: express.Response) => {
    try {
      const { email, password } = req.body;
      const supabase = await createClient();

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        return res.status(401).json({ error: error.message });
      }

      return res.json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
);