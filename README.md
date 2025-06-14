# E-Summit 2024 Website
![image](https://github.com/user-attachments/assets/77d7f69a-a555-4c25-bfed-7d1888375b17)


Welcome to the official website for the E-Summit event organized by E-Cell, IIIT Pune, 2024. This responsive website provides information about the event, upcoming activities, and a platform for ticket purchasing.

## Key Features 🚀

- **Event Details**: Learn about the various events scheduled for the summit.
- **Ticketing**: Secure ticket purchasing with options for event passes and individual tickets.
- **Leaderboard**: A leaderboard for the Summit Scout where the most referred users are ranked.
- **Authentication**: Users can sign in using Google authentication or via email with OTP verification.
- **Admin Dashboard with RBAC**: Secure dashboard for admins to manage users and transactions with Role-Based Access Control (RBAC).
  - **Admin**:  Add new users, verify transactions, and delete suspicious activities.
  - **Superadmin**: Manage roles, promote/demote admins, and have all access that an admin has

## RBAC Integration Overview

- **Private Routes & Middleware**: Secure admin routes with middleware to ensure only authorized access.
- **Role Management**: Superadmin can promote or demote users to admin, and notify them by email upon role changes.
- **Admin Dashboard**: Allows admins to add users, verify transactions, and manage user roles.
  - **Role Management**: Only superadmins can delete users and modify roles.
  - **Transaction Management**: Both admins and superadmins can verify and delete transactions.

## Technologies Used 💻

- ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white)
- ![NextJS](https://img.shields.io/badge/-NextJS-646CFF?style=flat-square&logo=next.js&logoColor=white)
- ![CSS](https://img.shields.io/badge/-CSS-1572B6?style=flat-square&logo=css3&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-8A2BE2?style=flat-square&logo=tailwindcss&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/-NodeJS-339933?style=flat-square&logo=node.js&logoColor=white)
- ![ExpressJS](https://img.shields.io/badge/-ExpressJS-000000?style=flat-square&logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
- ![Vercel](https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

## Getting Started 🛠️

1. Clone this repository to your local machine by using `https://github.com/LovkashGarg/Esummit-new`;
2. Install the necessary dependencies using `npm install`.
3. Start the development server with `npm run dev`.
4. Access the application through your web browser at `http://localhost:3000`.

Alternatively, you can view the deployed website here: [https://esummit24.iiitp.ac.in/](https://esummit24.iiitp.ac.in/)

Ensure that the admin routes are secured and cannot be accessed by unauthorized users. Only users with admin access can reach these routes, and non-admins cannot access the backend APIs associated with admin functionalities, as middleware has been integrated to enforce this security. For this you can hit on the [https://esummit24.iiitp.ac.in/admin](https://esummit24.iiitp.ac.in/admin) when you sign in as user or without sign in.


## Contributing 🤝

We welcome contributions! If you have suggestions, bug fixes, or feature requests, feel free to open an issue or submit a pull request.

## License 📝

This project is licensed under the MIT License. See the[LICENSE](LICENSE) file for more details.




