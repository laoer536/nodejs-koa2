const Router = require("koa-router");
const jwtToken = require('jsonwebtoken')
const router = new Router({
    prefix: "/login",
});
router.get("/", async (ctx) => {
    const token = jwtToken.sign({ uid: '123' },process.env.JWT_SECRET, { expiresIn: '15d' });
    ctx.response.body = {
        code: 200,
        entry: {
            token: token
        },
    };
});

module.exports = router;
