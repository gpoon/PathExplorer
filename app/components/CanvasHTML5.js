import d3 from 'd3';

export default class CanvasHTML5 {
  constructor(node, width, height, data) {
    this._canvas = node.getContext('2d');
    this._canvas.canvas.width = width;
    this._canvas.canvas.height = height;
    this._strokeOpacity = d3.scale.pow().exponent(-0.35)
      .domain([10,1000])
      .range([0.6, 0.04])
      .clamp(true);

    this.update = this.update.bind(this);
    this._render = this._render.bind(this);

    if (data) this.update(data);
  }

  update(data) {
    this._data = data;
    this._n = data.length;
    this._canvas.clearRect(0, 0, this._canvas.canvas.width, this._canvas.canvas.height)
    this._opacity = this._strokeOpacity(this._n);
    this._canvas.strokeStyle = 'rgba(0,0,0,' + this._opacity + ')';
    this._render();
  }

  _render() {
    for (var j = 0; j < this._n; j++) {
      var p = new Path2D(this._data[j].p);
      this._canvas.stroke(p);
    }
  }
}