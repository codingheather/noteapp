# NoteApp

Welcome to NoteApp! This is a simple note-taking application designed to help you organize your thoughts and ideas effectively. Whether you're jotting down daily reflections, brainstorming new project ideas, or simply keeping track of tasks, NoteApp is here to assist you.

## Technical Details

NoteApp is built using modern web technologies to provide a seamless and responsive user experience. Here are some key technical details:

- **Client**: NoteApp's frontend is developed using React, a popular JavaScript library for building user interfaces. React Router is used for navigation, ensuring a smooth and intuitive browsing experience.

- **Backend**: The backend of NoteApp leverages Prisma for database operations and Express for handling REST APIs. This combination offers robust data management and efficient server-side communication.

- **Authentication and Authorization**: NoteApp utilizes Auth0's Universal Login and bearer token mechanism for secure authentication and authorization. This ensures that only authorized users can access the app's features and data.

- **External API Integration**: To provide users with inspirational quotes, NoteApp integrates with RapidAPI's Quote API. This adds an element of motivation and encouragement to the note-taking experience.

## Benefits of Frameworks and Services

- **React and React Router**: These frameworks enable NoteApp to deliver a dynamic and responsive user interface, ensuring a pleasant browsing experience across devices.

- **Prisma and Express**: By using Prisma for database operations and Express for REST APIs, NoteApp benefits from efficient data management and seamless server-client communication.

- **Auth0**: The integration of Auth0's Universal Login enhances security by providing a robust authentication and authorization mechanism, while also offering flexibility in user authentication methods.

- **RapidAPI**: Incorporating RapidAPI's Quote API enriches NoteApp with motivational content, fostering a positive user experience and encouraging engagement.

## Hosting Details

NoteApp is hosted on Render for its backend services and APIs, while the client application is deployed on Vercel. Here's why these services were chosen:

- **Render**: Hosting the backend on Render ensures reliability, scalability, and easy deployment of updates. With Render, you can focus on building your application while leaving the infrastructure management to the platform.

- **Vercel**: Vercel provides fast and reliable hosting for frontend applications, with features like automatic deployments and CDN caching. It ensures that your NoteApp is always accessible and performs optimally for users worldwide.

You can visit NoteApp at [NoteApp](https://client-315u3kgjw-kexin-haos-projects.vercel.app/) and start taking notes today!

## User Flow

Here's a brief overview of the user flow within NoteApp:

1. **Home Page**: Upon visiting the app, users are greeted with a home page displaying the current date, a welcome message, and an inspirational quote. They can explore the app without logging in and see the total number of notes recorded to encourage engagement.

2. **Authentication**: Users can sign up or log in using Auth0's Universal Login. This provides a secure and convenient way to access the app's features, with support for email/password login and Google account integration.

3. **Profile Page**: After logging in, users are redirected to their profile page where they can set a name and view their existing notes. They can add new notes, edit or delete existing ones, and change their display name at any time.

4. **Note Management**: NoteApp allows users to create, edit, and delete notes, with the ability to view and update note contents on a detailed page.

5. **Log Out**: When users are finished using NoteApp, they can log out using the provided button, which redirects them to the home page.

NoteApp aims to streamline the note-taking process and provide a seamless user experience from start to finish. We hope you enjoy using it!
