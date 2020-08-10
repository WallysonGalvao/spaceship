const missions = [
  {
    circle: true,
    circleColor: '#CE2949',
    name: 'Estudar',
    time: { hour: 6, seconds: 45 },
  },
  {
    circle: true,
    circleColor: '#E08432',
    name: 'Exercícios',
    time: { hour: 2, seconds: 30 },
  },
  {
    circle: true,
    circleColor: '#EE5F40',
    name: 'Ler',
    time: { seconds: 30 },
  },
  {
    circle: false,
    circleColor: '',
    name: 'Tempo total',
    time: { hour: 10, seconds: 40 },
  },
  {
    circle: false,
    circleColor: '',
    name: 'Missões concluídas',
    time: {},
    total: 15,
  },
];

export default missions;
