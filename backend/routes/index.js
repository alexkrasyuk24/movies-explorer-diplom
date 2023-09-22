const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError ');
const {
  loginUserValidator,
  registrationUserValidator,
} = require('../middlewares/validation');

const { registrationUser, loginUser } = require('../controllers/users');

const userRouter = require('./users');
const movieRouter = require('./movies');

router.post('/signup', registrationUserValidator, registrationUser);

router.post('/signin', loginUserValidator, loginUser);

router.use(auth);

router.use('/', userRouter);
router.use('/', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
