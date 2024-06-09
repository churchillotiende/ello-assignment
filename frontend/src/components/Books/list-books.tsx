import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, CircularProgress, Typography, TextField, Grid } from '@mui/material';
import MainContent from './main-content';
import Sidebar from './sidebar';

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
            <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#5acccc' }}>
                Book List
            </Typography>
            <TextField
                label="Search Books"
                variant="outlined"
                fullWidth
                sx={{ color: '#5acccc' }}
                margin="normal"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Grid container spacing={4}>
                {/* Main Content */}
                <Grid item xs={12} sm={9}>
                    <MainContent filteredBooks={filteredBooks} handleAddToReadingList={handleAddToReadingList} />
                </Grid>
                {/* Sidebar */}
                <Grid item xs={12} sm={3}>
                    <Sidebar readingList={readingList} handleRemoveFromReadingList={handleRemoveFromReadingList} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default BooksList;
