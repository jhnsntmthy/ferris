const watch = events => (selector, context = document) => fn => events.split(' ').forEach(ev => {
  context.querySelector(selector).addEventListener(ev, fn);
});
const unwatch = events => (selector, context = document) => fn => events.split(' ').forEach(ev => {
  context.querySelector(selector).removeEventListener(ev, fn);
});

const freshCoordinates = () => ({ x: 0, y: 0 });
const orZero = n => !isNaN(n) ? n : 0;
const now = Date.now || (() => ((new Date()).valueOf()));

export const ferris = (wheelSelector, context = document) => {
  const current_coords = freshCoordinates();
  const mass = 1000,
        friction = 1,
        wheel_ratio = 2500,
        mouse_ratio = 20,
        touch_ratio = 1,
        frame_rate = 60;

  let start_point = freshCoordinates(),
      last_point = freshCoordinates(),
      last_coords = freshCoordinates(),
      velocity = { ...freshCoordinates(), y: 0.3 },
      last_time = now(),
      inertia_time = last_time;

  const calculateVelocity = e => {
    const delta_time = now() - last_time;
    const x = orZero(velocity.x + ((last_coords.x / delta_time)
              / (e.pageX ? mouse_ratio : touch_ratio) ));
    const y = orZero(velocity.y + ((last_coords.y / delta_time)
              / (e.pageY ? mouse_ratio : touch_ratio) ));
    return { x, y };
  };

  const touchStart = e => {
    e.preventDefault();
    const x = e.pageX || e.originalEvent.touches[0].pageX,
          y = e.pageY || e.originalEvent.touches[0].pageY;
    last_coords = freshCoordinates();
    velocity = freshCoordinates();
    start_point = { x, y };
    spin();
    watch('mousemove touchmove')('body', context)(touchMove);
    watch('mouseup touchend')('body', context)(touchEnd);
  };

  const touchMove = e => {
    e.preventDefault();
    last_time = now();
    const x = e.pageX || e.originalEvent.touches[0].pageX,
          y = e.pageY || e.originalEvent.touches[0].pageY,
          dx = x - start_point.x,
          dy = y - start_point.y;
    last_point = {...start_point};
    start_point = { x, y };
    last_coords = { x: dx, y: dy }
    current_coords.x += dx;
    current_coords.y += dy;
    spin();
  };

  const touchEnd = e => {
    velocity = calculateVelocity(e);
    spin();
    inertia_time = null;
    unwatch('mousemove touchmove')('body', context)(touchMove);
    unwatch('mouseup touchend')('body', context)(touchEnd);
  };

  const mouseWheelSpin = e => {
    if (velocity.x === 0 && velocity.y === 0) {
      inertia_time = now();
    }
    velocity.x -= orZero(e.deltaX) / wheel_ratio;
    velocity.y -= orZero(e.deltaY) / wheel_ratio;
  };

  const spin = () => {
    const items = Array.from(context.querySelector('.wheel').children);
    items.forEach((el:HTMLElement, i) => {
      el.style.cssText = `
        transform: perspective(500px) rotate3d(1,0,0,${angle(items.length)(i)}deg) translate3d(0,0,262px)
      `;
    });
  };

  const angle = t => i => -(current_coords.y / 2) + (360 / t) * i;

  const loop = () => {
    velocity.x = orZero(velocity.x);
    velocity.y = orZero(velocity.y);

    if (!inertia_time) {
      inertia_time = now();
    } else if (Math.abs(velocity.y) > 0.01){
      const time = now(),
            force_x = velocity.x * friction,
            force_y = velocity.y * friction,
            acc_x = force_x / mass,
            acc_y = force_y / mass,
            delta_time = time - inertia_time,
            vx = orZero(velocity.x - (acc_x * delta_time)),
            vy = orZero(velocity.y - (acc_y * delta_time));

      velocity = { x: vx, y: vy };
      last_coords = {...current_coords };
      current_coords.x += vx * delta_time;
      current_coords.y += vy * delta_time;
      inertia_time = time;
      spin();
    }

    if (window.requestAnimationFrame) {
      requestAnimationFrame(loop);
    } else {
      setTimeout(loop, 1000 / frame_rate);
    }
  };

  watch('mousedown touchstart')('.wheel', context)(touchStart);
  watch('wheel mousewheel')('.wheel', context)(mouseWheelSpin);
  loop(); // start watching
};
