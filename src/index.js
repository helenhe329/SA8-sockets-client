import $ from 'jquery';
import './style.scss';


let num = 0;
window.setInterval((() => {
  if (num === 1) {
    $('#main').html(`You've been on this page for ${num} second`);
  } else {
    $('#main').html(`You've been on this page for ${num} seconds`);
  }
  num += 1;
}), 1000);
