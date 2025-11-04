import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Avatar } from '../Avatar';

export const ProfileHeader: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [uploadError, setUploadError] = useState('');

    return (
        <div className="flex items-center space-x-4 mb-6">
            <Avatar editable size="lg" onError={setUploadError} />
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-night-text">
                    Buenos días, {user?.name}
                </h1>
                {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>}
            </div>
        </div>
    );
};
