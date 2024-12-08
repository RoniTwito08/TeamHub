import { connect } from 'http2';
import app, { connectDB } from './app';

const PORT = process.env.PORT || 4000; 

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
    process.exit(1);
});