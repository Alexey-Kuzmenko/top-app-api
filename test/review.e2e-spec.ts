import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { AuthDto } from 'src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString()

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Title',
  description: 'Lorem ilpums',
  rating: 5,
  productId
}

let accessToken: string;

const loginDto: AuthDto = {
  login: 'test@gmail.com',
  password: 'Oleksii110103348'
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer()).post('/auth/login').send(loginDto)
    accessToken = body.access_token
  });

  it('/review/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });

  it('/review/create (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: -1 })
      .expect(400)
      .then(({ body }: request.Response) => {
        console.log(body);
      })
  });

  it('/review/byProduct/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${productId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1)
      })
  })

  it('/review/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
  })

  it('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND
      })
  })

  afterAll(async () => {
    await disconnect()
  })

});