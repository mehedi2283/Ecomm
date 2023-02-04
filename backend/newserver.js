// import http from 'http';
// // import SocketIO from 'socket.io';
// import { Server } from 'socket.io';
// import express from 'express';
// import path from 'path';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import seedRouters from './allRoutes/seedRoute.js';
// import productRouters from './allRoutes/productRoute.js';
// import userRouters from './allRoutes/userRoute.js';
// import orderRouters from './allRoutes/orderRoute.js';
// import uploadRouters from './allRoutes/uploadsRoute.js';

// // config dotenv for fetch all the info from .env file
// dotenv.config();

// // ========mongodb connection with the help of mongoose========
// const mongoAtlasDB =
//   'mongodb+srv://mernfarmshop:mernfarmshop@cluster0.7klbh5d.mongodb.net/mernfarmshop?retryWrites=true&w=majority';
// mongoose
//   // .connect(process.env.MONGODB_URL_ATLAS)
//   // .connect(process.env.MONGODB_URL)
//   .connect(mongoAtlasDB)
//   .then(() => {
//     console.log('Database Connection Successful.');
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// // ===EXPRESS APP(THIS IS OUR MAIN APP)===//
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // =======API:: FOR PAYPAL PAYMENT METHOD
// app.get('/api/keys/paypal', (req, res) => {
//   res.send(process.env.PAYPAL_CLIENT_ID,'sb'); //sb(sandbox)
// });

// // ======API :: FOR==> GOOLGE MAP
// app.get('/api/keys/google', (req, res) => {
//   res.send(process.env.GOOGLE_API_KEY,''); //sb(sandbox)
// });

// // ========USE:: SUB APP USE by main App(uploadsRouters)
// app.use('/api/upload', uploadRouters);
// // =======USE:: SUB APP USE by main APP(seedRouters)======//
// app.use('/api/seed', seedRouters);
// // =======USE:: SUB APP(productRouters)======//
// app.use('/api/products', productRouters);
// // =======USE:: SUB APP(userRouters)======//
// app.use('/api/users', userRouters);
// // =======USE :: SUB APP(ordersRouters)======//
// app.use('/api/orders', orderRouters);

// // ---FOR PUBLISH ON HEROKU----//
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, '/front-end/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/front-end/build/index.html'))
// );

// // =========MIDDLEWARE (for==> error handeling)=======//
// app.use((err, req, res, next) => {
//   res.status(500).send({ message: err.message });
// });

// // ===========CREATING BACKEND(SERVER) PORT============//
// const port = process.env.PORT || 5000;

// // ===============LIVE CHAT==================//
// const httpServer = http.Server(app);
// const io = new Server(httpServer, { cors: { origin: '*' } });
// const users = [];

// io.on('connection', (socket) => {
//   console.log('connection', socket.id);

//   // IF::USER-DISCONNECT(EVENT)
//   socket.on('disconnect', () => {
//     const user = users.find((x) => x.socketId === socket.id);
//     if (user) {
//       user.online = false;
//       console.log('Offline', user.name);
//       const admin = users.find((x) => x.isAdmin && x.online);
//       if (admin) {
//         io.to(admin.socketId).emit('updateUser', user);
//       }
//     }
//   });

//   // IF::USER-ONLOGIN(NEW USER ON CHAT--EVENT)
//   socket.on('onLogin', (user) => {
//     const updatedUser = {
//       ...user,
//       online: true,
//       socketId: socket.id,
//       messages: [],
//     };
//     const existUser = users.find((x) => x._id === updatedUser._id);
//     if (existUser) {
//       existUser.socketId = socket.id;
//       existUser.online = true;
//     } else {
//       users.push(updatedUser);
//     }
//     console.log('Online', user.name);
//     const admin = users.find((x) => x.isAdmin && x.online);
//     if (admin) {
//       io.to(admin.socketId).emit('updateUser', updatedUser);
//     }
//     if (updatedUser.isAdmin) {
//       io.to(updatedUser.socketId).emit('listUsers', users);
//     }
//   });

//   //IF::SELECT A USER FOR CHATING(EVENT)
//   socket.on('onUserSelected', (user) => {
//     const admin = users.find((x) => x.isAdmin && x.online);
//     if (admin) {
//       const existUser = users.find((x) => x._id === user._id);
//       io.to(admin.socketId).emit('selectUser', existUser);
//     }
//   });
//   // IF:: NEW MESSAGE BY ADMIN OR USERS--EVENT
//   socket.on('onMessage', (message) => {
//     if (message.isAdmin) {
//       const user = users.find((x) => x._id === message._id && x.online);
//       if (user) {
//         io.to(user.socketId).emit('message', message);
//         user.messages.push(message);
//       }
//     } else {
//       const admin = users.find((x) => x.isAdmin && x.online);
//       if (admin) {
//         io.to(admin.socketId).emit('message', message);
//         const user = users.find((x) => x._id === message._id && x.online);
//         user.messages.push(message);
//       } else {
//         io.to(socket.id).emit('message', {
//           name: 'Admin',
//           body: 'Sorry. I am not online right now',
//         });
//       }
//     }
//   });
// });


// // ==========SERVER PORT LISTENING==========//
// httpServer.listen(port, () => {
//   console.log(`Server at http://localhost:${port}`);
// });

// // app.listen(port, () => {
// //   console.log(Server at http://localhost:${port});
// // });
