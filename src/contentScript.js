'use strict';



var observer = new MutationObserver(function (mutations) {
  mutations.forEach(async function (mutation) {
    if (!mutation.addedNodes) {
      return;
    }
    const stored = await chrome.storage.sync.get(['sessions']);
    const sessions = stored.sessions || [];
    for (var i = 0; i < mutation.addedNodes.length; i++) {
      if (mutation.addedNodes[i].innerHTML && mutation.addedNodes[i].innerHTML.includes("awsui_tabs-header-list_14rmt_oujth_192")) {
        console.log("TABLIST", mutation.addedNodes[i]);
        const ul = mutation.addedNodes[i].querySelector(".awsui_tabs-header-list_14rmt_oujth_192");
        const liClone = ul.lastElementChild.cloneNode(true);
        liClone.querySelector("span").innerText = "Open my ❤️";
        liClone.addEventListener("click", async function () {
          const stored = await chrome.storage.sync.get(['sessions']);
          const sessions = stored.sessions || [];
          console.log("sessies", sessions)
          for (const session of sessions) {
            window.open(`https://portal.awsevents.com/events/reinvent2022/dashboard/event/sessions/${session.toLowerCase()}`, '_blank');
          }
        });
        ul.appendChild(liClone);
        console.log("ul", ul);
      }

      if (mutation.addedNodes[i].classList && mutation.addedNodes[i].innerHTML.includes("PiRB2r+sLWLyViDQF2KzsA==") && !mutation.addedNodes[i].classList.contains("cloned")) {
        const button = mutation.addedNodes[i].querySelector("[aria-label='favoriteButton']");
        const clone = button.cloneNode(true);
        const closest = button.closest('[data-testid$="sessionCard"]');
        const sessionId = closest.getAttribute("data-testid").replace("-sessionCard", "");
        console.log("session", sessionId);
        console.log(sessions);
        // Read it using the storage API
        console.log("clone", clone.querySelector("path").getAttribute("d"));
        clone.addEventListener("click", async function (elem) {
          const closest = elem.srcElement.closest('[data-testid$="sessionCard"]');
          if (!sessions.includes(sessionId)) {
            sessions.push(sessionId);
            clone.querySelector("path").setAttribute("d", FILLED_HEART)
            console.log("selected");
          } else {
            sessions.splice(sessions.indexOf(sessionId), 1);
            clone.querySelector("path").setAttribute("d", UNFILLED_HEART)
            console.log("unselected");
          }
          await chrome.storage.sync.set({ "sessions": sessions });
          console.log(closest)
        });
        if (sessions.includes(sessionId)) {
          selectedHeart(clone);
        } else {
          unselectedHeart(clone);
        }
        clone.classList.add("cloned");
        button.parentNode.appendChild(clone);
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});



const UNFILLED_HEART = `M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z`;
function unselectedHeart(clone) {
  sizeHeart(clone);
  clone.querySelector("path").setAttribute("d", UNFILLED_HEART);
}

const FILLED_HEART = `M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z`;
function sizeHeart(clone) {
  clone.querySelector("svg").setAttribute("viewBox", "-3 -3 32 32");
}

function selectedHeart(clone) {
  sizeHeart(clone);
  clone.querySelector("path").setAttribute("d", FILLED_HEART);
}

