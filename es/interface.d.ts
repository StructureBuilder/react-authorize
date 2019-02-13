/// <reference types="react" />
declare type AuthorityBasic = string | number | symbol;
declare type Authority = AuthorityBasic | AuthorityBasic[];
declare type FC = (authority: Authority) => boolean | Promise<any>;
declare type Permissions = Authority | Promise<any> | FC;
export interface IOptions {
    permissions: Permissions;
    authority: Authority;
    children: React.ReactElement<any> | null;
    unauthorized: React.ReactElement<any> | null;
    loading: React.ReactElement<any> | null;
}
export {};
