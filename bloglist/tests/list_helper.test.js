

const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
})

describe('totalLikes', () => {
  test('when list has no blogs, equals 0', () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0);
  })


test('when list has one blog, equals the likes of that', () => {
  const blogs =[
    {
      _id: '1',
      title: 'Test Blog',
      author: 'Author',
      url: 'http://example.com',
      likes: 5
    }
  ]
  const result = listHelper.totalLikes(blogs)
  assert.strictEqual(result, 5)
})

test('when list has multiple blogs, equals the sum of likes', () => {
  const blogs = [
    {
      _id: '1',
      title: 'Test Blog 1',
      author: 'Author 1',
      url: 'http://example.com/1',
      likes: 5
    },
    {
      _id: '2',
      title: 'Test Blog 2',
      author: 'Author 2',
      url: 'http://example.com/2',
      likes: 3
    },
    {
      _id: '3',
      title: 'Test Blog 3',
      author: 'Author 3',
      url: 'http://example.com/3',
      likes: 7
    }
  ]
  const result = listHelper.totalLikes(blogs)
  assert.strictEqual(result,15)
})

test('when list has blogs with zero likes, calculates the total correctly', () => {
  const blogs = [
    {
      _id: '1',
      title: 'Test Blog 1',
      author: 'Author 1',
      url: 'http://example.com/1',
      likes: 0
    },
    {
      _id: '2',
      title: 'Test Blog 2',
      author: 'Author 2',
      url: 'http://example.com/2',
      likes: 0
    },
    {
      _id: '3',
      title: 'Test Blog 3',
      author: 'Author 3',
      url: 'http://example.com/3',
      likes: 0
    }
  ];
  const result = listHelper.totalLikes(blogs);
  assert.strictEqual(result, 0);
})
test('when list has mixed blogs, calculates the total correctly', () => {
  const blogs = [
    {
      _id: '1',
      title: 'Test Blog 1',
      author: 'Author 1',
      url: 'http://example.com/1',
      likes: 2
    },
    {
      _id: '2',
      title: 'Test Blog 2',
      author: 'Author 2',
      url: 'http://example.com/2',
      likes: 3
    },
    {
      _id: '3',
      title: 'Test Blog 3',
      author: 'Author 3',
      url: 'http://example.com/3',
      likes: 5
    }
  ];
  const result = listHelper.totalLikes(blogs);
  assert.strictEqual(result, 10);
})
})

