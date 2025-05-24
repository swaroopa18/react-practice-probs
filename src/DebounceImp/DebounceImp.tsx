import React, { useState } from 'react';

// Debouncing: Fires the function only once after a pause.
// Throttling: Ensures the function runs at most once in a specified time frame.

//trailing debounce
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

//leading debounce
export const debounce2 = (fn, delay) => {
  let timer;
  return (...args) => {
    if (!timer) {
      fn(...args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
};

//leading & trailing debounce
export const debounce3 = (fn, delay) => {
  let timer;
  let calledLeading = false;
  let lastArgs = null;
  return (...args) => {
    if (!calledLeading) {
      fn(...args);
      calledLeading = true;
    } else {
      lastArgs = args;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (lastArgs) {
        fn(...args);
        lastArgs = null
      }
      calledLeading = false
      timer = null;
    }, delay);
  };
};


//debounce(fn, delay, { leading: true, trailing: true })
export const debounce4 = (fn, delay, props) => {
  const {leading, trailing} = props
  let timer;
  let calledLeading = false;
  let lastArgs = null;
  return (...args) => {
    if (!calledLeading && leading) {
      fn(...args);
      calledLeading = true;
    } else {
      lastArgs = args;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (lastArgs && trailing) {
        fn(...lastArgs);
        lastArgs = null
      }
      calledLeading = false
      timer = null;
    }, delay);
  };
};

export const debounce1 = (fn, delay) => {
  let timer;
  return function () {
    const self = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(self, args), delay);
  };
};

const throttle = (fn, delay) => {
  let isThrottled = false;

  return (...args) => {
    if (!isThrottled) {
      fn(...args);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
};

const App = () => {
  const [list, setList] = useState<string[]>([]);

  const handleAdd = () => {
    setList((prev: string[]) => [...prev, 'hi']);
  };

  const logScroll = () => {
    console.log('Scrolled!');
  };

  const throttledLogScroll = throttle(logScroll, 5000);

  window.addEventListener('scroll', throttledLogScroll);

  const debouceFn = debounce(handleAdd, 20);

  return (
    <div className='App'>
      <button onClick={debouceFn}>Add</button>
      <ul>
        {list.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
