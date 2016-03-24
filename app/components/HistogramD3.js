import d3 from 'd3';

export default class HistogramD3 {
  constructor(node, width, height, data) {
    var formatTick = function(d) {
      switch (d) {
        case 0: return 'Q1';
        case 36: return 'Q2';
        case 72: return 'Q3';
        case 108: return 'Q4';
        case 144: return 'OT';
        default: return '';
      }
    };

    var svg = d3.select(node)
      .attr("width", width)
      .attr("height", height);

    this.margin = {right: 50, left: 60};
    this.tickHeight = 14;
    this.labelHeight = 18;
    this.histWidth = width - this.margin.left - this.margin.right;
    this.histHeight = height * 0.4;

    this.x = d3.scale.linear()
      .domain([0, 159])
      .range([0, this.histWidth]);

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .outerTickSize(0)
      .tickValues([0,36,72,108,144])
      .tickFormat(formatTick)
      .orient("bottom");

    svg.append('text')
      .attr('class', 'stats-txt')
      .attr('x', '50%')
      .attr('y', height - this.labelHeight)
      .attr('text-anchor', 'middle')
      .text('When Possessions Happen')

    this.g = svg.append("g")
      .attr('transform', 'translate(' + this.margin.left + ')');

    this.g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.histHeight + ")")
      .call(this.xAxis);

    if (data) this.update(data);

    this.update = this.update.bind(this);
  }

  update(data) {
    var hist = d3.layout.histogram()
      .bins(this.x.ticks(159))(data);

    var y = d3.scale.linear()
      .domain([0, d3.max(hist, function(d) { return d.y; })])
      .range([this.histHeight, 0]);

    var bar = this.g.selectAll(".hist-bar")
      .data(hist);

    bar.transition().duration(1000)
      .attr("transform", function(d) {
        return "translate(" + this.x(d.x) + "," + y(d.y) + ")";
      }.bind(this))
      .attr("height", function(d) { return this.histHeight - y(d.y); }.bind(this));

    setTimeout(function() {
      bar.enter().append("rect")
      .attr("class", "hist-bar")
      .attr("transform", function(d) {
        return "translate(" + this.x(d.x) + "," + y(0) + ")";
      }.bind(this))
      .attr("width", this.x(hist[0].dx))
      .attr('height', 0)
      .transition().duration(1000)
      .attr("transform", function(d) {
        return "translate(" + this.x(d.x) + "," + y(d.y) + ")";
      }.bind(this))
      .attr("height", function(d) {
        return this.histHeight - y(d.y);
      }.bind(this));
    }.bind(this), 1350)
  }
}