const authorizeSuperAdmin = (req, res, next) => {
    
    if (req.user && req.user.role === 'superadmin') { 
        next(); 
    } else {
        return res.status(403).json({ success: false, message: 'Access Denied. Admins only.' });
    }
};

export default authorizeSuperAdmin;
