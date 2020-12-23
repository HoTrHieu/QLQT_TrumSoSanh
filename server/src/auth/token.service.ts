import { CACHE_MANAGER, Inject, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { randomBytes } from 'crypto';
import { UserRole } from 'src/common/entities/user.entity';
import { AuthUser } from './dto/auth-user.dto';

export class TokenService {
  private readonly RTK_TTL;
  private readonly RTK_PREFIX = 'rtk_';

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {
    this.RTK_TTL = config.get('jwt.refreshToken.ttl');
  }

  public async createTokens(userId: number, role: UserRole) {
    return {
      accessToken: this.jwtService.sign({ sub: userId, role }),
      refreshToken: await this.createRefreshToken(userId, role),
    };
  }

  public async createRefreshToken(userId: number, role: UserRole) {
    const refreshToken = randomBytes(64).toString('hex');
    await this.cacheManager.set(
      this.RTK_PREFIX + refreshToken,
      AuthUser.of(userId, role),
      {
        ttl: this.RTK_TTL,
      },
    );
    return refreshToken;
  }

  public async getAccessTokenFromRefreshToken(refreshToken: string) {
    const user: AuthUser = await this.cacheManager.get(
      this.RTK_PREFIX + refreshToken,
    );
    if (!user) {
      throw new NotFoundException('Refresh token not found');
    }
    await this.deleteRefreshToken(refreshToken);
    return this.createTokens(user.id, user.role);
  }

  public deleteRefreshToken(refreshToken: string) {
    return this.cacheManager.del(this.RTK_PREFIX + refreshToken);
  }
}
