import PromiseRender from '../src/components/PromiseRender';
import {checkPermissions} from '../src/utils';

const Children = 'children';
const Unauthorized = 'unauthorized';
const Loading = 'loading';
const symbol = Symbol();

describe('checkPermissions', () => {
  describe('if the parameter type is {permissions: Promise}', () => {
    it('with {permissions: Promise.resolve()}, should return PromiseRender components', () => {
      const {type} = checkPermissions({
        permissions: Promise.resolve(),
        loading: Loading,
      });
      expect(type).toBe(PromiseRender);
    });
  });

  describe('if the parameter type is {permissions: Function}', () => {
    it('with {permissions: authority => true}, should return children', () => {
      expect(checkPermissions({
        permissions: () => true,
        children: Children,
      })).toBe(Children);
    });

    it('with {permissions: authority => false}, should return unauthorized', () => {
      expect(checkPermissions({
        permissions: () => false,
        unauthorized: Unauthorized,
      })).toBe(Unauthorized);
    });

    it('with {permissions: authority => Promise.resolve()}, should return PromiseRender components', () => {
      const {type} = checkPermissions({
        permissions: () => Promise.resolve(),
      });
      expect(type).toBe(PromiseRender);
    });
  });

  describe('if the parameter type is {permissions: string, authority: string}', () => {
    it('with {permissions: "admin", authority: "admin"}, should return children', () => {
      expect(checkPermissions({
        permissions: 'admin',
        authority: 'admin',
        children: Children,
      })).toBe(Children);
    });

    it('with {permissions: "admin", authority: "user"}, should return unauthorized', () => {
      expect(checkPermissions({
        permissions: 'admin',
        authority: 'user',
        unauthorized: Unauthorized,
      })).toBe(Unauthorized);
    });
  });

  describe('if the parameter type is {permissions: string, authority: number}', () => {
    it('with {permissions: "admin", authority: 1001}, should return unauthorized', () => {
      expect(checkPermissions({
        permissions: 'admin',
        authority: 1001,
        unauthorized: Unauthorized,
      })).toBe(Unauthorized);
    });
  });

  describe('if the parameter type is {permissions: string, authority: symbol}', () => {
    it('with {permissions: "admin", authority: Symbol()}, should return unauthorized', () => {
      expect(checkPermissions({
        permissions: 'admin',
        authority: symbol,
        unauthorized: Unauthorized,
      })).toBe(Unauthorized);
    });
  });

  describe('if the parameter type is {permissions: number, authority: string}', () => {
    it('with {permissions: 1001, authority: "admin"}, should return unauthorized', () => {
      expect(checkPermissions({
        permissions: 1001,
        authority: 'admin',
        unauthorized: Unauthorized,
      })).toBe(Unauthorized);
    });
  });

  describe('if the parameter type is {permissions: number, authority: number}', () => {
    it('with {permissions: 1001, authority: 1001}, should return children', () => {
      expect(checkPermissions({
        permissions: 1001,
        authority: 1001,
        children: Children,
      })).toBe(Children);
    });

    it('with {permissions: 1001, authority: 1002}, should return unauthorized', () => {
      expect(checkPermissions({
        permissions: 1001,
        authority: 1002,
        unauthorized: Unauthorized,
      })).toBe(Unauthorized);
    });
  });

  describe('if the parameter type is {permissions: number, authority: symbol}', () => {
    it('with {permissions: 1001, authority: Symbol()}, should return unauthorized', () => {
      expect(checkPermissions({
        permissions: 1001,
        authority: symbol,
        unauthorized: Unauthorized,
      })).toBe(Unauthorized);
    });
  });

  describe('if the parameter type is {permissions: symbol, authority: string}', () => {
    it('with {permissions: Symbol(), authority: "admin"}, should return unauthorized', () => {
      expect(checkPermissions({
        permissions: symbol,
        authority: 'admin',
        unauthorized: Unauthorized,
      })).toBe(Unauthorized);
    });
  });

  describe('if the parameter type is {permissions: symbol, authority: number}', () => {
    it('with {permissions: Symbol(), authority: 1001}, should return unauthorized', () => {
      expect(checkPermissions({
        permissions: symbol,
        authority: 1001,
        unauthorized: Unauthorized,
      })).toBe(Unauthorized);
    });
  });

  describe('if the parameter type is {permissions: symbol, authority: symbol}', () => {
    it('with {permissions: symbol, authority: symbol}, should return children', () => {
      expect(checkPermissions({
        permissions: symbol,
        authority: symbol,
        children: Children,
      })).toBe(Children);
    });

    it('with {permissions: Symbol(), authority: Symbol()}, should return unauthorized', () => {
      expect(checkPermissions({
        permissions: Symbol(),
        authority: Symbol(),
        unauthorized: Unauthorized,
      })).toBe(Unauthorized);
    });
  });

  describe('if the parameter type is {permissions: string | number | symbol, authority: array}', () => {
    describe('with {authority: ["admin", 1001, symbol]}', () => {
      it('with {permissions: "admin"}, should return children', () => {
        expect(checkPermissions({
          authority: ['admin', 1001, symbol],
          permissions: 'admin',
          children: Children,
        })).toBe(Children);
      });

      it('with {permissions: 1001}, should return children', () => {
        expect(checkPermissions({
          authority: ['admin', 1001, symbol],
          permissions: 1001,
          children: Children,
        })).toBe(Children);
      });

      it('with {permissions: symbol}, should return children', () => {
        expect(checkPermissions({
          authority: ['admin', 1001, symbol],
          permissions: symbol,
          children: Children,
        })).toBe(Children);
      });

      it('with {permissions: "other"}, should return unauthorized', () => {
        expect(checkPermissions({
          authority: ['admin', 1001, symbol],
          permissions: 'other',
          unauthorized: Unauthorized,
        })).toBe(Unauthorized);
      });
    });
  });

  describe('if the parameter type is {permissions: array, authority: string | number | symbol | array}', () => {
    describe('with {permissions: ["admin", 1001, symbol]}', () => {
      it('with {authority: "admin"}, should return children', () => {
        expect(checkPermissions({
          permissions: ['admin', 1001, symbol],
          authority: 'admin',
          children: Children,
        })).toBe(Children);
      });

      it('with {authority: 1001}, should return children', () => {
        expect(checkPermissions({
          permissions: ['admin', 1001, symbol],
          authority: 1001,
          children: Children,
        })).toBe(Children);
      });

      it('with {authority: symbol}, should return children', () => {
        expect(checkPermissions({
          permissions: ['admin', 1001, symbol],
          authority: symbol,
          children: Children,
        })).toBe(Children);
      });

      it('with {authority: ["admin"]}, should return children', () => {
        expect(checkPermissions({
          permissions: ['admin', 1001, symbol],
          authority: ['admin'],
          children: Children,
        })).toBe(Children);
      });

      it('with {authority: "other"}, should return unauthorized', () => {
        expect(checkPermissions({
          permissions: ['admin', 1001, symbol],
          authority: 'other',
          unauthorized: Unauthorized,
        })).toBe(Unauthorized);
      });
    });
  });

  describe('If the authority type in the parameter does not match, but permissions are valuable', () => {
    it('with {permissions: "admin", authority: undefined}, should return unauthorized', () => {
      expect(checkPermissions({
        permissions: 'admin',
        unauthorized: Unauthorized,
      })).toBe(Unauthorized);
    });
  });

  describe('If the authority type in the parameter does not match', () => {
    it('with {authority: undefined}, and production environment, should throw error', () => {
      const originalConsoleError = console.error;
      console.error = jest.fn(error => {
        throw new Error(error);
      });
      try {
        checkPermissions({
          permissions: undefined,
        });
      } catch (e) {
        expect(() => {
          throw new Error(e);
        }).toThrowError('[react-authorize]');
      }
      console.error = originalConsoleError;
    });

    it('with {authority: undefined}, and development environment, should return null', () => {
      const originalConsoleError = console.error;
      console.error = jest.fn(() => undefined);
      expect(checkPermissions({
        permissions: undefined,
      })).toBe(null);
      console.error = originalConsoleError;
    });
  });
});
