import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Character = ({ name, image, status }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt={name}
            />
            <CardContent>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    Status: {status}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Character;