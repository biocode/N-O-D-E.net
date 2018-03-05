function getTag(li) {
  var raw = li.querySelector("span.tag").innerText;
  return String(raw[1] + raw[2]).toLowerCase();
}

function procData(data) {
  var idx = {all:null}
  data.forEach(function(el) {
    var tag = getTag(el);
    el.className = tag;
    if ( ! idx.hasOwnProperty(tag)) {
      idx[tag] = null;
    }
  })
  return Object.keys(idx).sort();
}

function mkLink(tag) {
  var el = document.createElement("a");
  el.style = "margin-right: 26px;outline:none;"
  el.classList.add(tag);
  if(tag === "all") {
    el.classList.add("active");
  }
  el.href = "#";
  el.textContent = "[" + tag.toUpperCase() + "]";
  return el;
}

function createFilterLinks(attachSelector, tags, data) {
  var root = document.querySelector(attachSelector);
  tags.forEach(function(tag) {
    root.appendChild(mkLink(tag));
  })

  var links = document.querySelectorAll(attachSelector + " a");

  tags.forEach(function(tag) {
    var link = root.querySelector("a." + tag);
    var clickHandler = function(event) {
      links.forEach(function(l) {l.classList.remove("active")});
      link.classList.add("active");

      data.forEach(function(el) {
        if(tag === "all" || el.classList.contains(tag)) {
          el.style.display = "block";
        } else {
          el.style.display = "none";
        }
      })
    }

    link.addEventListener("click", clickHandler, false)
  })
}

function main() {
  var data = document.querySelectorAll("#list li");
  var tags = procData(data);
  createFilterLinks("#filters", tags, data);
}

main();
