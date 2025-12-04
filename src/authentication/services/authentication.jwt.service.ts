import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtService {
	private jwtExpirationTime: number | undefined;
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {
		this.jwtExpirationTime = this.configService.get<number>('JWT_EXPIRATION_TIME');
	}

	/* for testing and debugging only based on env var
			expiresIn: string = ""
	*/
async generateJwtToken(payload: any): Promise<string> {
	const expiresIn =this.jwtExpirationTime;
    return this.jwtService.signAsync(
        {
            version: 'v1',
            ...payload,
        },
        {
            expiresIn,
        }
    );
}
}
