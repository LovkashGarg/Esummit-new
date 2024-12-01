    import { parseCookies } from "nookies";
    import jwt from "jsonwebtoken";

    // Utility to get session from cookie
    const getSession = () => {
    const cookies = parseCookies();
    const token = cookies.auth_token;  // Retrieve the token from cookies
    
    if (token) {
        try {
        // Decode the JWT token to extract user data
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;  // Returns user data (userId, role, email)
        } catch (error) {
        console.error('Invalid or expired token', error);
        return null;  // If the token is invalid or expired
        }
    }
    return null;  // No token found
    };

    export default getSession;
