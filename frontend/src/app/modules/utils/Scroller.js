import scroll from 'scroll';
import scrollDoc from 'scroll-doc';
import ease from 'ease-component';

const page = scrollDoc();

export const Scroller = {
  scrollToTop(to, options = {}, cb) {
    scroll.top(page, to, {
      ease: ease.inOutCube,
      duration: 800,
      ...options
    }, cb);
  }
}