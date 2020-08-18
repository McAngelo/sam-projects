import { app } from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Sam-Project app is listening at http://localhost:${port}`);
})