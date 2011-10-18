function popup_toggle(div_id) {
  if (div_id === undefined)
    return ;
  var el = document.getElementById(div_id);
  if ( el.style.display == 'none' ) { el.style.display = 'block';}
  else {el.style.display = 'none';}
}
function popup_on(div_id) {
  if (div_id === undefined)
    return false;
  var el = document.getElementById(div_id);
  if ( el.style.display == 'none' ) { return false;}
  else {return true;}
}
function popup_blanket_size(popUpDivVar, blanketId) {
  if (typeof window.innerWidth != 'undefined') {
    viewportheight = window.innerHeight;
  } else {
    viewportheight = document.documentElement.clientHeight;
  }
  if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
    blanket_height = viewportheight;
  } else {
    if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
      blanket_height = document.body.parentNode.clientHeight;
    } else {
      blanket_height = document.body.parentNode.scrollHeight;
    }
  }
  if (!(blanketId === undefined)) {
    var blanket = document.getElementById(blanketId);
    blanket.style.height = blanket_height + 'px';
  }
  var popUpDiv = document.getElementById(popUpDivVar);
  popUpDiv_height=blanket_height/2-150;//150 is half popup's height
  popUpDiv.style.top = popUpDiv_height + 'px';
}
function popup_window_pos(popUpDivVar) {
  if (typeof window.innerWidth != 'undefined') {
    viewportwidth = window.innerHeight;
  } else {
    viewportwidth = document.documentElement.clientHeight;
  }
  if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
    window_width = viewportwidth;
  } else {
    if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
      window_width = document.body.parentNode.clientWidth;
    } else {
      window_width = document.body.parentNode.scrollWidth;
    }
  }
  var popUpDiv = document.getElementById(popUpDivVar);
  window_width=window_width/2-150;//150 is half popup's width
  popUpDiv.style.left = window_width + 'px';
}
function popup_popup(windowname, blanketId) {
  popup_blanket_size(windowname, blanketId);
  popup_window_pos(windowname);
  popup_toggle(blanketId);
  popup_toggle(windowname);   
}
function popup_show(windowname, blanketId) {
  if (!popup_on(windowname))
    popup_popup(windowname, blanketId);
}
function popup_close(windowname, blanketId) {
  if (popup_on(windowname))
    popup_popup(windowname, blanketId);
}