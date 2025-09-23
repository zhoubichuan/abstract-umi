import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Table from '../index';

describe('测试 Table 模块', () => {
  it('Table 组件 - 空属性', () => {
    const {container} = render(<Table />)
    const link = container.querySelector('a');
    expect(link?.textContent).toBe('');
    expect(link?.href).toBe('http://localhost/#');
    expect(link?.className).toBe('normal');
  });
  it('Table 组件 - 非空属性', () => {
    const siteUrl = "http://example.com/";
    const text = "Visit";
    const {container} = render(<Table page={siteUrl} children={text} />)
    const link = container.querySelector('a');
    expect(link?.textContent).toBe(text);
    expect(link?.href).toBe(siteUrl);
    expect(link?.className).toBe('normal');
    userEvent.hover(link);
    expect(link?.className).toBe('hovered');
    userEvent.unhover(link);
    expect(link?.className).toBe('normal');
  });
});