// ==UserScript==
// @name     wykop.pl show 18+ url
// @version  1
// @grant    none
// @include  https://www.wykop.pl/*
// @exclude  https://www.wykop.pl/link/*
// ==/UserScript==

function *$xIter(xp, el) {
  const iter = document.evaluate(
    xp, el, null, 
    XPathResult.ORDERED_NODE_ITERATOR_TYPE, null
  );

  for (;;) {
    const node = iter.iterateNext();
    
    if (!node) {
      break;
    }
    
    yield node;
  }
}

window.addEventListener('load', function() {
  elements = [...$xIter("//ul[@id='itemsStream']/li", document)]
  elements.forEach(articleDiv => {
    let hidden = [...$xIter("div/div[last()]/div[contains(@class, 'hide18unlogged')]", articleDiv)]
    if (hidden.length > 0) {
      let articleId = articleDiv.firstElementChild.getAttribute('data-id');
      hidden = hidden[0];
      let newUrl = document.createElement('a');
      newUrl.innerHTML = "Click here to see article";
      newUrl.href="https://www.wykop.pl/link/" + articleId;
      Object.assign(newUrl.style, { display: 'block', background: '#4E9CAF', padding: '10px', 'text-align': 'center', 'border-radius': '5px', color: 'white', 'font-weight': 'bold', 'line-height': '25px' });
      hidden.appendChild(newUrl);
    }
  })
}, false);
