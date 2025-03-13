import { match } from "$/utils/mutch";

// Easing Functions
export var easeInOutCubic = (t: number) =>
    match(t)
      .when((t) => t < 0.5, (t) => 4 * t * t * t)
      ._(() => 1 - Math.pow(-2 * t + 2, 3) / 2);

export var easeOutElastic = (t: number) =>
    match(t)
      .when((t) => t === 0, () => 0)
      .when((t) => t === 1, () => 1)
      ._(() => {
          const c4 = (2 * Math.PI) / 3;
          return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      });
  
  export var easeOutBounce = (t: number) => {
    return match(t)
      .when((t) => t < 1 / 2.75, (t) => 7.5625 * t * t)
      .when((t) => t < 2 / 2.75, (t) => 7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
      .when((t) => t < 2.5 / 2.75, (t) => 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
      ._((t) => 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375)
  };


  export function animate(duration: number, easingFunction: (t: number) => number, callback: (progress: number) => void) {
    const start = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - start;
      const t = Math.min(elapsed / duration, 1); // Normalize time to [0, 1]
      const easedValue = easingFunction(t);
      // console.log(`t: ${t}, easedValue: ${easedValue}`);
      callback(easedValue);

      if (t < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

