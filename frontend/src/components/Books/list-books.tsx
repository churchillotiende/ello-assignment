import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;


function BooksList() {
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [searchTerm, setSearchTerm] = useState('');

    const [readingList, setReadingList] = useState<{ title: string; author: string; coverPhotoURL: string; readingLevel: string }[]>([]);

    const handleAddToReadingList = (book: { title: string; author: string; coverPhotoURL: string; readingLevel: string }) => {
        if (!readingList.some(b => b.title === book.title)) {
            setReadingList([...readingList, book]);
        }
    };

    const handleRemoveFromReadingList = (title: string) => {
        setReadingList(readingList.filter(book => book.title !== title));
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;

    const filteredBooks = data.books.filter((book: { title: string }) => book.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Container>
            <Typography variant="h2" component="h1" gutterBottom>
                Book List
            </Typography>
            <TextField
                label="Search Books"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Grid container spacing={4}>
                {filteredBooks.map((book: { title: string; author: string; coverPhotoURL: string; readingLevel: string }, index: number) => (
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
                                <Button variant="contained" color="primary" onClick={() => handleAddToReadingList(book)}>
                                    Add to Reading List
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '2rem' }}>
                Reading List
            </Typography>
            <List>
                {readingList.map((book, index) => (
                    <ListItem key={index} secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromReadingList(book.title)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        <ListItemText
                            primary={book.title}
                            secondary={`Author: ${book.author}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default BooksList;