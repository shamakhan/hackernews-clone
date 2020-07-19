export const options = {
  animationEnabled: true,
  // exportEnabled: true,
  theme: 'light2', // "light1", "dark1", "dark2"
  // title:{
  //   text: 'Votes by Story ID'
  // },
  backgroundColor: 'rgb(246, 246, 239)',
  axisY: {
    title: 'Votes',
    includeZero: false,
    titleFontWeight: '700',
    titleFontSize: 14,
    titleFontColor: 'black',
  },
  axisX: {
    title: 'Story ID',
    labelAngle: -90,
    interval: 1,
    titleFontWeight: '700',
    titleFontSize: 14,
    titleFontColor: 'black',
  },
  data: [{
    type: 'line',
    dataPoints: []
  }]
}