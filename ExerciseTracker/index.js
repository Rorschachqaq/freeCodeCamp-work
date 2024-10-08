// 引入依赖
const express = require('express'); // Express 框架
const app = express(); // 创建 Express 应用
const cors = require('cors'); // 解决 CORS 问题
const bodyParser = require('body-parser'); // 解析请求体
const mongoose = require('mongoose'); // MongoDB ODM


require('dotenv').config({ path: './sample.env' }); // 加载环境变量

//* Middleware

app.use(cors()); // 允许跨域请求
app.use(express.static('public')); // 静态文件
app.use(bodyParser.json()); // 解析 JSON 格式的请求体
app.use(bodyParser.urlencoded({ extended: false })); // 解析 URL 编码的请求体

//* MongoDB

// 连接到 MongoDB 数据库
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//* Schemas

// 创建锻炼日志的 schema
const exerciseSchema = new mongoose.Schema({
	userId: String,
	username: String,
	description: { type: String, required: true },
	duration: { type: Number, required: true },
	date: String,
});

// 创建用户的 schema
const userSchema = new mongoose.Schema({
	username: String,
});

//* Models

let User = mongoose.model('User', userSchema); // 用户模型
let Exercise = mongoose.model('Exercise', exerciseSchema); // 锻炼模型

//* Endpoints

/*
 * GET
 * Delete all users
 */
app.get('/api/users/delete', function (_req, res) {
	console.log('### delete all users ###'.toLocaleUpperCase());

	User.deleteMany({})
		.then((result) => {
			res.json({ message: 'All users have been deleted!', result: result });
		})
		.catch((err) => {
			console.error(err);
			res.json({ message: 'Deleting all users failed!' });
		});
});

/*
 * GET
 * Delete all exercises
 */
app.get('/api/exercises/delete', function (_req, res) {
	console.log('### delete all exercises ###'.toLocaleUpperCase());

	Exercise.deleteMany({})
		.then((result) => {
			res.json({ message: 'All exercises have been deleted!', result: result });
		})
		.catch((err) => {
			console.error(err);
			res.json({ message: 'Deleting all exercises failed!' });
		});
});

// 主页面
app.get('/', function (_req, res) {
	res.sendFile(__dirname + '/views/index.html'); // 发送首页文件
	User.syncIndexes(); // 同步用户索引
	Exercise.syncIndexes(); // 同步锻炼索引
});

/*
 * GET
 * Get all users
 */
app.get('/api/users', function (_req, res) {
	console.log('### get all users ###'.toLocaleUpperCase());

	User.find({})
		.then((users) => {
			if (users.length === 0) {
				res.json({ message: 'There are no users in the database!' });
			} else {
				console.log('users in database: '.toLocaleUpperCase() + users.length);
				res.json(users); // 返回用户列表
			}
		})
		.catch((err) => {
			console.error(err);
			res.json({ message: 'Getting all users failed!' });
		});
});

/*
 * POST
 * Create a new user
 */
app.post('/api/users', function (req, res) {
	const inputUsername = req.body.username; // 从请求体中获取用户名

	console.log('### create a new user ###'.toLocaleUpperCase());

	// 创建一个新用户
	let newUser = new User({ username: inputUsername });

	console.log(
		'creating a new user with username - '.toLocaleUpperCase() + inputUsername
	);

	newUser.save() // 保存新用户
		.then((user) => {
			res.json({ username: user.username, _id: user._id }); // 返回新用户的信息
		})
		.catch((err) => {
			console.error(err);
			res.json({ message: 'User creation failed!' }); // 创建失败消息
		});
});

/*
 * POST
 * Add a new exercise
 * @param _id
 */
app.post('/api/users/:_id/exercises', function (req, res) {
	const userId = req.params._id; // 从请求参数中获取用户 ID
	let { description, duration, date } = req.body; // 从请求体中获取锻炼信息

	console.log('### add a new exercise ###'.toLocaleUpperCase());

	// 检查日期是否提供，如果没有则使用当前日期
	if (!date) {
		date = new Date().toISOString().substring(0, 10);
	}

	console.log(
		'looking for user with id ['.toLocaleUpperCase() + userId + '] ...'
	);

	// 查找用户
	User.findById(userId)
		.then((userInDb) => {
			if (!userInDb) {
				return res.json({ message: 'There are no users with that ID in the database!' });
			}

			// 创建新的锻炼记录
			let newExercise = new Exercise({
				userId: userInDb._id,
				username: userInDb.username,
				description: description,
				duration: parseInt(duration),
				date: date,
			});

			return newExercise.save(); // 保存锻炼记录
		})
		.then((exercise) => {
			res.json({
				username: exercise.username,
				description: exercise.description,
				duration: exercise.duration,
				date: new Date(exercise.date).toDateString(), // 格式化日期
				_id: exercise.userId,
			});
		})
		.catch((err) => {
			console.error(err);
			res.json({ message: 'Exercise creation failed!' }); // 创建失败消息
		});
});

/*
 * GET
 * Get a user's exercise log
 * @param _id
 */
app.get('/api/users/:_id/logs', function (req, res) {
	const userId = req.params._id; // 获取用户 ID
	const from = req.query.from || new Date(0).toISOString().substring(0, 10); // 获取开始日期
	const to = req.query.to || new Date(Date.now()).toISOString().substring(0, 10); // 获取结束日期
	const limit = Number(req.query.limit) || 0; // 获取限制数量

	console.log('### get the log from a user ###'.toLocaleUpperCase());

	// 查找用户
	User.findById(userId)
		.then((user) => {
			if (!user) {
				return res.json({ message: 'User not found!' });
			}

			console.log(
				'looking for exercises with id ['.toLocaleUpperCase() + userId + '] ...'
			);

			// 查找锻炼记录
			return Exercise.find({
				userId: userId,
				date: { $gte: from, $lte: to }, // 日期范围
			})
				.select('description duration date') // 只选择需要的字段
				.limit(limit) // 限制结果数量
				.exec()
				.then((exercises) => {
					let parsedDatesLog = exercises.map((exercise) => {
						return {
							description: exercise.description,
							duration: exercise.duration,
							date: new Date(exercise.date).toDateString(), // 格式化日期
						};
					});

					res.json({
						_id: user._id,
						username: user.username,
						count: parsedDatesLog.length, // 锻炼记录数量
						log: parsedDatesLog, // 返回的锻炼日志
					});
				});
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: 'Failed to fetch logs' }); // 错误处理
		});
});

// 启动服务器
const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('Your app is listening on port ' + listener.address().port);
});