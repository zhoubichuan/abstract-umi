import { Button, Image } from '..';
import type { ButtonProps } from 'antd';
import styles from './index.module.scss';
import React from 'react';

enum TYPE {
  search = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAThJREFUOE+N0j+oz3EUxvHXE5HuNdgog0U3dd1JDIZrIZPuYMHKcBeTlITIaBYjVumK8c6SQf4MBoVswmyQjs7t99W3X9fl1Bk+9Xl/Ps95nhNTVVXbcR4nsRc/8Qb3upP8aiRjrqoW8ARfcGcCzOIwlvEJS0m+/QGraide4j4uJampR3fgIbZicQzexa4kJ6blD+eqavgtrq6BVbUFX3E0yYu/gZO7l3FsAOfwGtumJa5j3iJWBnAez5O0ERtWVR3C6gA28B37knz4h9RzODs25zHeJ7mwgTmb0B48GIP78QynkjxdD66qW2jXF8bgaezGFXQ0t1t2VW3GQbSbB3AkybthxuudDc5McrqJ45N168B7zVZwMcnntZWrqv7hRneSa6OwZ7CnY8bHJD/G8ht8hUdJGv7v+g2bzn1AuIW5owAAAABJRU5ErkJggg==',
  refresh = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAaVJREFUOE+Nkr9rU1EUxz/nJv9AEIuFTPoyie7i0OAqHayGDHZJcl/M4iCdWvzxrEUnXVzSvpdkKdgSqkNxlTiIo4M45emUobSU6J57r1xp5KEt5Ezn/vjc7/eec4RM1Gq187lc7j6wCFwCLPADeJfP5zfb7fbh9LpMkzAMb1truyJyAGwrpb76M2PMVRG5C5wDmkmSvI2iSP0BtdZ3gB3gaZqmLwaDwSTrpFwu50ul0ppz7qGIvHLOFeTE3hB4mSTJsyyQzb3KaDT6ACwAu6K1XgeqaZpe/lcpC9br9WtKqcfAdefcew9+EZG9OI43zlLL7lcqlVyhUJiTMAx/WWuXO53O/izgf1WdFWo0GotKqW1pNpvz4/H4sN/vm1lgrfUjYMlbfeOcuwl8staud7vdz2c94NsSBMG3aVV9/6rAx2KxeCOKIj8tp8aJ2ooxpuSruikiP51zD0RkYzgcPj9tAIIgWAWeiEg1juM98Y31KlrrJWALOM6OnLX2CrDsnLuglKp7yNv5O6t+0Wq15iaTyT3gFnARUMB3YN8Y87rX6x1N//AbLzSnRuVnIJIAAAAASUVORK5CYII=',
  alarm = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAW9JREFUOE+l002IjmEUxvHfZc8SpWRkY2Pje2eBshKy8FEoiikrWcielJ0ykmIxQylkpSayI0mWNhqiiC1rR/fb807v5H0mcjZPnfu+/891zrlO/GdksfdV9bCdJ9nfd28eUFVLsDrJx6pq+d241j08i9kkVVVr8CnJrwF8SK6qW9iFnZjBZvzozpfiNY7gWQc7OQ+oqkO4iws4ihU4jUEJaCXcwDdM4zIOJ7k3UFBVc/iA+5hq8pM8Ha27qpqyWUziICaSrG1FbcEr7MOxrg8bxzWtqt7gM+7gEbY2wHHcxnI8bjKTNNgf0U1lJfbiO040wATW4wle4Gvf2KrqAVZhO/bg3QIfVNXLvwEk2TaUNw7wJcmBnhIGChYDvMfzJKd6AM0rO5KsW6CgqpZ1c7+C82h/qu7S6LeN7yrO4WaSn0MfXMeZf9yrqSSTQ8CGZowRQMtvwsUudwnNA6M9m0vytncbu4Vqtm4x3RZpnMLfjFWKv9PWFOUAAAAASUVORK5CYII=',
  add = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAD1JREFUOE9jZMAB/v//PxckxcjImIxNCSMejfuhGh1HrEZo6ClhCQADqNgFLHL3GMnWOBod4LRKcpLDm8gBMIw7QyjCINQAAAAASUVORK5CYII=',
  arrowleft = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAAi2ky3AAAAAXNSR0IArs4c6QAAASNJREFUOE+l07FKxTAUBuD/hAZfwMHJTeTq6Cu4uzela0cRpwteifoAiouDaw8UBHcF3cTV3UkQBwdBOlQqSSQXI7VW6a0Zf3K+kJMTQscqimJkjLkAsK2UOuva086oHXjEWnvtnFtwzm0lSXI0M9REfPEgqI0MgrqQz+vcAbgPVyOiJ+fcoVLqIWRaa6G1tvQH8ltrHqWUoyiK5qqqugSwCmBMzOz1xT4NDXuEEOsAlqy1Jz4jolcP7QA4mAGyUsrluq7nAdwQkQBwNX1+Zp4A2O+BvRHROI7j6Ugw8xqAFWPM+dcc5Xm+S0R7TUwIMXHOnYasLMuXLMveuw78NpBtbNAchVOa2L8gDzawTaXUcY/e4cdfC0XMvGGMuU3T9LkP9AH0rpvtSpH5PQAAAABJRU5ErkJggg==',
  arrowright = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAAi2ky3AAAAAXNSR0IArs4c6QAAASFJREFUOE+d0j1LxTAUBuD3JFgsUgQHBxGc3F3F7Q66C0IhnQUX8f4ANSjoJOLYNTTd3fUnOKqIm5ODg6uk9EiKlVoqpDfzOc/5CiHwWWv3AFxJKXfSNH3up1Ggg6IojojomojehRCTPjYa8oWHsJmgIayBtNZCa123Y1pr14hoyswrndHXAWx0V9HtjKy1UwCXAB7jON6uqurLOeeXuRqyvxajsiw/mXnRJwkhDgC81nV9F4J0Yt58R/cAJszsR9uKoujDOffi3RHYMRljFqSUuwCelFIPPvln3AsA8wHYiVLq/N+r5Xk+lyTJUgsx8z6Asx7cIM0VAyo2Ie2H7MCnWZb9wjNBzPwHGdWRtfYQwM0QMgoyxixLKTeVUrdD6/gGsiB3axH5LPUAAAAASUVORK5CYII=',
}
type TYPES = keyof typeof TYPE;
interface newButtonProps extends ButtonProps {
  icon: TYPES;
  imagestyle?: Array<number>;
}
const App: React.FC<newButtonProps> = ({ icon, imagestyle = [16, 16], ...props }) => {
  if (['arrowleft', 'arrowright'].includes(icon)) {
    return (
      <span className={styles.dark}>
        <Button
          icon={
            <Image src={TYPE[icon]} width={imagestyle[0]} height={imagestyle[1]} preview={false} />
          }
          {...props}
        >
          {props.children}
        </Button>
      </span>
    );
  } else {
    return (
      <span className={styles.image}>
        <Button
          icon={
            <Image src={TYPE[icon]} width={imagestyle[0]} height={imagestyle[1]} preview={false} />
          }
          {...props}
        >
          {props.children}
        </Button>
      </span>
    );
  }
};
export default App;
