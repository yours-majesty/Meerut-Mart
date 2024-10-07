import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    // Access the token from the 'Authorization' header
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authorization token missing or invalid. Please log in again.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID and the whole user object to the request object
        req.body.userId = decoded.id; 
        req.user = decoded; 

        // Proceed to the next middleware
        next(); 
    } catch (error) {
        console.log('Token verification failed:', error); // Log the error for debugging
        res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
    }
};

export default authUser;

