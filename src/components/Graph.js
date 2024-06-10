import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Graph = ({ sales, aggregations }) => {
    const svgRef = useRef();

    const aggregateData = (sales, aggregations) => {
        const groupedData = d3.group(sales, d => d.Age);

        const aggregatedData = Array.from(groupedData, ([age, values]) => {
            const result = { Age: age };
            if (aggregations.includes('min')) result.min = d3.min(values, d => d['Total Amount']);
            if (aggregations.includes('max')) result.max = d3.max(values, d => d['Total Amount']);
            if (aggregations.includes('avg')) result.avg = d3.mean(values, d => d['Total Amount']);
            return result;
        });

        return aggregatedData.sort((a, b) => a.Age - b.Age);
    };

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear existing content

        const width = 960;
        const height = 500;
        const margin = { top: 20, right: 20, bottom: 50, left: 70 }; // Adjusted bottom and left margins for axis labels
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const data = aggregateData(sales, aggregations);

        const x = d3.scaleBand().range([0, innerWidth]).padding(0.1);
        const y = d3.scaleLinear().range([innerHeight, 0]);

        const chartGroup = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        x.domain(data.map(d => d.Age));
        y.domain([0, d3.max(data, d => Math.max(d.min || 0, d.max || 0, d.avg || 0))]);

        const lineGenerator = d3.line()
            .x(d => x(d.Age) + x.bandwidth() / 2)
            .y(d => y(d.value));

        // Draw lines for each aggregation type
        if (aggregations.includes('min')) {
            chartGroup.append("path")
                .datum(data)
                .attr("class", "line-min")
                .attr("d", lineGenerator.y(d => y(d.min)))
                .attr("fill", "none")
                .attr("stroke", "green")
                .attr("stroke-width", 2);
        }

        if (aggregations.includes('avg')) {
            chartGroup.append("path")
                .datum(data)
                .attr("class", "line-avg")
                .attr("d", lineGenerator.y(d => y(d.avg)))
                .attr("fill", "none")
                .attr("stroke", "blue")
                .attr("stroke-width", 2);
        }

        if (aggregations.includes('max')) {
            chartGroup.append("path")
                .datum(data)
                .attr("class", "line-max")
                .attr("d", lineGenerator.y(d => y(d.max)))
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 2);
        }

        chartGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")));

        chartGroup.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

        svg.append("text")
            .attr("class", "x axis-label")
            .attr("text-anchor", "middle")
            .attr("x", margin.left + innerWidth / 2)
            .attr("y", height - 10)
            .text("Возраст");

        svg.append("text")
            .attr("class", "y axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -margin.top - innerHeight / 2)
            .attr("y", 20)
            .text("Продажи");

    }, [sales, aggregations]);

    return (
        <svg ref={svgRef} width="960" height="500"></svg>
    );
};

export default Graph;
