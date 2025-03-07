import Koa, { Context } from 'koa';
import { StatusCodes } from 'http-status-codes';
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser';
import employeeRouter from '../employee/employee.controller';

const app: Koa = new Koa();
app.use(cors());
app.use(bodyParser());

// Generic error handling middleware.
app.use(async (ctx: Context, next: () => Promise<any>) => {
    try {
        await next();
    } catch (error) {
        ctx.status = error.statusCode || error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        error.status = ctx.status;
        ctx.body = { error };
        ctx.app.emit('error', error, ctx);
    }
});

app.use(employeeRouter.routes());
app.use(employeeRouter.allowedMethods());

// Application error logging.
app.on('error', console.error);

export default app;