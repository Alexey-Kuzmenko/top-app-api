import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { ALREADY_REGISTERED_ERROR, INCORRECT_PASSWORD_ERROR } from '../src/auth/auth.constants';

const loginDto: AuthDto = {
    login: 'test@gmail.com',
    password: 'Oleksii110103348'
}

const newUserDto: AuthDto = {
    login: 'guest@gmail.com',
    password: 'guest12345'
}

describe('Auth module (e2e)', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleRef.createNestApplication()
        await app.init()
    })

    it('POST /register - fail', async () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send(loginDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                console.log(body);
            })
    })

    it('POST /register - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send(newUserDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                console.log(body);
            })
    })

    it('POST /login - fail password', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, password: 'guest12345' })
            .expect(401)
            .then(({ body }: request.Response) => {
                console.log(body);
            })
    })

    it('POST /login - fail login', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, email: 'g@gmail.com' })
            .expect(200)
            .then(({ body }: request.Response) => {
                console.log(body);
            })
    })

    it('POST /login - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.access_token).toBeDefined()
            })
    })

    afterAll(async () => {
        await disconnect()
    });
})