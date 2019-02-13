type AuthorityBasic = string | number | symbol;

type Authority = AuthorityBasic | AuthorityBasic[];

type FC = (authority: Authority) => boolean | Promise<any>;

type Permissions = Authority | Promise<any> | FC;

export interface IOptions {
  permissions: Permissions;
  authority: Authority;
  children: React.ReactElement<any> | null;
  unauthorized: React.ReactElement<any> | null;
  loading: React.ReactElement<any> | null;
}
