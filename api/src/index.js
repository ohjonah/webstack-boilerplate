import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     req.context = {
//         models,
//         me: models.users[1],
//     };
//     next();
// });

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/placeholder', routes.placeholder);

app.listen(3000, () => console.log(`Listening on port: ${process.env.PORT}`));
