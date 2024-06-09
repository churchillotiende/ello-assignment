// Sidebar.tsx
import React from 'react';
import { List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Book {
    title: string;
    author: string;
}

interface SidebarProps {
    readingList: Book[];
    handleRemoveFromReadingList: (title: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ readingList, handleRemoveFromReadingList }) => {
    return (
        <div className="sidebar">
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
        </div>
    );
}

export default Sidebar;