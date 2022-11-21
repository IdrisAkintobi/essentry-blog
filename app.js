import 'dotenv/config';
import express, { json } from 'express';
import articleRoute from './src/routes/article.route.js';
import userRoute from './src/routes/user.route.js';
import sequelize from './utils/db.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(json());

app.get('/', (_, res) => {
  res.json({
    message: 'We are live!',
  });
});

app.use('/api/users', userRoute);
app.use('/api/articles', articleRoute);

app.use('/*', (_, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.listen(port, () => {
  sequelize.authenticate();
  console.log(`🚀 Server running on http://localhost:${port}`);
});
