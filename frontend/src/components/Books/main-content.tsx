// MainContent.tsx
import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

interface Book {
    title: string;
    author: string;
    coverPhotoURL: string;
    readingLevel: string;
}

interface MainContentProps {
    filteredBooks: Book[];
    handleAddToReadingList: (book: Book) => void;
}

const MainContent: React.FC<MainContentProps> = ({ filteredBooks, handleAddToReadingList }) => {
    return (
        <Grid container spacing={4}>
            {filteredBooks.map((book, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt={book.title}
                            height="140"
                            image={book.coverPhotoURL}
                            title={book.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {book.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {book.author}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Reading Level: {book.readingLevel}
                            </Typography>
                            <Button variant="contained" onClick={() => handleAddToReadingList(book)}>
                                Add to Reading List
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default MainContent;
