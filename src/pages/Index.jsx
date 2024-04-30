import { Box, Button, Input, useToast, VStack, Textarea, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit }) => (
  <Box p={4} boxShadow="md" borderRadius="md" bg="gray.100">
    <Textarea value={note.text} readOnly />
    <Button leftIcon={<FaEdit />} colorScheme="blue" onClick={() => onEdit(note)} m={2}>
      Edit
    </Button>
    <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => onDelete(note.id)} m={2}>
      Delete
    </Button>
  </Box>
);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addNote = () => {
    if (input.trim() === '') {
      toast({
        title: 'Error',
        description: "Note can't be empty",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newNote = { id: Date.now(), text: input };
    setNotes([...notes, newNote]);
    setInput('');
    toast({
      title: 'Success',
      description: 'Note added',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: 'Deleted',
      description: 'Note deleted',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const editNote = (updatedNote) => {
    const updatedNotes = notes.map(note => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <VStack spacing={4} p={5}>
      <Heading mb={6}>Note Taking App</Heading>
      <Input placeholder="Add a new note" value={input} onChange={(e) => setInput(e.target.value)} />
      <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addNote}>
        Add Note
      </Button>
      {notes.map(note => (
        <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
      ))}
    </VStack>
  );
};

export default Index;