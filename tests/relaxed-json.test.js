import { describe, it, expect } from 'vitest';
import RJSON from '../relaxed-json.js';

describe('RJSON.parse', () => {
  describe('happy path', () => {
    it('parses a simple JSON object', () => {
      const result = RJSON.parse('{"a": 1, "b": 2}');
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('parses a JSON array', () => {
      const result = RJSON.parse('[1, 2, 3]');
      expect(result).toEqual([1, 2, 3]);
    });

    it('parses nested objects', () => {
      const result = RJSON.parse('{"outer": {"inner": "value"}}');
      expect(result).toEqual({ outer: { inner: 'value' } });
    });

    it('parses strings with double quotes', () => {
      const result = RJSON.parse('{"key": "hello world"}');
      expect(result).toEqual({ key: 'hello world' });
    });

    it('parses numbers (integers and floats)', () => {
      expect(RJSON.parse('{"int": 42}')).toEqual({ int: 42 });
      expect(RJSON.parse('{"float": 3.14}')).toEqual({ float: 3.14 });
      expect(RJSON.parse('{"neg": -10}')).toEqual({ neg: -10 });
      expect(RJSON.parse('{"exp": 1e5}')).toEqual({ exp: 100000 });
    });

    it('parses booleans and null', () => {
      expect(RJSON.parse('{"t": true}')).toEqual({ t: true });
      expect(RJSON.parse('{"f": false}')).toEqual({ f: false });
      expect(RJSON.parse('{"n": null}')).toEqual({ n: null });
    });
  });

  describe('relaxed JSON features', () => {
    it('parses single-quoted strings', () => {
      const result = RJSON.parse("{key: 'value'}");
      expect(result).toEqual({ key: 'value' });
    });

    it('parses unquoted keys', () => {
      const result = RJSON.parse('{name: "test", count: 5}');
      expect(result).toEqual({ name: 'test', count: 5 });
    });

    it('parses single-line comments', () => {
      const result = RJSON.parse('{"a": 1 // comment\n}');
      expect(result).toEqual({ a: 1 });
    });

    it('parses multi-line comments', () => {
      const result = RJSON.parse('{"a": 1 /* comment */}');
      expect(result).toEqual({ a: 1 });
    });

    it('handles trailing commas', () => {
      const result = RJSON.parse('{a: 1, b: 2,}');
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('handles trailing commas in arrays', () => {
      const result = RJSON.parse('[1, 2, 3,]');
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('edge cases', () => {
    it('parses empty object', () => {
      const result = RJSON.parse('{}');
      expect(result).toEqual({});
    });

    it('parses empty array', () => {
      const result = RJSON.parse('[]');
      expect(result).toEqual([]);
    });

    it('throws on whitespace-only input', () => {
      expect(() => RJSON.parse('   ')).toThrow(SyntaxError);
    });
  });

  describe('error handling', () => {
    it('throws SyntaxError for invalid JSON', () => {
      expect(() => RJSON.parse('{invalid}')).toThrow(SyntaxError);
    });

    it('throws SyntaxError for unmatched brackets', () => {
      expect(() => RJSON.parse('{a: 1')).toThrow(SyntaxError);
      expect(() => RJSON.parse('[1, 2')).toThrow(SyntaxError);
    });

    it('throws TypeError for invalid opts parameter', () => {
      expect(() => RJSON.parse('{}', 123)).toThrow(TypeError);
    });
  });

  describe('with options', () => {
    it('uses reviver function', () => {
      const result = RJSON.parse('{"a": 1}', (key, value) => {
        if (typeof value === 'number') return value * 2;
        return value;
      });
      expect(result).toEqual({ a: 2 });
    });

    it('parses strict JSON when relaxed: false', () => {
      const result = RJSON.parse('{"a": 1}', { relaxed: false });
      expect(result).toEqual({ a: 1 });
    });

    it('throws on single quotes when relaxed: false', () => {
      expect(() => RJSON.parse("{'a': 1}", { relaxed: false })).toThrow(SyntaxError);
    });
  });
});

describe('RJSON.stringify', () => {
  describe('happy path', () => {
    it('stringifies an object', () => {
      const result = RJSON.stringify({ a: 1, b: 2 });
      expect(result).toBe('{"a":1,"b":2}');
    });

    it('stringifies an array', () => {
      const result = RJSON.stringify([1, 2, 3]);
      expect(result).toBe('[1,2,3]');
    });

    it('stringifies nested objects', () => {
      const result = RJSON.stringify({ outer: { inner: 'value' } });
      expect(result).toBe('{"outer":{"inner":"value"}}');
    });

    it('stringifies strings', () => {
      const result = RJSON.stringify('hello');
      expect(result).toBe('"hello"');
    });

    it('stringifies numbers', () => {
      expect(RJSON.stringify(42)).toBe('42');
      expect(RJSON.stringify(3.14)).toBe('3.14');
    });

    it('stringifies booleans', () => {
      expect(RJSON.stringify(true)).toBe('true');
      expect(RJSON.stringify(false)).toBe('false');
    });

    it('stringifies null', () => {
      const result = RJSON.stringify(null);
      expect(result).toBe('null');
    });

    it('stringifies arrays with mixed types', () => {
      const result = RJSON.stringify([1, 'two', true, null]);
      expect(result).toBe('[1,"two",true,null]');
    });
  });

  describe('edge cases', () => {
    it('stringifies empty object', () => {
      const result = RJSON.stringify({});
      expect(result).toBe('{}');
    });

    it('stringifies empty array', () => {
      const result = RJSON.stringify([]);
      expect(result).toBe('[]');
    });
  });
});

describe('RJSON.transform', () => {
  describe('happy path', () => {
    it('transforms relaxed JSON to strict JSON', () => {
      const result = RJSON.transform("{key: 'value'}");
      expect(result).toBe('{"key": "value"}');
    });

    it('removes comments from JSON', () => {
      const result = RJSON.transform('{"a": 1 // comment\n}');
      expect(result).toBe('{"a": 1           \n}');
    });

    it('removes multi-line comments', () => {
      const result = RJSON.transform('{"a": 1 /* comment */}');
      expect(result).toBe('{"a": 1              }');
    });

    it('removes trailing commas', () => {
      const result = RJSON.transform('{a: 1, b: 2,}');
      expect(result).toBe('{"a": 1, "b": 2 }');
    });
  });

  describe('edge cases', () => {
    it('handles empty input', () => {
      const result = RJSON.transform('');
      expect(result).toBe('');
    });

    it('handles input with only whitespace', () => {
      const result = RJSON.transform('   ');
      expect(result).toBe('   ');
    });
  });
});
