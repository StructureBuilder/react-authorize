import {warn} from '../src/utils';

describe('debug', () => {
  describe('warn', () => {
    describe('if console does not exist', () => {
      it('with "test", should throw error', () => {
        const originalConsole = console;
        console = {};
        try {
          warn('test');
        } catch (e) {
          expect(() => {
            throw new Error(e);
          }).toThrowError('test');
        }
        console = originalConsole;
      });
    });
  });
});
