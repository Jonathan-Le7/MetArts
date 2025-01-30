import React, { useState, useEffect } from 'react';
import { Slider, Button, Input, Card, Divider } from 'antd'; 
import * as d3 from 'd3';
import styled from 'styled-components'; 
const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding: 20px;
  background: radial-gradient(circle at center, #f7c94d, #f05a28);
  font-family: 'Bangers', cursive;
  color: #fff;
  min-height: 100vh;
`;

const GraphCard = styled(Card)`
  width: 80%;
  margin-bottom: 20px;
  border: 4px solid black;
  box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.3);
  background: white;
  transform: perspective(1px) rotate(-1deg);
`;

const GraphSVG = styled.svg`
  border: 4px dashed black;
  margin-top: 20px;
  background: url('https://www.transparenttextures.com/patterns/cartographer.png');
  box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.3);
  position:sticky;
  top:10px;
`;

export function GraphDraw() {
  const [graphs, setGraphs] = useState([
    {
      id: 1,
      functionInput: 'x*x + 3*x - 4',
      sliderValue: 0,
      color: 'blue',
      domain: [-10, 10],
    },
  ]);

  useEffect(() => {
    drawAllGraphs();
  }, [graphs]);

  const drawAllGraphs = () => {
    const svg = d3.select('#graph');
    svg.selectAll('*').remove();

    const width = 500;
    const height = 500;
    const margin = 50;

    const xScale = d3.scaleLinear().domain([-10, 10]).range([margin, width - margin]);
    const yScale = d3.scaleLinear().domain([-10, 10]).range([height - margin, margin]);

    svg.attr('width', width).attr('height', height);

   
    svg.append('g')
      .attr('transform', `translate(0, ${height / 2})`)
      .call(d3.axisBottom(xScale));
    svg.append('g')
      .attr('transform', `translate(${width / 2}, 0)`)
      .call(d3.axisLeft(yScale));

    graphs.forEach(({ functionInput, sliderValue, color, domain }) => {
      const f = (x) => {
        try {
          return evalFunction(functionInput, x);
        } catch {
          return NaN;
        }
      };

      const data = d3.range(domain[0], domain[1], 0.1).map((x) => ({
        x: xScale(x),
        y: yScale(f(x + sliderValue)),
      }));

      svg.append('path')
        .data([data])
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('d', d3.line().x((d) => d.x).y((d) => d.y));
    });
  };

  const evalFunction = (func, x) => {
    let updatedFunc = func
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/log/g, 'Math.log')
      .replace(/abs/g, 'Math.abs');

    return new Function('x', `return ${updatedFunc}`)(x);
  };

  const addNewGraph = () => {
    const newId = graphs.length + 1;
    setGraphs([...graphs, {
      id: newId,
      functionInput: 'x*x + 3*x - 4',
      sliderValue: 0,
      color: getRandomColor(),
      domain: [-10, 10],
    }]);
  };

  const removeGraph = (id) => {
    setGraphs(graphs.filter(graph => graph.id !== id));
  };

  const handleFunctionChange = (id, value) => {
    setGraphs(graphs.map(graph =>
      graph.id === id ? { ...graph, functionInput: value } : graph
    ));
  };

  const handleSliderChange = (id, value) => {
    setGraphs(graphs.map(graph =>
      graph.id === id ? { ...graph, sliderValue: value } : graph
    ));
  };

  const handleDomainChange = (id, min, max) => {
    setGraphs(graphs.map(graph =>
      graph.id === id ? { ...graph, domain: [min, max] } : graph
    ));
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <GraphContainer>
      <div>
        <Button
          style={{
            background: 'linear-gradient(45deg, #ff6161, #ff2483)',
            color: '#fff',
            border: '3px solid black',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
          }}
          onClick={addNewGraph}
        >
          Add New Graph
        </Button>
        {graphs.map(({ id, functionInput, sliderValue, color, domain }) => (
          <GraphCard key={id} title={`Graph ${id}`} style={{ borderColor: color }}>
            <Input
              value={functionInput}
              onChange={(e) => handleFunctionChange(id, e.target.value)}
              placeholder="Enter math function"
              style={{ marginBottom: '10px' }}
            />
            <Slider
              min={-10}
              max={10}
              value={sliderValue}
              onChange={(value) => handleSliderChange(id, value)}
              step={0.1}
              style={{ marginBottom: '10px' }}
            />
            <Divider />
            <div>
              <Input
                type="number"
                value={domain[0]}
                onChange={(e) => handleDomainChange(id, Number(e.target.value), domain[1])}
                placeholder="Min x"
                style={{ width: '45%', marginRight: '10px' }}
              />
              <Input
                type="number"
                value={domain[1]}
                onChange={(e) => handleDomainChange(id, domain[0], Number(e.target.value))}
                placeholder="Max x"
                style={{ width: '45%' }}
              />
            </div>
            <Button onClick={() => removeGraph(id)} type="danger" style={{ marginTop: '10px' }}>
              Remove Graph
            </Button>
          </GraphCard>
        ))}
      </div>
      <GraphSVG id="graph" />
    </GraphContainer>
  );
}
