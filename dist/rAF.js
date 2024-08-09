"use strict";
/**
 * @description 基于raf的滚动函数
 * @param el 元素
 * @param to 目标滚动位置
 * @param duration 动画时长 ms
 */
const rAFScrollTo = (el, to, duration) => {
  const start = el.scrollTop;
  const change = to - start;
  const increment = 1000 / 60;
  let currentTime = 0;
  let requestId;
  const cancelRAF = () => {
    if (requestId) {
      cancelAnimationFrame(requestId);
      window.removeEventListener('wheel', cancelRAF);
    }
  };
  // 监听鼠标滚轮
  window.addEventListener('wheel', cancelRAF);
  const animateScroll = () => {
    currentTime += increment;
    el.scrollTop = easeInOutQuad(currentTime, start, change, duration);
    if (currentTime < duration) {
      requestId = requestAnimationFrame(animateScroll);
    }
  };
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1)
      return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };
  animateScroll();
};