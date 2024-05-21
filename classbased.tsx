'use client'
import React, { useEffect, useState } from 'react';

interface UserData {
    name: string;
    email: string;
}

interface Props {
    userId: string;
}

const UserDataComponent: React.FC<Props> = ({ userId }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [seconds, setSeconds] = useState<number>(0);
    const intervalId = React.useRef<number | null>(null);

    useEffect(() => {
        fetchUserData();
        intervalId.current = window.setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => {
            if (intervalId.current !== null) {
                clearInterval(intervalId.current);
            }
        };
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const fetchUserData = () => {
        fetch(`https://secret.url/user/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user data:', error));
    };

    return (
        <div>
            <h1>User Data Component</h1>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            <p>Timer: {seconds} seconds</p>
        </div>
    );
};

export default UserDataComponent;
