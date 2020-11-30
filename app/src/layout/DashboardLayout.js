import React from 'react';
import NavBar from './NavBar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex flex-col items-center h-screen">
            <div className="container max-w-screen-lg px-4 lg:px-0">
                <NavBar />
                {children}
            </div>
            <Footer />
        </div>
    );
};

const Footer = () => (
    <div className="py-8">
        <p className="font-bold text-sm">
            Made with React and TailwindCSS using the Github API
        </p>
    </div>
);

export default DashboardLayout;
