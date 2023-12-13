import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // AppModule 경로에 맞게 수정
import { Model } from 'mongoose';
import { User, UserDocument } from '@interface/schema/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Permission } from '@interface/enum';
import {
  SchoolNewsCreateDto,
  SchoolNewsDeleteDto,
  SchoolNewsUpdateDto,
} from '@interface/dto/school.dto';
import {
  NewsDocument,
  School,
  SchoolDocument,
} from '@interface/schema/school.schema';

describe('Controller (e2e)', () => {
  let app: INestApplication;
  let userModel: Model<UserDocument>;
  let schoolModel: Model<SchoolDocument>;
  let adminUser: UserDocument;
  let studentUser: UserDocument;
  let school: SchoolDocument;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userModel = moduleFixture.get<Model<UserDocument>>(
      getModelToken(User.name),
    );
    schoolModel = moduleFixture.get<Model<SchoolDocument>>(
      getModelToken(School.name),
    );

    adminUser = await userModel.create({
      name: 'Test1',
      permission: Permission.Admin,
    });

    studentUser = await userModel.create({
      name: 'Test2',
      permission: Permission.Student,
    });

    await app.init();
  });

  afterAll(async () => {
    // await userModel.deleteOne({ _id: adminUser._id });
    await userModel.deleteOne({ _id: studentUser._id });
    await schoolModel.deleteOne({ _id: school._id });
    await app.close();
  });

  it('/school (POST) - create school', async () => {
    const createDto = { region: 'TestRegion', name: 'TestSchool1' };
    const response = await request(app.getHttpServer())
      .post('/school')
      .set('Authorization', `Bearer ${adminUser._id}`)
      .send(createDto)
      .expect(201);
    school = response.body;
    expect(response.body).toBeDefined();
    expect(response.body.name).toEqual(createDto.name);
  });

  describe('/school/news  school news test', () => {
    let news: NewsDocument;
    it('/school/news (POST) - create school news', async () => {
      const createDto = {
        context: 'test context',
        schoolId: school._id,
      } as SchoolNewsCreateDto;
      const response = await request(app.getHttpServer())
        .post('/school/news')
        .set('Authorization', `Bearer ${adminUser._id}`)
        .send(createDto)
        .expect(201);
      news = response.body;
      expect(response.body).toBeDefined();
      expect(response.body.context).toEqual(createDto.context);
    });

    it('/school/news (PATCH) - update school news', async () => {
      const createDto = {
        id: news._id,
        context: 'change context',
      } as SchoolNewsUpdateDto;
      const response = await request(app.getHttpServer())
        .post('/school/news')
        .set('Authorization', `Bearer ${adminUser._id}`)
        .send(createDto)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.context).toEqual(createDto.context);
    });

    it('/school/news (DELETE) - delete school news', async () => {
      const createDto = {
        id: news._id,
      } as SchoolNewsDeleteDto;
      const response = await request(app.getHttpServer())
        .post('/school/news')
        .set('Authorization', `Bearer ${adminUser._id}`)
        .send(createDto)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body._id).toEqual(createDto.id);
    });
  });
});
