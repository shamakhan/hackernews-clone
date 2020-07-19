import React, { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { options } from './constant';
import './style.scss';

const Timeline = () => {
  const { data, loading } = useSelector((state) => ({
    data: state.stories.getIn(['stories', 'data'])
    .toList()
    .toJS()
    .map((story) => ({ label: story.objectID, y: story.points})),
    loading: state.stories.getIn(['stories', 'loading'])
  }));
  const chartOptions = useMemo(
    () => ({
      ...options,
      data: [{
        type: 'line',
        toolTipContent: 'Story ID {label}: {y} votes',
        color: '#23669b',
        linColor: '#23669b',
        dataPoints: data
      }]
    }),
    [data]
  )

  return (
    <div className="chart-wrapper">
      {!loading && <CanvasJSChart options={ chartOptions } />}
    </div>
  );
}

export default Timeline;