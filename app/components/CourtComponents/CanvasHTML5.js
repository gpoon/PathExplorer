import d3 from 'd3';

export default class CanvasHTML5 {
  constructor(node, width, height, data, allowUpdate) {
    this._canvas = node.getContext('2d');
    this._canvas.canvas.width = width;
    this._canvas.canvas.height = height;
    this._strokeOpacity = d3.scale.pow().exponent(-0.35)
      .domain([10,1000])
      .range([0.6, 0.06])
      .clamp(true);
    this._allowUpdate = allowUpdate;

    this.update = this.update.bind(this);
    this.drawFirst = this.drawFirst.bind(this);
    this._render = this._render.bind(this);

    if (data) this.update(data);
  }

  update(data) {
    this._canvas.clearRect(0, 0, this._canvas.canvas.width, this._canvas.canvas.height);
    if (data) {
      this._data = data;
      this._n = data.length;
      this._opacity = this._strokeOpacity(this._n);
      this._canvas.lineWidth = 1;
      this._canvas.strokeStyle = 'rgba(255,255,255,' + this._opacity + ')';
      this._render();
    }
  }

  drawFirst(data, callback) {
    this._canvas.clearRect(0, 0, this._canvas.canvas.width, this._canvas.canvas.height);
    this._opacity = this._strokeOpacity(1);
    this._canvas.lineWidth = 2;

    var reM = /M(\d+),(\d+)/;
    var reC = /(\d+),(\d+),(\d+),(\d+),(\d+),(\d+)/;
    var splitStr = data[0].p.split("C");
    var newP = 'M' + reM.exec(splitStr[0])
      .slice(1)
      .join(',');

    var i = 1;
    (function loop(canvas, allowUpdate, callback) {
      setTimeout(function() {
        newP += 'C' + reC.exec(splitStr[i])
          .slice(1)
          .join(',');

        let p = new Path2D(newP);
        canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
        canvas.strokeStyle = 'rgb(255,255,255)';
        canvas.stroke(p);

        i++;
        if (i < splitStr.length) {
          loop(canvas, allowUpdate, callback);
        } else {
          setTimeout(function(){
            allowUpdate();
            callback();
          }, 1250);
        }
      }, 100);
    })(this._canvas, this._allowUpdate, callback);
  }

  _render() {
    for (var j = 0; j < this._n; j++) {
      var p = new Path2D(this._data[j].p);
      this._canvas.stroke(p);
    }
  }
}
