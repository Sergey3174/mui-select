import { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Card, CardContent, Typography, SelectChangeEvent } from '@mui/material';

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<number | string>('');
  const [users, setUsers] = useState<User[]>([]); 
  const [posts, setPosts] = useState<Post[]>([]); 
  const [error, setError] = useState<string| null>(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((e) => setError(e.message))
  }, []);


  useEffect(() => {
    if (!currentUser) return;
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${currentUser}`)
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .catch((e) => setError(e.message))
  }, [currentUser]);

  const handleChange = (e: SelectChangeEvent<string | number>) => {
    setCurrentUser(e.target.value);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Автор</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentUser}
          label="Автор"
          onChange={handleChange}
        >
          {users.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error ?  <Card sx={{ minWidth: 275, marginTop: 2 }}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'red', fontSize: 14 }}>
              {error}
            </Typography>
          </CardContent>
        </Card> 
        : posts.map((post) => (
        <Card sx={{ minWidth: 275, marginTop: 2 }} key={post.id}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              {post.title}
            </Typography>
            <Typography variant="h5" component="div">
              {post.body}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default App;
