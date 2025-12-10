// import express
const express = require('express');
// import router
const router = express.Router();
// import the install route
const installRoute = require('./install.routes');
// import admin route
const adminRouter = require('./admin.routes');
// import roadmap routes
const roadmapRouter = require('./roadmap.routes');
// import step routes
const stepRouter = require('./steps.routes')
// import login routes
const loginRoutes = require('./login.routes');
// import auth routes
const googleAuth = require("./auth.routes")
// add the install route to the router
router.use(installRoute);
// add step route to the main router
router.use(stepRouter)
// add roadmap route to the main router
router.use(roadmapRouter)
// add admin route to the route
router.use(adminRouter)
// add login routes to the main router
router.use(loginRoutes);
// add google auth to the main router
router.use(googleAuth);

// export the router
module.exports = router;