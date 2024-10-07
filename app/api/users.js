import dbConnect from '../../lib/mongodb';
import User from '../../models/user';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const user = new User(req.body);
        try {
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else if (req.method === 'GET') {
        const users = await User.find();
        res.status(200).json(users);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
