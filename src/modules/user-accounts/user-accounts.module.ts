import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { UsersService } from './application/users.service';
import { AuthController } from './api/auth.controller';
import { SecurityDevicesController } from './api/security-devices.controller';
import { AuthService } from './application/auth.service';
import { SecurityDevicesService } from './application/security-devices.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './domain/user/user.entity';
import { UsersRepository } from './infrastructure/users.repository';
import { UsersQueryRepository } from './infrastructure/query/users-query.repository';
import { NotificationsModule } from '../notifications/notifications.module';
import { CryptoService } from './application/crupto.service';
import { LocalStrategy } from './guards/local/local.strategy';
import { JwtStrategy } from './guards/bearer/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthQueryRepository } from './infrastructure/query/auth-query.repository';
import { BasicStrategy } from './guards/basic/basic.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'access-token-secret', //TODO: move to env. will be in the following lessons
      signOptions: { expiresIn: '5m' }, // Время жизни токена
    }),
    NotificationsModule,
  ],
  controllers: [UsersController, AuthController, SecurityDevicesController],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    //
    AuthService,
    AuthQueryRepository,
    //
    CryptoService,
    //
    BasicStrategy,
    LocalStrategy,
    JwtStrategy,
    //
    SecurityDevicesService,
  ],
})
export class UserAccountsModule {}
