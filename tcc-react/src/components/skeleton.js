import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonComponent = () => {
    return (
        <div>
            <Skeleton animation="wave" variant="rectangular" height={100} width="100%" />
            <Skeleton animation="wave" variant="text" height={40} width="80%" />
            <Skeleton animation="wave" variant="text" height={40} width="60%" />
        </div>
    );
};

export default SkeletonComponent;
