import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(context);

    console.log(req.cookies, req.Cookie);

    const accessToken =
      req.cookies && req.cookies.accessToken ? req.cookies.accessToken : false;
    const UserDataToken =
      req.cookies && req.cookies.UserData ? req.cookies.UserData : false;
    const Permissions1Token =
      req.cookies && req.cookies.Permissions1 ? req.cookies.Permissions1 : false;
    const Permissions2Token =
      req.cookies && req.cookies.Permissions2 ? req.cookies.Permissions2 : false;
    const Permissions3Token =
      req.cookies && req.cookies.Permissions3 ? req.cookies.Permissions3 : false;
    const Authreq = req.headers && req.headers.auth ? req.headers.auth : false;

    if (accessToken) {
      try {
        const AccessData = this.authService.verify(accessToken);
        req.auth = AccessData;
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid Token Access!');
      }
    } else if (Authreq) {
      if (this.authService.decode(String(Authreq))) {
        return true;
      } else {
        throw new UnauthorizedException('Communication Without Authorization!');
      }
    } else if (
      UserDataToken &&
      Permissions1Token &&
      Permissions2Token &&
      Permissions3Token
    ) {
      try {
        const UserData: any = this.authService.verify(req.cookies.UserData);

        const Permissions1: any = this.authService.verify(req.cookies.Permissions1);
        const Permissions2: any = this.authService.verify(req.cookies.Permissions2);
        const Permissions3: any = this.authService.verify(req.cookies.Permissions3);

        const Permissions = {
          Cadastro: Permissions1.Cadastro,
          Início: Permissions1['Início'],
          Instituto: Permissions2.Instituto,
          Parceiros: Permissions2.Parceiros,
          Contato: Permissions2.Contato,
          'Trabalhe Conosco': Permissions2['Trabalhe Conosco'],
          Blog: Permissions3.Blog,
          'Catálago de Produtos': Permissions3['Catálago de Produtos'],
          Chamados: Permissions3.Chamados,
          Instucional: Permissions3.Instucional,
        };

        req.auth = {
          uuid_user: UserData.uuid_user,
          profile: UserData.profile,
          permissions: Permissions,
        };

        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid Token!');
      }
    } else {
      throw new UnauthorizedException('Token Not Found!');
    }
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}
