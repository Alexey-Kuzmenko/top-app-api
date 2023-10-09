import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constans';

const productId = new Types.ObjectId().toHexString()

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Title',
  description: 'Lorem ilpums',
  rating: 5,
  productId
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

  it('/review/byProduct/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${productId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1)
      })
  })

  it('/review/delete (POST)', () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .expect(200)
  })

  it('/review/delete (POST) - fail', () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND
      })
  })

  afterAll(async () => {
    await disconnect()
  })

});