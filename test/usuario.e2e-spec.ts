import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';

describe('Testes dos Módulos Usuario e Auth (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true,
          autoLoadEntities: true,
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("01 - Deve cadastrar um novo usuário", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '-',
      })

      expect(resposta.status).toBe(201);

      usuarioId = resposta.body.id;
  })
  
  it("02 - Não deve cadastrar um novo usuário já existente", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '',
      })
      expect(resposta.status).toBe(400);

      
  })

  it("03 - Deve autenticar um usuário existente", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        
      })
      expect(resposta.status).toBe(200);

      token = resposta.body.token;
  })


  it("04 - Deve listar todos os usuários cadastrados", async () => {
    const resposta = await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)

      expect(resposta.status).toBe(200);

  })

  it("05 - Deve atualizar os dados de um usuário já existente", async () => {
    const resposta = await request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        nome: 'Root Atualizado',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '',
      })

      expect(resposta.status).toBe(200);
      
  })

  it("06 - Deve listar o usuario cadastrado que contém o id buscado", async () => {
    const resposta = await request(app.getHttpServer())
      .get(`/usuarios/${usuarioId}`)
      .set('Authorization', `${token}`)

      expect(resposta.status).toBe(200);

  })
});

