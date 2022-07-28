  const $ = document.querySelector.bind(document);
  /**
   * Collection of rectangles defining user generated regions
   */
  const rectangles = [];
  const coordinates = [];
  const mappingInfo = [];
  const textboxData = [];

  // DOM elements
  const $screenshot = $('#screenshot');
  const $draw = $('#draw');
  const $marquee = $('#marquee');
  const $boxes = $('#boxes');

  // Temp variables
  let startX = 0;
  let startY = 0;
  const marqueeRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  $marquee.classList.add('hide');
  $screenshot.addEventListener('pointerdown', startDrag);

  function startDrag(ev) {
    // middle button delete rect
    if (ev.button === 1) {
      const rect = hitTest(ev.layerX, ev.layerY);
      if (rect) {
        rectangles.splice(rectangles.indexOf(rect), 1);
        redraw();
      }
      return;
    }
    window.addEventListener('pointerup', stopDrag);
    $screenshot.addEventListener('pointermove', moveDrag);
    $marquee.classList.remove('hide');
    startX = ev.layerX;
    startY = ev.layerY;
    drawRect($marquee, startX, startY, 0, 0);

    document.getElementById('btnShowMappingData').style.display = 'none';
  }

  function stopDrag(ev) {
    $marquee.classList.add('hide');
    window.removeEventListener('pointerup', stopDrag);
    $screenshot.removeEventListener('pointermove', moveDrag);
    if (ev.target === $screenshot && marqueeRect.width && marqueeRect.height) {
      rectangles.push(Object.assign({}, marqueeRect));

      coordinates.push(rectangles); //adding coordinates to local storage
      window.localStorage.setItem('coordinates', JSON.stringify(rectangles));

      showInfoPanel();
      redraw();
    }
  }
  function showInfoPanel() {
    document.getElementById('mappingData').style.display = 'block';
  }

  function postMappingData() {      
    let myObj =
    {
      name: document.getElementById("txtName").value,
      Desc: document.getElementById("txtDesc").value
    };
    //let myObj_serialized  = JSON.stringify(myObj);
    if (localStorage.getItem('mappingData') == null) {
      localStorage.setItem('mappingData', '[]');
    }
    var old_data = JSON.parse(localStorage.getItem('mappingData'));
    old_data.push(myObj);
    window.localStorage.setItem('mappingData', JSON.stringify(old_data));
    document.getElementById("txtName").value = '';
    document.getElementById("txtDesc").value = '';
    document.getElementById('mappingData').style.display = 'none';
    document.getElementById('btnShowMappingData').style.display = 'block';
  }

  function showImage() {
    const node = document.getElementById("demo");
    const clone = node.cloneNode(true);
    let temp = document.body.appendChild(clone);
    document.getElementById("duplicateImg").append(temp);
    document.getElementById("screenshot").style.position = 'relative';
    document.getElementById('screenshot').setAttribute('usemap', 'imgMapped');

    var getCoordinate = localStorage.getItem("coordinates");
    var getCord = JSON.parse(getCoordinate);
    for (var i = 0; i < getCord.length; i++) {
      var item = getCord[i];
      var areaTag = document.createElement('area');
      areaTag.shape = 'rect';
      areaTag.id = 'rect-' + i;
      areaTag.alt = 'rect-' + i;
      areaTag.title = 'rectangle-' + (i + 1);
      areaTag.href = '';
      var imgMapRec = item.width + ',' + item.height + ',' + item.x + ',' + item.y;
      areaTag.setAttribute("coodrs", imgMapRec);
      areaTag.onclick = function (e) {
        e.preventDefault();
      }
      document.getElementById('imgMap').appendChild(areaTag);
    }
    for (let i = 0; i < getCord.length; i++) {
      var element = getCord[i];
      document.getElementById('rect-' + i).style.position = 'absolute';
      document.getElementById('rect-' + i).style.width = element.width + 'px';
      document.getElementById('rect-' + i).style.height = element.height + 'px';
      document.getElementById('rect-' + i).style.top = element.y + 'px';
      document.getElementById('rect-' + i).style.left = (element.x + 15) + 'px';
      document.getElementById('rect-' + i).style.border = '1px solid';
      document.getElementById('rect-' + i).style.borderColor = 'red';
      document.getElementById('rect-' + i).style.zIndex = 100;

      // document.getElementById('rect-' + i).setAttribute('data-name', 'data_' + i + ' ' + 'all');
      document.getElementById('rect-' + i).setAttribute('onmouseover', 'showMappingDtls(this)');
      document.getElementById('rect-' + i).setAttribute('onmouseout', 'hideMappingDtls(this)');
      document.getElementById('rect-' + i).style.display = 'none';
    }
  }

  function showMappingDtls(x) {
    // var coords = x.coords;
    var x = x.id;
    var getmappingData = localStorage.getItem("mappingData");
    var getData = JSON.parse(getmappingData);

    for (let i = 0; i < getData.length; i++) {
      var element = getData[i];
      if (x == 'rect-' + i) {
        document.getElementById('rect-' + i).style.display = 'block';
        document.getElementById('nameMapping').style.display = 'block';
        document.getElementById("nameMapping").innerHTML = 'Name:' + '<h5 style="display:inline;">' + element.name + '</h4>' + '<br>' + 'Description :' + '<h5 style="display:inline;">' + element.Desc + '</h5>';
      }
    }
  }
  function enterImg() {
    var getmappingData = localStorage.getItem("mappingData");
    var getData = JSON.parse(getmappingData);
    for (let i = 0; i < getData.length; i++) {
      document.getElementById('rect-' + i).style.display = 'block';
    }
  }

  function leaveImg() {
    var getmappingData = localStorage.getItem("mappingData");
    var getData = JSON.parse(getmappingData);
    for (let i = 0; i < getData.length; i++) {
      document.getElementById('rect-' + i).style.display = 'none';
      document.getElementById('nameMapping').style.display = 'none';
    }
  }
  function hideMappingDtls() {
    var getmappingData = localStorage.getItem("mappingData");
    var getData = JSON.parse(getmappingData);
    for (let i = 0; i < getData.length; i++) {
      document.getElementById('nameMapping').style.display = 'none';
    }
  }
  function moveDrag(ev) {
    let x = ev.layerX;
    let y = ev.layerY;
    let width = startX - x;
    let height = startY - y;
    if (width < 0) {
      width *= -1;
      x -= width;
    }
    if (height < 0) {
      height *= -1;
      y -= height;
    }
    Object.assign(marqueeRect, { x, y, width, height });
    drawRect($marquee, marqueeRect);
  }

  function hitTest(x, y) {
    return rectangles.find(rect => (
      x >= rect.x &&
      y >= rect.y &&
      x <= rect.x + rect.width &&
      y <= rect.y + rect.height
    ));
  }

  function redraw() {
    boxes.innerHTML = '';
    rectangles.forEach((data) => {
      boxes.appendChild(drawRect(
        document.createElementNS("http://www.w3.org/2000/svg", 'rect'), data
      ));
    });
  }

  function drawRect(rect, data) {
    const { x, y, width, height } = data;
    rect.setAttributeNS(null, 'width', width);
    rect.setAttributeNS(null, 'height', height);
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    return rect;
  }
