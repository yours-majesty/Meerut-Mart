import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if the authorization header is valid
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authorization token missing or invalid. Please log in again.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id; // Set userId from the token
        req.user = decoded; // Set the full decoded token for later use (includes role)
        next();
    } catch (error) {
        console.log('Token verification failed:', error);
        res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
    }
};

export default authUser; // Ensure this line is present
