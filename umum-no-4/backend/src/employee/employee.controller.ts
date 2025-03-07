import { Context } from "koa";
import Router from "koa-router";
import { getRepository, Repository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import { Employee } from "./employee.entity";

const routerOpts: Router.IRouterOptions = {
    prefix: '/employees'
};

const employeeRouter: Router = new Router(routerOpts);

employeeRouter.get('/', async (ctx: Context) => {
    const employeeRepo: Repository<Employee> = getRepository(Employee);
    const employees = await employeeRepo.find({
        order: {
            id: "ASC"
        }
    });

    ctx.body = employees;
});

employeeRouter.post('/', async (ctx: Context) => {
    const employeeRepo: Repository<Employee> = getRepository(Employee);
    const employee = employeeRepo.create(ctx.request.body);
    await employeeRepo.save(employee);

    ctx.body = employee;
});

employeeRouter.get('/:id', async (ctx: Context) => {
    const employeeRepo: Repository<Employee> = getRepository(Employee);
    const employee = await employeeRepo.findOne({ where: { id: Number(ctx.params.id) } });

    if (!employee) ctx.throw(StatusCodes.NOT_FOUND);
    else ctx.body = employee;
});

employeeRouter.put('/:id', async (ctx: Context) => {
    const employeeRepo: Repository<Employee> = getRepository(Employee);
    const employee = await employeeRepo.findOne({ where: { id: Number(ctx.params.id) } });

    if (!employee) ctx.throw(StatusCodes.NOT_FOUND);
    else {
        const updatedEmployee = await employeeRepo.merge(employee, ctx.request.body);
        employeeRepo.save(updatedEmployee);

        ctx.body = updatedEmployee;
    }
});

employeeRouter.delete('/:id', async (ctx: Context) => {
    const employeeRepo: Repository<Employee> = getRepository(Employee);
    const employee = await employeeRepo.findOne({ where: { id: Number(ctx.params.id) } });

    if (!employee) ctx.throw(StatusCodes.NOT_FOUND);
    else {
        employeeRepo.delete(employee);

        ctx.body = "Successfully deleted";
    }
});

export default employeeRouter;